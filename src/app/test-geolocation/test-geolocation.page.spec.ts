import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGeolocationPage } from './test-geolocation.page';

describe('TestGeolocationPage', () => {
  let component: TestGeolocationPage;
  let fixture: ComponentFixture<TestGeolocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGeolocationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGeolocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
