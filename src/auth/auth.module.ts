import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [PassportModule, UsuariosModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}