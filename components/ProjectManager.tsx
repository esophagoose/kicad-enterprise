export let config = {};
export const projects: Array<ProjectInfo> = [];

export enum ProjectSource {
    Git = "git",
    Local = "local"
}

export default interface ProjectInfo {
    name: string;
    lastUpdated: Date;
    source: ProjectSource
}

export function update() {
    console.log("Starting ProjectManager update!");
    config = JSON.parse(Deno.readTextFileSync("./kicad_enterprise.json"));
    console.log("Config loaded:", config);
    
    for (const location of config.project_locations) {
        console.log(`Checking location: ${location}`);
        for (const file of Deno.readDirSync(location)) {
            if (file.name.endsWith(".kicad_pcb")) {
                console.log(`Found PCB file: ${file.name}`);
                const project: ProjectInfo = {
                    name: file.name.split('.kicad')[0],
                    lastUpdated: Deno.statSync(location).mtime,
                    source: ProjectSource.Local
                }
                console.log("Adding project:", project);
                projects.push(project);
            }
        }
    }
    console.log("ProjectManager update complete.");
}

update();

