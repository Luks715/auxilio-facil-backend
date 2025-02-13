import { Injectable } from '@nestjs/common';
import { CreateCidadaoDto } from './dto/create-cidadao.dto';
import { UpdateCidadaoDto } from './dto/update-cidadao.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDependenteDto } from './dto/create-dependente.dto';

@Injectable()
export class CidadaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCidadaoDto: CreateCidadaoDto) {
    const { condicoes, endereco_principal, ...rest } = createCidadaoDto;
  
    const cidadao = await this.prisma.cidadao.create({
      data: {
        ...rest,
        endereco_principal: {
          connect: { id: endereco_principal.id },
        },
        condicoes: {
          connect: condicoes.map((condicao) => ({ id: condicao.id })),
        },
      },
    });
  
    return cidadao;
  }
  


  //async create(createCidadaoDto: CreateCidadaoDto) {
  //  const cidadao = await this.prisma.cidadao.create({
  //    data: createCidadaoDto,
  //  });
  //  return cidadao;
  //}

  async createDependente(createDependenteDto: CreateDependenteDto) {
    const cidadaoExistente = await this.findCidadaoByCpf(createDependenteDto.createCidadao.cpf);
  
    if (cidadaoExistente) {
      return false;
    } else {
      const dependente = await this.create(createDependenteDto.createCidadao);
  
      await this.prisma.cidadaoDependente.create({
        data: {
          responsavel_id: createDependenteDto.responsavelId,
          dependente_id: dependente.id,
          status: createDependenteDto.status,
        },
      });
  
      return dependente; // Retorna o dependente recém-criado
    }
  }

  async findCidadaoByCpf(cpf: string) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { cpf },
      include: {
        registro_dependentes: {
          include: {
            dependente: true,
          }
        },
        registro_auxilios: {
          include: {
            auxilio: true, // Incluindo as informações do auxílio
          },
        },
        registro_enderecos: true,
        // registro_condicoes: true,
        registro_notificacoes: true,
      },
    });
    return cidadao;
  }
  

  async findAll() {
    const cidadaos = await this.prisma.cidadao.findMany({
      include: {
        registro_dependentes: true,
        registro_auxilios: true,
        registro_enderecos: true,
        //registro_condicoes: true,
        registro_notificacoes: true,
      },
    });
    return cidadaos;
  }

  async findOne(id: number) {
    const cidadao = await this.prisma.cidadao.findUnique({
      where: { id },
      include: {
        registro_dependentes: true,
        registro_auxilios: true,
        registro_enderecos: true,
        //registro_condicoes: true,
        registro_notificacoes: true,
      },
    });
    return cidadao;
  }

  async update(id: number, updateCidadaoDto: UpdateCidadaoDto) {
    const cidadao = await this.prisma.cidadao.update({
      where: { id },
      data: updateCidadaoDto,
    });
    return cidadao;
  }

  async remove(id: number) {
    const cidadao = await this.prisma.cidadao.delete({
      where: { id },
    });
    return cidadao;
  }
}
