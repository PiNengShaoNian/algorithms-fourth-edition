export default interface Comparable<E> {
  equals(that: E): boolean
  compareTo(that: E): number
}
