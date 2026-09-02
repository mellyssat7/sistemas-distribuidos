import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { SolicitacoesService } from './solicitacoes.service';

@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(
    private readonly solicitacoesService: SolicitacoesService,
  ) {}

  @Get(':id')
  buscarPorId(@Param('id', ParseIntPipe) id: number) {
    return this.solicitacoesService.buscarPorId(id);
  }
}