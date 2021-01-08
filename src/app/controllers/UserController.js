import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async userExist(req, res) {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.json(true);
    } else {
      return res.json(false);
    }
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      name: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Verifique os campos enviados" });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: "Usuário já existe" });
    }

    const { id, email, name } = await User.create(req.body);

    return res.json({ id, email, name });
  }
}

export default new UserController();
