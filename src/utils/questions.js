export function buildQuestionsSignature(questions) {
  if (!Array.isArray(questions)) return ""
  return questions
    .map((q) => {
      const prompt = q?.prompt || ""
      const options = (q?.options || [])
        .map((opt) => `${opt?.text || ""}:${opt?.trait || ""}`)
        .join("|")
      return `${prompt}::${options}`
    })
    .join("||")
}

export function shuffleArray(items) {
  const array = [...items]
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function shuffleQuestions(questions) {
  return shuffleArray(
    questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options || []),
    }))
  )
}
