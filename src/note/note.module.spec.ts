import { Test } from '@nestjs/testing';
import { NoteModule } from './note.module';

describe('NoteModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [NoteModule],
    }).compile();
  });

  expect(module).toBeDefined();
});
