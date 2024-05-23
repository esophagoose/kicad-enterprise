import { projects } from "../../components/ProjectManager.tsx";
import projectCard from "../../components/ProjectCard.tsx";

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
    )
}

export default function ProjectsPage() {
    if (projects.length == 0) {
        return noProjectsFound();
    }

    return (
    <div class="flex flex-wrap font-mono">
        {projects.map(project => projectCard(project))}
    </div>)
}