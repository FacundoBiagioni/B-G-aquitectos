// Alternates rows of 2 wide cards with rows of 3 narrow cards on a 6-column grid,
// cycling by index so it keeps working after filtering the list.
const GROUP_PATTERN = [
  { size: 2, span: "lg:col-span-3" },
  { size: 3, span: "lg:col-span-2" },
];

const CYCLE_LENGTH = GROUP_PATTERN.reduce((sum, g) => sum + g.size, 0);

export function getMosaicSpanClass(index: number): string {
  let i = index % CYCLE_LENGTH;
  for (const group of GROUP_PATTERN) {
    if (i < group.size) return group.span;
    i -= group.size;
  }
  return GROUP_PATTERN[0].span;
}
