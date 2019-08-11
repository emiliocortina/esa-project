import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPagePage } from './topic-page.page';

describe('TopicPagePage', () => {
  let component: TopicPagePage;
  let fixture: ComponentFixture<TopicPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
