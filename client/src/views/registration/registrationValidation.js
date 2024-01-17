import { object, string, ref } from 'yup';

const getRequiredMessage = (fieldName) => `${fieldName} is required!`;
const getTooShortMessage = (fieldName, min) => `${fieldName} must have at least ${min} characters!`;
const getTooLongMessage = (fieldName, max) => `${fieldName} must have at most ${max} characters!`;

const validationSchema = object({
  username: string()
    .required(getRequiredMessage('Username'))
    .min(6, getTooShortMessage('Username', 6))
    .max(15, getTooLongMessage('Username', 15)),
  password: string()
    .required(getRequiredMessage('Password'))
    .min(8, getTooShortMessage('Password', 8))
    .max(20, getTooLongMessage('Password', 20)),
  confirmPassword: string()
    .required(getRequiredMessage('Confirmed password'))
    .oneOf([ref('password')], 'Passwords must match!'),
  firstname: string()
    .required(getRequiredMessage('Firstname'))
    .min(3, getTooShortMessage('Firstname', 3))
    .max(12, getTooLongMessage('Firstname', 12)),
  surname: string()
    .required(getRequiredMessage('Surname'))
    .min(3, getTooShortMessage('Surname', 3))
    .max(12, getTooLongMessage('Surname', 12))
});

export default validationSchema;
