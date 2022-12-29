import { component$, QwikMouseEvent } from "@builder.io/qwik";
import { Button } from "./Button";
import { Logo } from "./Logo";

type Props = {
  onLogin$:
    | ((
        event: QwikMouseEvent<HTMLButtonElement, MouseEvent>,
        element: Element
      ) => unknown)
    | undefined;
};

export const LoginPage = component$((props: Props) => {
  return (
    <div class="p-4 w-screen h-screen flex items-center justify-center flex-col gap-8 md:gap-16">
      <Logo size={256} />
      <div className="grid max-w-screen-md gap-4 mx-auto text-center">
        <h1 className="text-6xl font-bold">Tejjer</h1>
        <p className="text-xl">
          This application is a lightweight clone of Twitter with partial
          feature parity that exists to demonstrate various user interface
          features and performance. It is open source and used for learning.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick$={props.onLogin$}>Login</Button>
        <Button
          color="secondary"
          onClick$={() => window.open("github url @todo")}
        >
          Browse the Code
        </Button>
      </div>
    </div>
  );
});
