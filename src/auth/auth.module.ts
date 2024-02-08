import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();


@Module({
  imports: [
    PassportModule.register({defaultStrategy : 'jwt'}),
    JwtModule.register({
      secret : process.env.SECRET_KEY,
      signOptions : {
        expiresIn : 3600
      }
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository,JwtStrategy],
  exports : [JwtStrategy,PassportModule] // 다른 모듈에서 사용할 때
})
export class AuthModule {}
