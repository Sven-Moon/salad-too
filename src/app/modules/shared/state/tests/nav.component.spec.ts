import { Location } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { NavComponent } from '../../nav/nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule],
    }).compileComponents
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to /order/launch before menu button click',
    () => {
      // get the current location in the browser
      const location = TestBed.get(Location);
      expect(location.path()).toBe('');
    })

  it('Should navigate to /launch on menu button click',
    () => {
      // get starting location
      const location = TestBed.get(Location);
      // get the button to click
      const someImg = fixture.debugElement.queryAll(By.css('div'));
      const theImg: HTMLImageElement = someImg[0].nativeElement
      theImg.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path().toBe('/order/launch'))
      })
    })
});
