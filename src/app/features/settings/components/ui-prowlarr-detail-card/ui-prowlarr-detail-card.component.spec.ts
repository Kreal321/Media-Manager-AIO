import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiProwlarrDetailCardComponent } from './ui-prowlarr-detail-card.component';

describe('UiProwlarrDetailCardComponent', () => {
  let component: UiProwlarrDetailCardComponent;
  let fixture: ComponentFixture<UiProwlarrDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiProwlarrDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiProwlarrDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
