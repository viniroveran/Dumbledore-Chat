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
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("./services/socket"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const socketService = new socket_1.default();
        const httpServer = http_1.default.createServer();
        const PORT = process.env.PORT ? process.env.PORT : 8000;
        socketService.io.attach(httpServer);
        httpServer.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
        socketService.initListeners();
    });
}
init();
