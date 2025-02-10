import { Test, TestingModule } from '@nestjs/testing';
import { CondicaoService } from './condicao.service';

describe('CondicaoService', () => {
  let service: CondicaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondicaoService],
    }).compile();

    service = module.get<CondicaoService>(CondicaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
