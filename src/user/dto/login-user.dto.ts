import { IsEmail, IsString, IsNotEmpty } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty({ message: 'O campo Email deve ser preenchido' })
    @IsString()
    cpf: string;
    
    @IsNotEmpty({ message: 'O campo Senha deve ser preenchido' })
    @IsString()
    senha: string;
    
}