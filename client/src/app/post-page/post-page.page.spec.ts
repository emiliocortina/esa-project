import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPagePage } from './post-page.page';

describe('PostPagePage', () => {
  let component: PostPagePage;
  let fixture: ComponentFixture<PostPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
