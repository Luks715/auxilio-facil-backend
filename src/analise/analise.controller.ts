// analise.controller.ts
import { Controller, Post, Param } from '@nestjs/common';
import { AnaliseService } from './analise.service';

@Controller('analise')
export class AnaliseController {
  constructor(private readonly analiseService: AnaliseService) {}

  @Post('bolsa-familia/:cidadaoId')
  async bolsaFamiliaNovo(@Param('cidadaoId') cidadaoId: number) {
    try {
      const resultado = await this.analiseService.bolsa_familia_novo(cidadaoId);
      if (!resultado) {
        return { message: 'Família não é elegível para o Bolsa Família.' };
      }
      return { message: 'Família elegível para o Bolsa Família.' };
    } catch (error) {
      return { message: 'Erro ao processar a análise.', error: error.message };
    }
  }
}
