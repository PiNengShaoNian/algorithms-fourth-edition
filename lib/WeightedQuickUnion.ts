import UF from '../model/UF'

class WeightedQuickUnion implements UF {
  private id: number[]
  private size: number[]
  private _count: number
  constructor(size: number) {
    this.id = Array.from({ length: size }, (_, i) => i)
    this.size = Array.from({ length: size }, () => 1)
    this._count = size
  }
  count(): number {
    return this._count
  }

  find(site: number): number {
    while (site !== this.id[site]) site = this.id[site]
    return site
  }

  connected(site1: number, site2: number): boolean {
    return this.find(site1) === this.find(site2)
  }

  union(site1: number, site2: number): void {
    const parentId1 = this.find(site1)
    const parentId2 = this.find(site2)

    if (parentId1 === parentId2) return

    if (this.size[parentId1] < this.size[parentId2]) {
      this.id[parentId1] = parentId2
      this.size[parentId2] += this.size[parentId1]
    } else {
      this.id[parentId2] = parentId1
      this.size[parentId1] += this.size[parentId2]
    }

    --this._count
  }

  getSizes() {
    return this.size
  }
}

export default WeightedQuickUnion
