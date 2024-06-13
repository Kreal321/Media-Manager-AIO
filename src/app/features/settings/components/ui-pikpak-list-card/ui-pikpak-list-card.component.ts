import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pikpak} from "../../../../core/models/pikpak.model";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";
import {liveQuery} from "dexie";
import {AsyncPipe, DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-ui-pikpak-list-card',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    DatePipe
  ],
  templateUrl: './ui-pikpak-list-card.component.html',
  styleUrl: './ui-pikpak-list-card.component.css'
})
export class UiPikpakListCardComponent {

  @Input() pikpakSelected: Pikpak | undefined;
  @Output() pikpakSelectedChange: EventEmitter<Pikpak> = new EventEmitter<Pikpak>();
  @Output() showPikpakCreationCardFlag: EventEmitter<boolean> = new EventEmitter<boolean>();
  pikpaks$ = liveQuery(() => this.indexeddbService.getPikpaks());

  constructor(private indexeddbService: IndexeddbService) { }

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
