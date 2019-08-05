import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchPage } from './post-search.page';

describe('PostSearchPage', () => {
  let component: PostSearchPage;
  let fixture: ComponentFixture<PostSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
