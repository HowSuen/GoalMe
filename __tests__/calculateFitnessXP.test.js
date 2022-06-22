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
  strength_xp,
  strength_lvl,
  goal
) => {
  const addXP = updateExperience(goal);
  const new_xp = current_xp + addXP;
  const new_strength_xp = strength_xp + addXP;
  const xp_threshold = Math.round(Math.pow(current_level / 0.05, 1.6));
  const strength_xp_threshold = Math.round(Math.pow(strength_lvl / 0.05, 1.6));
  const result = {
    xp: new_xp >= xp_threshold ? new_xp % xp_threshold : new_xp,
    lvl: new_xp >= xp_threshold ? current_level + 1 : current_level,
    strength_xp:
      new_strength_xp >= strength_xp_threshold
        ? new_strength_xp % strength_xp_threshold
        : new_strength_xp,
    strength_lvl:
      new_strength_xp >= strength_xp_threshold
        ? strength_lvl + 1
        : strength_lvl,
  };
  return result;
};

const test_goals = [
  {
    id: 0,
    type: "Fitness",
    difficulty: "",
  },
  {
    id: 1,
    type: "Fitness",
    difficulty: "Easy",
  },
  {
    id: 2,
    type: "Fitness",
    difficulty: "Medium",
  },
  {
    id: 3,
    type: "Fitness",
    difficulty: "Hard",
  },
];

// Test 1
test("completing a fitness goal with no difficulty specified grants zero XP", () => {
  expect(updateExperience(test_goals[0])).toBe(0);
});

// Test 2
test("completing a fitness goal with Easy difficulty specified grants 50 XP", () => {
  expect(updateExperience(test_goals[1])).toBe(50);
});

// Test 3
test("completing a fitness goal with Medium difficulty specified grants 100 XP", () => {
  expect(updateExperience(test_goals[2])).toBe(100);
});

// Test 4
test("completing a fitness goal with Hard difficulty specified grants 200 XP", () => {
  expect(updateExperience(test_goals[3])).toBe(200);
});

// Test 5
test("For a user at 50 xp and level 1 with 50 strength xp at level 1 strength, completing an fitness goal with Easy difficulty will update user to be 100 xp at level 1 with 100 strength xp at level 1 strength", () => {
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).lvl).toBe(1);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).strength_xp).toBe(100);
  expect(updateLevel(50, 1, 50, 1, test_goals[1]).strength_lvl).toBe(1);
});

// Test 6
test("For a user at 120 xp and level 1 with 120 strength xp at level 1 strength, completing an fitness goal with Easy difficulty will update user to be 49 xp at level 2 with 49 strength xp at level 2 strength", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).strength_xp).toBe(49);
  expect(updateLevel(120, 1, 120, 1, test_goals[1]).strength_lvl).toBe(2);
});

// Test 7
test("For a user at 10 xp and level 1 with 10 strength xp at level 1 strength, completing an fitness goal with Medium difficulty will update user to be 110 xp at level 1 with 110 strength xp at level 1 strength", () => {
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).lvl).toBe(1);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).strength_xp).toBe(110);
  expect(updateLevel(10, 1, 10, 1, test_goals[2]).strength_lvl).toBe(1);
});

// Test 8
test("For a user at 120 xp and level 1 with 10 strength xp at level 1 strength, completing an fitness goal with Medium difficulty will update user to be 99 xp at level 2 with 99 strength xp at level 2 strength", () => {
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).lvl).toBe(2);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).strength_xp).toBe(99);
  expect(updateLevel(120, 1, 120, 1, test_goals[2]).strength_lvl).toBe(2);
});

// Test 9
test("For a user at 50 xp and level 2 with 50 strength xp at level 2 strength, completing an fitness goal with Hard difficulty will update user to be 250 xp at level 2 with 250 strength xp at level 2 strength", () => {
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).lvl).toBe(2);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).strength_xp).toBe(250);
  expect(updateLevel(50, 2, 50, 2, test_goals[3]).strength_lvl).toBe(2);
});

// Test 10
test("For a user at 200 xp and level 2 with 200 strength xp at level 2 strength, completing an fitness goal with Hard difficulty will update user to be 34 xp at level 3 with 34 strength xp at level 3 strength", () => {
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).lvl).toBe(3);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).strength_xp).toBe(34);
  expect(updateLevel(200, 2, 200, 2, test_goals[3]).strength_lvl).toBe(3);
});
