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
        svgElement.setAttribute("width", "100%");
        if (svgElement) {
          e.preventDefault();
          const scale = e.deltaY < 0 ? 1.1 : 0.9;
          const viewBox = svgElement.getAttribute("viewBox").split(" ").map(
            Number,
          );
          const [x, y, width, height] = viewBox;
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
        const svgElement = e.currentTarget.querySelector("svg");
        let isDragging = false;
        let startX = e.clientX;
        let startY = e.clientY;
        let initialViewBox = svgElement.getAttribute("viewBox").split(" ").map(
          Number,
        );

        const onMouseMove = (moveEvent) => {
          if (!isDragging) return;
          const dx = moveEvent.clientX - startX;
          const dy = moveEvent.clientY - startY;
          const [x, y, width, height] = initialViewBox;
          svgElement.setAttribute(
            "viewBox",
            `${x - dx / 2} ${y - dy / 2} ${width} ${height}`,
          );
        };

        const onMouseUp = () => {
          isDragging = false;
          window.removeEventListener("mousemove", onMouseMove);
          window.removeEventListener("mouseup", onMouseUp);
        };

        isDragging = true;
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }}
    >
    </div>
  );
}
