import { Test, TestingModule } from '@nestjs/testing';
import { CondicaoController } from './condicao.controller';
import { CondicaoService } from './condicao.service';

describe('CondicaoController', () => {
  let controller: CondicaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondicaoController],
      providers: [CondicaoService],
    }).compile();

    controller = module.get<CondicaoController>(CondicaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
