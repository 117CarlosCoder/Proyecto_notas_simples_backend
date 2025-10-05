import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotasService } from './notas.service';
import { CreateNotaDto } from './dto/create-nota.dto';
import { UpdateNotaDto } from './dto/update-nota.dto';
import { GetUser } from 'src/decorators/user/user.decorator';
import { JwtAuthGuard } from 'src/auth/auth.jwt-guard';

@UseGuards(JwtAuthGuard)
@Controller('notas')
export class NotasController {
  constructor(private readonly notasService: NotasService) {}

  @Post()
  create(@Body() createNotaDto: CreateNotaDto, @GetUser('id') userId: string) {
    createNotaDto.codigo_usuario = parseInt(userId);
    return this.notasService.create(createNotaDto);
  }

  @Get('user')
  findAll(@GetUser('id') id: string) {
    return this.notasService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') codigo_nota: string) {
    return this.notasService.findOne(+codigo_nota);
  }

  @Patch(':id')
  update(
    @Param('id') codigo_nota: string,
    @Body() updateNotaDto: UpdateNotaDto,
    @GetUser('id') userId: string,
  ) {
    updateNotaDto.codigo_usuario = parseInt(userId);
    return this.notasService.update(+codigo_nota, updateNotaDto);
  }

  @Delete(':id')
  remove(@Param('id') codigo_nota: string) {
    return this.notasService.remove(+codigo_nota);
  }
}
