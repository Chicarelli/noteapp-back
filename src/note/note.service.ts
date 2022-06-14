import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NoteService {
  private notes: Note[] = [
    {
      id: '123123',
      title: 'Nota padrão 1',
      description: 'Primeira nota padrão',
      note: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non ante nec odio elementum dapibus. Proin ut porta quam. Nullam interdum ex tellus, eget sollicitudin odio vulputate sed. Proin efficitur sodales malesuada. Nullam fringilla posuere enim, eu maximus urna venenatis quis. Mauris vel dui fringilla, convallis leo id, congue mi. Maecenas tristique nisl vel ex scelerisque fringilla. Phasellus viverra vel diam non finibus. Duis a sem feugiat tellus posuere fringilla. Nullam rhoncus tristique mauris, non fermentum nisi tempus vitae.

      Sed aliquet feugiat vestibulum. Fusce eu magna lorem. Phasellus egestas elementum lorem, a posuere felis commodo in. Praesent semper et tellus sed rutrum. Morbi turpis massa, semper sed tempus sed, faucibus vitae mi. Aenean fermentum vehicula ex et volutpat. Vestibulum magna leo, maximus at neque et, hendrerit iaculis augue. Ut egestas tellus id luctus pretium.`,
    },
    {
      id: '123124',
      title: 'Nota padrão 2',
      description: 'Segunda nota padrão',
      note: `Nam et vehicula urna. Nam maximus ipsum ipsum, non fringilla libero auctor non. Nam pulvinar massa vel est ultrices fringilla. Integer non fringilla elit. Praesent dignissim pellentesque purus, vel convallis felis tempus a. Suspendisse id commodo lectus, vel convallis tortor. In eget scelerisque magna.

      Ut ut velit ultricies, porta quam a, lacinia mauris. Aliquam vitae nisi nec ex malesuada aliquet volutpat et leo. Phasellus vel metus quis velit placerat posuere ac ut risus. In hac habitasse platea dictumst. Donec ac elit ac turpis fringilla imperdiet. In hac habitasse platea dictumst. Morbi porta mi nec purus euismod tincidunt. In molestie urna quis leo hendrerit molestie. Ut at rhoncus lectus. Nullam congue metus enim, quis tempus purus placerat eget. Aenean vel elementum purus. Proin luctus euismod suscipit. Proin id orci ut odio sagittis consectetur eget eu quam. Pellentesque et velit eget metus pellentesque feugiat.`,
    },
  ];

  create(createNoteDto: CreateNoteDto): Note {
    const createdNote = new Note(
      createNoteDto.title,
      createNoteDto.description,
      createNoteDto.note,
    );

    this.notes.push(createdNote);
    return createdNote;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: string): Note {
    return this.notes.find((note) => note.id === id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto): Note {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return {
          ...updateNoteDto,
          id: note.id,
        };
      } else {
        return note;
      }
    });

    return updateNoteDto;
  }

  remove(id: string): void {
    this.notes = this.notes.filter((note) => note.id !== id);
  }
}
