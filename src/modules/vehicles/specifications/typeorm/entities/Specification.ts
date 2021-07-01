import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("specifications")
class Specification {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Specification;
