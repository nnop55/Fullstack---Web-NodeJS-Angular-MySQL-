import { config } from 'dotenv'
import * as path from 'path';

function initializeConfig() {
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    const envFile = path.resolve(__dirname, process.env.NODE_ENV === 'production' ? '.env' : 'dev.env');
    config({ path: envFile });
}

initializeConfig();

export const dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    database: process.env.DB_NAME
};

export const JWTSecretKey = process.env.JWT_SECRET
export const MailerPass = process.env.MAILER_PASS
export const MailerUser = process.env.MAILER_USER
export const accessUrl = process.env.ACCESS_WEB
