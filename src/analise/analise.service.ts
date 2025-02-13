// analise.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cidadao } from '@prisma/client';
import { CidadaoService } from 'src/cidadao/cidadao.service';

@Injectable()
export class AnaliseService {
  constructor(private readonly prisma: PrismaService,
              private readonly cidadaoService: CidadaoService
  ) {}

    async novo_bolsa_familia(id: number) {
        console.log(id);
        console.log("BBBBBBBBBBB");

        const responsavel = await this.prisma.cidadao.findUnique({
            where: { id },
            include: { 
                registro_dependentes: { 
                    include: { 
                        dependente: { 
                            include: {
                                endereco_principal: true
                            }
                        }
                    }  
                },
            }
        });

        if (!responsavel) {
            throw new Error(`Cidadão com ID ${id} não encontrado.`);
        }
        

        let membros_aptos = 0;
        let registroEmpresa = await this.prisma.cidadaoEmpresas.findFirst({
            where: { funcionario_id: responsavel.id },
        });

        let renda_casa;

        if (registroEmpresa) {
            renda_casa = registroEmpresa.salario;
        } else {
            renda_casa = 0;
            return true;
        }

        for (const registro of responsavel.registro_dependentes) {
            // Verificar se o endereço do dependente é o mesmo do responsável
            if (registro.dependente.endereco_principal_id === responsavel.endereco_principal_id) {

                const dataNascimento = new Date(registro.dependente.data_nascimento);
                const dataLimite = new Date();
                dataLimite.setFullYear(dataLimite.getFullYear() - 18);

                if (registro.status === 'Cônjuge') {
                    membros_aptos += 1;
                
                // Regra de negócio alterada para que menores de 18 anos tenham que estar matriculados na escola
                // Para que a família possa receber o benefício do bolsa família
                } else if (registro.dependente.data_nascimento < dataLimite) { 
                    if (await this.isEstudante(registro.dependente)) {
                        membros_aptos += 1;
                    } else {
                        // Se algum menor de idade da família não estiver matriculado,
                        // a família perde o direito ao bolsa família
                        return false;
                    }
                } 
            }
        }

        // Verificar a renda e membros aptos
        if (renda_casa / membros_aptos < (1510 / 2)) { // Meio salário mínimo
            await this.prisma.cidadaoAuxilios.create({
                data: {
                    cidadao_id: responsavel.id,
                    auxilio_id: 1, // Assumindo ID 1 para Bolsa Família
                    inscrito: false,
                    elegivel: true,
                },
            });
        }
    }

    async bolsa_familia_antigo(cidadaoId: number) {
        const responsavel = await this.prisma.cidadao.findUnique({
            where: { id: cidadaoId },
            include: { 
                registro_dependentes: { 
                    include: { 
                        dependente: { 
                            include: {
                                endereco_principal: true
                            }
                        }
                    }  
                },
            }
        });
  
        let membros_aptos = 0;
        let registroEmpresa = await this.prisma.cidadaoEmpresas.findFirst({
            where: { funcionario_id: responsavel.id },
        });
    
        const renda_casa = registroEmpresa ? registroEmpresa.salario : 0;
    
        // Processar dependentes
        for (const registro of responsavel.registro_dependentes) {
            // Verificar se o endereço do dependente é o mesmo do responsável
            if (registro.dependente.endereco_principal_id === responsavel.endereco_principal_id) {
                if (registro.status === 'Cônjuge') {
                    membros_aptos += 1;
                } else if (registro.dependente.data_nascimento < new Date('2007-01-01')) { // Menor que 18 anos
                    membros_aptos += 1;
                } else if (registro.dependente.data_nascimento < new Date('2004-01-01') && await this.isEstudante(registro.dependente)) {
                    membros_aptos += 1;
                } else if (registro.dependente.data_nascimento > new Date('1964-01-01')) { // Mais de 60 anos
                    membros_aptos += 1;
                }
            }
        }
    
        // Verificar a renda e membros aptos
        if (renda_casa / membros_aptos < (1510 / 2)) { // Meio salário mínimo
        await this.prisma.cidadaoAuxilios.create({
            data: {
            cidadao_id: responsavel.id,
            auxilio_id: 1, // Assumindo ID 1 para Bolsa Família
            inscrito: false,
            elegivel: true,
            },
        });
        }
    }

    async auxilio_brasil(cidadao: Cidadao) {
        // Implementação para o Auxílio Brasil
    }

    async auxilio_desemprego(cidadao: Cidadao) {
        // Implementação para o Auxílio Desemprego
    }

    async prestacao_continuada(cidadao: Cidadao) {
        // Implementação para Prestação Continuada
    }

  private async isEstudante(cidadao: Cidadao) {
    // Verificar se o cidadão está matriculado em uma instituição de ensino
    const matricula = await this.prisma.cidadaoEscolas.findMany({
      where: { aluno_id: cidadao.id },
    });

    for (const aluno of matricula) {
        if (aluno.ativo) {
            return true;
        }
    }
    return false;
  }
}
