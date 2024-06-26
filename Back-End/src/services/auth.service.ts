import { setQuery } from "../services/database.service";
import { sentMail } from "../services/mailer.service";
import { User } from "../utils/interfaces";

class AuthService {

    constructor() { }

    public findByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM users WHERE email = ?`,
                [email], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public insertUser(email: string, fullName: string, hashedPassword: string, role: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO users 
                    (email, full_name, password, balance, role) 
                    VALUES (?, ?, ?, ?, ?)`,
                [email, fullName, hashedPassword, 100, role], (err: any, result: any) => {
                    if (err) {
                        console.error('Error registering user:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public sendVerification(email: string): Promise<void> {
        const verification = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 3 * 60 * 1000);
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET code = ?, code_expire = ? WHERE email = ?`,
                [verification, expiryTime, email], async (err: any, result: any) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                    await sentMail(email, verification)
                });

        })
    }

    public clearCodeColumn(email: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET code = ? WHERE email = ?`,
                [null, email], async (err, result) => {
                    if (err) {
                        console.error('Error updating in:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                });
        })
    }

    public changePassword(email: string, hashedPassword: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`UPDATE users SET password = ? WHERE email = ?`,
                [hashedPassword, email], async (err, result) => {
                    if (err) {
                        console.error('Error logging in:', err);
                        reject(err)
                        return;
                    }
                    resolve();


                });
        })
    }
}

export default new AuthService();
