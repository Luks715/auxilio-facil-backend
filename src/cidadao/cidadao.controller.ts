import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CidadaoService } from './cidadao.service';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { CreateDependenteDto } from './dto/create-dependente.dto';

@Controller('cidadao')
export class CidadaoController {
  constructor(private readonly cidadaoService: CidadaoService) {}

  @Post()
  async create(@Body() createCidadaoDto: CreateCidadaoDto) {
    return this.cidadaoService.create(createCidadaoDto);
  }

  @Get('/criarDependente')
  async createDependentes(@Body() createDependenteDto: CreateDependenteDto) {
    return this.cidadaoService.createDependente(createDependenteDto);
  }

  @Get('findByCpf/:cpf')
  async findCidadaoByCPF(@Param('cpf') cpf: string) {
    const cidadao = await this.cidadaoService.findCidadaoByCpf(cpf);
    if (!cidadao) {
      throw new NotFoundException(`Cidadão com o CPF ${cpf} não encontrado.`);
    }
    return cidadao;
  }

  @Get()
  async findAll() {
    return this.cidadaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cidadaoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCidadaoDto: UpdateCidadaoDto) {
    return this.cidadaoService.update(+id, updateCidadaoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cidadaoService.remove(+id);
  }
}
