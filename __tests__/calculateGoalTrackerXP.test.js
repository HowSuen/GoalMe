const updateExperience = (goal) => {
  let addXP = 0;
  if (goal.difficulty == "Hard") {
    addXP = 200;
  } else if (goal.difficulty == "Medium") {
    addXP = 100;
  } else if (goal.difficulty == "Easy") {
    addXP = 50;
  }
  return addXP;
};

const updateLevel = (user, goal) => {
  const addXP = updateExperience(goal);
  const newTotalXp = user.totalXp + addXP;

  let newWisdomXp = user.wisdomXp;
  let newStrengthXp = user.strengthXp;
  let newWealthXp = user.wealthXp;

  if (goal.type == "Academic") {
    newWisdomXp += addXP;
  } else if (goal.type == "Fitness") {
    newStrengthXp += addXP;
  } else if (goal.type == "Finance") {
    newWealthXp += addXP;
  }

  const totalMax = Math.round(Math.pow(user.totalLvl / 0.05, 1.6));
  const wisdomMax = Math.round(Math.pow(user.wisdomLvl / 0.05, 1.6));
  const strengthMax = Math.round(Math.pow(user.strengthLvl / 0.05, 1.6));
  const wealthMax = Math.round(Math.pow(user.wealthLvl / 0.05, 1.6));

  const result = {
    totalXP: newTotalXp >= totalMax ? newTotalXp % totalMax : newTotalXp,
    totalLVL: newTotalXp >= totalMax ? user.totalLvl + 1 : user.totalLvl,
    wisdomXP: newWisdomXp >= wisdomMax ? newWisdomXp % wisdomMax : newWisdomXp,
    wisdomLVL: newWisdomXp >= wisdomMax ? user.wisdomLvl + 1 : user.wisdomLvl,
    strengthXP:
      newStrengthXp >= strengthMax
        ? newStrengthXp % strengthMax
        : newStrengthXp,
    strengthLVL:
      newStrengthXp >= strengthMax ? user.strengthLvl + 1 : user.strengthLvl,
    wealthXP: newWealthXp >= wealthMax ? newWealthXp % wealthMax : newWealthXp,
    wealthLVL: newWealthXp >= wealthMax ? user.wealthLvl + 1 : user.wealthLvl,
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
  {
    totalXp: 200,
    totalLvl: 2,
    wisdomXp: 200,
    wisdomLvl: 2,
    strengthXp: 200,
    strengthLvl: 2,
    wealthXp: 200,
    wealthLvl: 2,
  },
];

const test_goals = [
  {
    id: 0,
    type: "General",
    difficulty: "Hard",
  },
  {
    id: 1,
    type: "Academic",
    difficulty: "Hard",
  },
  {
    id: 2,
    type: "Fitness",
    difficulty: "Hard",
  },
  {
    id: 3,
    type: "Finance",
    difficulty: "Hard",
  },
];

// Test 1
test("For a user at 50 xp and level 2, completing a general goal with Hard \ndifficulty will update user to be 250 xp at level 2", () => {
  expect(updateLevel(test_users[0], test_goals[0]).totalXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[0]).totalLVL).toBe(2);
});

// Test 2
test("For a user at 200 xp and level 2, completing a general goal with Hard \ndifficulty will update user to be 34 xp at level 3", () => {
  expect(updateLevel(test_users[1], test_goals[0]).totalXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[0]).totalLVL).toBe(3);
});

// Test 3
test("For a user at 50 xp and level 2 with 50 wisdom xp at level 2 wisdom, \ncompleting an academic goal with Hard difficulty will update user to be \n250 xp at level 2 with 250 wisdom xp at level 2 wisdom", () => {
  expect(updateLevel(test_users[0], test_goals[0]).totalXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[0]).totalLVL).toBe(2);
  expect(updateLevel(test_users[0], test_goals[1]).wisdomXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[1]).wisdomLVL).toBe(2);
});

// Test 4
test("For a user at 200 xp and level 2 with 200 wisdom xp at level 2 wisdom, \ncompleting an academic goal with Hard difficulty will update user to be \n34 xp at level 3 with 34 wisdom xp at level 3 wisdom", () => {
  expect(updateLevel(test_users[1], test_goals[0]).totalXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[0]).totalLVL).toBe(3);
  expect(updateLevel(test_users[1], test_goals[1]).wisdomXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[1]).wisdomLVL).toBe(3);
});

// Test 5
test("For a user at 50 xp and level 2 with 50 strength xp at level 2 strength, \ncompleting a fitness goal with Hard difficulty will update user to be \n250 xp at level 2 with 250 strength xp at level 2 strength", () => {
  expect(updateLevel(test_users[0], test_goals[0]).totalXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[0]).totalLVL).toBe(2);
  expect(updateLevel(test_users[0], test_goals[2]).strengthXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[2]).strengthLVL).toBe(2);
});

// Test 6
test("For a user at 200 xp and level 2 with 200 strength xp at level 2 strength, \ncompleting a fitness goal with Hard difficulty will update user to be \n34 xp at level 3 with 34 strength xp at level 3 strength", () => {
  expect(updateLevel(test_users[1], test_goals[0]).totalXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[0]).totalLVL).toBe(3);
  expect(updateLevel(test_users[1], test_goals[2]).strengthXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[2]).strengthLVL).toBe(3);
});

// Test 5
test("For a user at 50 xp and level 2 with 50 wealth xp at level 2 wealth, \ncompleting a financial goal with Hard difficulty will update user to be \n250 xp at level 2 with 250 wealth xp at level 2 wealth", () => {
  expect(updateLevel(test_users[0], test_goals[0]).totalXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[0]).totalLVL).toBe(2);
  expect(updateLevel(test_users[0], test_goals[3]).wealthXP).toBe(250);
  expect(updateLevel(test_users[0], test_goals[3]).wealthLVL).toBe(2);
});

// Test 6
test("For a user at 200 xp and level 2 with 200 wealth xp at level 2 wealth, \ncompleting a financial goal with Hard difficulty will update user to be \n34 xp at level 3 with 34 wealth xp at level 3 wealth", () => {
  expect(updateLevel(test_users[1], test_goals[0]).totalXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[0]).totalLVL).toBe(3);
  expect(updateLevel(test_users[1], test_goals[3]).wealthXP).toBe(34);
  expect(updateLevel(test_users[1], test_goals[3]).wealthLVL).toBe(3);
});
