const sortItems = (order, orderBy) => {
  const convertDiff = (difficulty) => {
    if (difficulty == "None") {
      return 0;
    } else if (difficulty == "Easy") {
      return 1;
    } else if (difficulty == "Medium") {
      return 2;
    } else {
      return 3;
    }
  };

  const convertType = (type) => {
    if (type == "General") {
      return 0;
    } else if (type == "Academic") {
      return 1;
    } else if (type == "Fitness") {
      return 2;
    } else {
      return 3;
    }
  };

  const convertDate = (date) => {
    return new Date(date);
  };

  let comparator;
  if (orderBy == "dateCreated") {
    comparator = (a, b) => {
      return order == "ascending" ? a.id - b.id : b.id - a.id;
    };
  } else if (orderBy == "dateUpdated") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.updated_at) - convertDate(b.updated_at)
        : convertDate(b.updated_at) - convertDate(a.updated_at);
  } else if (orderBy == "dateCompleted") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDate(a.completed_at) - convertDate(b.completed_at)
        : convertDate(b.completed_at) - convertDate(a.completed_at);
  } else if (orderBy == "difficulty") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertDiff(a.difficulty) - convertDiff(b.difficulty)
        : convertDiff(b.difficulty) - convertDiff(a.difficulty);
  } else if (orderBy == "type") {
    comparator = (a, b) =>
      order == "ascending"
        ? convertType(a.type) - convertType(b.type)
        : convertType(b.type) - convertType(a.type);
  } else if (orderBy == "alphabetical") {
    comparator = (a, b) =>
      order == "ascending"
        ? a.content.localeCompare(b.content)
        : b.content.localeCompare(a.content);
  }

  return comparator;
};

const test_goals = [
  {
    id: 1,
    content: "D Academic",
    description: "",
    type: "Academic",
    module: "CS2100",
    difficulty: "Hard",
    updated_at: new Date("2022-06-17T02:36:29.237+00:00"),
  },
  {
    id: 3,
    content: "B Finance",
    description: "",
    type: "Finance",
    difficulty: "Easy",
    updated_at: new Date("2022-06-20T02:36:29.237+00:00"),
  },
  {
    id: 2,
    content: "A Fitness",
    description: "",
    type: "Fitness",
    difficulty: "Medium",
    updated_at: new Date("2022-06-18T02:36:29.237+00:00"),
  },
  {
    id: 4,
    content: "C General",
    description: "",
    type: "General",
    difficulty: "None",
    updated_at: new Date("2022-06-16T02:36:29.237+00:00"),
  },
];

const goals_date_created_ascending = [
  {
    id: 1,
    content: "D Academic",
    description: "",
    type: "Academic",
    module: "CS2100",
    difficulty: "Hard",
    updated_at: new Date("2022-06-17T02:36:29.237+00:00"),
  },
  {
    id: 2,
    content: "A Fitness",
    description: "",
    type: "Fitness",
    difficulty: "Medium",
    updated_at: new Date("2022-06-18T02:36:29.237+00:00"),
  },
  {
    id: 3,
    content: "B Finance",
    description: "",
    type: "Finance",
    difficulty: "Easy",
    updated_at: new Date("2022-06-20T02:36:29.237+00:00"),
  },
  {
    id: 4,
    content: "C General",
    description: "",
    type: "General",
    difficulty: "None",
    updated_at: new Date("2022-06-16T02:36:29.237+00:00"),
  },
];

const goals_date_updated_descending = [
  {
    id: 3,
    content: "B Finance",
    description: "",
    type: "Finance",
    difficulty: "Easy",
    updated_at: new Date("2022-06-20T02:36:29.237+00:00"),
  },
  
  {
    id: 2,
    content: "A Fitness",
    description: "",
    type: "Fitness",
    difficulty: "Medium",
    updated_at: new Date("2022-06-18T02:36:29.237+00:00"),
  },
  {
    id: 1,
    content: "D Academic",
    description: "",
    type: "Academic",
    module: "CS2100",
    difficulty: "Hard",
    updated_at: new Date("2022-06-17T02:36:29.237+00:00"),
  },
  {
    id: 4,
    content: "C General",
    description: "",
    type: "General",
    difficulty: "None",
    updated_at: new Date("2022-06-16T02:36:29.237+00:00"),
  },
];

const goals_difficulty_ascending = [
  {
    id: 4,
    content: "C General",
    description: "",
    type: "General",
    difficulty: "None",
    updated_at: new Date("2022-06-16T02:36:29.237+00:00"),
  },
  {
    id: 3,
    content: "B Finance",
    description: "",
    type: "Finance",
    difficulty: "Easy",
    updated_at: new Date("2022-06-20T02:36:29.237+00:00"),
  },
  
  {
    id: 2,
    content: "A Fitness",
    description: "",
    type: "Fitness",
    difficulty: "Medium",
    updated_at: new Date("2022-06-18T02:36:29.237+00:00"),
  },
  {
    id: 1,
    content: "D Academic",
    description: "",
    type: "Academic",
    module: "CS2100",
    difficulty: "Hard",
    updated_at: new Date("2022-06-17T02:36:29.237+00:00"),
  },
];

const goals_alphabetical_descending = [
  {
    id: 1,
    content: "D Academic",
    description: "",
    type: "Academic",
    module: "CS2100",
    difficulty: "Hard",
    updated_at: new Date("2022-06-17T02:36:29.237+00:00"),
  },
  {
    id: 4,
    content: "C General",
    description: "",
    type: "General",
    difficulty: "None",
    updated_at: new Date("2022-06-16T02:36:29.237+00:00"),
  },
  {
    id: 3,
    content: "B Finance",
    description: "",
    type: "Finance",
    difficulty: "Easy",
    updated_at: new Date("2022-06-20T02:36:29.237+00:00"),
  },
  {
    id: 2,
    content: "A Fitness",
    description: "",
    type: "Fitness",
    difficulty: "Medium",
    updated_at: new Date("2022-06-18T02:36:29.237+00:00"),
  },
];


// Test 1
test("sortGoals sorts by date created in ascending order correctly", () => {
  expect(test_goals.sort(sortItems("ascending", "dateCreated"))).toEqual(goals_date_created_ascending);
});

// Test 2
test("sortGoals sorts by date updated in descending order correctly", () => {
  expect(test_goals.sort(sortItems("descending", "dateUpdated"))).toEqual(goals_date_updated_descending);
});

// Test 3
test("sortGoals sorts by difficulty in ascending order correctly", () => {
  expect(test_goals.sort(sortItems("ascending", "difficulty"))).toEqual(goals_difficulty_ascending);
});

// Test 4
test("sortGoals sorts by title in descending order correctly", () => {
  expect(test_goals.sort(sortItems("descending", "alphabetical"))).toEqual(goals_alphabetical_descending);
});
