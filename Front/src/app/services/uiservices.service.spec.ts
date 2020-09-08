import { TestBed } from '@angular/core/testing';

import { UiservicesService } from './uiservices.service';

describe('UiservicesService', () => {
  let service: UiservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
