import * as Yup from "yup";

import Client from "../models/Client";

class ClientController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const Clients = await Client.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      order: [["order", "ASC"]],
    });
    return res.json(Clients);
  }

  async indexById(req, res) {
    const Client = await Client.findByPk(req.params.ClientId);

    return res.json(Client);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      tags: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Verifique os campos enviados" });
    }

    await Client.create(req.body);

    return res.status(200);
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

    const Client = await Client.findByPk(id);

    await Client.update(req.body);

    return res.json(200);
  }
}

export default new ClientController();
