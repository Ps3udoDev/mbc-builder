export function idGenerator(typeSection: string): string {
  return `${typeSection}-${Math.floor(Math.random() * 10001)}`;
}
