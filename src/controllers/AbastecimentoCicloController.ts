import { Request, Response } from 'express';
import AbastecimentoCiclo from '../models/AbastecimentoCiclo';
import Empresa from '../models/Empresa';

export default {
  async index(request: Request, response: Response) {
    const { 'id-empresa': id_empresa } = request.headers;

    if (!id_empresa) {
      return response.status(400).json({ erro: 'Id da empresa obrigatório' });
    }

    const empresa = await Empresa.findByPk(Number(id_empresa));

    if (!empresa) {
      return response.status(400).json({ erro: 'Empresa não existe' });
    }

    const abastecimentosCiclos = await AbastecimentoCiclo.findAll({
      where: {
        id_empresa: Number(id_empresa),
      },
    });

    return response.json(abastecimentosCiclos);
  },
};
