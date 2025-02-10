import { IsEmail, IsString, IsNotEmpty } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty({ message: 'O campo Email deve ser preenchido' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;
    
    @IsNotEmpty({ message: 'O campo Senha deve ser preenchido' })
    @IsString()
    senha: string;
    
}