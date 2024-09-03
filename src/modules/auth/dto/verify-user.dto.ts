import { Users } from '@prisma/client';

export class VerifyUserDto {
  emp_id:string;
  name:string;
  mobile :string;
  email :string;
  role :string;
  status:boolean
  constructor(user:Partial<Users>) {
    this.emp_id = user.emp_id;
    this.name = user.name;
    this.mobile = user.mobile;
    this.email = user.email;
    this.role = user.role;
    this.status = user.status;
  }
}