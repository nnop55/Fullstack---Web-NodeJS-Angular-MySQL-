import { setQuery } from "../services/database-service";

export class TokenRepository {

    public static instance() {
        return TokenRepository
    }

    public static findToken(token: string): Promise<string | null> {
        return new Promise<string | null>((resolve, reject) => {
            setQuery('SELECT * FROM tokens WHERE access_token = ?',
                [token], (err: any, result: any) => {
                    if (err) {
                        console.error('Error finding token:', err);
                        reject(err)
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);

                })
        })

    }

    public static deleteToken(token: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery('DELETE FROM tokens WHERE access_token = ?',
                [token], (err: any, result: any) => {
                    if (err) {
                        console.error('Error finding token:', err);
                        reject(err)
                        return;
                    }
                    resolve();

                })
        })

    }

    public static tokenInstance(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery('INSERT INTO tokens (access_token) VALUES (?)',
                [token], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }
}