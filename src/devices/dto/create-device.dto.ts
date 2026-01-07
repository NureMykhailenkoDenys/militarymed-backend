import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    example: 'ESP32-001'
  })
  serialNumber: string;
}
