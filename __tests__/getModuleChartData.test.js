const getModuleChartData = (data) => {
  const defaultData = [
    { x: "F*", y: 0 },
    { x: "F", y: 0 },
    { x: "D", y: 0 },
    { x: "D+", y: 0 },
    { x: "C-", y: 0 },
    { x: "C", y: 0 },
    { x: "C+", y: 0 },
    { x: "B-", y: 0 },
    { x: "B", y: 0 },
    { x: "B+", y: 0 },
    { x: "A-", y: 0 },
    { x: "A", y: 0 },
    { x: "A+", y: 0 },
  ];

  if (!data || data.length == 0) return defaultData;

  let mods = [...defaultData];

  let completedMods = [...defaultData];

  for (let obj of data) {
    for (let mod of mods) {
      if (obj.grade_received == mod.x) {
        mod.y++;
      }
    }
  }

  let stateChanged = false;
  for (let i = 0; i < mods.length; i++) {
    if (mods[i].y != completedMods[i].y) {
      stateChanged = true;
      break;
    }
  }
  if (stateChanged) completedMods = mods;

  return completedMods;
};

const test_data_1 = [
  { grade_received: "A" },
  { grade_received: "A+" },
  { grade_received: "A-" },
  { grade_received: "A-" },
  { grade_received: "B+" },
  { grade_received: "B" },
  { grade_received: "B+" },
  { grade_received: "A+" },
  { grade_received: "C-" },
  { grade_received: "A" },
  { grade_received: "A-" },
];

const expected_data_1 = [
  { x: "F*", y: 0 },
  { x: "F", y: 0 },
  { x: "D", y: 0 },
  { x: "D+", y: 0 },
  { x: "C-", y: 1 },
  { x: "C", y: 0 },
  { x: "C+", y: 0 },
  { x: "B-", y: 0 },
  { x: "B", y: 1 },
  { x: "B+", y: 2 },
  { x: "A-", y: 3 },
  { x: "A", y: 2 },
  { x: "A+", y: 2 },
];

const test_data_2 = [];

const expected_data_2 = [
  { x: "F*", y: 0 },
  { x: "F", y: 0 },
  { x: "D", y: 0 },
  { x: "D+", y: 0 },
  { x: "C-", y: 0 },
  { x: "C", y: 0 },
  { x: "C+", y: 0 },
  { x: "B-", y: 0 },
  { x: "B", y: 0 },
  { x: "B+", y: 0 },
  { x: "A-", y: 0 },
  { x: "A", y: 0 },
  { x: "A+", y: 0 },
];

// Test 1
test("getModuleChartData returns the correct chart data for the first user", () => {
  expect(getModuleChartData(test_data_1)).toEqual(expected_data_1);
});

// Test 2
test("getModuleChartData returns the correct chart data for the user with no modules", () => {
  expect(getModuleChartData(test_data_2)).toEqual(expected_data_2);
});
