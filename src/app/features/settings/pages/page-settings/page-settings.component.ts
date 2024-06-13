import {Component, OnInit} from '@angular/core';
import {UiPikpakListCardComponent} from "../../components/ui-pikpak-list-card/ui-pikpak-list-card.component";
import {Pikpak} from "../../../../core/models/pikpak.model";
import {UiPikpakDetailCardComponent} from "../../components/ui-pikpak-detail-card/ui-pikpak-detail-card.component";
import {NgIf} from "@angular/common";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";

@Component({
  selector: 'app-page-settings',
  standalone: true,
  imports: [
    UiPikpakListCardComponent,
    UiPikpakDetailCardComponent,
    NgIf
  ],
  templateUrl: './page-settings.component.html',
  styleUrl: './page-settings.component.css'
})
export class PageSettingsComponent {

  pikpakSelected: Pikpak | undefined;

}
