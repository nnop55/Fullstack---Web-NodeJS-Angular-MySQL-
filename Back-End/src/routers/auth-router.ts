import { Router } from "express";
import { Auth } from "../controllers/auth";
import { TokenService } from "../services/token-service";
import { Database } from "../data-access/database";

export const authRouter = Router()

export class AuthRouter extends Auth {
    constructor(protected token: TokenService, protected db: Database) {
        super(token, db)
        this.initRoutes()
    }

    initRoutes() {
        authRouter.post('/login', (req, res) => {
            this.login(req, res)
        });
        authRouter.post('/register', (req, res) => {
            this.register(req, res)
        });
        authRouter.post('/logout', this.token.verifyToken, (req, res) => {
            this.logout(req, res)
        });
        authRouter.post('/verify-email', (req, res) => {
            this.sentCodeToEmail(req, res)
        });
        authRouter.get('/get-users', this.token.verifyToken, (req, res) => {
            this.getUsers(req, res)
        });
        authRouter.post('/verify-code', (req, res) => {
            this.verifyCode(req, res)
        });
        authRouter.post('/recover-password', (req, res) => {
            this.passwordRecover(req, res)
        });
    }
}