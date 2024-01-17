import { object, string } from 'yup';

const getRequiredMessage = (fieldName) => `${fieldName} is required!`;

const validationSchema = object({
  username: string().required(getRequiredMessage('Username')),
  password: string().required(getRequiredMessage('Password'))
});

export default validationSchema;
