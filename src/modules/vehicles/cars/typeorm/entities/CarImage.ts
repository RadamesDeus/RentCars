import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Car from './Car';

@Entity('cars_image')
class CarImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  car_id: string;

  // @OneToMany(() => Car)
  // @JoinColumn({ name: 'car_id' })
  // car: Car;

  @CreateDateColumn()
  created_at: Date;
}

export default CarImage;
