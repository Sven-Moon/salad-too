import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddComponent } from '../owner-add/owner-add.component';

describe('OwnerAddComponent', () => {
  let component: OwnerAddComponent;
  let fixture: ComponentFixture<OwnerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerAddComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
