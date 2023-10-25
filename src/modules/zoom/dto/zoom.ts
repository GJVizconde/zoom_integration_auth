import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateMeetingDTO {
  @IsNotEmpty()
  @IsString()
  subject!: string

  @IsNotEmpty()
  @IsString()
  description!: string

  @IsNotEmpty()
  @IsString()
  start_time!: string
}

export class CreateMeetingSignatureDTO {
  @IsNotEmpty()
  @IsString()
  meetingNumber!: string

  @IsNotEmpty()
  @IsInt()
  @IsIn([0, 1], {
    message: 'role must be 0 or 1'
  })
  role!: number
}
