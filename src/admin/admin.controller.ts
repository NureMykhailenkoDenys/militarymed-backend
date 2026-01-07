import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin')
@ApiBearerAuth('jwt-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  @Get('status')
  getStatus() {
    return {
      status: 'MilitaryMed backend is running',
    };
  }
  
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date(),
    };
  }
}
