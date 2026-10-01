// PLACEHOLDER client logos. When real logos arrive, add `src: "/clients/<name>.svg"` and render with next/image.
export type Client = { id: string; name: string; shape: "circle" | "square" | "triangle" | "diamond" | "bars" | "ring" };

export const clients: Client[] = [
  { id: "c1", name: "CLIENT 01", shape: "circle" },
  { id: "c2", name: "CLIENT 02", shape: "square" },
  { id: "c3", name: "CLIENT 03", shape: "triangle" },
  { id: "c4", name: "CLIENT 04", shape: "diamond" },
  { id: "c5", name: "CLIENT 05", shape: "bars" },
  { id: "c6", name: "CLIENT 06", shape: "ring" },
  { id: "c7", name: "CLIENT 07", shape: "square" },
  { id: "c8", name: "CLIENT 08", shape: "circle" },
];
