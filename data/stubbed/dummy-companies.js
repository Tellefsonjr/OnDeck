// constructor(id, name, email, ein, categories, description, tagline, locations, jobs, team){

const COMPANIES = [
  { id: 1,
    name: "Keeling and Sons",
    ein: "61-3685069",
    icon: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()),
    categories: [1, 2],
    description: "Balanced Heuristic Function",
    tagline: "Monetize Distributed Synergies",
    locations: [
      {
        address: {
          line1: "71 Hobart St",
          line2: "",
          zipCode: "",
          city: "Riverstone",
          state: "NSW",
          country: "Australia",
        },
        coordinates: {
          lat: "-33.6607668",
          long: "150.8740506",
        }
      },
    ],
    jobs: [1,],
    team: [4],
  },
  { id: 2,
    name: "Freshest",
    ein: "12-3991242",
    icon: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()),
    categories: [3, 4],
    description: "Serving up fresh as heck food since 2002",
    tagline: "Fresh fast fuel",
    locations: [
      {
        address: {
          line1: "1/16 Victoria Ave",
          line2: "",
          zipCode: "",
          city: "Perth",
          state: "WA",
          country: "Australia",
        },
        coordinates: {
          lat: "-31.958358764648438",
          long: "115.86505126953125",
        }
      },
    ],
    jobs: [2,3],
    team: [5],
  },
  { id: 3,
    name: "Book Planet",
    ein: "73-4132630",
    icon: 'https://picsum.photos/'+((Math.floor(Math.random(0,1000)*1000)).toString()),
    categories: [4, 6],
    description: "Pretty chill book nook",
    tagline: "Spread planetary stories",
    locations: [
      {
        address: {
          line1: "192 William St",
          line2: "",
          zipCode: "",
          city: "Northbridge",
          state: "WA",
          country: "Australia",
        },
        coordinates: {
          lat: "-31.9494786",
          long: "115.8593705",
        }
      },
    ],
    jobs: [4,5],
    team: [6],
  },
];

export default COMPANIES;
