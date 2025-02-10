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
        cpf, data_nascimento, responsavelId,
        email, senha, tipo
      } = createUserDto;
  
      // Chama a função criada no banco de dados, passando os parâmetros
      const usuarioId = await this.prisma.$queryRaw`SELECT criar_usuario(
        ${cep}, 
        ${estado}, 
        ${municipio}, 
        ${bairro}, 
        ${complemento},
        
        ${cpf}, 
        ${data_nascimento}, 
        ${responsavelId}, 
  
        ${email}, 
        ${senha}, 
        ${tipo}
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

  async findUserByEmail(email: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
  
    if (!usuario) {
      throw new NotFoundException(`O usuário com o id ${email} não foi encontrado`);
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
        where: {cidadaoId: cidadao.id}
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
