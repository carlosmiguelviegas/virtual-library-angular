const FIELD_REQUIRED = 'The field is mandatory.';
const INVALID_EMAIL_ADDRESS = 'Please provide a valid email address.';
const FIELD_INVALID_MAX_LENGTH = (max: number) => `The field must be at most ${max} characters long.`;
const FIELD_INVALID_MIN_LENGTH = (min: number) => `The field must be at least ${min} characters long.`;
const DISABLE_USER_TOOLTIP = 'Disable user';

export { 
          FIELD_REQUIRED,
          INVALID_EMAIL_ADDRESS,
          FIELD_INVALID_MAX_LENGTH,
          FIELD_INVALID_MIN_LENGTH,
          DISABLE_USER_TOOLTIP
       };
