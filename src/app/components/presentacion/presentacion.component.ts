import { Component, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [],
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Asegúrate de que la lista esté abierta al cargar la página
    const textElement = this.el.nativeElement.querySelector('.text');
    if (textElement) {
      textElement.classList.remove('hidden');
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const textElement = this.el.nativeElement.querySelector('.text');
    const scrollPosition = window.pageYOffset;

    if (scrollPosition >= 200) {
      textElement.classList.add('hidden');  // Contrae la lista al hacer scroll
    } else {
      textElement.classList.remove('hidden');  // Expande la lista si se vuelve a la parte superior
    }
  }
}
