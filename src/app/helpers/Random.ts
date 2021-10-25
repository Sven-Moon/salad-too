export function generateId(length: number): string {
  let id: string = (Math.random() * 1E8).toFixed(0).toString()
  while (id.length > length) {
    id = "0" + id
  }
  return id
}
