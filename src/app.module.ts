import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CidadaoModule } from './cidadao/cidadao.module';
import { CondicaoModule } from './condicao/condicao.module';
import { RequisitoModule } from './requisito/requisito.module';
import { AuxilioModule } from './auxilio/auxilio.module';
import { NotificacoesModule } from './notificacoes/notificacoes.module';

@Module({
  imports: [UserModule, CidadaoModule, CondicaoModule, RequisitoModule, AuxilioModule, NotificacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
