import { Component } from '@angular/core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MdbRippleModule} from "mdb-angular-ui-kit/ripple";
import {Pikpak} from "../../../../core/models/pikpak.model";
import {PikpakService} from "../../../../core/services/pikpak.service";

@Component({
  selector: 'app-ui-pikpak-creation-card',
  standalone: true,
    imports: [
        AsyncPipe,
        DatePipe,
        NgForOf,
        NgIf,
        FormsModule,
        MdbRippleModule
    ],
  templateUrl: './ui-pikpak-creation-card.component.html',
  styleUrl: './ui-pikpak-creation-card.component.css'
})
export class UiPikpakCreationCardComponent {
  pikpak: Pikpak = { } as Pikpak;

  constructor(
    private pikpakService: PikpakService
  ) { }

  saveNewPikpak() {
    this.pikpakService.newPikpak(this.pikpak.username, this.pikpak.password);
  }
}
