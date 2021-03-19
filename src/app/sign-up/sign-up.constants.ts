export const ERROR_MESSAGES = {
  firstName: {
    required: 'First name is required'
  },
  lastName: {
    required: 'Last name is required'
  },
  email: {
    required: 'Email is required',
    email: 'Please enter a valid Email'
  },
  password: {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters',
    passwordStrength: 'Please enter a valid password',
    containLowerUpper: 'Password must contain at least one lowercase and uppercase letters',
    containsName: 'Password must not contain first name or last name'
  },
  confirmPassword: {
    required: 'Confirm password is required',
    passwordMismatch: 'Password does not match'
  }
};
