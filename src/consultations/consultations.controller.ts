import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Consultations')
@ApiBearerAuth('jwt-auth')
@Controller('consultations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ConsultationsController {
  constructor(
    private readonly consultationsService: ConsultationsService,
  ) {}

  @Post()
  @Roles(UserRole.PATIENT)
  @ApiBody({ type: CreateConsultationDto })
  create(@Body() body: CreateConsultationDto, @Request() req) {
    return this.consultationsService.create({
      doctor: { id: body.doctorId },
      patient: { id: req.user.id },
      status: 'CREATED',
    });
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  findAll() {
    return this.consultationsService.findAll();
  }
}
