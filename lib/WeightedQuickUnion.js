class WeightedQuickUnion {
  id = []
  size = []
  _count = 0

  constructor(size) {
    this._count = size

    this.id = Array.from({ length: size }, (_, i) => i)
    this.size = Array.from({ length: size }, () => 1)
  }

  count() {
    return this._count
  }

  connected(site1, site2) {
    return this.find(site1) === this.find(site2)
  }

  find(site) {
    while (site != this.id[site]) {
      site = this.id[site]
    }

    return site
  }

  union(site1, site2) {
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

    this._count--
  }

  getSizes() {
    return this.size
  }
}

module.exports = WeightedQuickUnion
