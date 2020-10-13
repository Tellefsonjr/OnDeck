
// { 
//   contactInfo: {
//     email: "",
//     phone: "",
//   },
//   firstName: "",
//   lastName: "",
//   currentLocation: [],
//   preferences: {
//     autoUpdateLocation: true,
//     notifications: true,
//     theme: 'dark',
//   },
//   profile: {
//     avatar: '',
//     bio: '',
//     certificates: [],
//     equipment: [],
//     rating: 4.5,
//     resume: ""
//   },
// }

class User {
    constructor(id, contactInfo, firstName, lastName, currentLocation, profile, preferences){
      this.id = id;
      this.contactInfo = contactInfo;
      this.firstName = firstName;
      this.lastName = lastName;
      this.currentLocation = currentLocation;
      this.profile = profile;
      this.preferences = preferences;
    }
  }
  
  export default User;
  