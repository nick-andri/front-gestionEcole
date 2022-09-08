import { TestBed } from '@angular/core/testing';

import { TitreProService } from './titre-pro.service';

describe('TitreProService', () => {
  let service: TitreProService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitreProService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
