import { Injectable } from '@nestjs/common';
import { CreateCondicaoDto } from './dto/create-condicao.dto';
import { UpdateCondicaoDto } from './dto/update-condicao.dto';

@Injectable()
export class CondicaoService {
  create(createCondicaoDto: CreateCondicaoDto) {
    return 'This action adds a new condicao';
  }

  findAll() {
    return `This action returns all condicao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} condicao`;
  }

  update(id: number, updateCondicaoDto: UpdateCondicaoDto) {
    return `This action updates a #${id} condicao`;
  }

  remove(id: number) {
    return `This action removes a #${id} condicao`;
  }
}
