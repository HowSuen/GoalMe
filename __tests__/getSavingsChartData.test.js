const getSavingsChartData = (data) => {
  const defaultData = [
    { x: "Jan", y: 0 },
    { x: "Feb", y: 0 },
    { x: "Mar", y: 0 },
    { x: "Apr", y: 0 },
    { x: "May", y: 0 },
    { x: "Jun", y: 0 },
    { x: "Jul", y: 0 },
    { x: "Aug", y: 0 },
    { x: "Sep", y: 0 },
    { x: "Oct", y: 0 },
    { x: "Nov", y: 0 },
    { x: "Dec", y: 0 },
  ];

  if (!data || data.length == 0) {
    defaultData.forEach((obj) => (obj.y = currencyFormat(obj.y.toString())));
    return defaultData;
  }

  let m = [...defaultData];

  let months = [...defaultData];

  const oneYearAgo = new Date(
    new Date("2022-07-14 08:27:12.472+00").getTime() - 364 * 24 * 60 * 60 * 1000
  );

  oneYearAgo.setMonth(oneYearAgo.getMonth() + 1, 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  data = data.filter((obj) => obj.completed_at > oneYearAgo.toISOString());

  data.forEach(
    (obj) =>
      (obj.month = getMonthOfYear(
        new Date(obj.completed_at).toLocaleString("en-US", {
          timeZone: "Asia/Singapore",
        })
      ))
  );

  for (let i = 0; i < data.length; i++) {
    const obj = m.filter((o) => o.x == data[i].month)[0];
    obj.y += parseFloat(data[i].curr_amount, 10);
  }

  let stateChanged = false;
  for (let i = 0; i < m.length; i++) {
    if (m[i].y != months[i].y) {
      stateChanged = true;
      break;
    }
  }

  if (stateChanged) months = m;

  months.forEach((obj) => (obj.y = currencyFormat(obj.y.toString())));

  return months;
};

const getMonthOfYear = (date) => {
  const monthNum = new Date(date).getMonth();
  return isNaN(monthNum)
    ? null
    : [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][monthNum];
};

const currencyFormat = (str) => {
  const num = parseFloat(str.replace(",", ""), 10);
  return (
    "$" +
    num
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
      .replace(".00", "")
  );
};

const test_data_1 = [
  {
    curr_amount: "100.1",
    completed_at: "2021-08-20 08:27:12.472+00",
  },
  {
    curr_amount: "2000.20",
    completed_at: "2021-07-20 08:27:12.472+00",
  },
  {
    curr_amount: "200.50",
    completed_at: "2021-06-01 08:27:12.472+00",
  },
  {
    curr_amount: "43",
    completed_at: "2022-07-12 08:27:12.472+00",
  },
  {
    curr_amount: "960.02",
    completed_at: "2022-06-15 08:27:12.472+00",
  },
  {
    curr_amount: "111.11",
    completed_at: "2022-05-13 08:27:12.472+00",
  },
  {
    curr_amount: "234.56",
    completed_at: "2022-02-01 08:27:12.472+00",
  },
  {
    curr_amount: "123",
    completed_at: "2022-03-01 08:27:12.472+00",
  },
  {
    curr_amount: "230.01",
    completed_at: "2022-03-25 08:27:12.472+00",
  },
  {
    curr_amount: "102.40",
    completed_at: "2022-07-06 08:27:12.472+00",
  },
  {
    curr_amount: "403",
    completed_at: "2022-06-30 08:27:12.472+00",
  },
  {
    curr_amount: "222.22",
    completed_at: "2022-05-29 08:27:12.472+00",
  },
  {
    curr_amount: "202.2",
    completed_at: "2021-08-20 08:27:12.472+00",
  },
  {
    curr_amount: "69",
    completed_at: "2021-09-05 08:27:12.472+00",
  },
  {
    curr_amount: "420",
    completed_at: "2021-10-29 08:27:12.472+00",
  },
  {
    curr_amount: "0.69",
    completed_at: "2021-10-10 08:27:12.472+00",
  },
  {
    curr_amount: "1919.19",
    completed_at: "2021-12-31 08:27:12.472+00",
  },
];

const expected_data_1 = [
  { x: "Jan", y: "$0" },
  { x: "Feb", y: "$234.56" },
  { x: "Mar", y: "$353.01" },
  { x: "Apr", y: "$0" },
  { x: "May", y: "$333.33" },
  { x: "Jun", y: "$1,363.02" },
  { x: "Jul", y: "$145.40" },
  { x: "Aug", y: "$302.30" },
  { x: "Sep", y: "$69" },
  { x: "Oct", y: "$420.69" },
  { x: "Nov", y: "$0" },
  { x: "Dec", y: "$1,919.19" },
];

const test_data_2 = [];

const expected_data_2 = [
  { x: "Jan", y: "$0" },
  { x: "Feb", y: "$0" },
  { x: "Mar", y: "$0" },
  { x: "Apr", y: "$0" },
  { x: "May", y: "$0" },
  { x: "Jun", y: "$0" },
  { x: "Jul", y: "$0" },
  { x: "Aug", y: "$0" },
  { x: "Sep", y: "$0" },
  { x: "Oct", y: "$0" },
  { x: "Nov", y: "$0" },
  { x: "Dec", y: "$0" },
];

// Test 1
test("getSavingsChartData returns the correct chart data for the first user", () => {
  expect(getSavingsChartData(test_data_1)).toEqual(expected_data_1);
});

// Test 2
test("getSavingsChartData returns the correct chart data for the user with no savings", () => {
  expect(getSavingsChartData(test_data_2)).toEqual(expected_data_2);
});
