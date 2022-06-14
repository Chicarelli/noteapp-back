import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  id: string;

  @IsNotEmpty()
  title: string;

  description: string;

  @IsNotEmpty()
  note: string;
}
