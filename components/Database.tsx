import { convertSchematicToSvg } from "../backend/SchematicImport.tsx";

export const kv = await Deno.openKv();

export let user_config = JSON.parse(
  Deno.readTextFileSync("./kicad_enterprise.json"),
);

export enum ProjectSource {
  Git = "git",
  Local = "local",
}

interface FileInfo {
  name: string;
  path: string;
  lastModified: Date;
}

interface Schematic {
  name: string;
  path: string;
  lastModified: Date;
  svgPath: string;
}

export default interface ProjectInfo {
  name: string;
  path: string;
  lastModified: Date;
  source: ProjectSource;
}

async function parseKicadProject(location: string) {
  const name = location.substring(location.lastIndexOf("/") + 1);
  console.log(`Parsing Kicad project: ${name}`);
  const project: ProjectInfo = {
    name: name,
    path: location,
    lastModified: Deno.statSync(location).mtime ?? new Date(),
    source: ProjectSource.Local,
  };
  await kv.set(["projects", name], project);
  for (const file of Deno.readDirSync(location)) {
    if (!file.name.endsWith(".kicad_sch")) {
      continue;
    }
    const svgPath = convertSchematicToSvg(file.name, location);
    const schematic: Schematic = {
      name: file.name,
      path: location,
      lastModified: Deno.statSync(location).mtime ?? new Date(),
      svgPath: svgPath,
    };
    const result = await kv.set([
      "projects",
      project.name,
      "schematic",
      schematic.name,
    ], schematic);
    console.log("  Adding schematic: ", schematic, "success: ", result.ok);
  }
  return true;
}

export async function update() {
  console.log("Starting ProjectManager update!");
  console.log("Config loaded:", user_config);

  for (const location of user_config.project_locations) {
    let isKicadProject = false;
    console.log(`Checking location: ${location}`);
    for (const file of Deno.readDirSync(location)) {
      if (file.name.includes(".kicad_"))
        isKicadProject = true;
    }
    if (isKicadProject) {
      await parseKicadProject(location);
    }
  }
  console.log("ProjectManager update complete.");
}

update();
