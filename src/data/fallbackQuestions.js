const fallbackQuestions = [
  {
    id: "q1",
    dimension: "EI",
    prompt: "You join the Avengers. What do you do first?",
    options: [
      { text: "Talk with the team and share ideas.", trait: "E" },
      { text: "Think alone and plan quietly.", trait: "I" },
    ],
  },
  {
    id: "q2",
    dimension: "EI",
    prompt: "You meet a new hero. How do you feel?",
    options: [
      { text: "Excited to chat right away.", trait: "E" },
      { text: "Happy but a little quiet.", trait: "I" },
    ],
  },
  {
    id: "q3",
    dimension: "EI",
    prompt: "The team is training. What do you like?",
    options: [
      { text: "Group games and cheering.", trait: "E" },
      { text: "Solo practice and focus.", trait: "I" },
    ],
  },
  {
    id: "q4",
    dimension: "SN",
    prompt: "You see a mysterious portal. What do you focus on?",
    options: [
      { text: "What it is right now and how to use it.", trait: "S" },
      { text: "Where it could lead in the future.", trait: "N" },
    ],
  },
  {
    id: "q5",
    dimension: "SN",
    prompt: "Iron Man shows a new suit. What do you notice?",
    options: [
      { text: "The tools and parts you can touch.", trait: "S" },
      { text: "The big ideas behind the design.", trait: "N" },
    ],
  },
  {
    id: "q6",
    dimension: "SN",
    prompt: "You explore Wakanda. What do you enjoy most?",
    options: [
      { text: "The cool places and sounds around you.", trait: "S" },
      { text: "The stories and future dreams.", trait: "N" },
    ],
  },
  {
    id: "q7",
    dimension: "FT",
    prompt: "A teammate makes a mistake. What do you do?",
    options: [
      { text: "Check how they feel and encourage them.", trait: "F" },
      { text: "Explain the best fix for next time.", trait: "T" },
    ],
  },
  {
    id: "q8",
    dimension: "FT",
    prompt: "Two friends disagree. What helps most?",
    options: [
      { text: "Listen to both feelings.", trait: "F" },
      { text: "Find the most fair solution.", trait: "T" },
    ],
  },
  {
    id: "q9",
    dimension: "FT",
    prompt: "You must choose a mission. What matters?",
    options: [
      { text: "Who needs help the most.", trait: "F" },
      { text: "Which mission is the smartest.", trait: "T" },
    ],
  },
  {
    id: "q10",
    dimension: "PJ",
    prompt: "A mission starts in one hour. What do you prefer?",
    options: [
      { text: "A clear plan and checklist.", trait: "J" },
      { text: "Stay flexible and adapt on the way.", trait: "P" },
    ],
  },
  {
    id: "q11",
    dimension: "PJ",
    prompt: "The team is traveling. What do you pack?",
    options: [
      { text: "Everything ready the night before.", trait: "J" },
      { text: "Pack quickly right before leaving.", trait: "P" },
    ],
  },
  {
    id: "q12",
    dimension: "PJ",
    prompt: "The plan changes suddenly. What do you do?",
    options: [
      { text: "Adjust the plan and keep it tidy.", trait: "J" },
      { text: "Go with the flow and improvise.", trait: "P" },
    ],
  },
]

export default fallbackQuestions
