export function buildQuestionsSignature(questions) {
  if (!Array.isArray(questions)) return "";
  return questions
    .map((q) => {
      const prompt = q?.prompt || "";
      const options = (q?.options || [])
        .map((opt) => `${opt?.text || ""}:${opt?.trait || ""}`)
        .join("|");
      return `${prompt}::${options}`;
    })
    .join("||");
}

export function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function shuffleQuestions(questions) {
  return shuffleArray(
    questions.map((question) => ({
      ...question,
      options: shuffleArray(question.options || []),
    })),
  );
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
  "Hulk",
  "Ms. Marvel",
  "Falcon",
  "Rocket",
];

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
];

const TOOLS = [
  "web-shooters",
  "shield",
  "jet pack",
  "hologram map",
  "energy gauntlet",
  "magic ring",
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickMany(list, count) {
  const pool = [...list];
  const result = [];
  while (pool.length && result.length < count) {
    const index = Math.floor(Math.random() * pool.length);
    result.push(pool.splice(index, 1)[0]);
  }
  return result;
}

function buildQuestion(
  id,
  dimension,
  prompt,
  optionA,
  optionB,
  traitA,
  traitB,
) {
  return {
    id,
    dimension,
    prompt,
    options: [
      { text: optionA, trait: traitA },
      { text: optionB, trait: traitB },
    ],
  };
}

function generateDimensionQuestions(dimension, traits, seedOffset = 0) {
  const [traitA, traitB] = traits;
  const heroes = pickMany(HEROES, 10);
  const locations = pickMany(LOCATIONS, 6);
  const tools = pickMany(TOOLS, 4);

  const templates = {
    EI: [
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[0]} invites you to lead a team task. What do you do?`,
          "Speak up and share ideas with everyone.",
          "Listen first and think before you talk.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `The team celebrates after a mission in ${locations[0]}.`,
          "Join the group and tell fun stories.",
          "Stay close to one friend and relax.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A new trainee joins. How do you help?`,
          "Welcome them and start a group game.",
          "Show them a quiet tip one-on-one.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `During training, you notice a problem.`,
          "Call the team and fix it together.",
          "Work on a solution by yourself first.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[1]} asks you to introduce yourself to a crowd at ${locations[1]}.`,
          "Walk up front and wave to everyone.",
          "Stay in the back and nod quietly.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `The Avengers are hosting a big dinner. What's your style?`,
          "Sit in the middle and chat with many people.",
          "Find a cozy corner with one close friend.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[2]} is planning a surprise party at ${locations[2]}.`,
          "Help organize and invite lots of people.",
          "Prepare a small, thoughtful gift quietly.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You have free time after a mission. What do you do?`,
          "Find teammates and play a group game.",
          "Go to a quiet spot and recharge alone.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A big meeting is happening at ${locations[3]}. How do you join?`,
          "Jump in and share your opinion right away.",
          "Observe and take notes before speaking.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[3]} needs volunteers to present a new idea.`,
          "Raise your hand and present to the group.",
          "Write your thoughts down and pass them along.",
          traitA, traitB),
    ],
    SN: [
      (id) =>
        buildQuestion(id, dimension,
          `You see a new ${tools[0]} in ${locations[0]}. What grabs you?`,
          "How it works right now.",
          "What it could be used for later.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A strange signal appears on the map.`,
          "Check the exact spot and details.",
          "Guess the big story behind it.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You read a mission report.`,
          "Remember clear facts and numbers.",
          "Notice patterns and hidden meaning.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[0]} shows you a new suit.`,
          "Look at the materials and parts.",
          "Imagine future upgrades and ideas.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You find a mysterious door in ${locations[1]}. What do you focus on?`,
          "The lock, the handle, and how it opens.",
          "Where it might lead and what's behind it.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[1]} gives you a coded message.`,
          "Read each word carefully to understand the facts.",
          "Look for a hidden clue or secret meaning.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You visit a new planet. What do you notice first?`,
          "The ground, the air, and the colors around you.",
          "What kind of civilization might live here.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A ${tools[1]} is broken. How do you figure it out?`,
          "Check each part one by one until you find the problem.",
          "Think about what might have gone wrong overall.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[2]} shows you a map of an unknown area.`,
          "Study the roads, rivers, and landmarks.",
          "Wonder what adventures await out there.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You spot something glowing in ${locations[2]}.`,
          "Walk up close and examine it carefully.",
          "Think about what magical power it might have.",
          traitA, traitB),
    ],
    TF: [
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[0]} is sad after a mistake. What do you say?`,
          "I care about how you feel.",
          "Let's fix it step by step.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `Two teammates disagree about a plan.`,
          "Choose what is kind for both.",
          "Choose what is most reasonable.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You must pick one mission to save time.`,
          "Pick the one that helps people most.",
          "Pick the one with the best strategy.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A rule seems unfair to a friend.`,
          "Adjust it to protect feelings.",
          "Keep it to stay fair for all.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[1]} accidentally breaks ${heroes[2]}'s ${tools[0]}. What should happen?`,
          "Apologize sincerely and make them feel better.",
          "Figure out the fairest way to fix or replace it.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A team member feels left out during a mission at ${locations[0]}.`,
          "Go talk to them and include them right away.",
          "Assign them a clear role so everyone contributes equally.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You win a prize but your friend also wanted it.`,
          "Share the prize or let your friend have a turn.",
          "Keep it — you earned it fair and square.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[3]} wants to take a risky shortcut during a rescue.`,
          "Worry about whether everyone will be safe.",
          "Calculate if the shortcut actually saves time.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `A younger hero makes an error on a test.`,
          "Encourage them and say they'll do better next time.",
          "Show them exactly what went wrong so they can learn.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `The team must choose who gets the last ${tools[1]}.`,
          "Give it to whoever needs it most emotionally.",
          "Give it to whoever will use it most effectively.",
          traitA, traitB),
    ],
    PJ: [
      (id) =>
        buildQuestion(id, dimension,
          `The mission starts in 20 minutes.`,
          "Make a schedule and follow it.",
          "Stay open and change as needed.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You pack for a surprise trip.`,
          "Pack early with a list.",
          "Pack quickly right before leaving.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You discover a new path to the goal.`,
          "Stick to the plan and stay on track.",
          "Try the new path and explore.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `The plan changes mid-mission.`,
          "Rebuild the plan with clear steps.",
          "Go with the flow and improvise.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[0]} says there are two ways to reach ${locations[0]}.`,
          "Pick the planned route with a clear map.",
          "Pick the unknown route — it could be faster!",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You're building a project at ${locations[1]}. How do you start?`,
          "Draw a blueprint and gather materials first.",
          "Start building and figure things out as you go.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[1]} invites you on a last-minute adventure.`,
          "Check your schedule to see if you can go.",
          "Say yes right away — sounds exciting!",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `You have a big test and a fun event on the same day.`,
          "Study first, then enjoy the event if there's time.",
          "Go to the event and study later tonight.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `The team needs to deliver a ${tools[0]} by tomorrow.`,
          "Create a step-by-step timeline for everyone.",
          "Start working and adjust the plan as things happen.",
          traitA, traitB),
      (id) =>
        buildQuestion(id, dimension,
          `${heroes[2]} suggests changing the strategy halfway through.`,
          "Finish the current plan first, then discuss changes.",
          "Adapt right away — the new idea might be better!",
          traitA, traitB),
    ],
  };

  const pickCount = 4;
  const pickedTemplates = pickMany(templates[dimension] || [], pickCount);

  return pickedTemplates.map((template, index) => {
    const id = `${dimension.toLowerCase()}-${seedOffset}-${index}`;
    return template(id);
  });
}

export function generateLocalQuestions() {
  const seed = Date.now();
  const dimensions = [
    { code: "EI", traits: ["E", "I"] },
    { code: "SN", traits: ["S", "N"] },
    { code: "TF", traits: ["T", "F"] },
    { code: "PJ", traits: ["J", "P"] },
  ];

  const questions = dimensions.flatMap((dimension, idx) =>
    generateDimensionQuestions(dimension.code, dimension.traits, seed + idx),
  );

  return shuffleQuestions(questions);
}
