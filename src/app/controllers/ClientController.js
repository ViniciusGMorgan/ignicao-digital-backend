import * as Yup from "yup";

import Client from "../models/Client";

class ClientController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const Clients = await Client.findAll({
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(Clients);
  }

  async indexById(req, res) {
    const client = await Client.findByPk(req.params.clientId);

    return res.json(client);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      tags: Yup.string().required(),
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Verifique os campos enviados" });
    }

    const clientExists = await Client.findOne({
      where: { email: req.body.email },
    });

    if (clientExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const { id, email, name } = await Client.create(req.body);

    return res.json({ id, email, name });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      tags: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Verifique os campos enviados" });
    }

    const client = await Client.findByPk(req.body.id);

    const { id, email, tags, name } = await client.update(req.body);

    return res.json({ id, email, tags, name });
  }

  async delete(req, res) {
    const client = await Client.findByPk(req.params.clientId);

    await client.destroy();

    return res.json({ message: "Deletado com sucesso" });
  }
}

export default new ClientController();
