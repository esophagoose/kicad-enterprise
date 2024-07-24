import { JSX } from "preact/jsx-runtime";
import { kv, SchematicInfo } from "../../../components/Database.tsx";
import SchView from "../../../islands/SchematicView.tsx";

function createSchematicLink(name: string) {
  return (
    <li class="hover:bg-sky-800 p-4">
      <a href={"#"}>{name.split(".kicad_sch")[0]}</a>
    </li>
  );
}
export default async function ProjectPage(req: Request, ctx: RouteContext) {
  const result = kv.list({
    prefix: ["schematics", decodeURI(ctx.params.name)],
  });
  const schematics: Array<SchematicInfo> = [];
  const schNavList: Array<JSX.Element> = [];
  for await (const sch of result) {
    schematics.push(sch.value);
    schNavList.push(createSchematicLink(sch.value.name));
    console.log(sch.value);
  }
  if (schematics.length == 0) {
    return ctx.renderNotFound();
  }
  const svgContent = await Deno.readTextFile(schematics[0].svgPath);
  return (
    <>
      <nav class="w-1/6 flex flex-col bg-zinc-900 border-r-2 border-sky-500">
        <h3 class="px-4 py-2 text-sm font-semibold">SCHEMATICS</h3>
        <hr class="mx-2"></hr>
        <ul>
          {schNavList}
        </ul>
      </nav>
      <SchView svg={svgContent} />
    </>
  );
}
