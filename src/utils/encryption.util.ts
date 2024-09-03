import * as bcrypt from 'bcrypt';

export const hashPassword = (password: string,saltOrRounds=10):string => {
  return bcrypt.hashSync(password, saltOrRounds);
}

export const checkPassword = (password:string,dbPassword:string):boolean => {
  return bcrypt.compareSync(password,dbPassword);
}