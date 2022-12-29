import { component$ } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import "isomorphic-fetch";

import { Button } from "~/components/Button";
import { Logo } from "~/components/Logo";
import { getToken } from "~/util/oauth";

export default component$(() => {
  /** @todo error handling */
  return (
    <div class="w-screen h-screen flex items-center justify-center flex-col gap-16">
      <Logo size={256} />
      <div className="grid max-w-screen-md gap-4 mx-auto text-center">
        <h1 className="text-6xl font-bold">You're All Set!</h1>
        <p className="text-xl">Great, you're logged in and ready to go!</p>
      </div>
      <div className="flex items-center gap-4">
        <Button color="secondary" onClick$={() => (window.location.href = "/")}>
          Go Home
        </Button>
      </div>
    </div>
  );
});

export const onGet: RequestHandler = async ({ url, cookie }) => {
  const authCode = url.searchParams.get("code")!;
  const redirectUri = "http://localhost:5173/api/auth/twitter/callback";

  try {
    const token = await getToken({ authCode, redirectUri });

    cookie.set(
      "token",
      JSON.stringify({
        value: token.access_token,
        expiresAt: new Date(Date.now() + token.expires_in * 1000),
      }),
      {
        httpOnly: true,
        maxAge: token.expires_in,
        path: "/",
      }
    );

    return {};
  } catch (e) {
    return { error: e };
  }
};
