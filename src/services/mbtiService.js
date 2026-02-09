import api from "./api"
import { generateLocalQuestions } from "../utils/questions"

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
    raw?.p || raw?.prompt || raw?.question || raw?.text || `Question ${index + 1}`
  const dimension =
    raw?.d || raw?.dimension || raw?.mbtiDimension || raw?.group
  const optionsRaw =
    raw?.o || raw?.options || raw?.choices || raw?.answers || []
  const defaultTraits = DIMENSION_TRAITS[dimension] || []
  const options = optionsRaw.slice(0, 2).map((option, optionIndex) => ({
    text: option?.t || option?.text || option?.label || option?.value || "Choice",
    trait:
      extractTrait(option?.r) ||
      extractTrait(option?.trait) ||
      extractTrait(option?.value) ||
      defaultTraits[optionIndex] ||
      null,
  }))

  return {
    id: raw?.i || raw?.id || `q${index + 1}`,
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

function extractJsonFromContent(content) {
  if (!content) return null
  const trimmed = content.trim()
  if (trimmed.startsWith("```")) {
    const jsonBlock = trimmed
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim()
    return jsonBlock
  }
  return trimmed
}

const SCENARIO_THEMES = [
  "space rescue mission",
  "time-travel adventure",
  "underwater Atlantis exploration",
  "villain ambush at school",
  "building a secret headquarters",
  "cooking competition for heroes",
  "alien diplomacy meeting",
  "training new sidekicks",
  "museum heist prevention",
  "multiverse portal discovery",
  "hero talent show",
  "stranded on a mysterious planet",
  "protecting a magical artifact",
  "superhero sports day",
  "solving a mystery in Wakanda",
  "defending a city festival",
  "exploring an ancient temple",
  "rescuing animals from danger",
  "designing a new super suit",
  "surviving a storm on Asgard",
]

function shortenAvoidList(avoidList) {
  return avoidList
    .map((key) => {
      const prompt = key.split("::")[0] || ""
      return prompt.slice(0, 40)
    })
    .filter(Boolean)
    .slice(0, 16)
}

export async function createQuestions({ requestId, avoidList = [] } = {}) {
  if (!api.defaults.baseURL) {
    return generateLocalQuestions()
  }

  const theme =
    SCENARIO_THEMES[Math.floor(Math.random() * SCENARIO_THEMES.length)]
  const shortAvoid = shortenAvoidList(avoidList)

  const prompt = [
    `Create 16 Marvel MBTI questions for kids. Theme: "${theme}".`,
    "4 each for EI, SN, TF, PJ. 2 short options per question.",
    'JSON array with short keys: {i, d, p, o:[{t, r}]}. i=id, d=dimension, p=prompt, o=options, t=text, r=trait.',
    "Each question: unique situation, different heroes, vivid details.",
    shortAvoid.length
      ? `Avoid these topics: ${shortAvoid.join("; ")}.`
      : "",
    "JSON only.",
  ]
    .filter(Boolean)
    .join(" ")

  let response
  try {
    response = await api.post("/chat/completions", {
      model: "gpt-4o-mini",
      temperature: 0.95,
      max_tokens: 1200,
      messages: [
        {
          role: "system",
          content:
            "Creative MBTI quiz designer for kids in the Marvel universe. Every session must feel completely new.",
        },
        { role: "user", content: prompt },
      ],
    })
  } catch (error) {
    return []
  }

  const content = response?.data?.choices?.[0]?.message?.content
  const jsonText = extractJsonFromContent(content)
  try {
    const parsed = jsonText ? JSON.parse(jsonText) : null
    return normalizeQuestions(parsed)
  } catch {
    return []
  }
}
