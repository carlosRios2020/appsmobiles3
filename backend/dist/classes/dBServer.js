"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dB = void 0;
var mysql_1 = __importDefault(require("mysql"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var dBServer = /** @class */ (function () {
    function dBServer() {
        this.con = mysql_1.default.createConnection({
            host: "localhost",
            user: "admin",
            password: "admin",
            database: "prueba"
        });
    }
    dBServer.prototype.start = function () {
        this.con.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log('connected');
        });
    };
    dBServer.prototype.compararPassword = function (passworddB, passwordUser) {
        if (bcrypt_1.default.compareSync(passworddB, passwordUser)) {
            console.log(passworddB);
            console.log(passwordUser);
            return true;
        }
        else {
            return false;
        }
    };
    return dBServer;
}());
exports.dB = new dBServer();
