import { TestBed } from '@angular/core/testing';

import { EventCrudService } from './event-crud.service';

describe('EventCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventCrudService = TestBed.get(EventCrudService);
    expect(service).toBeTruthy();
  });
});
