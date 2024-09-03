import { Users } from '@prisma/client';

export class UserListDto {
  id:string
  emp_id:string;
  name:string;
  mobile :string;
  email :string;
  address?:string;
  role :string;
  status:boolean
  constructor(user:Partial<Users>) {
    this.id = user.id;
    this.emp_id = user.emp_id;
    this.name = user.name;
    this.mobile = user.mobile;
    this.email = user.email;
    this.address = user.address;
    this.role = user.role;
    this.status = user.status;
  }
}