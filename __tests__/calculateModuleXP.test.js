const compareGrade = (g1, g2) => {
  const symOrder = { "+": -1, "-": 1, "": 0 };
  return (
    g2.charAt(0).localeCompare(g1.charAt(0)) ||
    symOrder[g2.charAt(1)] - symOrder[g1.charAt(1)]
  );
};

const updateExperience = (module) => {
  let addXP = 0;
  if (module.gradeReceived == "A+") {
    addXP = 2000;
  } else if (module.gradeReceived == "A") {
    addXP = 1900;
  } else if (module.gradeReceived == "A-") {
    addXP = 1800;
  } else if (module.gradeReceived == "B+") {
    addXP = 1700;
  } else if (module.gradeReceived == "B") {
    addXP = 1600;
  } else if (module.gradeReceived == "B-") {
    addXP = 1500;
  } else if (module.gradeReceived == "C+") {
    addXP = 1300;
  } else if (module.gradeReceived == "C") {
    addXP = 1100;
  } else if (module.gradeReceived == "C-") {
    addXP = 900;
  } else if (module.gradeReceived == "D+") {
    addXP = 600;
  } else if (module.gradeReceived == "D") {
    addXP = 400;
  } else if (module.gradeReceived == "F") {
    addXP = 200;
  } else if (module.gradeReceived == "F*") {
    addXP = 100;
  }
  addXP +=
    compareGrade(module.targetGrade, module.gradeReceived) <= 0 ? 200 : 0;
  return addXP;
};

const updateLevel = (user, module) => {
  const addXP = updateExperience(module);
  let newTotalXp = user.totalXp + addXP;
  let newWisdomXp = user.wisdomXp + addXP;
  let totalMax = Math.round(Math.pow(user.totalLvl / 0.05, 1.6));
  let wisdomMax = Math.round(Math.pow(user.wisdomLvl / 0.05, 1.6));

  let addLVL = 0;
  while (newTotalXp >= totalMax) {
    newTotalXp -= totalMax;
    addLVL += 1;
    totalMax = Math.round(Math.pow((user.totalLvl + addLVL) / 0.05, 1.6));
  }

  let addWisdomLVL = 0;
  while (newWisdomXp >= wisdomMax) {
    newWisdomXp -= wisdomMax;
    addWisdomLVL += 1;
    wisdomMax = Math.round(Math.pow((user.wisdomLvl + addWisdomLVL) / 0.05, 1.6));
  }

  const result = {
    totalXP: newTotalXp,
    totalLVL: user.totalLvl + addLVL,
    wisdomXP: newWisdomXp,
    wisdomLVL: user.wisdomLvl + addWisdomLVL,
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

const test_modules = [
  {
    id: 0,
    targetGrade: "A+",
    gradeReceived: "A+",
  },
  {
    id: 1,
    targetGrade: "A+",
    gradeReceived: "A",
  },
  {
    id: 2,
    targetGrade: "A+",
    gradeReceived: "F*",
  },
];

// Test 1
test("Achieving target grade of A+ for a module grants 2000 XP and an additional 200 XP for reaching the target grade, thus a total of 2200 XP", () => {
  expect(updateExperience(test_modules[0])).toBe(2200);
});

// Test 2
test("Receiving grade A for a module with target grade A+ grants 1900 XP", () => {
  expect(updateExperience(test_modules[1])).toBe(1900);
});

// Test 3
test("Receiving grade F* for a module with target grade A+ grants 100 XP", () => {
  expect(updateExperience(test_modules[2])).toBe(100);
});

// Test 4
test("Receiving grade A for a module with target grade A+ grants 1900 XP and 1900 wisdom XP. For a user initially with 50 XP at Level 2 with 50 wisdom XP at Wisdom Level 2, they will have 884 XP at Level 4 with 884 Wisdom XP at Wisdom Level 4", () => {
  expect(updateLevel(test_users[0], test_modules[1]).totalXP).toBe(884);
  expect(updateLevel(test_users[0], test_modules[1]).totalLVL).toBe(4);
  expect(updateLevel(test_users[0], test_modules[1]).wisdomXP).toBe(884);
  expect(updateLevel(test_users[0], test_modules[1]).wisdomLVL).toBe(4);
});
