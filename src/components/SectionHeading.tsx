import { component$, Slot } from "@builder.io/qwik";

export const SectionHeading = component$(() => (
  <h2 className="text-2xl font-bold">
    <Slot />
  </h2>
));
