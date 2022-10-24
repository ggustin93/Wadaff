import { TestBed } from '@angular/core/testing';

import { BackgroundGeolocationService } from './background-geolocation.service';

describe('BackgroundGeolocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackgroundGeolocationService = TestBed.get(BackgroundGeolocationService);
    expect(service).toBeTruthy();
  });
});
