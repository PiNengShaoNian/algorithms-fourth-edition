const HashSet = require('../lib/HashSet')

class MathSet extends HashSet {
  constructor(universe) {
    super()
    this.universeArray = universe
    this.universe = new HashSet()

    for (const key of universe) {
      this.universe.add(key)
    }
  }

  add(key) {
    if (!this.universe.contains(key)) {
      throw new Error('Key ' + key + 'does not belong to the universe')
    }

    super.add(key)
  }
}
