import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSearchPage } from './thread-search.page';

describe('ThreadSearchPage', () => {
  let component: ThreadSearchPage;
  let fixture: ComponentFixture<ThreadSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
