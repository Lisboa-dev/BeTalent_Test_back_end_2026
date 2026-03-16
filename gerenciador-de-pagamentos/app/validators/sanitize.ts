export default  function sanitizeDTO<T extends Record<string, any>>(dto: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(dto).filter(([_, value]) => value !== null && value !== undefined)
  ) as Partial<T>
}