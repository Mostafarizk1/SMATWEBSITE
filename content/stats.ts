// PLACEHOLDER numbers (except countries). Labels live in messages under "numbers.items.<id>".
export type Stat = { id: "projects" | "clients" | "countries" | "years"; value: number; suffix: string };

export const stats: Stat[] = [
  { id: "projects", value: 150, suffix: "+" },
  { id: "clients", value: 60, suffix: "+" },
  { id: "countries", value: 4, suffix: "" },
  { id: "years", value: 8, suffix: "+" },
];
