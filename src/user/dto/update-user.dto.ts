import { IsInt, IsOptional, IsNotEmpty, IsStrongPassword, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsStrongPassword()
    senha: string;
}
