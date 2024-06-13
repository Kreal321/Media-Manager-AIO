import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPikpakDetailCardComponent } from './ui-pikpak-detail-card.component';

describe('UiPikpakDetailCardComponent', () => {
  let component: UiPikpakDetailCardComponent;
  let fixture: ComponentFixture<UiPikpakDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPikpakDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiPikpakDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
