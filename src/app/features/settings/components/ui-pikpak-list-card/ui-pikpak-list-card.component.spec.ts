import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPikpakListCardComponent } from './ui-pikpak-list-card.component';

describe('UiPikpakListCardComponent', () => {
  let component: UiPikpakListCardComponent;
  let fixture: ComponentFixture<UiPikpakListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPikpakListCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiPikpakListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
