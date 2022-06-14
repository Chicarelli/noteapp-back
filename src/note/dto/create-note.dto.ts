import { IsEmpty, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  description: string;

  @IsNotEmpty()
  note: string;
}
