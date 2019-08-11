import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicSearchPage } from './topic-search.page';

describe('TopicSearchPage', () => {
  let component: TopicSearchPage;
  let fixture: ComponentFixture<TopicSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
