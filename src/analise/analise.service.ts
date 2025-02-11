// analise.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cidadao } from '@prisma/client';

@Injectable()
export class AnaliseService {
  constructor(private readonly prisma: PrismaService) {}

    async bolsa_familia_novo(cidadaoId: number) {
        const responsavel = await this.prisma.cidadao.findUnique({
            where: { id: cidadaoId },
            include: { 
                CidadaoDependentes: { 
                    include: { 
                        dependente: { 
                            include: {
                                enderecoPrincipal: true
                            }
                        }
                    }  
                },
            }
        });

        let membros_aptos = 0;
        let registroEmpresa = await this.prisma.cidadaoEmpresas.findFirst({
            where: { cidadaoId: responsavel.id },
        });

        const renda_casa = registroEmpresa ? registroEmpresa.salario : 0;

        for (const registro of responsavel.CidadaoDependentes) {
            // Verificar se o endereço do dependente é o mesmo do responsável
            if (registro.dependente.enderecoPrincipalId === responsavel.enderecoPrincipalId) {

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
                    cidadaoId: responsavel.id,
                    auxilioId: 1, // Assumindo ID 1 para Bolsa Família
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
                CidadaoDependentes: { 
                    include: { 
                        dependente: { 
                            include: {
                                enderecoPrincipal: true
                            }
                        }
                    }  
                },
            }
        });
  
        let membros_aptos = 0;
        let registroEmpresa = await this.prisma.cidadaoEmpresas.findFirst({
            where: { cidadaoId: responsavel.id },
        });
    
        const renda_casa = registroEmpresa ? registroEmpresa.salario : 0;
    
        // Processar dependentes
        for (const registro of responsavel.CidadaoDependentes) {
            // Verificar se o endereço do dependente é o mesmo do responsável
            if (registro.dependente.enderecoPrincipalId === responsavel.enderecoPrincipalId) {
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
            cidadaoId: responsavel.id,
            auxilioId: 1, // Assumindo ID 1 para Bolsa Família
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
      where: { cidadaoId: cidadao.id },
    });

    for (const aluno of matricula) {
        if (aluno.ativo) {
            return true;
        }
    }
    return false;
  }
}
