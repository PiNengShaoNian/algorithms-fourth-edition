const RedBlackTopDown234Trees = require('../lib/BlackRedTree')

function Interval(index, start, end) {
  this.index = index
  this.start = start
  this.end = end
}

class NonOverlappingIntervalFinder {
  constructor(intervals) {
    this.redBlackBST = new RedBlackTopDown234Trees()

    for (const interval of intervals) {
      this.redBlackBST.put(interval.start, interval)
    }
  }

  findInterval(query) {
    const key = this.redBlackBST.floor(query)
    const possibleInterval = this.redBlackBST.get(key)

    if (
      possibleInterval &&
      possibleInterval.start <= query &&
      possibleInterval.end >= query
    ) {
      return possibleInterval.index
    }
    return -1
  }
}

const intervals = []

intervals.push(new Interval(1, 1643, 2033))
intervals.push(new Interval(2, 5532, 7643))
intervals.push(new Interval(3, 8999, 10332))
intervals.push(new Interval(4, 5666653, 5669321))

const nonOverlappingIntervalFinder = new NonOverlappingIntervalFinder(intervals)

console.log(nonOverlappingIntervalFinder.findInterval(9122))
console.log(nonOverlappingIntervalFinder.findInterval(8122))

