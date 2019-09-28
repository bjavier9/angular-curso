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
const database_1 = __importDefault(require("../database"));
class GameController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.getConnection(function (err, connection) {
                if (err)
                    throw err;
                connection.query('SELECT * from games', (error, results, fields) => {
                    connection.release();
                    if (error)
                        throw error;
                    res.json(results);
                });
                // pool.end(function (err) {if (err) throw err});
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('SELECT * FROM games where id=?', [id], (err, results) => {
                if (err)
                    throw err;
                res.json(results[0]);
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('INSERT INTO games set ?', [req.body], function (error, results, fields) {
                if (error)
                    throw error;
                res.json({ "message": "Se inserto con exito: " + results.insertId });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const oldGame = req.body;
            yield database_1.default.query('UPDATE games set ? WHERE id = ?', [req.body, id], function (error, results, fields) {
                if (error)
                    throw error;
                res.json({ "message": "Se inserto con exito: " + results.insertId });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const game = yield database_1.default.query('DELETE FROM games where id=?', [id], (err, results) => {
                if (err)
                    throw err;
                res.json({ message: "Se borro con exito" });
            });
        });
    }
}
const gameController = new GameController();
exports.default = gameController;
