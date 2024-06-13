import {Component, Input} from '@angular/core';
import {Pikpak, PikpakHistory} from "../../../../core/models/pikpak.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {AccountStatus} from "../../../../core/enums/account-status.enum";
import {liveQuery} from "dexie";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ui-pikpak-detail-card',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './ui-pikpak-detail-card.component.html',
  styleUrl: './ui-pikpak-detail-card.component.css'
})
export class UiPikpakDetailCardComponent {

  @Input() pikpak: Pikpak = {} as Pikpak;
  histories$ = liveQuery(() => this.indexeddbService.getPikpakHistories(this.pikpak.id));

  protected readonly AccountStatus = AccountStatus;

  constructor(private indexeddbService: IndexeddbService) { }

}
