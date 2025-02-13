import { IsString } from "class-validator";

export class CreateCondicaoDto {
    @IsString()
    tipo: string;
}
