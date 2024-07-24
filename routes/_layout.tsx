import { PageProps } from "$fresh/server.ts";
import { user_config } from "../components/Database.tsx";
import { bookIcon, circuitIcon, heartIcon } from "../components/Icons.tsx";

function navItem(name: string, url: string, icon: () => JSX.Element) {
  return (
    <li class="hover:bg-sky-800 p-4">
      <a href={url}>
        {icon()}
        <span class="pl-2 align-middle">{name}</span>
      </a>
    </li>
  );
}

export default function Layout({ Component, state }: PageProps) {
  return (
    <div class="bg-zinc-950 text-white min-h-screen flex">
      <nav class="min-h-screen w-1/6 flex flex-col divide-y divide-zinc-800">
        <header class="px-4 py-6">
          <a href="/">
            <h1 class="text-2xl">{user_config.customizations.server_name}</h1>
          </a>
        </header>
        <ul class="flex flex-col flex-grow">
          {navItem("Projects", "/", circuitIcon)}
          {navItem("Part Library", "/parts", bookIcon)}
          {navItem("About", "/about", heartIcon)}
        </ul>
        <footer class="font-mono text-sm text-gray-300 pb-3">
          <div class="p-4">
            <a href="https://github.com/esophagoose/kicad-enterprise">
              kicad-enterprise: v0.0.1
            </a>
          </div>
        </footer>
      </nav>
      <main class="flex-grow mt-3 w-full h-screen">
        <div
          class="bg-zinc-900 rounded-tl-md p-4 w-full h-full border border-zinc-800"
          f-client-nav
        >
          <Component />
        </div>
      </main>
    </div>
  );
}
