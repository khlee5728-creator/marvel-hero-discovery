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

const HEROES = [
  "Spider-Man",
  "Iron Man",
  "Captain America",
  "Black Panther",
  "Captain Marvel",
  "Shuri",
  "Ant-Man",
  "Wanda",
  "Doctor Strange",
  "Star-Lord",
  "Groot",
  "Hawkeye",
  "Ms. Marvel",
  "Falcon",
  "Rocket",
]

const LOCATIONS = [
  "Avengers Tower",
  "Wakanda",
  "Stark Lab",
  "Asgard",
  "New York",
  "Guardians ship",
  "Training room",
  "Sky base",
  "Museum",
  "City park",
]

const TOOLS = [
  "web-shooters",
  "shield",
  "jet pack",
  "hologram map",
  "energy gauntlet",
  "magic ring",
]

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function pickMany(list, count) {
  const pool = [...list]
  const result = []
  while (pool.length && result.length < count) {
    const index = Math.floor(Math.random() * pool.length)
    result.push(pool.splice(index, 1)[0])
  }
  return result
}

function buildQuestion(id, dimension, prompt, optionA, optionB, traitA, traitB) {
  return {
    id,
    dimension,
    prompt,
    options: [
      { text: optionA, trait: traitA },
      { text: optionB, trait: traitB },
    ],
  }
}

function generateDimensionQuestions(dimension, traits, seedOffset = 0) {
  const [traitA, traitB] = traits
  const hero = pickRandom(HEROES)
  const location = pickRandom(LOCATIONS)
  const tool = pickRandom(TOOLS)

  const templates = {
    EI: [
      (id) =>
        buildQuestion(
          id,
          dimension,
          `${hero} invites you to lead a team task. What do you do?`,
          "Speak up and share ideas with everyone.",
          "Listen first and think before you talk.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `The team celebrates after a mission in ${location}.`,
          "Join the group and tell fun stories.",
          "Stay close to one friend and relax.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `A new trainee joins. How do you help?`,
          "Welcome them and start a group game.",
          "Show them a quiet tip one-on-one.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `During training, you notice a problem.`,
          "Call the team and fix it together.",
          "Work on a solution by yourself first.",
          traitA,
          traitB
        ),
    ],
    SN: [
      (id) =>
        buildQuestion(
          id,
          dimension,
          `You see a new ${tool} in ${location}. What grabs you?`,
          "How it works right now.",
          "What it could be used for later.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `A strange signal appears on the map.`,
          "Check the exact spot and details.",
          "Guess the big story behind it.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `You read a mission report.`,
          "Remember clear facts and numbers.",
          "Notice patterns and hidden meaning.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `Shuri shows you a new suit.`,
          "Look at the materials and parts.",
          "Imagine future upgrades and ideas.",
          traitA,
          traitB
        ),
    ],
    TF: [
      (id) =>
        buildQuestion(
          id,
          dimension,
          `${hero} is sad after a mistake. What do you say?`,
          "I care about how you feel.",
          "Let’s fix it step by step.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `Two teammates disagree about a plan.`,
          "Choose what is kind for both.",
          "Choose what is most reasonable.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `You must pick one mission to save time.`,
          "Pick the one that helps people most.",
          "Pick the one with the best strategy.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `A rule seems unfair to a friend.`,
          "Adjust it to protect feelings.",
          "Keep it to stay fair for all.",
          traitA,
          traitB
        ),
    ],
    PJ: [
      (id) =>
        buildQuestion(
          id,
          dimension,
          `The mission starts in 20 minutes.`,
          "Make a schedule and follow it.",
          "Stay open and change as needed.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `You pack for a surprise trip.`,
          "Pack early with a list.",
          "Pack quickly right before leaving.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `You discover a new path to the goal.`,
          "Stick to the plan and stay on track.",
          "Try the new path and explore.",
          traitA,
          traitB
        ),
      (id) =>
        buildQuestion(
          id,
          dimension,
          `The plan changes mid-mission.`,
          "Rebuild the plan with clear steps.",
          "Go with the flow and improvise.",
          traitA,
          traitB
        ),
    ],
  }

  const pickCount = 4
  const pickedTemplates = pickMany(templates[dimension] || [], pickCount)

  return pickedTemplates.map((template, index) => {
    const id = `${dimension.toLowerCase()}-${seedOffset}-${index}`
    return template(id)
  })
}

export function generateLocalQuestions() {
  const seed = Date.now()
  const dimensions = [
    { code: "EI", traits: ["E", "I"] },
    { code: "SN", traits: ["S", "N"] },
    { code: "TF", traits: ["T", "F"] },
    { code: "PJ", traits: ["J", "P"] },
  ]

  const questions = dimensions.flatMap((dimension, idx) =>
    generateDimensionQuestions(dimension.code, dimension.traits, seed + idx)
  )

  return shuffleQuestions(questions)
}
