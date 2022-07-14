const updateExperience = (saving) => {
  const goal = parseFloat(saving.amount, 10);
  const saved = parseFloat(saving.curr_amount, 10);
  return saved >= goal ? Math.round(saved) : 0;
};

const updateLevel = (user, saving) => {
  const addXP = updateExperience(saving);
  let newTotalXp = user.totalXp + addXP;
  let newWealthXp = user.wealthXp + addXP;
  let totalMax = Math.round(Math.pow(user.totalLvl / 0.05, 1.6));
  let wealthMax = Math.round(Math.pow(user.wealthLvl / 0.05, 1.6));

  let addLVL = 0;
  while (newTotalXp >= totalMax) {
    newTotalXp -= totalMax;
    addLVL += 1;
    totalMax = Math.round(Math.pow((user.totalLvl + addLVL) / 0.05, 1.6));
  }

  let addWealthLVL = 0;
  while (newWealthXp >= wealthMax) {
    newWealthXp -= wealthMax;
    addWealthLVL += 1;
    wealthMax = Math.round(
      Math.pow((user.wealthLvl + addWealthLVL) / 0.05, 1.6)
    );
  }

  let amount = parseFloat(saving.curr_amount, 10);

  const result = {
    totalXP: newTotalXp,
    totalLVL: user.totalLvl + addLVL,
    wealthXP: newWealthXp,
    wealthLVL: user.wealthLvl + addWealthLVL,
    completed: user.completed + 1,
    completedFinance: user.completedFinance + 1,
    completedSavings: user.completedSavings + 1,
    totalSavings: user.totalSavings + amount,
    highestSavings: Math.max(user.highestSavings, amount),
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
    completedFinance: 123,
    completedSavings: 68,
    totalSavings: 10000,
    highestSavings: 1500,
  },
];

const test_savings = [
  {
    amount: "2000",
    curr_amount: "2000",
  },
  {
    amount: "2000",
    curr_amount: "2345.67",
  },
  {
    amount: "2000",
    curr_amount: "2345.20",
  },
  {
    amount: "1200",
    curr_amount: "1000",
  },
  {
    amount: "1000",
    curr_amount: "1000",
  },
];

// Test 1
test("Completing a saving goal of $2,000 grants 2000 XP", () => {
  expect(updateExperience(test_savings[0])).toBe(2000);
});

// Test 2
test("Completing a saving goal of $2,000 with $2,345.67 saved up grants 2346 XP", () => {
  expect(updateExperience(test_savings[1])).toBe(2346);
});

// Test 3
test("Completing a saving goal of $2,000 with $2,345.20 saved up grants 2345 XP", () => {
  expect(updateExperience(test_savings[2])).toBe(2345);
});

// Test 4
test("If amount saved (eg. $1,000) is less than goal (eg. $1,200), no XP is granted", () => {
  expect(updateExperience(test_savings[3])).toBe(0);
});

// Test 5
test("Completing a saving goal of $2,000 grants 2000 XP and 2000 Wealth XP. \nFor a user initially with 50 XP at Level 2 with 50 Wealth XP at Wealth Level 2, \nthey will have 984 XP at Level 4 with 984 Wealth XP at Wealth Level 4", () => {
  expect(updateLevel(test_users[0], test_savings[0]).totalXP).toBe(984);
  expect(updateLevel(test_users[0], test_savings[0]).totalLVL).toBe(4);
  expect(updateLevel(test_users[0], test_savings[0]).wealthXP).toBe(984);
  expect(updateLevel(test_users[0], test_savings[0]).wealthLVL).toBe(4);
});

// Test 6
test("Completing a saving goal increases numbers of completed goals, finance goals, \nand savings by 1 each.", () => {
  expect(updateLevel(test_users[0], test_savings[0]).completed).toBe(420);
  expect(updateLevel(test_users[0], test_savings[0]).completedFinance).toBe(
    124
  );
  expect(updateLevel(test_users[0], test_savings[0]).completedSavings).toBe(69);
});

// Test 7
test("Completing a saving goal of $2,000 adds to the Total Amount Saved, \nwhich was $10,000, giving a new total of $12,000", () => {
  expect(updateLevel(test_users[0], test_savings[0]).totalSavings).toBe(12000);
});

// Test 8
test("Completing a saving goal of $2,000 beats the previous record for highest amount \nsaved in one goal, which was $1,500.", () => {
  expect(updateLevel(test_users[0], test_savings[0]).highestSavings).toBe(2000);
});

// Test 9
test("Completing a saving goal of $1,000 does not replace the previous record for \nhighest amount saved in one goal, which was $1,500.", () => {
  expect(updateLevel(test_users[0], test_savings[4]).highestSavings).toBe(1500);
});
