//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;
const negaiveNumeric = /^[-+]?\d*$/;

const validation = Yup.object().shape({
  
  fullName: Yup.string()
    .required("Required")
    .min(1)
    .max(50),
  contactInfo: Yup.object().shape({
    phone: Yup.string()
      .required("Required")
      .min(1)
      .max(35),
  }),
  location: Yup.object().shape({
    currentLocation: Yup.object(),
    address: Yup.object().shape({
      formatted: Yup.string()
        .min(0)
        .max(255), 
      geometry: Yup.object()
    }),
  }),
  profile: Yup.object().shape({
    avatar: Yup.string()
      .required("Required"),
    bio: Yup.string()
      .min(0)
      .max(255),  
  }),     
});

export default validation;
