import { Repository, DataSource } from 'typeorm';
import { User } from './user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt(); // unique한 salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); // password hash
    const user = this.create({ username, password : hashedPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //username 중복 에러 코드
        throw new ConflictException('Existing username');
      }else{
        throw new InternalServerErrorException();
      }
    }
  }
}
