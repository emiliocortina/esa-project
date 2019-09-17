import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesPage } from './agencies.page';

describe('AgenciesPage', () => {
  let component: AgenciesPage;
  let fixture: ComponentFixture<AgenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgenciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
