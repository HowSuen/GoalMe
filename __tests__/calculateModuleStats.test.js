const compareGrade = (g1, g2) => {
  if (!g1) return -1;
  if (!g2) return 1;

  const symOrder = { "+": -1, "-": 1, "": 0 };
  return (
    g2.charAt(0).localeCompare(g1.charAt(0)) ||
    symOrder[g2.charAt(1)] - symOrder[g1.charAt(1)]
  );
};

const calculateModuleStats = (data) => {
  let completed = 0;
  let targetReached = 0;
  let aboveA = 0;
  let highestGrade = "-";
  let modeGrade = "-";

  if (!data) return [];

  completed = data.length;

  targetReached = data.filter(
    (o) => compareGrade(o.target_grade, o.grade_received) <= 0
  ).length;

  aboveA = data.filter((o) => compareGrade("A", o.grade_received) <= 0).length;

  const hGrade = data
    .map((o) => o.grade_received)
    .reduce((a, b) => (compareGrade(a, b) < 0 ? b : a), "");

  if (hGrade && hGrade != "") highestGrade = hGrade;

  const mode = (arr) => {
    const store = {};
    arr.forEach((o) => (store[o] ? (store[o] += 1) : (store[o] = 1)));
    return Object.keys(store).sort((a, b) =>
      store[b] - store[a] == 0 ? compareGrade(b, a) : store[b] - store[a]
    )[0];
  };

  const mGrade = mode(data.map((o) => o.grade_received));

  if (mGrade) modeGrade = mGrade;

  return [completed, targetReached, aboveA, highestGrade, modeGrade];
};

const test_data_1 = [
  {
    target_grade: "A",
    grade_received: "A+",
  },
  {
    target_grade: "B+",
    grade_received: "B",
  },
  {
    target_grade: "A-",
    grade_received: "A",
  },
  {
    target_grade: "A+",
    grade_received: "A-",
  },
  {
    target_grade: "A",
    grade_received: "C+",
  },
  {
    target_grade: "C-",
    grade_received: "A+",
  },
  {
    target_grade: "A+",
    grade_received: "A+",
  },
  {
    target_grade: "B-",
    grade_received: "B+",
  },
];

const test_data_2 = [
  {
    target_grade: "A",
    grade_received: "C-",
  },
  {
    target_grade: "B+",
    grade_received: "C",
  },
  {
    target_grade: "C-",
    grade_received: "C",
  },
  {
    target_grade: "B+",
    grade_received: "B-",
  },
  {
    target_grade: "C-",
    grade_received: "B+",
  },
  {
    target_grade: "A+",
    grade_received: "B+",
  },
  {
    target_grade: "B-",
    grade_received: "B+",
  },
];

const test_data_3 = [
  {
    target_grade: "A",
    grade_received: "C-",
  },
  {
    target_grade: "B+",
    grade_received: "C-",
  },
  {
    target_grade: "C+",
    grade_received: "C",
  },
  {
    target_grade: "B+",
    grade_received: "C-",
  },
  {
    target_grade: "B-",
    grade_received: "C+",
  },
  {
    target_grade: "A+",
    grade_received: "C+",
  },
];

const test_data_4 = [];

// Test 1
test("calculateModuleStats returns the correct statistics for the first user", () => {
  expect(calculateModuleStats(test_data_1)).toEqual([8, 5, 4, "A+", "A+"]);
});

// Test 2
test("calculateModuleStats returns the correct statistics for the second user", () => {
  expect(calculateModuleStats(test_data_2)).toEqual([7, 3, 0, "B+", "B+"]);
});

// Test 3
test("calculateModuleStats returns the correct statistics for the third user", () => {
  expect(calculateModuleStats(test_data_3)).toEqual([6, 0, 0, "C+", "C-"]);
});

// Test 4
test("calculateModuleStats returns the correct statistics for the user with no modules", () => {
  expect(calculateModuleStats(test_data_4)).toEqual([0, 0, 0, "-", "-"]);
});
