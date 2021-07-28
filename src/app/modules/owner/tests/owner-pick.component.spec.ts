import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerPickComponent } from '../owner-pick/owner-pick.component';

describe('OwnerPickComponent', () => {
  let component: OwnerPickComponent;
  let fixture: ComponentFixture<OwnerPickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerPickComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
