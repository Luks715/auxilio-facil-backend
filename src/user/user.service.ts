import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConnectUserDto } from './dto/connect-user.dto';
import { CidadaoService } from 'src/cidadao/cidadao.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService, 
    private readonly cidadaoService: CidadaoService, 
  ) {}

  async connect(connectUserDto: ConnectUserDto): Promise<boolean> {
    try {
      const usuario = await this.prisma.usuario.create({
        data: connectUserDto,
      });
      return true; // Retorna true se o usuário for criado com sucesso
    } catch (error) {
      return false;
    }
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    try {
      const { 
        cep, estado, municipio, bairro, complemento,
        cpf, nome, data_nascimento, condicoes,
        email, senha, tipo
      } = createUserDto;

      // Converte as condições para um array de IDs, caso existam
      const condicoesIds = condicoes ? condicoes.map(cond => cond.id) : [];
  
      // Chama a função criada no banco de dados, passando os parâmetros
      const usuarioId = await this.prisma.$queryRaw`SELECT criar_usuario(
        ${cep}, 
        ${estado}, 
        ${municipio}, 
        ${bairro}, 
        ${complemento},
        
        ${cpf}, 
        ${nome}, 
        ${data_nascimento}, 
  
        ${email}, 
        ${senha}, 
        ${tipo}, 

        ${condicoes}
      )`;
  
      return true; // Retorna true se o usuário for criado com sucesso
    } catch (error) {
      return false;
    }
  }

  async findAll() {
    const users = await this.prisma.usuario.findMany();
    return users;
  }

  async findModelUserByCpf(cpf: string) {
    if (!cpf) {
        throw new Error("CPF não foi fornecido");
    }

    // Verifica se o CIDADAO foi encontrado
    const cidadao = await this.cidadaoService.findCidadaoByCpf(cpf);

    if (!cidadao || !cidadao.id) {
        throw new NotFoundException(`Cidadao com CPF ${cpf} não encontrado ou sem ID válido`);
    }

    // Verifica se o usuário com esse cidadao_id existe
    const usuario = await this.prisma.usuario.findUnique({
        where: { cidadao_id: cidadao.id },
    });

    if (!usuario) {
        throw new NotFoundException(`O usuário com o cpf ${cpf} não foi encontrado`);
    }

    return usuario;
}


  async findUserByEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
  
    if (!usuario) {
      throw new NotFoundException(`O usuário com o email ${email} não foi encontrado`);
    }
  
    return usuario;
  }

  async findUserByCpf (cpf: string) {
    try {
      const cidadao = await this.cidadaoService.findCidadaoByCpf(cpf);

      if (!cidadao) {
        return 2;
      }

      const user = await this.prisma.usuario.findUnique({
        where: {cidadao_id: cidadao.id}
      });

      if (user) {
        return 1;
      } else {
        return 0;
      }
    } catch (error) {
      // Tratamento de erros (opcional, mas recomendado)
      console.error('Erro ao buscar usuário por CPF:', error);
      throw new Error('Erro ao processar a solicitação');
    }
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id }
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.usuario.update({
      where: { id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
