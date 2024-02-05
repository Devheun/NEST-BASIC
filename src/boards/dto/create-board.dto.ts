import { IsNotEmpty } from "class-validator";

export class CreateBoardDto{
    @IsNotEmpty() // Pipe를 이용한 유효성 체크
    title : string;

    @IsNotEmpty()
    description : string;
}