import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CondicaoService } from './condicao.service';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';

@Controller('condicao')
export class CondicaoController {
  constructor(private readonly condicaoService: CondicaoService) {}

  @Post()
  async create(@Body() createCondicaoDto: CreateCondicaoDto) {
    return this.condicaoService.create(createCondicaoDto);
  }

  @Get()
  async findAll() {
    const condicoes = await this.condicaoService.findAll();
    return condicoes;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.condicaoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCondicaoDto: UpdateCondicaoDto) {
    return this.condicaoService.update(+id, updateCondicaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.condicaoService.remove(+id);
  }
}
