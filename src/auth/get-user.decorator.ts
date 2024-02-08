// 커스텀 데코레이터 만들기
import { createParamDecorator } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, ctx : ExecutionContext) : User =>{
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})