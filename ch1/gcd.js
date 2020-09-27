function gcd(p, q) {
  if (q === 0) return p
  const r = p % q
  return gcd(q, r)
}

console.log(gcd(10, 7))
