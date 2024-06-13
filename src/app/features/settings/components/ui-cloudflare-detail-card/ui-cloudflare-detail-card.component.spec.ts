import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCloudflareDetailCardComponent } from './ui-cloudflare-detail-card.component';

describe('UiCloudflareDetailCardComponent', () => {
  let component: UiCloudflareDetailCardComponent;
  let fixture: ComponentFixture<UiCloudflareDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCloudflareDetailCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiCloudflareDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
