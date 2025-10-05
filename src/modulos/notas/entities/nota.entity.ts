import { User } from 'src/modulos/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('nota')
export class Nota {
  @PrimaryGeneratedColumn()
  codigo_nota: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_modificacion: Date;

  @ManyToOne(() => User, (usuario) => usuario.notas, { eager: false })
  @JoinColumn({ name: 'codigo_usuario' })
  codigo_usuario: number;
}
