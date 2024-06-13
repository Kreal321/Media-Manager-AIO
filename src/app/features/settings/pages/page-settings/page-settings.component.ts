import {Component, OnInit} from '@angular/core';
import {UiPikpakListCardComponent} from "../../components/ui-pikpak-list-card/ui-pikpak-list-card.component";
import {Pikpak} from "../../../../core/models/pikpak.model";
import {UiPikpakDetailCardComponent} from "../../components/ui-pikpak-detail-card/ui-pikpak-detail-card.component";
import {NgIf} from "@angular/common";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";
import {
  UiPikpakCreationCardComponent
} from "../../components/ui-pikpak-creation-card/ui-pikpak-creation-card.component";
import {
  UiCloudflareDetailCardComponent
} from "../../components/ui-cloudflare-detail-card/ui-cloudflare-detail-card.component";
import {
  UiProwlarrDetailCardComponent
} from "../../components/ui-prowlarr-detail-card/ui-prowlarr-detail-card.component";

@Component({
  selector: 'app-page-settings',
  standalone: true,
  imports: [
    UiPikpakListCardComponent,
    UiPikpakDetailCardComponent,
    NgIf,
    UiPikpakCreationCardComponent,
    UiCloudflareDetailCardComponent,
    UiProwlarrDetailCardComponent
  ],
  templateUrl: './page-settings.component.html',
  styleUrl: './page-settings.component.css'
})
export class PageSettingsComponent {

  pikpakSelected: Pikpak | undefined;
  showPikpakCreationCardFlag: boolean = false;

  setShowPikpakCreationCardFlag(flag: boolean) {
    this.showPikpakCreationCardFlag = flag;
  }

}
