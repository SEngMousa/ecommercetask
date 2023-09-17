import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  public collapseSidebar: boolean = false;

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.collapseSidebar = window.innerWidth < 991;
  }
}
