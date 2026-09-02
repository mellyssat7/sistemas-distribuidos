import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@Module({
  imports: [AuthModule, SolicitacoesModule],
})
export class AppModule {}