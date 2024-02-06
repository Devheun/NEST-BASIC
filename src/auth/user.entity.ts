import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['username']) // unique한 값이어야 한다.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
