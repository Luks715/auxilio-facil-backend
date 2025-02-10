import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class CreateAuxilioDto {
  @IsString()
  nome: string;

  @IsInt()
  valor_minimo: number;

  @IsString()
  descricao: string;

  @IsBoolean()
  tem_vagas: boolean;

  @IsString()
  informacoes_extras: string;
}