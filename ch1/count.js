// const arr = require('fs')
//   .readFileSync(require('path').join(__dirname, '1Mints.txt'), {
//     encoding: 'utf8',
//   })
//   .split(/\n/)
//   .map((v) => +v)

const uniform = (a, b) => {
  return Math.floor(Math.random() * (b - a) + a)
}

const timeTrial = (N) => {
  const MAX = 1000000
  const a = []
  for (let i = 0; i < N; i++) {
    a[i] = uniform(-MAX, MAX)
  }

  console.time(N)
  count(a)
  console.timeEnd(N)
}

function count(a) {
  const N = a.length
  let cnt = 0

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        if (a[i] + a[j] + a[k] === 0) cnt++
      }
    }
  }

  return cnt
}

for (let N = 250; true; N += N) {
  timeTrial(N)
}
