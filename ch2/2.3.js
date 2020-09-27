class Shell {
  sort(a) {
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

// s = new Shell()
// console.log(s.sort([5, 4, 3, 2, 1]))

for (let N = 10; N < 100000; N *= 10) {
  require('./timeRandomInput')('Shell', N, 1)
}
