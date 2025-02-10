import { IsString, IsOptional, IsInt, IsDate, IsEmail } from 'class-validator';

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

  @IsOptional()
  @IsInt()
  responsavelId?: number;

  // Parâmetros do Usuário
  @IsEmail()
  email: string;

  @IsString()
  senha: string;

  @IsString()
  tipo: string;  // Pode ser 'cidadao', 'administrador', 'gestor'
}
