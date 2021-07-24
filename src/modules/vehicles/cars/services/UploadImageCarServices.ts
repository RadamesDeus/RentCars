// import ICaches from "@modules/Caches/models/ICaches";
import { injectable, inject } from 'tsyringe';

import AppError from '@errors/AppError';

import IStorageFile from '../../../../container/providers/StorageFile/IStorageFile';
import { ICarsImageRepository } from '../repositories/ICarsImageRepository';
import { ICarsRepository } from '../repositories/ICarsRepository';
import CarImage from '../typeorm/entities/CarImage';

interface IParmsRequest {
  imagesUrl: string[];
  car_id: string;
}

@injectable()
class UploadImageCarServices {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,

    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository,

    @inject('StorageFile')
    private storageFile: IStorageFile, // @inject('Caches') // private caches: ICaches,
  ) {}

  public async execute({
    imagesUrl,
    car_id,
  }: IParmsRequest): Promise<CarImage[] | undefined> {
    const car = await this.carsRepository.findById(car_id);
    if (!car) throw new AppError('Car not found', 401);
    // const carImages: CarImage[] = [];
    imagesUrl.map(async imageUrl => {
      const image = await this.storageFile.SaveFile(imageUrl);

      await this.carsImageRepository.create({
        car_id,
        image,
      });
    });

    const list = await this.carsImageRepository.findImagesByCarId(car_id);
    // await this.caches.invalidatePrefix(`provider-list`);
    return list;
  }
}

export default UploadImageCarServices;
