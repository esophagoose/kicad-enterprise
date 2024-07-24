import ProjectInfo from "../components/Database.tsx";
import { LinkDiv } from "../islands/Link.tsx";

export default function projectCard(project: ProjectInfo) {
  return (
    <LinkDiv
      classes="border border-neutral-600 rounded-md p-4 m-6 hover:bg-neutral-800 active:bg-neutral-900 transition-colors cursor-pointer text-neutral-300"
      link={"/project/" + project.name}
    >
      <div class="flex justify-center items-center hover:text-white pb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-10 h-10 inline-block"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
          />
        </svg>
        <span class="text-sky-100 font-bold text-2xl px-2">{project.name}</span>
        <span class="grow"></span>
        <div class="pl-4">
          <span class="border border-teal-600 rounded p-1 font-sans font-bold text-xs text-teal-600">
            {project.source.toUpperCase()}
          </span>
        </div>
      </div>
      <span class="text-sm">
        Last Updated:{" "}
        <span>
          {project.lastModified.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </span>
    </LinkDiv>
  );
}
