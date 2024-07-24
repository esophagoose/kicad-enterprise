import * as path from "jsr:@std/path";

const theme = {
  "#F5F4EF": "#18181b", // Background
  "#0000C2": "#67e8f9", // Text
  "#840000": "#93c5fd", // Component outline, page outline
  "#FFFFC2": "#172554",
  "#009600": "#a5f3fc", // Net wires
  "#006464": "#fcd34d", // Refdes and value
  "#840084": "#0ea5e9", // Component params
  "#A90000": "#d8b4fe", // Pin Index
  "#725600": "#e879f9", // Off-sheet, Ports
  "#0F0F0F": "#fbcfe8", // Net name
};

// /Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli sch export svg
const KICAD_CLI = "/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli";

export function convertSchematicToSvg(filename: string, filepath: string) {
  const project_name = filepath.substring(filepath.lastIndexOf("/") + 1);
  const output_folder = `${Deno.cwd()}/static/${project_name}`;
  const svgFilepath = `${output_folder}/${filename.split(".kicad_sch")[0]}.svg`;
  try {
    Deno.mkdirSync(output_folder);
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
      throw err;
    }
  }
  let command = new Deno.Command(KICAD_CLI, {
    args: [
      "sch",
      "export",
      "svg",
      `${path.join(filepath, filename)}`,
      "--output",
      output_folder,
    ],
  });
  const result = command.outputSync();
  return result.success, svgFilepath;
}
