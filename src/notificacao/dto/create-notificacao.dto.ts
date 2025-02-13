import { IsInt, IsString } from "class-validator";

export class CreateNotificacaoDto {
    @IsString()
    mensagem: string;

    @IsInt()
    cidadao_id: number;
}
