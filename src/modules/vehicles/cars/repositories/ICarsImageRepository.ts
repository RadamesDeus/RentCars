import CarImage from '../typeorm/entities/CarImage';

interface ICreateCarImageDTO {
  id?: string;
  description?: string;
  image: string;
  car_id: string;
}

interface ICarsImageRepository {
  create(createCarDTO: ICreateCarImageDTO): Promise<CarImage>;
  save(createCarDTO: ICreateCarImageDTO): Promise<void>;
  findImagesByCarId(car_id: string): Promise<CarImage[] | []>;
}

export { ICarsImageRepository, ICreateCarImageDTO };
