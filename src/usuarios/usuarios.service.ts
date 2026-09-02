import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  private readonly usuarios = [
    {
      id: 1,
      nome: 'Ana Lima',
      email: 'ana@empresa.com',
      senhaHash: bcrypt.hashSync('123456', 10),
      papel: 'gestor',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Bruno Silva',
      email: 'bruno@empresa.com',
      senhaHash: bcrypt.hashSync('123456', 10),
      papel: 'solicitante',
      ativo: true,
    },
    {
      id: 3,
      nome: 'Carla Souza',
      email: 'carla@empresa.com',
      senhaHash: bcrypt.hashSync('123456', 10),
      papel: 'auditor',
      ativo: true,
    },
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find(
      (usuario) => usuario.email === email,
    );
  }
}