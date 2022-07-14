const oneYearSavings = (data) => {
  const oneYearAgo = new Date(
    new Date("2022-07-14 08:27:12.472+00").getTime() - 364 * 24 * 60 * 60 * 1000
  );

  oneYearAgo.setMonth(oneYearAgo.getMonth() + 1, 1);
  oneYearAgo.setHours(0, 0, 0, 0);

  if (!data || data.length == 0) return currencyFormat("0");

  const oneYearData = data.filter(
    (o) => o.completed_at > oneYearAgo.toISOString()
  );

  if (oneYearData.length == 0) return currencyFormat("0");

  const sum = oneYearData
    .map((o) => parseFloat(o.curr_amount, 10))
    .reduce((a, b) => a + b);

  return currencyFormat(sum.toString());
};

const thirtyDaysSavings = (data) => {
  const thirtyDaysAgo = new Date(
    new Date("2022-07-14 08:27:12.472+00").getTime() - 29 * 24 * 60 * 60 * 1000
  );

  thirtyDaysAgo.setHours(0, 0, 0, 0);

  if (!data || data.length == 0) return currencyFormat("0");

  const thirtyDaysData = data.filter(
    (o) => o.completed_at > thirtyDaysAgo.toISOString()
  );

  if (thirtyDaysData.length == 0) return currencyFormat("0");

  const sum = thirtyDaysData
    .map((o) => parseFloat(o.curr_amount, 10))
    .reduce((a, b) => a + b);

  return currencyFormat(sum.toString());
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
    completed_at: "2022-07-13 08:27:12.472+00",
  },
  {
    curr_amount: "234.56",
    completed_at: "2022-02-01 08:27:12.472+00",
  },
  {
    curr_amount: "123",
    completed_at: "2021-05-01 08:27:12.472+00",
  },
];

const test_data_2 = [
  {
    curr_amount: "10000.1",
    completed_at: "2022-03-20 08:27:12.472+00",
  },
  {
    curr_amount: "2000.20",
    completed_at: "2021-04-16 08:27:12.472+00",
  },
  {
    curr_amount: "3333.33",
    completed_at: "2022-06-01 08:27:12.472+00",
  },
  {
    curr_amount: "44.4",
    completed_at: "2020-03-31 08:27:12.472+00",
  },
  {
    curr_amount: "500.50",
    completed_at: "2022-04-15 08:27:12.472+00",
  },
];

// Test 1
test("oneYearSavings correctly returns $1,448.79 for first set of savings data", () => {
  expect(oneYearSavings(test_data_1)).toBe("$1,448.79");
});

// Test 2
test("thirtDaysSavings correctly returns $1,114.13 for first set of savings data", () => {
  expect(thirtyDaysSavings(test_data_1)).toBe("$1,114.13");
});

// Test 3
test("oneYearSavings correctly returns $13,833.93 for second set of savings data", () => {
  expect(oneYearSavings(test_data_2)).toBe("$13,833.93");
});

// Test 4
test("thirtDaysSavings correctly returns $0 for second set of savings data", () => {
  expect(thirtyDaysSavings(test_data_2)).toBe("$0");
});
