import { UpdateNoteDto } from './dto/update-note.dto';
import { CreateNoteDto } from './dto/create-note.dto';
import {
  ArgumentMetadata,
  ValidationPipe,
  INestApplication,
  Response,
  ResponseDecoratorOptions,
  Res,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import * as request from 'supertest';
import { Note } from './entities/note.entity';

const mockNote = {
  title: 'Nova nota de teste',
  description: 'Description acho que era pra ser subtitulo',
  note: 'Uma extensa mensgem de nota',
};

describe('NoteController', () => {
  let controller: NoteController;
  let service: NoteService;
  let app: INestApplication;
  let testValidationPipe: (
    url: string,
    payload: any,
  ) => Promise<request.Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [NoteService],
    }).compile();

    controller = module.get<NoteController>(NoteController);
    service = module.get<NoteService>(NoteService);

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    testValidationPipe = async (url, payload) => {
      return await request(app.getHttpServer())
        .post(url)
        .send(payload)
        .set('Accept', 'application/json');
    };
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a note', () => {
    expect(controller.create(mockNote).title).toEqual(mockNote.title);
  });

  it('validate createNoteDTO', async () => {
    const mockWithoutTitle: CreateNoteDto = mockNote;
    mockWithoutTitle.title = '';

    const response = await testValidationPipe('/note', mockWithoutTitle);

    expect(response.statusCode).toBe(400);
  });

  it('should return a list of notes', async () => {
    expect(typeof controller.findAll()).toEqual('object');
  });

  it('should give an 404 if note not found', () => {
    const res: any = {};

    res.sendStatus = (code) => code;

    controller.findOne('id', res);
    expect(controller.findOne('id', res)).toEqual(404);
  });

  it('should give note when founded', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => ({ ...mockNote, id: '123' }));

    const res = {
      send: (e) => e,
    };

    expect(controller.findOne('123', res as any)).toHaveProperty('id', '123');
  });

  it('should give 404 if note not found', () => {
    const res: any = {
      send: () => ({
        status: (e) => e,
      }),
    };

    const updateDto: UpdateNoteDto = { ...mockNote, id: '123' };

    expect(controller.update('123', updateDto, res)).toEqual(404);
  });

  it('should return note if found', () => {
    const updateDto: UpdateNoteDto = { ...mockNote, id: '123' };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation((id: string) => updateDto);

    jest
      .spyOn(service, 'update')
      .mockImplementation((id: string, note: Note) => {
        return updateDto;
      });

    expect(controller.update('123', updateDto, {} as any)).toHaveProperty(
      'id',
      '123',
    );
  });

  it('should remove a note', () => {
    jest.spyOn(service, 'remove').mockImplementation((id: string) => true);
    controller.remove('123');
    expect(service.remove).toBeCalled();
  });
});
