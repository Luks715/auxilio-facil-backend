import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAuxilioDto } from './dto/create-auxilio.dto';
import { UpdateAuxilioDto } from './dto/update-auxilio.dto';

@Injectable()
export class AuxilioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAuxilioDto: CreateAuxilioDto) {
    return 'This action adds a new auxilio';
  }

  async findAuxiliosInscritos(cidadaoId: number) {
    const auxilios = await this.prisma.cidadaoAuxilios.findMany({
        where: {
            cidadao_id: cidadaoId,
            inscrito: true,
        }
    });

    return auxilios;
  } 

  async findAuxiliosElegiveis(cidadaoId: number) {
    const auxilios = await this.prisma.cidadaoAuxilios.findMany({
        where: {
            cidadao_id: cidadaoId,
            elegivel: true,
            inscrito: false
        }
    });

    return auxilios;
  }

  async findAll() {
    const auxilios = await this.prisma.auxilio.findMany();
    return auxilios;
  }

  async findOne(id: number) {
    return `This action returns a #${id} auxilio`;
  }

  async update(id: number, updateAuxilioDto: UpdateAuxilioDto) {
    return `This action updates a #${id} auxilio`;
  }

  async remove(id: number) {
    return `This action removes a #${id} auxilio`;
  }
}
