import { Nota } from 'src/modulos/notas/entities/nota.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  codigo_usuario: number;

  @Column({ length: 255, unique: true })
  nombre: string;

  @Column({ length: 100, unique: true })
  nombre_usuario: string;

  @Column({ length: 255, unique: true })
  correo: string;

  @Column({})
  contrasenia: string;

  @OneToMany(() => Nota, (nota) => nota.codigo_usuario, { eager: true })
  notas: Nota[];
}
