import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
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

  @Column('timestamp with time zone')
  start_date: Date;

  @Column('timestamp with time zone')
  end_date: Date;

  @Column('timestamp with time zone')
  expected_return_date: Date;

  @Column()
  status: string;

  @Column()
  total: number;

  @OneToOne(() => Car)
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
