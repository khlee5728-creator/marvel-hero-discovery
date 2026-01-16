const DIMENSION_PAIRS = [
  ["E", "I"],
  ["S", "N"],
  ["T", "F"],
  ["J", "P"],
]

export function calculateMbti(answers) {
  const counts = answers.reduce((acc, answer) => {
    if (answer?.trait) {
      acc[answer.trait] = (acc[answer.trait] || 0) + 1
    }
    return acc
  }, {})

  return DIMENSION_PAIRS.map(([left, right]) => {
    const leftScore = counts[left] || 0
    const rightScore = counts[right] || 0
    if (leftScore === rightScore) {
      return left
    }
    return leftScore > rightScore ? left : right
  }).join("")
}
