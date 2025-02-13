import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { UpdateNotificacaoDto } from './dto/update-notificacao.dto';

@Controller('notificacoes')
export class NotificacaoController {
  constructor(private readonly notificacoesService: NotificacaoService) {}

  @Post()
  async create(@Body() createNotificacoeDto: CreateNotificacaoDto) {
    return this.notificacoesService.create(createNotificacoeDto);
  }

  @Get()
  async findAll() {
    return this.notificacoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificacoesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNotificacoeDto: UpdateNotificacaoDto) {
    return this.notificacoesService.update(+id, updateNotificacoeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.notificacoesService.remove(+id);
  }
}
