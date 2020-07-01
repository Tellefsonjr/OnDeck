// id, companyId, categories, title, description, location, dates,
const date = new Date();
console.log("DATE::: ", date);

const JOBS = [
  { id: Math.random().toString(),
    companyId: 1,
    categories: [1, 4],
    title: "Crane Operator",
    description: "Crane Operator needed, must have ____ card. We are an up and coming construction crew working on a new hospital in Sydney. ",
    location: {
      address: {
        line1: "1234 Cherry Way",
        line2: "",
        zipCode: "",
        city: "Sydney",
        state: "",
        country: "Australia",
      },
      coordinates: {
        lat: "33.8688° S",
        long: "151.2093° E",
      }
    },
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "9:00 AM",
      time_end: "5:00 PM",
      frequency: ["Mon", "Tues", "Wed", "Thurs", "Fri"],
      onCall: false,
    }
  },
  { id: Math.random().toString(),
    companyId: 2,
    categories: [2, 5],
    title: "Delivery Driver",
    description: "Delivery Driver needed! We are a family-owned and operated bakery serving up the city's #1 meat pies. Must be fast & SAFE driver. No Jason Statham impersonators.",
    location: {
      address: {
        line1: "9999 Roo Lane",
        line2: "Bldg. 2",
        zipCode: "",
        city: "Perth",
        state: "",
        country: "Australia",
      },
      coordinates: {
        lat: "31.9505° S",
        long: "115.8605° E",
      }
    },
    dates: {
      date_start: date.toString(),
      date_end: date.setDate(date.getDate() + 30),
      time_start: "5:00 PM",
      time_end: "10:00 PM",
      frequency: ["Mon", "Wed", "Sat", "Sun"],
      onCall: true,
    }
  },
];

export default JOBS;
