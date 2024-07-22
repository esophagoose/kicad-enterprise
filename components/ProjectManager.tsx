import { kv } from "../components/Database.tsx";

export let config = {};

export enum ProjectSource {
  Git = "git",
  Local = "local",
}

export default interface ProjectInfo {
  name: string;
  location: string;
  lastUpdated: Date;
  source: ProjectSource;
}




export async function update() {
  console.log("Starting ProjectManager update!");
  config = JSON.parse(Deno.readTextFileSync("./kicad_enterprise.json"));
  console.log("Config loaded:", config);

  for (const location of config.project_locations) {
    console.log(`Checking location: ${location}`);
    for (const file of Deno.readDirSync(location)) {
      if (file.name.endsWith(".kicad_pcb")) {
        console.log(`Found PCB file: ${file.name}`);
        const project: ProjectInfo = {
          name: file.name.split(".kicad")[0],
          location: location,
          lastUpdated: Deno.statSync(location).mtime ?? new Date(),
          source: ProjectSource.Local,
        };
        const result = await kv.set(["projects", project.name], project);
        console.log("Adding project: ", project, "success: ", result.ok);
      }
    }
  }
  console.log("ProjectManager update complete.");
}

update();
