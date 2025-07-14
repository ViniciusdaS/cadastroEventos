"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = __importDefault(require("./database/data-source"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const eventosRoutes_1 = __importDefault(require("./routes/eventosRoutes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000'
    ]
}));
app.use(express_1.default.static('public'));
app.get('/', (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, '../view/public/telaCadastro/index.html'));
    return;
});
app.use('/api', usuarioRoutes_1.default);
app.use('/api', eventosRoutes_1.default);
data_source_1.default.initialize().then(() => {
    app.listen(3000, () => {
        console.log('O servidor está rodando');
    });
}).catch((error) => {
    console.log(error);
});
