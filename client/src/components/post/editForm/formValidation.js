import * as yup from 'yup';

const getRequiredMessage = (fieldName) => `${fieldName} is required!`;
const getTooLongMessage = (fieldName, max) => `${fieldName} must have at most ${max} characters!`;

const validationSchema = yup.object({
  content: yup
    .string()
    .required(getRequiredMessage('Content'))
    .max(255, getTooLongMessage('Content', 255))
});

export default validationSchema;
