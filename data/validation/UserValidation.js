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
  profile: Yup.object().shape({
    avatar: Yup.string()
      .required("Required"),
    location: Yup.string()
      .min(1)
      .max(255),
    bio: Yup.string()
      .min(0)
      .max(255),  
  }),     
});

export default validation;
