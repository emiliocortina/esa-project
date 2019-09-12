import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPage } from './thread-page.page';

describe('TopicPagePage', () => {
  let component: ThreadPage;
  let fixture: ComponentFixture<ThreadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
