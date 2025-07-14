import express, { Application } from "express"; 
import AppDataSource from "./database/data-source";
import routes from './routes/usuarioRoutes'
import eventRoutes from './routes/eventosRoutes'
import { Request, Response } from 'express'
import cors from 'cors';
import path from 'path'; 

const app: Application = express(); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
    ]
}));

app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(path.join(__dirname, '../view/public/telaCadastro/index.html'))
    return; 
})

app.use('/api', routes); 
app.use('/api', eventRoutes);

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log('O servidor está rodando')
    })
}).catch((error) => {
    console.log(error); 
})

