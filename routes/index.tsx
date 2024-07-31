import ProjectInfo, { kv } from "../components/Database.tsx";
import projectCard from "../components/ProjectCard.tsx";
import Layout from "../components/Layout.tsx";
import { user_config } from "../components/Database.tsx";
import { bookIcon, circuitIcon, heartIcon } from "../components/Icons.tsx";
import type { JSX } from "preact";

const TITLE = user_config.customizations.server_name;

function navItem(name: string, url: string, icon: () => JSX.Element) {
  return (
    <li class="hover:bg-gradient-to-r from-teal-700 to-cyan-700 p-4">
      <a href={url}>
        {icon()}
        <span class="pl-2 align-middle">{name}</span>
      </a>
    </li>
  );
}

function noProjectsFound() {
  return (
    <div class="flex flex-col h-full w-full items-center justify-center text-neutral-600">
      <span class="text-4xl font-bold py-2">NO PROJECTS FOUND</span>
      <p class="text-xl py-4">
        <button class="px-2 py-1 border-neutral-600 border-2 rounded hover:bg-sky-700 hover:border-sky-700 active:bg-sky-800 active:border-sky-800 hover:text-white font-bold text-sm transition-colors">
          ADD NEW PROJECT SOURCE
        </button>
      </p>
    </div>
  );
}

export default async function Home() {
  const projects = await Array.fromAsync(
    kv.list({ prefix: ["projects"] }),
  ) as Array<Deno.KvEntry<ProjectInfo>>;
  const nav = [
    navItem("Projects", "/", circuitIcon),
    navItem("Part Library", "/parts", bookIcon),
    navItem("About", "/about", heartIcon),
  ];

  if (projects.length == 0) {
    return noProjectsFound();
  }
  return (
    <Layout title={TITLE} navItems={nav}>
      <div class="flex flex-wrap font-mono">
        {projects.map((p: Deno.KvEntry<ProjectInfo>) => projectCard(p.value))}
      </div>
    </Layout>
  );
}
