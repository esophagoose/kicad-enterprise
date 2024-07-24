import { PageProps } from "$fresh/server.ts";
import LinkButton from "../../islands/Link.tsx";
import { RouteConfig } from "$fresh/server.ts";

function leftArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={1.5}
      stroke="currentColor"
      className="size-9"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
      />
    </svg>
  );
}
export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default function Layout(props: PageProps) {
  return (
    <div class="bg-zinc-900 text-white min-h-screen flex flex-col overflow-hidden">
      <header class="p-4 flex">
        <a class="text-2xl pl-1 pr-4 text-gray-300" href="/">{leftArrow()}</a>
        <h1 class="text-2xl">{decodeURI(props.params.name)}</h1>
        <div class="flex-grow"></div>
        <LinkButton link={`/project/${props.params.name}/schematic`}>
          SCHEMATIC
        </LinkButton>
        <LinkButton link="#">LAYOUT</LinkButton>
        <LinkButton link={`/project/${props.params.name}/bom`}>BOM</LinkButton>
      </header>
      <div class="flex-grow flex flex-col bg-gradient-to-r from-sky-400 to-teal-500 border-l-0 border-t-0">
        <div class="mt-0.5 flex-grow flex">
          <props.Component />
        </div>
      </div>
    </div>
  );
}
