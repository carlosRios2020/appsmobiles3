"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Token = /** @class */ (function () {
    function Token() {
    }
    Token.prototype.contructor = function () { };
    Token.getJwtToken = function (payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    };
    Token.comprobarToken = function (userToken) {
        var _this = this;
        var decoded = jsonwebtoken_1.default.verify(userToken, this.seed);
        console.log(decoded);
        return new Promise(function (resolve, reject) {
            jsonwebtoken_1.default.verify(userToken, _this.seed, function (err, decoded) {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    };
    Token.seed = 'seed-de-prueba';
    Token.caducidad = '30d';
    return Token;
}());
exports.default = Token;
