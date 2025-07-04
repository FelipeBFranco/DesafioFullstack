"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'Token não fornecido.' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { sub } = decoded;
        req.userId = sub;
        next();
    }
    catch {
        res.status(401).json({ message: 'Token inválido.' });
    }
}
