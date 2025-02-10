import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuxilioService } from './auxilio.service';
import { CreateAuxilioDto } from './dto/create-auxilio.dto';
import { UpdateAuxilioDto } from './dto/update-auxilio.dto';

@Controller('auxilio')
export class AuxilioController {
  constructor(private readonly auxilioService: AuxilioService) {}

  @Post()
  create(@Body() createAuxilioDto: CreateAuxilioDto) {
    return this.auxilioService.create(createAuxilioDto);
  }

  @Get('/elegivel/:id')
  findElegiveis(@Param('id') id: number) {
    return this.auxilioService.findAuxiliosElegiveis(id);
  }
  @Get('/inscrito/:id')
  findInscritos(@Param('id') id: number) {
    return this.auxilioService.findAuxiliosInscritos(id);
  }

  @Get()
  findAll() {
    return this.auxilioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auxilioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuxilioDto: UpdateAuxilioDto) {
    return this.auxilioService.update(+id, updateAuxilioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auxilioService.remove(+id);
  }
}
