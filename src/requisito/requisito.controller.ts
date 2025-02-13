import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequisitoService } from './requisito.service';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito.dto';

@Controller('requisito')
export class RequisitoController {
  constructor(private readonly requisitoService: RequisitoService) {}

  @Post()
  async create(@Body() createRequisitoDto: CreateRequisitoDto) {
    return this.requisitoService.create(createRequisitoDto);
  }

  @Get()
  async findAll() {
    return this.requisitoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requisitoService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRequisitoDto: UpdateRequisitoDto) {
    return this.requisitoService.update(+id, updateRequisitoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.requisitoService.remove(+id);
  }
}
