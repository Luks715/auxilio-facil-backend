import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCidadaoDto } from './create-cidadao.dto';

export class CreateDependenteDto {
  @IsNotEmpty()
  @IsNumber()
  responsavelId: number;

  @IsNotEmpty()
  @ValidateNested() // Valida o objeto createCidadao
  @Type(() => CreateCidadaoDto) // Especifica o tipo do objeto para validação
  createCidadao: CreateCidadaoDto;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  status: string;
}