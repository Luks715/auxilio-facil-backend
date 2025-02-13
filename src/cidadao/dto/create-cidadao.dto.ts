import { IsNotEmpty, IsString, Length, IsDate, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class ConnectCondicaoDto {
  @IsNotEmpty()
  id: number; // Somente o ID da Condição
}

class ConnectEnderecoDto {
  @IsNotEmpty()
  id: number; // Somente o ID do Endereço
}

export class CreateCidadaoDto {
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @IsString()
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
  cpf: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  nome: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @IsDate()
  @Type(() => Date)
  data_nascimento: Date;

  @IsNotEmpty({ message: 'O endereço principal é obrigatório' })
  @ValidateNested()
  @Type(() => ConnectEnderecoDto)
  endereco_principal: ConnectEnderecoDto; // Formato para conectar um endereço existente

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConnectCondicaoDto)
  condicoes: ConnectCondicaoDto[]; // Lista de IDs para conectar condições existentes
}
