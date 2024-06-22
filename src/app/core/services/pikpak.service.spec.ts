import { TestBed } from '@angular/core/testing';

import { PikpakService } from './pikpak.service';

describe('PikpakService', () => {
  let service: PikpakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PikpakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
