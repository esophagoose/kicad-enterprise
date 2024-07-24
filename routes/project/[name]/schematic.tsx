import { kv, SchematicInfo } from "../../../components/Database.tsx";
import SchView from "../../../islands/SchematicView.tsx";

export default async function ProjectPage(req: Request, ctx: RouteContext) {
  const result = kv.list({
    prefix: ["schematics", decodeURI(ctx.params.name)],
  });
  const schematics: Array<SchematicInfo> = [];
  for await (const schematic of result) {
    schematics.push(schematic.value);
    console.log(schematic.value);
  }
  if (schematics.length == 0) {
    return ctx.renderNotFound();
  }
  const svgContent = await Deno.readTextFile(schematics[0].svgPath);
  return <SchView svg={svgContent} />;
}
