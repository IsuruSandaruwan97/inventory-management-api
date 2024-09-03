export interface UserLoginInterface {
  token: string;
  refreshToken: string;
}

export interface VerifyUserInterface {
  emp_id:string;
  name:string;
  mobile :string;
  email :string;
  role :string;
  status:boolean
}