class Selection {
  static sort(a) {
    for (let i = 0; i < a.length; i++) {
      let mV = a[i]
      let mI = i
      let t
      for (let j = i; j < a.length; j++) {
        if (a[j] < mV) {
          mV = a[j]
          mI = j
        }
      }
      t = a[i]
      a[i] = mV
      a[mI] = t
    }

    return a
  }
}

class Insertion {
  static sort(a) {
    let j
    let t
    for (let i = 1; i < a.length; i++) {
      j = i
      while (j) {
        if (a[j] >= a[j - 1]) {
          break
        } else {
          t = a[j - 1]
          a[j - 1] = a[j]
          a[j] = t
          --j
        }
      }
    }

    return a
  }
}

class Shell {
  static sort(a) {
    let N = a.length
    let h = 1
    let t
    const S = {}
    while (h < Math.floor(N / 3)) h = 3 * h + 1
    while (h >= 1) {
      for (let i = h; i < N; i++) {
        for (let j = i; j >= h && a[j] < a[j - h]; j -= h) {
          if (S[a[j]]) S[a[j]] += 1
          else S[a[j]] = 1
          t = a[j]
          a[j] = a[j - h]
          a[j - h] = t
        }
      }
      h = Math.floor(h / 3)
    }
    console.log(S)
    return a
  }
}

const time = (alg, a) => {
  const sT = Date.now()
  const algs = {
    Insertion: Insertion.sort,
    Selection: Selection.sort,
    Shell: Shell.sort,
  }

  algs[alg](a)
  return (Date.now() - sT) / 1000
}

const timeRandomInput = (alg, N, T) => {
  let total = 0
  let a = []
  for (let t = 0; t < T; t++) {
    for (let i = 0; i < N; i++) {
      a[i] = Math.random()
    }

    total += time(alg, a)
  }

  return total
}

// console.log(timeRandomInput('Selection', 10000, 20))
// console.log(timeRandomInput('Insertion', 10000, 20))
// console.log(timeRandomInput('Shell', 100000, 20))
arr = Array.from({ length: 1000000 }, (_, i) => i)
console.time('Insertion')
Insertion.sort(arr)
console.timeEnd('Insertion')

console.time('Selection')
Selection.sort(arr)
console.timeEnd('Selection')
