import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value : any){

        value = value.toUpperCase();

        if (!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }

    private isStatusValid(status : any){
        const idx = this.StatusOptions.indexOf(status); // 값이 있으면 해당 인덱스 위치 반환, 없으면 -1 반환
        return idx !== -1;
    } 
}