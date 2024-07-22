import { PageProps } from "$fresh/server.ts";
import ProjectInfo, { projects } from "../../components/ProjectManager.tsx";
import { Partial, asset } from "$fresh/runtime.ts";

function bom(project) {
  return <iframe class="flex-grow" src={asset("/bom/ibom.html")} title="Interactive BOM for KiCAD"></iframe>
}

function schematic(project) {
  return (
    <div class="flex-grow bg-neutral-900">
      <script src="https://kicanvas.org/kicanvas/kicanvas.js"></script>
      <kicanvas-embed src={asset("/sample.kicad_sch")} controls="full"></kicanvas-embed>
    </div>
  )
}

export default function ProjectPage(props: PageProps) {
  let project: ProjectInfo | null = null;
  for (const proj of projects) {
    if (proj.name === props.params.name) {
      console.log('Found project:', JSON.stringify(proj, null, 2));
      project = proj;
    }
  }
  if (!project) {
    return;
  }

  return (
    <div class="flex flex-col h-screen" f-client-nav>
      <a href="#" f-partial="/project/schematic">SCHEMATIC</a>
      <a href="/project/sample" f-partial="/project/bom">BOM</a>
      <Partial name="project-content">
      </Partial>
    </div>
  );
}
