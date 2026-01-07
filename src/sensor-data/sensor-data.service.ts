import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { SensorData } from './sensor-data.entity';

@Injectable()
export class SensorDataService {
  constructor(
    @InjectRepository(SensorData)
    private readonly repository: Repository<SensorData>,
  ) {}

  create(data: DeepPartial<SensorData>) {
    const sensorData = this.repository.create(data);
    return this.repository.save(sensorData);
  }

  findAll() {
    return this.repository.find({
      relations: ['device'],
      order: { measuredAt: 'DESC' },
    });
  }
}
