import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('devices')
@ApiBearerAuth('jwt-auth')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.DEVICE)
  create(@Body() body) {
    return this.devicesService.create(body);
  }
}
