import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { kv } from "../../../components/Database.tsx";


export default async function ProjectPage(req: Request, ctx: RouteContext) {
  const project = await kv.get(["projects", ctx.params.name])
  console.log(project.value.location)
  return (
    <div class="flex-grow bg-zinc-900">
      <script src="https://kicanvas.org/kicanvas/kicanvas.js"></script>
      <kicanvas-embed src={asset(project.value.location)} controls="full">
      </kicanvas-embed>
    </div>
  );
}
