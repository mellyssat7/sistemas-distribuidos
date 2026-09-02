import { Injectable } from '@nestjs/common';

export type Papel = 'solicitante' | 'gestor' | 'auditor';

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  senhaHash: string;
  papel: Papel;
  ativo: boolean;
};

export type UsuarioAutenticado = Omit<Usuario, 'senhaHash'>;

@Injectable()
export class UsuariosService {
  private readonly usuarios: Usuario[] = [
    {
      id: 1,
      nome: 'Ana Lima',
      email: 'ana@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'gestor',
      ativo: true,
    },
    {
      id: 2,
      nome: 'Bruno Silva',
      email: 'bruno@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'solicitante',
      ativo: true,
    },
    {
      id: 3,
      nome: 'Carla Costa',
      email: 'carla@empresa.com',
      senhaHash:
        '$2b$12$5S9LDbR3FznMAsZY5P..2OKE932dOHeVvGrmlfklgquClbkKgUidC',
      papel: 'auditor',
      ativo: true,
    },
    {
      id: 4,
      nome: 'Melyssa',
      email: 'melyssa.t@escolar.ifrn.edu.br',
      senhaHash:
        '$2b$12$PUqHBRCJ6BTvYleGlw0zLeZhT7ogjBzZhXJbXMb5rFYMv8mGA1Qvm',
      papel: 'gestor',
      ativo: true,
    },
    {
      id: 5,
      nome: 'Silva',
      email: 'silva@escolar.ifrn.edu.br',
      senhaHash:
        '$2b$12$O29dzzLX3fc2mRfRd9swiOLo7/Tgoq98m3JDJ7Z4e3iBE/DM3E8YW',
      papel: 'auditor',
      ativo: true,
    },
  ];

  buscarPorEmail(email: string) {
    return this.usuarios.find((usuario) => usuario.email === email);
  }
}