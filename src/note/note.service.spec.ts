import { CreateNoteDto } from './dto/create-note.dto';
import { Note } from './entities/note.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './note.service';

const mockNote: CreateNoteDto = {
  title: 'Titulo',
  description: 'Descrição',
  note: 'Uma nota aqui',
};

describe('NoteService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a note', () => {
    const newNote = service.create(mockNote);

    expect(newNote).toHaveProperty('title', 'Titulo');
  });

  it('should return a list of notes', () => {
    expect(Array.isArray(service.findAll())).toBeTruthy;
  });

  it(`should find one note by id`, () => {
    const newNote = service.create(mockNote);

    expect(service.findOne(newNote.id)).toHaveProperty('id', newNote.id);
  });

  it('should update a note', () => {
    const newNote = service.create(mockNote);

    const updatedNote = {
      ...newNote,
      title: 'Updated Note',
    };

    service.update(newNote.id, updatedNote);

    expect(service.findOne(updatedNote.id)).toHaveProperty(
      'title',
      'Updated Note',
    );
  });

  it('should remove a note', () => {
    const newNote = service.create(mockNote);

    service.remove(newNote.id);

    expect(service.findOne(newNote.id)).toBeFalsy();
  });
});
