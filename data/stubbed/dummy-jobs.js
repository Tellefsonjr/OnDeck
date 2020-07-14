// id, companyId, categories, title, description, location, dates,
const date = new Date();
console.log("DATE::: ", date);

const JOBS = [
  { id: 1,
    companyId: 1,
    categories: [4, 1],
    title: "Crane Operator",
    description: "Crane Operator needed, must have ____ card. We are an up and coming construction crew working on a new hospital in Sydney. ",
    location: 0,
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "9:00 AM",
      time_end: "5:00 PM",
      frequency: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
      onCall: false,
    },
    pay: {
      amount: "$40",
      rate: "hourly",
      estimated: false,
      tips: false,
    }
  },
  { id: 2,
    companyId: 2,
    categories: [3, 5],
    title: "Delivery Driver",
    description: "Delivery Driver needed! We are a family-owned and operated bakery serving up the city's #1 meat pies. Must be fast & SAFE driver. No Jason Statham impersonators.",
    location: 0,
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "5:00 PM",
      time_end: "10:00 PM",
      frequency: ["Mon", "Wed", "Sat", "Sun"],
      onCall: true,
    },
    pay: {
      amount: "$15",
      rate: "hourly",
      estimated: true,
      tips: true,
    }
  },
  { id: 3,
    companyId: 2,
    categories: [3, 5],
    title: "Line Cook",
    description: "Line cook needed! We are a family-owned and operated bakery serving up the city's #1 meat pies. Must be .",
    location: 0,
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "5:00 PM",
      time_end: "10:00 PM",
      frequency: ["Mon", "Wed", "Sat", "Sun"],
      onCall: true,
    },
    pay: {
      amount: "$15",
      rate: "hourly",
      estimated: true,
      tips: true,
    }
  },
  { id: 4,
    companyId: 3,
    categories: [2, 5],
    title: "Customer Service Representative",
    description: "We need someone to help ring up books, recommend stuff to people, and help organize our little shop up. MUST. BE. CHILL.",
    location: 0,
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "5:00 PM",
      time_end: "10:00 PM",
      frequency: ["Mon", "Wed", "Sat", "Sun"],
      onCall: true,
    },
    pay: {
      amount: "$15",
      rate: "hourly",
      estimated: true,
      tips: true,
    }
  },
  { id: 5,
    companyId: 3,
    categories: [2, 4],
    title: "Data Entry",
    description: "Looking for someone to balance our inventory, we lose track of a lot of books and pens - darn pen thieves. ",
    location: 0,
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "10:00 AM",
      time_end: "2:00 PM",
      frequency: ["Mon", "Wed", "Sat", "Sun"],
      onCall: false,
    },
    pay: {
      amount: "$19",
      rate: "hourly",
      estimated: true,
      tips: true,
    }
  },
];

export default JOBS;
