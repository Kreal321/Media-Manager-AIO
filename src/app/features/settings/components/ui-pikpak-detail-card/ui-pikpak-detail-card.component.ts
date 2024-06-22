import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Pikpak, PikpakHistory} from "../../../../core/models/pikpak.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {AccountStatus} from "../../../../core/enums/account-status.enum";
import {liveQuery} from "dexie";
import {IndexeddbService} from "../../../../core/services/indexeddb.service";
import {Observable} from "rxjs";
import {PikpakService} from "../../../../core/services/pikpak.service";
import Swal from "sweetalert2";

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
  @Output() pikpakChange: EventEmitter<Pikpak> = new EventEmitter<Pikpak>();
  histories$ = liveQuery(() => this.pikpakService.getPikpakHistoriesById(this.pikpak.id));

  protected readonly AccountStatus = AccountStatus;

  constructor(
    private pikpakService: PikpakService
  ) { }

  deletePikpak() {
    if (!this.pikpak.id) {
      Swal.fire({
          title: 'Invalid Request',
          text: 'Pikpak ID is required to delete the pikpak.',
          icon: 'error',
      })
      return;
    }
    this.pikpakService.deletePikpakById(this.pikpak.id).then(() => {
      this.pikpakChange.emit(undefined);
      Swal.fire({
          title: 'Pikpak Deleted',
          text: 'Pikpak has been deleted successfully.',
          icon: 'success',
      })
    });
  }

}
