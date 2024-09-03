export type ApiResponseType = {
  statusCode:number;
  success:boolean;
  message:string;
  data:any;
  timestamp?:string;
}