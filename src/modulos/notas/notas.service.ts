import { Injectable } from '@nestjs/common';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotasService {
  constructor(
    @InjectRepository(Nota)
    private readonly notaRepository: Repository<Nota>,
  ) {}

  create(createNotaDto: CreateNotaDto) {
    try {
      return this.notaRepository.save(createNotaDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const notas = await this.notaRepository.find({
        where: {
          codigo_usuario: parseInt(userId),
        },
      });

      if (notas == null || (Array.isArray(notas) && notas.length === 0)) {
        return { messsage: 'No se encontraron notas para este usuario' };
      }

      return notas;
    } catch (error) {
      throw error;
    }
  }

  async findOne(codigo_nota: number) {
    const nota = await this.notaRepository.findOneBy({
      codigo_nota: codigo_nota,
    });
    if (!nota) {
      return { message: 'Nota no encontrada' };
    }
    return nota;
  }

  async update(codigo_nota: number, updateNotaDto: UpdateNotaDto) {
    try {
      const nota = await this.notaRepository.findOneBy({
        codigo_nota: codigo_nota,
      });
      if (!nota) {
        return { message: 'Nota no encontrada' };
      }

      const notaActualizada = this.notaRepository.merge(nota, updateNotaDto);
      await this.notaRepository.save(notaActualizada);

      return notaActualizada;
    } catch (error) {
      throw error;
    }
  }

  async remove(codigo_nota: number) {
    try {
      const nota = await this.notaRepository.findOneBy({
        codigo_nota: codigo_nota,
      });
      if (!nota) {
        return { message: 'Nota no encontrada' };
      }

      this.notaRepository.delete({ codigo_nota: codigo_nota });

      return { message: 'Nota eliminada correctamente' };
    } catch (error) {
      throw error;
    }
  }
}
