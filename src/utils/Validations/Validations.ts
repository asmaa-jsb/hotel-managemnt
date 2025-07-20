export const EmailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address",
  },
};

export const PassValidation = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|\\:;"'<>,.?/~`]).{8,}$/,

    message:
      "Password must be at least 8 characters, include uppercase, lowercase, number, and symbol",
  },
};

export const ConfirmPassValidation = (password: string) => ({
  required: "Confirm Password is required",
  validate: (value: string) => value === password || "Passwords do not match",
});

export const UserNameValidation = {
  required: "User Name is required",
  pattern: {
    value: /^[a-zA-Z][a-zA-Z0-9_]{2,19}$/,
    message:
      "User Name must start with a letter and can include letters, numbers, or underscores (3-20 characters)",
  },
};

export const PhoneNumberValidation = {
  required: "Phone number is required",
  pattern: {
    value: /^(01)[0-2,5]{1}[0-9]{8}$/,
    message: "Invalid Egyptian phone number",
  },
};
export const CountryValidation = {
  required: "Country is required",
  pattern: {
    value: /^[A-Za-z\s]{2,}$/,
    message: "Country must contain only letters",
  },
};
