export function hasCharacterImage(image: string | null | undefined): boolean {
  return typeof image === 'string' && image.trim().length > 0;
}
