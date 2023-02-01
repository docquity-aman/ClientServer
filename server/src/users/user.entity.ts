import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usertable')
export class User {
  @PrimaryGeneratedColumn()
  userID: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column({ default: null })
  lastname: string;

  @Column()
  mobile: string;
}
