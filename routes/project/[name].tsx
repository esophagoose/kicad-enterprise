import { PageProps } from "$fresh/server.ts";
import ProjectInfo, { projects } from "../../components/ProjectManager.tsx";
import { asset } from "$fresh/runtime.ts";

export default function ProjectPage(props: PageProps) {
  let project: ProjectInfo | null = null;
  for (const proj of projects) {
    if (proj.name === props.params.name) {
      console.log('Found project:', JSON.stringify(proj, null, 2));
      project = proj;
    }
  }
  if (!project) {
    return;  // FIXME
  }
  console.log('>> :', project.name);
  return (
    <iframe class="flex-grow" src={asset("/bom/ibom.html")} title="Interactive BOM for KiCAD"></iframe>
  );
}
