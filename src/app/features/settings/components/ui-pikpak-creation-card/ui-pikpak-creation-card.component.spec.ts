import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPikpakCreationCardComponent } from './ui-pikpak-creation-card.component';

describe('UiPikpakCreationCardComponent', () => {
  let component: UiPikpakCreationCardComponent;
  let fixture: ComponentFixture<UiPikpakCreationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPikpakCreationCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiPikpakCreationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
