import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateAuxilioDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsInt()
  @IsOptional()
  valor_minimo?: number;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  informacoes_extras?: string;
}