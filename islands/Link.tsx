import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
  classes: string;
  link: string;
}

function randomNumber() {
  return Math.floor(Math.random() * 100);
}

export default function LinkButton({ children, classes, link }: Props) {
  return (
    <button 
        class="border border-teal-500 rounded-xl text-sm mx-2 px-4 text-neutral-300 hover:bg-teal-900 active:bg-teal-800"
        onClick={() => (location.href = link)}
    >
        {children}
    </button>
  );
}

export function LinkDiv({ children, classes, link }: Props) {
  return (
    <div class={classes} onClick={() => (location.href = link)}>
        {children}
    </div>
  );
}