const { Job, SPT } = require('./2.5.12.js')

class MinPQ {
  pq = []
  N = 0
  less(i, j) {
    return this.pq[i].compareTo(this.pq[j]) < 0
  }

  insert(v) {
    this.pq[++this.N] = v
    this.swim(this.N)
  }

  exch(i, j) {
    const t = this.pq[i]
    this.pq[i] = this.pq[j]
    this.pq[j] = t
  }

  deleteMin() {
    const min = this.pq[1]
    this.exch(1, this.N--)
    this.pq[this.N + 1] = null
    this.sink(1)

    return min
  }

  swim(k) {
    let i
    while (k > 1 && this.less(k, (i = Math.floor(k / 2)))) {
      this.exch(k, i)
      k = i
    }
  }

  sink(k) {
    while (2 * k < this.N) {
      let j = 2 * k
      if (j < this.N && this.less(j + 1, j)) j++

      if (!this.less(j, k)) break

      this.exch(k, j)
      k = j
    }
  }
}

class Core {
  jobs = []
  total = 0

  addJob(job) {
    this.jobs.push(job)
    this.total += job.time
  }

  compareTo(that) {
    return this.total - that.total
  }
}

const LB = (jobs, core) => {
  const minPQ = new MinPQ()
  for (let i = 0; i < core; i++) {
    minPQ.insert(new Core())
  }
  SPT(jobs)

  for (let i = 0; i < jobs.length; i++) {
    const core = minPQ.deleteMin()
    core.addJob(jobs[i])
    minPQ.insert(core)
  }

  console.log(minPQ)
}

LB(
  [
    { name: 'a', time: 3 },
    { name: 'b', time: 2 },
    { name: 'c', time: 1 },
    { name: 'd', time: 4 },
    { name: 'e', time: 3 },
    { name: 'f', time: 3 },
    { name: 'g', time: 1 },
    { name: 'h', time: 9 },
    { name: 'i', time: 10 },
  ].map(({ name, time }) => new Job(name, time)),
  4
)
