import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class createWorkspaceDto {
  @ApiProperty({
    example: 'sleact1',
    description: '워크스페이스명',
  })
  @IsString()
  @IsNotEmpty()
  public workpace: string;

  @ApiProperty({
    example: 'sleact.com',
    description: 'url',
  })
  @IsString()
  @IsNotEmpty()
  public url: string;
}
