const countCompletedAchievements = (data) => {
  let num = 0;
  for (let [key, value] of Object.entries(data)) {
    if (key != "count" && value == true) num++;
  }
  return num;
};

const test_objects = [
  {
    id: "test1",
    acad10: false,
    acad100: false,
    acad25: false,
    acad5: false,
    acad50: false,
    acad75: false,
    avatar1: false,
    count: 0,
    finlvl10: false,
    finlvl20: false,
    finlvl30: false,
    finlvl5: false,
    fit10: false,
    fit100: false,
    fit25: false,
    fit5: false,
    fit50: false,
    fit75: false,
    fitlvl10: false,
    fitlvl20: false,
    fitlvl30: false,
    fitlvl5: false,
    goal1: false,
    goal100: false,
    goal200: false,
    goal50: false,
    level10: false,
    level2: false,
    level20: false,
    level30: false,
    level5: false,
    money10: false,
    money100: false,
    money25: false,
    money5: false,
    money50: false,
    money75: false,
    wislvl10: false,
    wislvl20: false,
    wislvl30: false,
    wislvl5: false,
  },
  {
    id: "test2",
    acad10: false,
    acad100: false,
    acad25: false,
    acad5: true,
    acad50: false,
    acad75: false,
    avatar1: false,
    count: 2,
    finlvl10: false,
    finlvl20: false,
    finlvl30: false,
    finlvl5: false,
    fit10: false,
    fit100: false,
    fit25: false,
    fit5: false,
    fit50: false,
    fit75: false,
    fitlvl10: false,
    fitlvl20: false,
    fitlvl30: false,
    fitlvl5: false,
    goal1: false,
    goal100: false,
    goal200: false,
    goal50: false,
    level10: false,
    level2: true,
    level20: false,
    level30: false,
    level5: false,
    money10: false,
    money100: false,
    money25: false,
    money5: false,
    money50: false,
    money75: false,
    wislvl10: false,
    wislvl20: false,
    wislvl30: false,
    wislvl5: false,
  },
  {
    id: "test3",
    acad10: true,
    acad100: true,
    acad25: true,
    acad5: true,
    acad50: true,
    acad75: true,
    avatar1: true,
    count: 40,
    finlvl10: true,
    finlvl20: true,
    finlvl30: true,
    finlvl5: true,
    fit10: true,
    fit100: true,
    fit25: true,
    fit5: true,
    fit50: true,
    fit75: true,
    fitlvl10: true,
    fitlvl20: true,
    fitlvl30: true,
    fitlvl5: true,
    goal1: true,
    goal100: true,
    goal200: true,
    goal50: true,
    level10: true,
    level2: true,
    level20: true,
    level30: true,
    level5: true,
    money10: true,
    money100: true,
    money25: true,
    money5: true,
    money50: true,
    money75: true,
    wislvl10: true,
    wislvl20: true,
    wislvl30: true,
    wislvl5: true,
  },
];

// Test 1
test("countCompletedAchievements correctly returns 0 for user with zero achievements", () => {
  expect(countCompletedAchievements(test_objects[0])).toBe(0);
});

//  Test 2
test("countCompletedAchievements correctly returns 2 for user with two achievements", () => {
  expect(countCompletedAchievements(test_objects[1])).toBe(2);
});

// Test 3
test("countCompletedAchievements correctly returns 40 for user with every achievements", () => {
  expect(countCompletedAchievements(test_objects[2])).toBe(40);
});