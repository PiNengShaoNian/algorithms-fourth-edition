import Comparable from '../../model/Comparable'

class Edge implements Comparable<Edge> {
  constructor(private v: number, private w: number, private _weight: number) {}

  weight() {
    return this._weight
  }

  either() {
    return this.v
  }

  other(vertex: number): number {
    if (vertex === this.v) return this.w
    else if (vertex === this.w) return this.v
    else throw new Error('Inconsistent edge')
  }

  equals(that: Edge): boolean {
    return this._weight === that._weight
  }

  compareTo(that: Edge): number {
    return this._weight - that._weight
  }

  toString() {
    return `v: ${this.v}, w: ${this.w}, weight: ${this._weight}`
  }
}

export default Edge
