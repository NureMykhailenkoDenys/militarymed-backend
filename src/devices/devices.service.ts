import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from './device.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly repository: Repository<Device>,
  ) {}

  create(data: Partial<Device>) {
    return this.repository.save(this.repository.create(data));
  }
}
