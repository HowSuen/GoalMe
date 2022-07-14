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

const updateLevel = (
  current_xp,
  current_level,
  wealth_xp,
  wealth_lvl,
  goal
) => {
  const addXP = updateExperience(goal);
  const new_xp = current_xp + addXP;
  const new_wealth_xp = wealth_xp + addXP;
  const xp_threshold = Math.round(Math.pow(current_level / 0.05, 1.6));
  const wealth_xp_threshold = Math.round(Math.pow(wealth_lvl / 0.05, 1.6));
  const result = {
    xp: new_xp >= xp_threshold ? new_xp % xp_threshold : new_xp,
    lvl: new_xp >= xp_threshold ? current_level + 1 : current_level,
    wealth_xp:
      new_wealth_xp >= wealth_xp_threshold
        ? new_wealth_xp % wealth_xp_threshold
        : new_wealth_xp,
    wealth_lvl:
      new_wealth_xp >= wealth_xp_threshold ? wealth_lvl + 1 : wealth_lvl,
  };
  return result;
};

const test_goals = [
  {
    id: 0,
    type: "Finance",
    difficulty: "",
  },
  {
    id: 1,
    type: "Finance",
    difficulty: "Easy",
  },
  {
    id: 2,
    type: "Finance",
    difficulty: "Medium",
  },
  {
    id: 3,
    type: "Finance",
    difficulty: "Hard",
  },
];

// Test 1
test("completing a financial goal with no difficulty specified grants zero XP", () => {
  expect(updateExperience(test_goals[0])).toBe(0);
});

// Test 2
test("completing a financial goal with Easy difficulty specified grants 50 XP", () => {
  expect(updateExperience(test_goals[1])).toBe(50);
});

// Test 3
test("completing a financial goal with Medium difficulty specified grants 100 XP", () => {
  expect(updateExperience(test_goals[2])).toBe(100);
});

// Test 4
test("completing a financial goal with Hard difficulty specified grants 200 XP", () => {
  expect(updateExperience(test_goals[3])).toBe(200);
});

// Test 5
test("For a user at 50 xp and level 1 with 50 wealth xp at level 1 wealth, \ncompleting an financial goal with Easy difficulty will update user to be \n100 xp at level 1 with 100 wealth xp at level 1 wealth", () => {
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).lvl).toBe(1);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).wealth_xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).wealth_lvl).toBe(1);
});

// Test 6
test("For a user at 120 xp and level 1 with 120 wealth xp at level 1 wealth, \ncompleting an financial goal with Easy difficulty will update user to be \n49 xp at level 2 with 49 wealth xp at level 2 wealth", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).wealth_xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).wealth_lvl).toBe(2);
});

// Test 7
test("For a user at 10 xp and level 1 with 10 wealth xp at level 1 wealth, \ncompleting an financial goal with Medium difficulty will update user to be \n110 xp at level 1 with 110 wealth xp at level 1 wealth", () => {
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).lvl).toBe(1);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).wealth_xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).wealth_lvl).toBe(1);
});

// Test 8
test("For a user at 120 xp and level 1 with 10 wealth xp at level 1 wealth, \ncompleting an financial goal with Medium difficulty will update user to be \n99 xp at level 2 with 99 wealth xp at level 2 wealth", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).wealth_xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).wealth_lvl).toBe(2);
});

// Test 9
test("For a user at 50 xp and level 2 with 50 wealth xp at level 2 wealth, \ncompleting an financial goal with Hard difficulty will update user to be \n250 xp at level 2 with 250 wealth xp at level 2 wealth", () => {
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).lvl).toBe(2);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).wealth_xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).wealth_lvl).toBe(2);
});

// Test 10
test("For a user at 200 xp and level 2 with 200 wealth xp at level 2 wealth, \ncompleting an financial goal with Hard difficulty will update user to be \n34 xp at level 3 with 34 wealth xp at level 3 wealth", () => {
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).lvl).toBe(3);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).wealth_xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).wealth_lvl).toBe(3);
});
