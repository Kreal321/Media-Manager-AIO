import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {SettingService} from "../../../../core/services/setting.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-ui-cloudflare-detail-card',
  standalone: true,
  imports: [
    AsyncPipe,
    DatePipe,
    NgForOf,
    NgIf,
    MdbAccordionModule,
    MdbRippleModule,
    FormsModule
  ],
  templateUrl: './ui-cloudflare-detail-card.component.html',
  styleUrl: './ui-cloudflare-detail-card.component.css'
})
export class UiCloudflareDetailCardComponent {

  cloudflareUrl: string = this.settingService.getCloudflareUrl();
  showEditFlag: boolean = false;

  constructor(
    private settingService: SettingService
  ) { }

  editCloudflareUrl(): void {
    this.showEditFlag = true;
  }

  updateCloudflareUrl(): void {
    this.settingService.setCloudflareUrl(this.cloudflareUrl);
    this.showEditFlag = false;
  }
}
