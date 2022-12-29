import { component$, useSignal } from "@builder.io/qwik";
import { postTweet } from "~/util/postTweet";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

type Props = {
  me: { name: string; profile_image_url: string };
  token: string;
};

export const Composer = component$((props: Props) => {
  const tweet = useSignal("");

  return (
    <>
      <div>
        <div className="flex items-center gap-4 p-4">
          <div>
            <Avatar
              alt={props.me.name}
              url={props.me.profile_image_url}
              size={64}
            />
          </div>
          <div className="w-full">
            <textarea
              id="composer"
              className="w-full p-4 text-xl border border-gray-300 rounded dark:border-0 dark:text-white dark:bg-black"
              placeholder="What's happening?"
              value={tweet.value}
              onChange$={(event) => (tweet.value = event.target.value)}
            />
          </div>
        </div>
        <div className="grid p-4 grid-cols-[1fr,auto]">
          <ul className="flex items-center gap-4">
            <li>
              <button onClick$={() => alert("Not yet implemented!")}>📸</button>
            </li>
            <li>
              <button onClick$={() => alert("Not yet implemented!")}>📊</button>
            </li>
            <li>
              <button onClick$={() => alert("Not yet implemented!")}>😄</button>
            </li>
            <li>
              <button onClick$={() => alert("Not yet implemented!")}>🕙</button>
            </li>
            <li>
              <button onClick$={() => alert("Not yet implemented!")}>📍</button>
            </li>
          </ul>
          <div>
            <Button
              condensed
              onClick$={() => {
                postTweet({ text: tweet.value, token: props.token });
              }}
            >
              Tweet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});
