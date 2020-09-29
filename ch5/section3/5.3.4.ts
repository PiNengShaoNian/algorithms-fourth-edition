const findBlankCharacters = (text: string, mSpaces: number): number => {
  const textLength = text.length
  let consecutiveBlanks: number
  let i: number

  for (
    i = 0, consecutiveBlanks = 0;
    i < textLength && consecutiveBlanks < mSpaces;
    i++
  ) {
    if (text[i] === ' ') consecutiveBlanks++
    else {
      consecutiveBlanks = 0
    }
  }

  if (consecutiveBlanks === mSpaces) return i - mSpaces
  else return textLength
}
