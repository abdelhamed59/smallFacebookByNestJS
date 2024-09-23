import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController{


  @Get()
  getusers(){
    return "hello from nest"
  }
  
}