import { kv } from "../../components/Database.tsx";

export default async function ProjectPage(_req: Request, ctx: RouteContext) {
  const entry = await kv.get(["projects", decodeURI(ctx.params.name)]);

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
