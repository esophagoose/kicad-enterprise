import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export default function SchematicPAge(props: PageProps) {
  return (
    <div class="flex-grow bg-neutral-900">
      <script src="https://kicanvas.org/kicanvas/kicanvas.js"></script>
      <kicanvas-embed src={asset("/sample.kicad_sch")} controls="full">
      </kicanvas-embed>
    </div>
  );
}
