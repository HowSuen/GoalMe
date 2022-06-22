const compareGrade = (g1, g2) => {
  const symOrder = { "+": -1, "-": 1, "": 0 };
  return (
    g2.charAt(0).localeCompare(g1.charAt(0)) ||
    symOrder[g2.charAt(1)] - symOrder[g1.charAt(1)]
  );
};

const updateExperience = (module) => {
  let addXP = 0;
  if (module.targetGrade == "A+") {
    addXP = 2000;
  } else if (module.targetGrade == "A") {
    addXP = 1900;
  } else if (module.targetGrade == "A-") {
    addXP = 1800;
  } else if (module.targetGrade == "B+") {
    addXP = 1700;
  } else if (module.targetGrade == "B") {
    addXP = 1600;
  } else if (module.targetGrade == "B-") {
    addXP = 1500;
  } else if (module.targetGrade == "C+") {
    addXP = 1300;
  } else if (module.targetGrade == "C") {
    addXP = 1100;
  } else if (module.targetGrade == "C-") {
    addXP = 900;
  } else if (module.targetGrade == "D+") {
    addXP = 600;
  } else if (module.targetGrade == "D") {
    addXP = 400;
  } else if (module.targetGrade == "F") {
    addXP = 200;
  } else if (module.targetGrade == "F*") {
    addXP = 100;
  }
  addXP +=
    compareGrade(module.targetGrade, module.gradeReceived) <= 0 ? 200 : 0;
  return addXP;
};

const updateLevel = (user, module) => {
  const addXP = updateExperience(module);
  const newTotalXp = user.totalXp + addXP;
  let newWisdomXp = user.wisdomXp + addXP;
  const totalMax = Math.round(Math.pow(user.totalLvl / 0.05, 1.6));
  const wisdomMax = Math.round(Math.pow(user.wisdomLvl / 0.05, 1.6));

  const result = {
    totalXP: newTotalXp >= totalMax ? newTotalXp % totalMax : newTotalXp,
    totalLVL: newTotalXp >= totalMax ? user.totalLvl + 1 : user.totalLvl,
    wisdomXP: newWisdomXp >= wisdomMax ? newWisdomXp % wisdomMax : newWisdomXp,
    wisdomLVL: newWisdomXp >= wisdomMax ? user.wisdomLvl + 1 : user.wisdomLvl,
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
test("Achieving target grade of A+ for a module grants 2200 XP", () => {
  expect(updateExperience(test_modules[0])).toBe(2200);
});

// Test 2
test("Receiving grade A for a module with target grade A+ grants 2000 XP", () => {
  expect(updateExperience(test_modules[1])).toBe(2000);
});

// Test 3 (needs to be edited)
test("Receiving grade F* for a module with target grade A+ grants 2000 XP", () => {
  expect(updateExperience(test_modules[2])).toBe(2000);
});

// Test 4
test("Achieving target grade of A+ for a module grants 2200 XP and 2200 wisdom XP. For a user with 50 XP at Level 2 with 50 wisdom XP at Wisdom Level 2, they will be levelled to", () => {
  expect(updateLevel(test_users[0], test_modules[1]).totalXP).toBe(220);
  expect(updateLevel(test_users[0], test_modules[1]).totalLVL).toBe(3);
  expect(updateLevel(test_users[0], test_modules[1]).wisdomXP).toBe(220);
  expect(updateLevel(test_users[0], test_modules[1]).wisdomLVL).toBe(3);
});
