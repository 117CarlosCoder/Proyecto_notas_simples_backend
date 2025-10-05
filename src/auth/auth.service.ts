import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modulos/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modulos/users/dto/create-user.dto';

@Injectable()
export class AuthService {
     constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

  async signIn(username: string, pass: string): Promise<any> {
  const user = await this.usersService.findByUsername(username);
  if (!user) {
    throw new UnauthorizedException('Usuario no encontrado');
  }

  const isMatch = await bcrypt.compare(pass, user.contrasenia);
  if (!isMatch) {
    throw new UnauthorizedException('Contraseña incorrecta');
  }

  const payload = { 
      username: user.nombre_usuario, 
      sub: user.codigo_usuario, 
      correo: user.correo 
  };
  const token = await this.jwtService.signAsync(payload);

  return { token : token };
}

  async register(createUserDto : CreateUserDto) {
  const existingUser = await this.usersService.findByUsername(createUserDto.nombre_usuario);
  if (existingUser) {
    throw new UnauthorizedException('Usuario ya existe');
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(createUserDto.contrasenia, salt);

  const user = await this.usersService.create({
    nombre: createUserDto.nombre,
    nombre_usuario: createUserDto.nombre_usuario,
    contrasenia: hashedPassword,
    correo: createUserDto.correo,
  });

  if (!user) {
    throw new UnauthorizedException('Error al crear el usuario');
  }

  //const userCreated = await this.usersService.findByUsername(createUserDto.nombre_usuario);

  const payload = { 
      username: user.nombre_usuario, 
      sub: user.codigo_usuario, 
      correo: user.correo 
    };
  const token = await this.jwtService.signAsync(payload);

  return { 
    token:token
  }
}


}
