import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateCidadaoDto {
    @IsOptional()
    responsavelId?: number;
  
    @IsOptional()
    enderecoId: number
}