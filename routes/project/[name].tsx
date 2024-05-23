import { PageProps } from "$fresh/server.ts";
import ProjectInfo, { projects } from "../../components/ProjectManager.tsx";
import { asset } from "$fresh/runtime.ts";

function bomview(project) {
  return <iframe class="flex-grow" src={asset("/bom/ibom.html")} title="Interactive BOM for KiCAD"></iframe>
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
    return;  // FIXME
  }

  return (
        <body f-client-nav>
          {/* <Partial name="body"> */}
            {/* <Component /> */}
          {/* </Partial> */}
        </body>
  );
}
