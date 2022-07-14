const getExerciseChartData = (data) => {
  if (!data) return [];

  const defaultData = [
    { x: "Mon", y: 0 },
    { x: "Tue", y: 0 },
    { x: "Wed", y: 0 },
    { x: "Thu", y: 0 },
    { x: "Fri", y: 0 },
    { x: "Sat", y: 0 },
    { x: "Sun", y: 0 },
  ];

  let d = [...defaultData];

  let days = [...defaultData];

  const sevenDaysAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000);

  sevenDaysAgo.setHours(0, 0, 0, 0);

  data = data.filter((o) => o.completed_at > sevenDaysAgo.toISOString());

  data = data
    .map((obj) =>
      new Date(obj.completed_at).toLocaleString("en-US", {
        timeZone: "Asia/Singapore",
      })
    )
    .sort()
    .map((date) => getDayOfWeek(date));

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

const test_data = [
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
  {
    completed_at: "2022-07-13 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-14 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-11 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-11 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-11 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-09 08:27:12.472+00",
  },
  {
    completed_at: "2022-07-09 08:27:12.472+00",
  },
];

const expected_data = [
  { x: "Mon", y: 3 },
  { x: "Tue", y: 0 },
  { x: "Wed", y: 2 },
  { x: "Thu", y: 1 },
  { x: "Fri", y: 1 },
  { x: "Sat", y: 2 },
  { x: "Sun", y: 1 },
];

// Test 1
test("getExerciseChartData returns the correct data", () => {
  expect(getExerciseChartData(test_data)).toEqual(expected_data);
});
