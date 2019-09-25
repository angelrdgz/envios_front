import { TestBed } from '@angular/core/testing';

import { EnviaService } from './envia.service';

describe('EnviaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnviaService = TestBed.get(EnviaService);
    expect(service).toBeTruthy();
  });
});
