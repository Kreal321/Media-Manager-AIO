import { Component } from '@angular/core';
import {PikpakService} from "../../core/services/pikpak.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private pikpakService: PikpakService
  ) { }

  createTestFolder() {
    this.pikpakService.getPikpakById(2).then(pikpak => {
      if (pikpak == null) return;
      pikpak.accessToken = "123";
      pikpak.refreshToken = "";
      this.pikpakService.updatePikpak(pikpak).then(() => {
        this.pikpakService.pikpakCreateFolder(2, "Test Folder");
      })
    });
  }
}
