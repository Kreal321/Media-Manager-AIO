import { Component } from '@angular/core';
import {DatePipe} from "@angular/common";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    DatePipe,
    MdbDropdownModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentTime : Date = new Date();
}
