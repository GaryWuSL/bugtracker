import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPriorityComponent } from './list-priority.component';

describe('ListPriorityComponent', () => {
  let component: ListPriorityComponent;
  let fixture: ComponentFixture<ListPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
