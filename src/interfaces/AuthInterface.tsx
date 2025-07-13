export default interface  ForgetPasswordFormInputs {
  email: string;
}

export  interface LoginFormInputs {
  email: string;
  password: string;
}

export interface IRegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: number;
  country: string;
  role: string;
  profileImage: FileList;
}