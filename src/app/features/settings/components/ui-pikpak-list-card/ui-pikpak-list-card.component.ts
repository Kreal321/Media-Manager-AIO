import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pikpak} from "../../../../core/models/pikpak.model";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";
import {liveQuery} from "dexie";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {SettingService} from "../../../../core/services/setting.service";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-ui-pikpak-list-card',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    DatePipe,
    MdbAccordionModule,
    MdbRippleModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './ui-pikpak-list-card.component.html',
  styleUrl: './ui-pikpak-list-card.component.css'
})
export class UiPikpakListCardComponent {

  @Input() pikpakSelected: Pikpak | undefined;
  @Output() pikpakSelectedChange: EventEmitter<Pikpak> = new EventEmitter<Pikpak>();
  @Output() showPikpakCreationCardFlag: EventEmitter<boolean> = new EventEmitter<boolean>();
  pikpaks$ = liveQuery(() => this.indexeddbService.getPikpaks());

  pikpakApiHost: string = this.settingService.getPikpakApiHost();
  pikpakUserHost: string = this.settingService.getPikpakUserHost();
  pikpakClientId: string = this.settingService.getPikpakClientId();
  pikpakClientSecret: string = this.settingService.getPikpakClientSecret();

  constructor(
    private indexeddbService: IndexeddbService,
    private settingService: SettingService
  ) { }

  changePikpakSelected(id: number) {
    this.showPikpakCreationCardFlag.emit(false);
    this.indexeddbService.getPikpakById(id).then((pikpak) => {
      this.pikpakSelected = pikpak;
      this.pikpakSelectedChange.emit(pikpak);
    });
  }

  showPikpakCreationCard() {
    this.pikpakSelectedChange.emit(undefined);
    this.showPikpakCreationCardFlag.emit(true);
  }
}
