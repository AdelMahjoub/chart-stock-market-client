import { 
  Component, 
  ViewChild, 
  ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @ViewChild('navMenu') navMenu: ElementRef;
  appTitle = 'stock market';

  toggleNavMenu() {
    let navMenu = <HTMLElement>this.navMenu.nativeElement;
    if(!navMenu.classList.contains('is-active')) {
      navMenu.classList.add('is-active');
    } else {
      navMenu.classList.remove('is-active');
    }
  }

}
