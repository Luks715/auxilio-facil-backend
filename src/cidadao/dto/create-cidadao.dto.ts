import { IsNotEmpty, IsOptional, IsString, Length, IsArray } from 'class-validator';

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
  dependentes?: {
    create: {
      responsavelId: number;
      status: string;
      dependente: {
        create: { // Agora estamos criando um novo Cidadao
          cpf: string;
          nome: string;
          data_nascimento: Date;
        };
      };
    }[];
  };

  @IsNotEmpty({ message: 'O endereço é obrigatório' })
  enderecos: { 
    create: { // Aqui, estamos criando um novo CidadaoEndereco
      enderecoId: number;
    }[];
  };

  @IsOptional()
  condicoes?: { 
    create: { // Criando uma nova condição
      condicaoId: number; 
      data_inicio: Date; // Agora data_inicio é obrigatória
      valido_ate?: Date; 
    }[]; 
  };

  @IsOptional()
  auxilios?: { 
    create: { 
      auxilioId: number;
      nome: string; // Agora incluímos os campos necessários
      valor_minimo: number;
      descricao: string;
      informacoes_extras?: string;
      tem_vagas: boolean;
    }[]; 
  };
}