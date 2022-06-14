import { Note } from './entities/note.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { response, Response } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Note {
    return this.noteService.create(createNoteDto);
  }

  @Get()
  findAll(): Note[] {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() response: Response) {
    const note = this.noteService.findOne(id);

    if (note) {
      return response.send(note);
    } else {
      return response.sendStatus(404);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const note = this.noteService.findOne(id);

    if (!note) {
      return response.send('Nota não encontrada').status(404);
    }

    const result = this.noteService.update(id, updateNoteDto);
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }
}
