import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteDataDisplay } from './satellite-data-display.component';

describe('SatelliteDataDisplay', () => {
  let component: SatelliteDataDisplay;
  let fixture: ComponentFixture<SatelliteDataDisplay>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatelliteDataDisplay ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteDataDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
