import { Request as ExpressRequest } from 'express';
import { VerifyUserInterface } from '@modules/auth/interfaces/auth.interface';

export type ApiResponseType = {
  statusCode:number;
  success:boolean;
  message:string;
  data:any;
  timestamp?:string;
}

export type ApiRequest = {
  user:VerifyUserInterface
} & ExpressRequest