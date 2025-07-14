import { Router } from "express";
import { UserController } from "../controller/usuarioController";

const controller = new UserController; 
const router = Router(); 

router.post('/usuarios', controller.criarUsuario); 
router.post('/usuarios/login', controller.Login);
router.get('/usuarios', controller.listarUsuario);
router.put('/usuarios', controller.atualizarUsuario);
router.delete('/usuarios', controller.deletarUsuario);

export default router;  