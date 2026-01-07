import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { Consultation } from './consultation.entity';

@Injectable()
export class ConsultationsService {
  constructor(
    @InjectRepository(Consultation)
    private readonly repository: Repository<Consultation>,
  ) {}

  create(data: DeepPartial<Consultation>) {
    const consultation = this.repository.create(data);
    return this.repository.save(consultation);
  }

  findAll() {
    return this.repository.find({ relations: ['patient', 'doctor'] });
  }
}
