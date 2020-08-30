// id, companyId, categories, title, description, location, dates,

const USERS = [
    {
        id: 1,
        email: "test1@test.com",
        password: "test1",
        profile: {
            avatar: null,
            firstName: "Joe", 
            lastName: "Schmo",
            age: 32,
            rating: 4.2,
            certifications: ["Construction"],
            location: {
                address: {
                  line1: "31 Hobart St",
                  line2: "",
                  zipCode: "",
                  city: "Riverstone",
                  state: "NSW",
                  country: "Australia",
                },
                coordinates: {
                  lat: "-33.6607668",
                  long: "150.8740506",
                },
            resume: null,
            introVideo: null,
            }
        },
        preferences: {
            theme: 'light',
            filters: {
                categories: [1, 2, 4],
                location: {
                    distance: 20,
                    type: "km",
                }
            }, 
            notifications: true,
        },
    }
  ];
  
  export default USERS;
  