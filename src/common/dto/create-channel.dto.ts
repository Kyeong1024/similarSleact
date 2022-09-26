import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChannelDto {
  @ApiProperty({
    example: '수다방',
    description: '채널 이름',
  })
  @IsString()
  @IsNotEmpty()
  public name: string;
}
