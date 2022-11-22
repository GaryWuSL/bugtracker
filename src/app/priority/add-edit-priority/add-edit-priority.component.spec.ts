import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPriorityComponent } from './add-edit-priority.component';

describe('AddEditPriorityComponent', () => {
  let component: AddEditPriorityComponent;
  let fixture: ComponentFixture<AddEditPriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
