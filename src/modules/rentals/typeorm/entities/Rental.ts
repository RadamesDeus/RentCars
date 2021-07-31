import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';

import User from '../../../users/typeorm/entities/User';
import Car from '../../../vehicles/cars/typeorm/entities/Car';

enum statusRentals {
  Scheduled = 'AGE',
  Confirmed = 'CON',
  Progress = 'AND',
  Canceled = 'CAN',
  Finished = 'END',
}

@Entity('rentals')
class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @CreateDateColumn()
  expected_return_date: Date;

  @Column()
  status: string;

  @Column()
  total: number;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.status = statusRentals.Scheduled;
    }
  }
}
export default Rental;
export { statusRentals };
