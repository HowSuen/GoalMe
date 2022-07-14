const updateExperience = (exercise) => {
  let addXP =
    exercise.type == "run"
      ? Math.round(parseFloat(exercise.distance, 10) * 1000)
      : parseInt(exercise.volume, 10);
  addXP = addXP > 1000 ? 1000 : addXP;
  return addXP;
};

const updateLevel = (user, exercise) => {
  const addXP = updateExperience(exercise);
  let newTotalXp = user.totalXp + addXP;
  let newStrengthXp = user.strengthXp + addXP;
  let totalMax = Math.round(Math.pow(user.totalLvl / 0.05, 1.6));
  let strengthMax = Math.round(Math.pow(user.strengthLvl / 0.05, 1.6));

  let addLVL = 0;
  while (newTotalXp >= totalMax) {
    newTotalXp -= totalMax;
    addLVL += 1;
    totalMax = Math.round(Math.pow((user.totalLvl + addLVL) / 0.05, 1.6));
  }

  let addStrengthLVL = 0;
  while (newStrengthXp >= strengthMax) {
    newStrengthXp -= strengthMax;
    addStrengthLVL += 1;
    strengthMax = Math.round(
      Math.pow((user.strengthLvl + addStrengthLVL) / 0.05, 1.6)
    );
  }

  const result = {
    totalXP: newTotalXp,
    totalLVL: user.totalLvl + addLVL,
    strengthXP: newStrengthXp,
    strengthLVL: user.strengthLvl + addStrengthLVL,
  };
  return result;
};

const test_users = [
  {
    totalXp: 50,
    totalLvl: 2,
    wisdomXp: 50,
    wisdomLvl: 2,
    strengthXp: 50,
    strengthLvl: 2,
    wealthXp: 50,
    wealthLvl: 2,
  },
];

const test_exercises = [
  {
    type: "run",
    distance: "2.4",
  },
  {
    type: "run",
    distance: "0.65",
  },
  {
    type: "weight",
    volume: "500",
  },
  {
    type: "weight",
    volume: "1200",
  },
];

// Test 1
test("Completing a running exercise of 0.65 km grants 650 XP", () => {
  expect(updateExperience(test_exercises[1])).toBe(650);
});

// Test 2
test("Completing a running exercise of 2.4 km grants a maximum of 1000 XP", () => {
  expect(updateExperience(test_exercises[0])).toBe(1000);
});

// Test 3
test("Completing a weight exercise of 500 volume grants 500 XP", () => {
  expect(updateExperience(test_exercises[2])).toBe(500);
});

// Test 4
test("Completing a weight exercise of 500 volume grants a maximum of 1000 XP", () => {
  expect(updateExperience(test_exercises[3])).toBe(1000);
});

// Test 5
test("Completing an exercise grants a maximum of 1000 XP and 1000 Strength XP. \nFor a user initially with 50 XP at Level 2 with 50 Strength XP at Strength Level 2, \nthey will have 684 XP at Level 3 with 684 Strength XP at Strength Level 3", () => {
  expect(updateLevel(test_users[0], test_exercises[0]).totalXP).toBe(684);
  expect(updateLevel(test_users[0], test_exercises[0]).totalLVL).toBe(3);
  expect(updateLevel(test_users[0], test_exercises[0]).strengthXP).toBe(684);
  expect(updateLevel(test_users[0], test_exercises[0]).strengthLVL).toBe(3);
});
