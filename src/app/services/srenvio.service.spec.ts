import { TestBed } from '@angular/core/testing';

import { SrenvioService } from './srenvio.service';

describe('SrenvioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SrenvioService = TestBed.get(SrenvioService);
    expect(service).toBeTruthy();
  });
});
