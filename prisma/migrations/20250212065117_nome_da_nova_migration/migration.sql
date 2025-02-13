-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "municipio" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condicao" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Condicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidadao" (
    "id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "endereco_principal_id" INTEGER NOT NULL,

    CONSTRAINT "Cidadao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cidadao_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requisito" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "auxilio_id" INTEGER NOT NULL,

    CONSTRAINT "Requisito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auxilio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "valor_minimo" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "tem_vagas" BOOLEAN NOT NULL,

    CONSTRAINT "Auxilio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CidadaoEnderecos" (
    "id" SERIAL NOT NULL,
    "cidadao_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CidadaoEnderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CidadaoAuxilios" (
    "id" SERIAL NOT NULL,
    "cidadao_id" INTEGER NOT NULL,
    "auxilio_id" INTEGER NOT NULL,
    "inscrito" BOOLEAN NOT NULL DEFAULT false,
    "elegivel" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CidadaoAuxilios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CidadaoDependente" (
    "id" SERIAL NOT NULL,
    "responsavel_id" INTEGER NOT NULL,
    "dependente_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CidadaoDependente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "sedeId" INTEGER,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Escola" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    "empresa_id" INTEGER,

    CONSTRAINT "Escola_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CidadaoEscolas" (
    "id" SERIAL NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "escola_id" INTEGER NOT NULL,
    "matricula" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "CidadaoEscolas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CidadaoEmpresas" (
    "id" SERIAL NOT NULL,
    "funcionario_id" INTEGER NOT NULL,
    "empresa_id" INTEGER NOT NULL,
    "salario" INTEGER NOT NULL,

    CONSTRAINT "CidadaoEmpresas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "cidadao_id" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserNotificacoes" (
    "id" SERIAL NOT NULL,
    "cidadao_id" INTEGER NOT NULL,
    "notificacao_id" INTEGER NOT NULL,
    "lida" BOOLEAN NOT NULL,

    CONSTRAINT "UserNotificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CidadaoToCondicao" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cidadao_cpf_key" ON "Cidadao"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cidadao_id_key" ON "Usuario"("cidadao_id");

-- CreateIndex
CREATE UNIQUE INDEX "CidadaoAuxilios_cidadao_id_auxilio_id_key" ON "CidadaoAuxilios"("cidadao_id", "auxilio_id");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_cnpj_key" ON "Empresa"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Empresa_endereco_id_key" ON "Empresa"("endereco_id");

-- CreateIndex
CREATE UNIQUE INDEX "Escola_endereco_id_key" ON "Escola"("endereco_id");

-- CreateIndex
CREATE UNIQUE INDEX "_CidadaoToCondicao_AB_unique" ON "_CidadaoToCondicao"("A", "B");

-- CreateIndex
CREATE INDEX "_CidadaoToCondicao_B_index" ON "_CidadaoToCondicao"("B");

-- AddForeignKey
ALTER TABLE "Cidadao" ADD CONSTRAINT "Cidadao_endereco_principal_id_fkey" FOREIGN KEY ("endereco_principal_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requisito" ADD CONSTRAINT "Requisito_auxilio_id_fkey" FOREIGN KEY ("auxilio_id") REFERENCES "Auxilio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEnderecos" ADD CONSTRAINT "CidadaoEnderecos_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEnderecos" ADD CONSTRAINT "CidadaoEnderecos_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoAuxilios" ADD CONSTRAINT "CidadaoAuxilios_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoAuxilios" ADD CONSTRAINT "CidadaoAuxilios_auxilio_id_fkey" FOREIGN KEY ("auxilio_id") REFERENCES "Auxilio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoDependente" ADD CONSTRAINT "CidadaoDependente_responsavel_id_fkey" FOREIGN KEY ("responsavel_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoDependente" ADD CONSTRAINT "CidadaoDependente_dependente_id_fkey" FOREIGN KEY ("dependente_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_sedeId_fkey" FOREIGN KEY ("sedeId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escola" ADD CONSTRAINT "Escola_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Escola" ADD CONSTRAINT "Escola_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEscolas" ADD CONSTRAINT "CidadaoEscolas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEscolas" ADD CONSTRAINT "CidadaoEscolas_escola_id_fkey" FOREIGN KEY ("escola_id") REFERENCES "Escola"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEmpresas" ADD CONSTRAINT "CidadaoEmpresas_funcionario_id_fkey" FOREIGN KEY ("funcionario_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CidadaoEmpresas" ADD CONSTRAINT "CidadaoEmpresas_empresa_id_fkey" FOREIGN KEY ("empresa_id") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificacoes" ADD CONSTRAINT "UserNotificacoes_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "Cidadao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserNotificacoes" ADD CONSTRAINT "UserNotificacoes_notificacao_id_fkey" FOREIGN KEY ("notificacao_id") REFERENCES "Notificacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CidadaoToCondicao" ADD CONSTRAINT "_CidadaoToCondicao_A_fkey" FOREIGN KEY ("A") REFERENCES "Cidadao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CidadaoToCondicao" ADD CONSTRAINT "_CidadaoToCondicao_B_fkey" FOREIGN KEY ("B") REFERENCES "Condicao"("id") ON DELETE CASCADE ON UPDATE CASCADE;
