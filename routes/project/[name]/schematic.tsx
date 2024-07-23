import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import { kv } from "../../../components/Database.tsx";
import SView from "../../../islands/SchematicView.tsx";


export default async function ProjectPage(req: Request, ctx: RouteContext) {
  const project = await kv.get(["projects", ctx.params.name])
  console.log(project.value.location)
  const svgContent = await Deno.readTextFile("static/sample.svg");
  return <SView svg={svgContent} />;
}
