import { component$, Resource, useStore } from "@builder.io/qwik";
import {
  DocumentHead,
  RequestHandler,
  useEndpoint,
} from "@builder.io/qwik-city";
import { LoginPage } from "~/components/LoginPage";
import { WholeUI } from "~/components/WholeUI";
import type { Timeline as TimelineType } from "~/types";

import { authorize } from "~/util/oauth";

export default component$(() => {
  const request = useEndpoint();
  const state = useStore({
    token: "",
    expiresAt: -1,
    me: { id: "", name: "", username: "", profile_image_url: "" },
    timeline: [] as TimelineType[],
  });

  return (
    <Resource
      value={request}
      onResolved={(request: any) => {
        if (!request.authenticated) {
          return <LoginPage onLogin$={() => authorize()} />;
        }

        state.token = request.token;
        state.expiresAt = request.expiresAt;
        state.me = request.me;
        state.timeline = request.timeline;

        return (
          <WholeUI
            me={state.me}
            timeline={state.timeline}
            token={state.token}
          />
        );
      }}
    />
  );
});

export const onRequest: RequestHandler<{}> = async (request) => {
  const token = request.cookie
    .get("token")
    ?.json<{ value: string; expiresAt: number }>();
  if (token) {
    const twitterRequestOptions = {
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
    };

    const me = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=profile_image_url",
      twitterRequestOptions
    )
      .then((r) => r.json())
      .then((r) => r.data);

    const timeline = await fetch(
      `https://api.twitter.com/2/users/${me.id}/timelines/reverse_chronological?tweet.fields=created_at&expansions=author_id&user.fields=profile_image_url,id,username&max_results=100`,
      twitterRequestOptions
    )
      .then((r) => r.json())
      .then((r) =>
        r.data.map((tweet: any) => ({
          ...tweet,
          author: r.includes.users.find(
            (user: any) => user.id === tweet.author_id
          ),
        }))
      );

    return {
      authenticated: true,
      token: token.value,
      expiresAt: token.expiresAt,
      me,
      timeline,
    };
  } else {
    return { authenticated: false };
  }
};

export const head: DocumentHead = {
  title: "Tejjer",
  meta: [
    {
      name: "description",
      content:
        "An open-source lightweight Twitter clone built for learning and teaching.",
    },
  ],
};
