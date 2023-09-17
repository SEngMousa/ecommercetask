import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public navService: NavService) {}
}
