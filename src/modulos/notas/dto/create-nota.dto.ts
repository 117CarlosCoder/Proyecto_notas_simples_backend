import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotaDto {
  @IsString()
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  titulo: string;

  @IsString()
  @IsOptional()
  descripcion: string;

  @IsOptional()
  codigo_usuario: number;
}
