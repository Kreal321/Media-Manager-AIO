import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {NgIf} from "@angular/common";
import {SettingService} from "../../../../core/services/setting.service";

@Component({
  selector: 'app-ui-prowlarr-detail-card',
  standalone: true,
    imports: [
        FormsModule,
        MdbRippleModule,
        NgIf
    ],
  templateUrl: './ui-prowlarr-detail-card.component.html',
  styleUrl: './ui-prowlarr-detail-card.component.css'
})
export class UiProwlarrDetailCardComponent {
  prowlarrUrl: string = this.settingService.getProwlarrUrl();
  showEditFlag: boolean = false;

  constructor(
    private settingService: SettingService
  ) { }

  editProwlarrUrl(): void {
    this.showEditFlag = true;
  }

  updateProwlarrUrl(): void {
    this.settingService.setProwlarrUrl(this.prowlarrUrl);
    this.showEditFlag = false;
  }
}
