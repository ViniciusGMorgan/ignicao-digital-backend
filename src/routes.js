import { Router } from "express";

import authMiddleware from "./app/middlewares/auth";
import SessionController from "./app/controllers/SessionController";
import ClientController from "./app/controllers/ClientController";
import UserController from "./app/controllers/UserController";

const routes = new Router();

routes.post("/sessions", SessionController.store);
routes.post("/users", UserController.store);

routes.use(authMiddleware);
routes.get("/users", UserController.index);

routes.get("/clients", ClientController.index);
routes.get("/clients/:clientId", ClientController.indexById);
routes.delete("/clients/:clientId", ClientController.delete);
routes.put("/clients", ClientController.update);
routes.post("/clients", ClientController.store);

export default routes;
