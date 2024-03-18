import { Request, Response } from 'express';
import { CarService } from '../services/car.service';


export class CarController {

    private carService: CarService

    constructor() {
        this.carService = new CarService()
    }

    public async addCar(req: Request, res: Response): Promise<void> {
        try {
            const { mark, type, licenseNumber } = req.body;
            const userId = (req as any).user['id'];
            await this.carService.insertCar({ mark, type, licenseNumber, userId })
            res.status(201).json({ mark, type, licenseNumber })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async editCar(req: Request, res: Response): Promise<void> {
        try {
            const carId = parseInt(req.params.carId)
            const { mark, type, licenseNumber } = req.body
            const user = (req as any).user;
            const car = await this.carService.findCarById(carId)

            if (!car) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }

            if (user['id'] !== car['user_id']) {
                res.status(400).json({ error: 'No permission' });
                return;
            }

            await this.carService.updateCarById(
                carId,
                mark ?? car['mark'],
                type ?? car['type'],
                licenseNumber ?? car['license_number']
            )

            res.status(200).json({ message: "Success" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async deleteCar(req: Request, res: Response): Promise<void> {
        try {
            const { carId } = req.params
            const car = await this.carService.findCarById(parseInt(carId))

            if (!car) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }

            await this.carService.deleteCar(parseInt(carId))
            res.status(202).json({ message: "Successfully deleted" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getCarById(req: Request, res: Response): Promise<void> {
        try {
            const { carId } = req.params
            const car = await this.carService.findCarById(parseInt(carId))

            if (!car) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }

            res.status(202).json({ data: car })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public async getCars(req: Request, res: Response): Promise<void> {
        try {
            const result = await this.carService.getAllCar()
            res.status(200).json({ data: result });
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}