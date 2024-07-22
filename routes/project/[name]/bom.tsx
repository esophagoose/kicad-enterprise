import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export default function BomPage(props: PageProps) {
  return (
    <iframe
      class="flex-grow"
      src={asset("/bom/ibom.html")}
      title="Interactive BOM for KiCAD"
    >
    </iframe>
  );
}
