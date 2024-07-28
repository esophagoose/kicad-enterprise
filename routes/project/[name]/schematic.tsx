import { JSX } from "preact/jsx-runtime";
import { kv, SchematicInfo } from "../../../components/Database.tsx";
import SchView from "../../../islands/SchematicView.tsx";
import Layout from "../../../components/Layout.tsx";

function createSchematicLink(name: string) {
  return (
    <li class="hover:bg-sky-800 p-4">
      <a href={"#"}>{name.split(".kicad_sch")[0]}</a>
    </li>
  );
}
export default async function ProjectPage(_req: Request, ctx: RouteContext) {
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
    <Layout title={decodeURI(ctx.params.name)} navItems={schNavList}>
      <SchView svg={svgContent} />
    </Layout>
  );
}
