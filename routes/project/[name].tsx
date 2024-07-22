import { PageProps } from "$fresh/server.ts";
import ProjectInfo from "../../components/ProjectManager.tsx";
import { asset, Partial } from "$fresh/runtime.ts";
import { kv } from "../../components/Database.tsx";


function bom(project) {
  return (
    <iframe
      class="flex-grow"
      src={asset("/bom/ibom.html")}
      title="Interactive BOM for KiCAD"
    >
    </iframe>
  );
}

function schematic(project) {
  return (
    <div class="flex-grow bg-neutral-900">
      <script src="https://kicanvas.org/kicanvas/kicanvas.js"></script>
      <kicanvas-embed src={asset("/sample.kicad_sch")} controls="full">
      </kicanvas-embed>
    </div>
  );
}


export default async function ProjectPage(req: Request, ctx: RouteContext) {
  const entry = await kv.get(["projects", ctx.params.name])
  console.log(ctx)
  if (entry.value === null) {
    return ctx.renderNotFound();
  } else {
    const headers = new Headers();
    headers.set("location", `/project/${ctx.params.name}/schematic`);
    return new Response(null, {
      status: 302,
      headers,
    });
  }
}
