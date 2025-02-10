import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCidadaoDto {
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @IsString()
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
  cpf: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  data_nascimento: Date;

  @IsOptional()
  responsavelId?: number;

  @IsNotEmpty()
  enderecoId: number
}