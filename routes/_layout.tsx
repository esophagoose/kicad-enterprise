import { PageProps } from "$fresh/server.ts";
import { config } from "../components/ProjectManager.tsx";
import { bookIcon, heartIcon, circuitIcon } from "../components/Icons.tsx";

function navItem(name: string, url: string, icon: () => JSX.Element){
  return (
    <li class="hover:bg-sky-800 p-4">
      <a href={url}>{icon()}
        <span class="pl-2 align-middle">{name}</span>
      </a>
    </li>
  )
}

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="bg-zinc-950 text-white min-h-screen flex overflow-hidden">
      <nav class="min-h-screen w-1/6 flex flex-col divide-y divide-zinc-800 ">
          <header class="px-4 py-6">
            <a href="/">
              <h1 class="text-2xl">{config.customizations.server_name}</h1>
            </a>
          </header>
          <ul class="flex flex-col">
              {navItem("Projects", "/projects", circuitIcon)}
              {navItem("Part Library", "/parts", bookIcon)}
              {navItem("About", "/about", heartIcon)}
          </ul>
      </nav>
      <main class="flex-grow mt-3 w-full">
          <div class="bg-zinc-900 rounded-tl-md p-4 w-full h-full border border-zinc-800" f-client-nav>
              <Component />
          </div>
      </main>
    </div>
  );
}