interface Ellipse {
  height: number;
  width: number;
}

export function EllipsesIcon(): React.ReactElement {
  const ellipsesCount = 11;
  const targetWidth = 35;

  const minWidth = 1.11;
  const maxWidth = 3.16;
  const minHeight = 11.14;
  const maxHeight = 31.96;

  const ellipses: Ellipse[] = Array.from({ length: ellipsesCount }, (_, i) => {
    const t = i / (ellipsesCount - 1);
    const width = minWidth + (maxWidth - minWidth) * t;
    const height = minHeight + (maxHeight - minHeight) * t;
    return { height, width };
  });

  const totalWidth = ellipses.reduce((sum, e) => sum + e.width, 0);
  const gap = (targetWidth - totalWidth) / (ellipsesCount - 1);

  const xOffsets: number[] = [];
  let currentX = 0;

  ellipses.forEach((e) => {
    xOffsets.push(currentX);
    currentX += e.width + gap;
  });

  const containerHeight = maxHeight * 1.2;

  return (
    <div className="w-[76.35px] border-white border-4 shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] p-[15px] rounded-full">
      <div
        className="relative"
        style={{
          height: `${containerHeight}px`,
          width: `${targetWidth}px`,
          overflow: "hidden",
        }}
      >
        {ellipses.map((e, idx) => (
          <div
            key={idx}
            className="bg-black rounded-full absolute"
            style={{
              width: `${e.height}px`,
              height: `${e.height}px`,
              transform: `scaleX(${e.width / e.height})`,
              transformOrigin: "left center",
              left: `${xOffsets[idx]}px`,
              top: `${(containerHeight - e.height) / 2}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
