export const HOGWARTS_HOUSES = [
  'Gryffindor',
  'Slytherin',
  'Hufflepuff',
  'Ravenclaw',
] as const;

export type HogwartsHouse = (typeof HOGWARTS_HOUSES)[number];

export function houseAccentColor(house: string): string {
  switch (house) {
    case 'Gryffindor':
      return '#d32f2f';
    case 'Slytherin':
      return '#2e7d32';
    case 'Hufflepuff':
      return '#f9a825';
    case 'Ravenclaw':
      return '#1565c0';
    default:
      return '#bdbdbd';
  }
}
