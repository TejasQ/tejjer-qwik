import { component$ } from "@builder.io/qwik";
import type { Timeline as TimelineType } from "~/types";
import { Avatar } from "./Avatar";

type Props = {
  timeline: TimelineType[];
};

export const Timeline = component$((props: Props) => (
  <div className="overflow-auto">
    {props.timeline.map((tweet) => (
      <div>
        {/* @todo show indicator for new tweets <div className="p-3 text-center">show 28 tweets</div> */}
        <div className="flex items-start gap-4 p-4 border-t border-gray-300 dark:border-gray-700">
          <div>
            <Avatar
              url={tweet.author.profile_image_url}
              alt={tweet.author.name}
              size={64}
            />
          </div>
          <div className="grid w-full gap-2">
            <div className="">
              <div className="flex items-center gap-1">
                <div>
                  <strong>{tweet.author.name}</strong>{" "}
                  <span className="text-gray-500">
                    @{tweet.author.username} ·{" "}
                    {Intl.DateTimeFormat("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(tweet.created_at))}
                  </span>
                </div>
                <div className="ml-auto">...</div>
              </div>
            </div>
            <p className="text-xl leading-normal">{tweet.text}</p>
            {/* @todo implement quote tweet previews <div>qt</div> */}
            <div>
              <ul className="flex items-center justify-between w-full gap-2 mt-2">
                <li>
                  <button onClick$={() => alert("Not yet implemented!")}>
                    💬
                  </button>
                </li>
                <li>
                  <button onClick$={() => alert("Not yet implemented!")}>
                    ♻️
                  </button>
                </li>
                <li>
                  <button onClick$={() => alert("Not yet implemented!")}>
                    ❤️
                  </button>
                </li>
                <li>
                  <button onClick$={() => alert("Not yet implemented!")}>
                    🚀
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
));
