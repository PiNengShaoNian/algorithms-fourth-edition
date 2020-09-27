const guessKey = (N, key) => {
  let guess1 = 1
  let guess2 = N
  let guessResult

  while (true) {
    guessResult = guessTwoNumber(guess1, guess2, key)

    console.log({
      guess1,
      guess2,
    })
    if (guessResult === 1) return guess1
    else if (guessResult === 2) return guess2
    else if (guessResult === 3) guess1 = (guess1 + guess2) / 2
    else guess2 = (guess1 + guess2) / 2
  }
}

const guessTwoNumber = (guess1, guess2, key) => {
  if (guess1 === key) return 1
  else if (guess2 === key) return 2
  else if (Math.abs(guess1 - key) > Math.abs(guess2 - key)) {
    return 3
  } else return 4
}

guessKey(10000, 93)
