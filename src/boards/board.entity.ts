import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { User } from "../auth/user.entity";

@Entity()
export class Board extends BaseEntity{
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    title : string;

    @Column()
    description : string;

    @Column()
    status: BoardStatus;

    @Column()
    userId : number;

    @ManyToOne(type => User, user => user.boards, {eager : false})
    user : User;
}