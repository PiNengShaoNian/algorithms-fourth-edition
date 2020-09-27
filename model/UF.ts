export default interface UF {
  count(): number
  find(site: number): number
  connected(site1: number, site2: number): boolean
  union(site1: number, site2: number): void
}
