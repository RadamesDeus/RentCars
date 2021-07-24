import { getRepository, Repository } from 'typeorm';

import {
  ICreateCarImageDTO,
  ICarsImageRepository,
} from '../../repositories/ICarsImageRepository';
import CarImage from '../entities/CarImage';

class CarsImageRepository implements ICarsImageRepository {
  private ormRepository: Repository<CarImage>;

  constructor() {
    this.ormRepository = getRepository(CarImage);
  }
  async save(createCarDTO: ICreateCarImageDTO): Promise<void> {
    await this.ormRepository.save(createCarDTO);
  }

  async create(createCarImageDTO: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = await this.ormRepository.create(createCarImageDTO);
    await this.ormRepository.save(carImage);
    return carImage;
  }

  async findImagesByCarId(car_id: string): Promise<CarImage[] | []> {
    return this.ormRepository.find({ where: { car_id } });
  }
}
export default CarsImageRepository;
