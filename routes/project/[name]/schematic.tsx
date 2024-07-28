import { kv } from "../../../components/Database.tsx";
import SchView from "../../../islands/SchematicView.tsx";
import Layout from "../../../components/Layout.tsx";
import { PageProps } from "$fresh/server.ts";

interface Project {
  name: string;
  schematics: Array<string>;
  svg: string;
}

export const handler: Handlers<Project> = {
  async GET(_req: Request, ctx: RouteContext) {
    const project: Project = {name: "", schematics: [], svg: ""};
    project.name = decodeURI(ctx.params.name);
    const result = kv.list({prefix: ["schematics", project.name]});
    let schematic = null;
    for await (const sch of result) {
      schematic = sch.value;
      project.schematics.push(sch.value.name.split(".kicad_sch")[0]);
      console.log(sch.value);
    }
    if (project.schematics.length == 0) {
      return ctx.renderNotFound();
    }

    project.svg = await Deno.readTextFile(schematic.svgPath);
    return ctx.render(project);
  },
};


function createSchematicLink(name: string) {
  return (
    <li class="hover:bg-sky-800 p-4">
      <a href={"#"}>{name}</a>
    </li>
  );
}

export default function ProjectPage(props: PageProps<Project>) {
  const links = props.data.schematics.map((sch) => createSchematicLink(sch));
  return (
    <Layout title={props.data.name} navItems={links}>
      <SchView svg={props.data.svg} />
    </Layout>
  );
}
