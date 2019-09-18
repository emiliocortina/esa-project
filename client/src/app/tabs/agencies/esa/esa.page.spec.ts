import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsaPage } from './esa.page';

describe('EsaPage', () => {
  let component: EsaPage;
  let fixture: ComponentFixture<EsaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
