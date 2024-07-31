import { kv, SchematicInfo } from "../../../components/Database.tsx";
import SchView from "../../../islands/SchematicView.tsx";
import Layout from "../../../components/Layout.tsx";
import { PageProps } from "$fresh/server.ts";
import { Partial } from "$fresh/runtime.ts";
import { FreshContext, Handlers } from "$fresh/server.ts";

interface Project {
  name: string;
  schematics: Array<string>;
  svg: string;
}

export const handler: Handlers<Project> = {
  async GET(_req: Request, ctx: FreshContext) {
    console.log(ctx.params);
    const project: Project = { name: "", schematics: [], svg: "" };
    project.name = decodeURI(ctx.params.name);
    const result = kv.list({ prefix: ["schematics", project.name] });
    let schematic = null;
    for await (const sch of result) {
      schematic = sch.value as SchematicInfo;
      project.schematics.push(schematic.name.split(".kicad_sch")[0]);
      console.log(sch.value);
    }
    if (!schematic) {
      return ctx.renderNotFound();
    }

    project.svg = await Deno.readTextFile(schematic.svgPath);
    return ctx.render(project);
  },
};

function createSchematicLink(name: string) {
  return (
    <li class="hover:bg-gradient-to-r from-teal-700 to-cyan-700 p-4">
      <a href={"#"}>{name}</a>
    </li>
  );
}

export default function ProjectPage(props: PageProps<Project>) {
  const links = props.data.schematics.map((sch) => createSchematicLink(sch));

  return (
    <Layout title={props.data.name} navItems={links} f-client-nav>
      <Partial name="sch-view">
        <SchView svg={props.data.svg} />
      </Partial>
    </Layout>
  );
}
