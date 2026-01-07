import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { Device } from '../devices/device.entity';

@Entity('sensor_data')
export class SensorData {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Device)
  device: Device;

  @Column()
  parameter: string;

  @Column('float')
  value: number;

  @CreateDateColumn()
  measuredAt: Date;
}
