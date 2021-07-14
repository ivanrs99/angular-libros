import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLibrosComponent } from './list-libros.component';

describe('ListLibrosComponent', () => {
  let component: ListLibrosComponent;
  let fixture: ComponentFixture<ListLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLibrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
