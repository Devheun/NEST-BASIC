import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
@Unique(['username']) // unique한 값이어야 한다.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // type => Board는 Board 엔터티 타입이라고 정의
  // board => board.user는 board 엔티티에서 user에 접근할 때
  // eager true로 설정하면 user를 가져올 때 board도 같이 가져온다.
  @OneToMany(type => Board, board => board.user, {eager : true}) 
  boards: Board[];
}
