const Quick = require('./2.5.8.js')

class Job {
  constructor(name, time) {
    this.name = name
    this.time = time
  }

  compareTo(that) {
    return this.time - that.time
  }
}

const SPT = (a) => {
  const jobs = []
  for (let i = 0; i < a.length; i++) {
    const { name, time } = a[i]
    jobs.push(new Job(name, time))
  }

  return new Quick().sort(jobs)
}

module.exports = { Job, SPT }

// console.log(
//   SPT([
//     { name: 'a', time: 1 },
//     { name: 'b', time: 2 },
//     { name: 'c', time: 3 },
//   ])
// )
