interface Props {
  svg: any;
}

export default function SchView({ svg }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: svg }}
      class="w-full bg-zinc-900"
      onWheel={(e) => {
        const svgElement = e.currentTarget.querySelector("svg");
        if (!svgElement) {
          console.error("Can't find SVG in SchematicView!");
          return;
        } else {
          e.preventDefault();
          svgElement.setAttribute("width", "100%");
          const scale = e.deltaY < 0 ? 1.1 : 0.9;
          const viewBox = svgElement.getAttribute("viewBox")!;
          const [x, y, width, height] = viewBox.split(" ").map(Number);
          const newWidth = width * scale;
          const newHeight = height * scale;
          const newX = x - (newWidth - width) / 2;
          const newY = y - (newHeight - height) / 2;
          svgElement.setAttribute(
            "viewBox",
            `${newX} ${newY} ${newWidth} ${newHeight}`,
          );
        }
      }}
      onContextMenu={(e) => e.preventDefault()} // Prevent the context menu from appearing
      onMouseDown={(e) => {
        if (e.button !== 2) return; // Only allow dragging on right mouse click
        const svgElement = e.currentTarget.querySelector("svg")!;
        let isDragging = false;
        const startX = e.clientX;
        const startY = e.clientY;
        const initialViewBox = svgElement.getAttribute("viewBox")!;

        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!isDragging) return;
          const dx = moveEvent.clientX - startX;
          const dy = moveEvent.clientY - startY;
          const [x, y, width, height] = initialViewBox.split(" ").map(Number);
          svgElement.setAttribute(
            "viewBox",
            `${x - dx / 2} ${y - dy / 2} ${width} ${height}`,
          );
        };

        const onMouseUp = () => {
          isDragging = false;
          self.removeEventListener("mousemove", onMouseMove);
          self.removeEventListener("mouseup", onMouseUp);
        };

        isDragging = true;
        self.addEventListener("mousemove", onMouseMove);
        self.addEventListener("mouseup", onMouseUp);
      }}
    >
    </div>
  );
}
