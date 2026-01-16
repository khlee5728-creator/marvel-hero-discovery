import api from "./api"

const DIMENSION_TRAITS = {
  EI: ["E", "I"],
  SN: ["S", "N"],
  TF: ["T", "F"],
  PJ: ["J", "P"],
}

const TRAIT_SET = new Set(["E", "I", "S", "N", "T", "F", "J", "P"])

function extractTrait(value) {
  if (!value) return null
  const text = String(value).toUpperCase()
  const char = text.trim().slice(0, 1)
  return TRAIT_SET.has(char) ? char : null
}

function normalizeQuestion(raw, index) {
  const prompt =
    raw?.prompt || raw?.question || raw?.text || `Question ${index + 1}`
  const dimension = raw?.dimension || raw?.mbtiDimension || raw?.group
  const optionsRaw = raw?.options || raw?.choices || raw?.answers || []
  const defaultTraits = DIMENSION_TRAITS[dimension] || []
  const options = optionsRaw.slice(0, 2).map((option, optionIndex) => ({
    text: option?.text || option?.label || option?.value || "Choice",
    trait:
      extractTrait(option?.trait) ||
      extractTrait(option?.value) ||
      defaultTraits[optionIndex] ||
      null,
  }))

  return {
    id: raw?.id || `q${index + 1}`,
    dimension,
    prompt,
    options,
  }
}

export function normalizeQuestions(payload) {
  if (Array.isArray(payload)) return payload.map(normalizeQuestion)
  if (Array.isArray(payload?.questions)) {
    return payload.questions.map(normalizeQuestion)
  }
  if (Array.isArray(payload?.data)) {
    return payload.data.map(normalizeQuestion)
  }
  return []
}

export async function createQuestions() {
  const response = await api.post("/mbti/questions", {
    count: 12,
    groups: { E: 3, N: 3, F: 3, P: 3 },
    level: "elementary",
    theme: "marvel",
    prompt: [
      "You are a friendly teacher for elementary students.",
      "Create 12 MBTI questions set in the Marvel universe.",
      "Each question must have exactly 2 choices.",
      "Use simple, short English for kids.",
      "Return 3 questions per dimension: EI, SN, TF, PJ.",
      "Output JSON array with fields: id, dimension, prompt, options[].",
      "Each option must include: text, trait (E/I/S/N/T/F/J/P).",
    ].join(" "),
  })

  return normalizeQuestions(response.data)
}
