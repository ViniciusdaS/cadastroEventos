"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const usuarioModel_1 = require("../model/usuarioModel");
const data_source_1 = __importDefault(require("../database/data-source"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = data_source_1.default.getRepository(usuarioModel_1.Usuarios);
class UserController {
    criarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                res.status(400).json({ "message": "Preencha os campos" });
            }
            const usuario = new usuarioModel_1.Usuarios(nome, email, senha);
            const novoUsuario = userRepository.create(usuario);
            yield userRepository.save(novoUsuario);
            res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
        });
    }
    listarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            const dados = nome && email && senha;
            if (!nome || !email || !senha) {
                res.status(201).json(dados);
            }
        });
    }
    // Atualizar um usuário
    atualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { nome, email, senha } = req.body;
            if (!id) {
                res.status(400).json({ mensagem: "O id é necessário!" });
                return;
            }
            if (!nome || !email || !senha) {
                res.status(400).json({ mensagem: "Preencha os campos!" });
                return;
            }
            const usuario = yield userRepository.findOneBy({ id: Number(id) });
            if (!usuario) {
                res.status(404).json({ mensagem: "Usuário não encontrado" });
                return;
            }
            usuario.nome = nome || usuario.nome;
            usuario.email = email || usuario.email;
            usuario.senha = senha || usuario.senha;
            res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", usuario });
        });
    }
    ;
    deletarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield userRepository.findOneBy({ id: Number(id) });
            if (!usuario) {
                res.status(404).json({ message: 'Usuário não encontrado!' });
                return;
            }
            yield userRepository.remove(usuario);
            res.status(204).send();
            return;
        });
    }
    Login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, email, senha } = req.body;
            if (!email || !senha) {
                res.status(400).json({ mensagem: 'Preencha os campos necessários.' });
            }
            const emailExistente = yield userRepository.findOneBy({ email });
            if (!emailExistente) {
                res.status(409).json({ mensagem: "Usuário inexistente" });
                return;
            }
            const senhaValida = yield bcryptjs_1.default.compare(senha, emailExistente.senha);
            if (!senhaValida) {
                res.status(401).json({ mensagem: "Senha inválida!" });
                return;
            }
            res.status(201).json({ mensagem: `Bem vindo ${nome}` });
        });
    }
}
exports.UserController = UserController;
