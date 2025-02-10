import { IsDateString, IsInt, IsOptional, IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ConnectUserDto {
    @IsNotEmpty({ message: 'O campo Email deve ser preenchido' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({ message: 'O campo Senha deve ser preenchido' })
    @IsStrongPassword()
    senha: string;

    @IsInt()
    tipo: string;

    @IsInt({ message: 'O ID do cidadão deve ser um número inteiro' })
    cidadaoId: number;
}
