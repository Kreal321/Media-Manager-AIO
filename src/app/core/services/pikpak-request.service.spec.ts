import { TestBed } from '@angular/core/testing';

import { PikpakRequestService } from './pikpak-request.service';

describe('PikpakRequestService', () => {
  let service: PikpakRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PikpakRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
