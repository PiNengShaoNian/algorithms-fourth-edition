class DirectedEdge {
  constructor(private v: number, private w: number, private _weight: number) {}

  weight() {
    return this._weight
  }

  from() {
    return this.v
  }

  to() {
    return this.w
  }

  toString() {
    return `${this.from()}->${this.to()} weight: ${this.weight()}`
  }
}

export default DirectedEdge
