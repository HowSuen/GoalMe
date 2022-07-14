const getGoalPieData = (data) => {
  let completedTotal = 0;
  let completedAcad = 0;
  let completedFit = 0;
  let completedFinance = 0;
  let completedGen = 0;

  if (!data) return [];

  Object.entries(data).forEach(([key, value] = entry) => {
    if (key == "completed") {
      completedTotal = value;
    } else if (key == "completedAcad") {
      completedAcad = value;
    } else if (key == "completedFit") {
      completedFit = value;
    } else if (key == "completedFinance") {
      completedFinance = value;
    }
  });

  completedGen =
    completedTotal - completedAcad - completedFit - completedFinance;

  return [
    completedTotal,
    completedAcad,
    completedFit,
    completedFinance,
    completedGen,
  ];
};

const getGoalGraphData = (goals, modules, exercises, savings) => {
  const defaultData = [
    { x: "Mon", y: 0 },
    { x: "Tue", y: 0 },
    { x: "Wed", y: 0 },
    { x: "Thu", y: 0 },
    { x: "Fri", y: 0 },
    { x: "Sat", y: 0 },
    { x: "Sun", y: 0 },
  ];

  let days = [...defaultData];

  let d = [...defaultData];

  const sevenDaysAgo = new Date(
    new Date("2022-07-14 08:27:12.472+00").getTime() - 6 * 24 * 60 * 60 * 1000
  );

  sevenDaysAgo.setHours(0, 0, 0, 0);

  let data = [];

  goals = goals.filter((o) => o.completed_at > sevenDaysAgo.toISOString());
  modules = modules.filter((o) => o.completed_at > sevenDaysAgo.toISOString());
  exercises = exercises.filter(
    (o) => o.completed_at > sevenDaysAgo.toISOString()
  );
  savings = savings.filter((o) => o.completed_at > sevenDaysAgo.toISOString());

  data.push.apply(
    data,
    goals
      .map((obj) =>
        new Date(obj.completed_at).toLocaleString("en-US", {
          timeZone: "Asia/Singapore",
        })
      )
      .sort()
      .map((date) => getDayOfWeek(date))
  );

  data.push.apply(
    data,
    modules
      .map((obj) =>
        new Date(obj.completed_at).toLocaleString("en-US", {
          timeZone: "Asia/Singapore",
        })
      )
      .sort()
      .map((date) => getDayOfWeek(date))
  );

  data.push.apply(
    data,
    exercises
      .map((obj) =>
        new Date(obj.completed_at).toLocaleString("en-US", {
          timeZone: "Asia/Singapore",
        })
      )
      .sort()
      .map((date) => getDayOfWeek(date))
  );

  data.push.apply(
    data,
    savings
      .map((obj) =>
        new Date(obj.completed_at).toLocaleString("en-US", {
          timeZone: "Asia/Singapore",
        })
      )
      .sort()
      .map((date) => getDayOfWeek(date))
  );

  for (let i = 0; i < data.length; i++) {
    d.filter((o) => o.x == data[i])[0].y++;
  }

  let stateChanged = false;
  for (let i = 0; i < d.length; i++) {
    if (d[i].y != days[i].y) {
      stateChanged = true;
      break;
    }
  }

  if (stateChanged) days = d;

  return days;
};

const getDayOfWeek = (date) => {
  const dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek)
    ? null
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayOfWeek];
};

const test_data_pie = {
  completed: 30,
  completedAcad: 14,
  completedFit: 7,
  completedFinance: 6,
};

const test_goals = [
  {
    completed_at: "2022-07-08 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-07 08:27:12.472+00",
  },
  {
    completed_at: "2021-06-02 08:27:12.472+00",
  },
  {
    completed_at: "2022-06-01 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-10 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-13 08:27:12.472+00",
  },
];

const test_modules = [
  {
    completed_at: "2022-07-08 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-14 08:27:12.472+00",
  },
  {
    completed_at: "2022-02-01 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-12 08:27:12.472+00",
  },
];

const test_exercises = [
  {
    completed_at: "2022-07-06 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-11 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-12 08:27:12.472+00",
  },
  {
    completed_at: "2022-05-12 08:27:12.472+00",
  },
];

const test_savings = [
  {
    completed_at: "2022-07-07 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-08 08:27:12.472+00",
  },
  {
    completed_at: "2022-06-01 08:27:12.472+00",
  },
  {
    completed_at: "2021-07-12 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-12 08:27:12.472+00",
  },
];

const expected_graph_data = [
  { x: "Mon", y: 1 },
  { x: "Tue", y: 3 },
  { x: "Wed", y: 1 },
  { x: "Thu", y: 1 },
  { x: "Fri", y: 3 },
  { x: "Sat", y: 0 },
  { x: "Sun", y: 1 },
];

// Test 1
test("getGoalPieData returns the correct data", () => {
  expect(getGoalPieData(test_data_pie)).toEqual([30, 14, 7, 6, 3]);
});

// Test 2
test("getGoalGraphData returns the correct data", () => {
  expect(
    getGoalGraphData(test_goals, test_modules, test_exercises, test_savings)
  ).toEqual(expected_graph_data);
});
