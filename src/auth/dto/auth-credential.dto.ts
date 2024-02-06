import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString() // string이여야 하고
    @MinLength(4) // 최소길이 4
    @MaxLength(20) // 최대길이 20
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/,{
        message : 'only english and number are accpeted.'
    })
    password: string;
}

