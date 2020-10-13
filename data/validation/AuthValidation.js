//validation.js
import * as Yup from 'yup';

const alpha = /^[a-zA-Z_]+( [a-zA-Z_]+)*$/;
const numeric = /^(0|[1-9][0-9]*)$/;
const negaiveNumeric = /^[-+]?\d*$/;

const validation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6)
    .max(35),
});

export default validation;
