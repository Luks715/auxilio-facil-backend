import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CidadaoModule } from './cidadao/cidadao.module';
import { CondicaoModule } from './condicao/condicao.module';
import { RequisitoModule } from './requisito/requisito.module';
import { AuxilioModule } from './auxilio/auxilio.module';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { AuthModule } from './auth/auth.module';
import { AnaliseModule } from './analise/analise.module';

@Module({
  imports: [UserModule, CidadaoModule, CondicaoModule, RequisitoModule, AuxilioModule, NotificacaoModule, AuthModule, AnaliseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
