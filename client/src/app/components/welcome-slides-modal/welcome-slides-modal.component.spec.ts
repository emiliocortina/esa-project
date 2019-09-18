import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSlides } from './welcome-slides-modal.component';

describe('WelcomeSlides', () => {
  let component: WelcomeSlides;
  let fixture: ComponentFixture<WelcomeSlides>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSlides ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSlides);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
