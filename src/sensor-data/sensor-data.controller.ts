import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { SensorDataService } from './sensor-data.service';
import { CreateSensorDataDto } from './dto/create-sensor-data.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Get } from '@nestjs/common';

@ApiTags('Sensor Data')
@ApiBearerAuth('jwt-auth')
@Controller('sensor-data')
export class SensorDataController {
  constructor(
    private readonly sensorDataService: SensorDataService,
  ) {}

  @Post()
  create(@Body() body: CreateSensorDataDto) {
    return this.sensorDataService.create({
      device: { id: body.deviceId },
      parameter: body.parameter,
      value: body.value,
    });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DOCTOR)
  findAll() {
    return this.sensorDataService.findAll();
  }
}
