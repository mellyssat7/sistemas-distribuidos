import { Injectable } from '@nestjs/common';

@Injectable()
export class UsuariosService {
  private readonly usuarios = [
    {
      id: 1,
      nome: 'Ana Lima',
      email: 'ana@empresa.com',
      senha: '123456',
      papel: 'gestor',
      ativo: true,
    },
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}