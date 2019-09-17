import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeolocationSearchModal } from './geolocation-search-modal.component';

describe('GeolocationSearchModal', () => {
  let component: GeolocationSearchModal;
  let fixture: ComponentFixture<GeolocationSearchModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeolocationSearchModal ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeolocationSearchModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
