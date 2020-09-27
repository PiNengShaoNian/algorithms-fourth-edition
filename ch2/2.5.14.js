const Quick = require('./2.5.8.js')

class Domain {
  constructor(domain) {
    this.domain = domain
  }

  compareTo(that) {
    const a = this.domain.split('.').reverse()
    const b = that.domain.split('.').reverse()

    const len = Math.min(a.length, b.length)

    for (let i = 0; i < len; i++) {
      if (this.compareString(a[i], b[i]) > 0) return 1
      else if (this.compareString(a[i], b[i]) < 0) return -1
    }

    return a.length - b.length
  }

  compareString(a, b) {
    const min = Math.min(a.length, b.length)

    for (let i = 0; i < min; i++) {
      if (a[i] > b[i]) return 1
      else if (a[i] < b[i]) return -1
    }

    return a.length - b.length
  }
}

const domains = [
  'a.com',
  'd.edu',
  'b.com',
  'a.cn',
  'c.cn',
  'd.top',
  'xx.b.top',
].map((v) => new Domain(v))
new Quick().sort(domains)
