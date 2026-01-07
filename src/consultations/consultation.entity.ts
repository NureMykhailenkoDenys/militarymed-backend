import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from '../users/user.entity';

@Entity('consultations')
export class Consultation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  patient: User;

  @ManyToOne(() => User)
  doctor: User;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
