import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../common/enums/role.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@militarymed.ua' })
  email: string;

  @ApiProperty({ example: 'password123' })
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  role: UserRole;
}
