import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./shared/components/footer/footer.component";
import {NavComponent} from "./shared/components/nav/nav.component";
import {SettingService} from "./core/services/setting.service";
import {LoggerService, LogLevel} from "./core/services/logger.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'media-manager-aio';

  constructor(
    private settingService: SettingService,
    private logger: LoggerService,
  ) { }

  ngOnInit() {
    // Logger Config
    this.logger.setLogLevel(LogLevel.Log);
    // Pikpak Config
    let PIKPAK_API_HOST: string = "api-drive.mypikpak.com"
    let PIKPAK_USER_HOST: string = "user.mypikpak.com"
    let CLIENT_ID: string = "YNxT9w7GMdWvEOKa"
    let CLIENT_SECRET: string = "dbw2OtmVEeuUvIptb1Coygx"
    this.settingService.setPikpakConfig(PIKPAK_API_HOST, PIKPAK_USER_HOST, CLIENT_ID, CLIENT_SECRET);
    this.logger.log("App Component Initialized");
  }
}
