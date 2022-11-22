import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFollowupComponent } from './add-edit-followup.component';

describe('AddEditFollowupComponent', () => {
  let component: AddEditFollowupComponent;
  let fixture: ComponentFixture<AddEditFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
