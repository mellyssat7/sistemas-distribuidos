import { Injectable, NotFoundException } from '@nestjs/common';

type StatusSolicitacao = 'pendente' | 'aprovada';

type Solicitacao = {
  id: number;
  titulo: string;
  status: StatusSolicitacao;
};

@Injectable()
export class SolicitacoesService {
  private readonly solicitacoes: Solicitacao[] = [
    {
      id: 1,
      titulo: 'Aquisição de notebook',
      status: 'pendente',
    },
    {
      id: 2,
      titulo: 'Compra de monitor',
      status: 'aprovada',
    },
    {
      id: 3,
      titulo: 'Aquisição de teclado',
      status: 'pendente',
    },
  ];

  buscarPorId(id: number) {
    const solicitacao = this.solicitacoes.find((item) => item.id === id);

    if (!solicitacao) {
      throw new NotFoundException('Solicitação não encontrada');
    }

    return solicitacao;
  }

  aprovar(id: number) {
    const solicitacao = this.buscarPorId(id);

    solicitacao.status = 'aprovada';

    return solicitacao;
  }

  relatorio() {
    const total = this.solicitacoes.length;
    const porStatus: Record<string, number> = {};

    for (const solicitacao of this.solicitacoes) {
      porStatus[solicitacao.status] = (porStatus[solicitacao.status] || 0) + 1;
    }

    return { total, porStatus };
  }
}