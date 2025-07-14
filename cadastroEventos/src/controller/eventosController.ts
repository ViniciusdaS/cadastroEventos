import { Eventos } from "../model/eventosModel";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";

const eventosRepository = AppDataSource.getRepository(Eventos);

export class EventosController {
    async criarEvento(req: Request, res: Response) {
        const { nome, local, data } = req.body;

        if (!nome || !local || !data) {
            res.status(400).json({ mensagem: "Preencha os campos!" });
        }

        const evento = new Eventos(nome, local, data);

        try {
            await eventosRepository.save(evento);
            res.status(201).json({ mensagem: 'Evento criado com sucesso!' })
        } catch(error) {
            console.error('Erro ao cadatrar evento: ', error);
            res.status(500).json({ message: "Erro ao registrar evento!" });
        }
    }

    async listarEvento(req: Request, res: Response) {
        const { nome, local, data } = req.body;

        const dados = nome && local && data;

        if (!nome || !local || !data) {
            res.status(201).json({dados})
        }
    }

    // Atualizar um usuário
    async atualizarEvento(req: Request, res: Response) {

        const id = Number(req.params.id);
        const { nome, local, data } = req.body;

        if (!id) {
            res.status(400).json({ mensagem: "O id é necessário!" })
            return
        }

        if (!nome || !local || !data) {
            res.status(400).json({ mensagem: "Preencha os campos!" })
            return
        }

        const evento = await eventosRepository.findOneBy({ id: Number(id) });

        if (!evento) {
            res.status(404).json({ mensagem: "Evento não encontrado" });
            return
        }

        evento.nome = nome || evento.nome;
        evento.local = local || evento.local;
        evento.data = data || evento.data

        res.status(200).json({ mensagem: "Evento atualizado com sucesso!", evento });
    };

    async deletarEvento(req: Request, res: Response) {
        const { id } = req.params;

        const evento = await eventosRepository.findOneBy({ id: Number(id) });

        if (!evento) {
            res.status(404).json({ message: 'Evento não encontrado!' });
            return;
        }

        await eventosRepository.remove(evento);

        res.status(204).send();
        return;
    }
}

