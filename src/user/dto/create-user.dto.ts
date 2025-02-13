import { IsString, IsOptional, IsInt, IsDate, IsEmail } from 'class-validator';
import { Condicao } from '@prisma/client';

export class CreateUserDto {
  // Parâmetros do Endereço
  @IsString()
  cep: string;

  @IsString()
  estado: string;

  @IsInt()
  municipio: number;

  @IsString()
  bairro: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  // Parâmetros do Cidadão
  @IsString()
  cpf: string;

  @IsString()
  nome: string;

  @IsDate()
  data_nascimento: Date;

  // Parâmetros do Usuário
  @IsEmail()
  email: string;

  @IsOptional()
  condicoes?: Condicao[];  // Agora você pode passar um array de condições

  @IsString()
  senha: string;

  @IsString()
  tipo: string;  // Pode ser 'cidadao', 'administrador', 'gestor'
}
