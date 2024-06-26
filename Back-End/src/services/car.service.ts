import { setQuery } from "../services/database.service";
import { Car, CarRes } from "../utils/interfaces";

class CarService {

    constructor() { }

    public findCarById(carId: number): Promise<CarRes | null> {
        return new Promise((resolve, reject) => {
            setQuery(`SELECT * FROM cars WHERE id = ?`,
                [carId], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result.length > 0 ? result[0] : null);
                });
        });
    }

    public insertCar(car: Car): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`INSERT INTO cars (type, mark, model, license_number, user_id) 
                        VALUES (?, ?, ?, ?, ?)`,
                [car['type'], car['mark'], car['model'], car['licenseNumber'], car['userId']], (err: any, result: any) => {
                    if (err) {
                        console.error('Error inserting car:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public deleteCar(carId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setQuery(`DELETE FROM cars WHERE id = ?`,
                [carId], (err: any, result: any) => {
                    if (err) {
                        console.error('Error deleting car:', err);
                        reject(err)
                        return;
                    }
                    resolve();
                })

        })
    }

    public getAllCar(): Promise<any> {
        return new Promise<void>((resolve, reject) => {
            setQuery('SELECT * FROM cars', [],
                (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result)
                })
        })
    }

    public updateCarById(id: number, mark: string, model: string, type: string, licenseNumber: string): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery(`UPDATE cars SET 
                    mark = ?, model = ? type = ?, 
                    license_number = ? 
                    WHERE id = ?`,
                [mark, model, type, licenseNumber, id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }

    public updateCarZone(id: number, zoneId: number | null): Promise<void> {
        return new Promise((resolve, reject) => {
            setQuery(`UPDATE cars SET 
                        zone_id = ?
                        WHERE id = ?`,
                [zoneId, id], (err: any, result: any) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve();
                });
        });
    }
}

export default new CarService();