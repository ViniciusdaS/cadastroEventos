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
exports.EventosController = void 0;
const eventosModel_1 = require("../model/eventosModel");
const data_source_1 = __importDefault(require("../database/data-source"));
const eventosRepository = data_source_1.default.getRepository(eventosModel_1.Eventos);
class EventosController {
    criarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, local, data } = req.body;
            if (!nome || !local || !data) {
                res.status(400).json({ mensagem: "Preencha os campos!" });
            }
            const evento = new eventosModel_1.Eventos(nome, local, data);
            try {
                yield eventosRepository.save(evento);
                res.status(201).json({ mensagem: 'Evento criado com sucesso!' });
            }
            catch (error) {
                console.error('Erro ao cadatrar evento: ', error);
                res.status(500).json({ message: "Erro ao registrar evento!" });
            }
        });
    }
    listarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, local, data } = req.body;
            const dados = nome && local && data;
            if (!nome || !local || !data) {
                res.status(201).json({ dados });
            }
        });
    }
    // Atualizar um usuário
    atualizarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { nome, local, data } = req.body;
            if (!id) {
                res.status(400).json({ mensagem: "O id é necessário!" });
                return;
            }
            if (!nome || !local || !data) {
                res.status(400).json({ mensagem: "Preencha os campos!" });
                return;
            }
            const evento = yield eventosRepository.findOneBy({ id: Number(id) });
            if (!evento) {
                res.status(404).json({ mensagem: "Evento não encontrado" });
                return;
            }
            evento.nome = nome || evento.nome;
            evento.local = local || evento.local;
            evento.data = data || evento.data;
            res.status(200).json({ mensagem: "Evento atualizado com sucesso!", evento });
        });
    }
    ;
    deletarEvento(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const evento = yield eventosRepository.findOneBy({ id: Number(id) });
            if (!evento) {
                res.status(404).json({ message: 'Evento não encontrado!' });
                return;
            }
            yield eventosRepository.remove(evento);
            res.status(204).send();
            return;
        });
    }
}
exports.EventosController = EventosController;
