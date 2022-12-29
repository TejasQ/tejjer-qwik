import { component$, Slot } from "@builder.io/qwik";

export const MenuItem = component$(() => (
  <div className="px-4 py-2 text-xl transition rounded-3xl dark:hover:bg-white hover:bg-gray-400 hover:bg-opacity-20">
    <Slot />
  </div>
));
