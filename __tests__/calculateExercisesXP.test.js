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

  const totalDist = user.totalRunDist + (parseFloat(exercise.distance) || 0);

  const result = {
    totalXP: newTotalXp,
    totalLVL: user.totalLvl + addLVL,
    strengthXP: newStrengthXp,
    strengthLVL: user.strengthLvl + addStrengthLVL,
    completed: user.completed + 1,
    completedFit: user.completedFit + 1,
    completedExercise: user.completedExercise + 1,
    maxRunDist: Math.max(user.maxRunDist, exercise.distance),
    totalRunDist: totalDist,
    maxWeightVol: Math.max(user.maxWeightVol, exercise.volume),
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
    completed: 419,
    completedFit: 123,
    completedExercise: 68,
    maxRunDist: "1.89",
    totalRunDist: 7.6,
    maxWeightVol: "1000",
  },
];

const test_exercises = [
  {
    type: "run",
    distance: "2.4",
    vol: "0",
  },
  {
    type: "run",
    distance: "0.65",
    vol: "0",
  },
  {
    type: "weight",
    volume: "500",
    distance: "0",
  },
  {
    type: "weight",
    volume: "1200",
    distance: "0",
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

// Test 6
test("Completing an exercise increases numbers of completed goals, fitness goals,\n and exercises by 1 each.", () => {
  expect(updateLevel(test_users[0], test_exercises[0]).completed).toBe(420);
  expect(updateLevel(test_users[0], test_exercises[0]).completedFit).toBe(124);
  expect(updateLevel(test_users[0], test_exercises[0]).completedExercise).toBe(
    69
  );
});

// Test 7
test("Completing a run with a distance of 2.4km beats the previous record for the \nlongest distance ran, which was 1.89km", () => {
  expect(updateLevel(test_users[0], test_exercises[0]).maxRunDist).toBe(2.4);
});

// Test 8
test("Completing a run with a distance of 0.65km does not replace the previous record \nfor the longest distance ran, which was 1.89km", () => {
  expect(updateLevel(test_users[0], test_exercises[1]).maxRunDist).toBe(1.89);
});

// Test 9
test("Completing a run with a distance of 2.4km adds to the total distance ran, which \nwas 7.6km, giving a new total of 10km", () => {
  expect(updateLevel(test_users[0], test_exercises[0]).totalRunDist).toBe(10);
});

// Test 10
test("Completing a weight exercise with a volume of 1200 beats the previous record \nfor the highest volume in one exercise, which was 1000", () => {
  expect(updateLevel(test_users[0], test_exercises[3]).maxWeightVol).toBe(1200);
});

// Test 11
test("Completing a weight exercise with a volume of 500 does not replace the previous \nrecord for the highest volume in one exercise, which was 1000", () => {
  expect(updateLevel(test_users[0], test_exercises[2]).maxWeightVol).toBe(1000);
});
