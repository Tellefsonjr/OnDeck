//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;
const negaiveNumeric = /^[-+]?\d*$/;

const validation = Yup.object().shape({
  
  name: Yup.string()
    .required("Required")
    .min(1)
    .max(50),
  description: Yup.string(),
  ein: Yup.string(),
  locations: Yup.array().of(
    Yup.object().shape({
      siteName: Yup.string(),
      address: Yup.string(),
    })
  ),     
});

export default validation;
