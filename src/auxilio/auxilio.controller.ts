import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuxilioService } from './auxilio.service';
import { CreateAuxilioDto } from './dto/create-auxilio.dto';
import { UpdateAuxilioDto } from './dto/update-auxilio.dto';

@Controller('auxilio')
export class AuxilioController {
  constructor(private readonly auxilioService: AuxilioService) {}

  @Post()
  async create(@Body() createAuxilioDto: CreateAuxilioDto) {
    return this.auxilioService.create(createAuxilioDto);
  }

  @Get('/elegivel/:id')
  async findElegiveis(@Param('id') id: number) {
    return this.auxilioService.findAuxiliosElegiveis(id);
  }
  @Get('/inscrito/:id')
  async findInscritos(@Param('id') id: number) {
    return this.auxilioService.findAuxiliosInscritos(id);
  }

  @Get()
  async findAll() {
    return this.auxilioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.auxilioService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuxilioDto: UpdateAuxilioDto) {
    return this.auxilioService.update(+id, updateAuxilioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.auxilioService.remove(+id);
  }
}
