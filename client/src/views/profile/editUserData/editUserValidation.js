import { object, string } from 'yup';

const getRequiredMessage = (fieldName) => `${fieldName} is required!`;
const getTooShortMessage = (fieldName, min) => `${fieldName} must have at least ${min} characters!`;
const getTooLongMessage = (fieldName, max) => `${fieldName} must have at most ${max} characters!`;

const validationSchema = object({
  firstname: string()
    .required(getRequiredMessage('Firstname'))
    .min(3, getTooShortMessage('Firstname', 3))
    .max(12, getTooLongMessage('Firstname', 12)),
  surname: string()
    .required(getRequiredMessage('Surname'))
    .min(3, getTooShortMessage('Surname', 3))
    .max(12, getTooLongMessage('Surname', 12)),
  description: string()
    .min(10, getTooShortMessage('Description', 10))
    .max(100, getTooLongMessage('Description', 100))
});

export default validationSchema;
