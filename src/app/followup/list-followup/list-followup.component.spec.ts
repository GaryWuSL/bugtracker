import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowupComponent } from './list-followup.component';

describe('ListFollowupComponent', () => {
  let component: ListFollowupComponent;
  let fixture: ComponentFixture<ListFollowupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFollowupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
