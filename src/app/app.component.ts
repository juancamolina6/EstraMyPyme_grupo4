import { Component,HostListener, ChangeDetectorRef  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './services/user.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'EstraMyPyme';
  constructor(
    private usersService: UsersService,
    private cdr: ChangeDetectorRef
  ) {
    this.usersService.startInactivityCheck();
  
    this.usersService.getSessionExpired().subscribe((expired) => {
      if (expired) {
        this.cdr.detectChanges(); // Forzar la detección de cambios
      }
    });
  }

  @HostListener('window:mousemove')
  @HostListener('window:click')
  @HostListener('window:keydown')
  @HostListener('window:scroll')
  handleUserActivity() {
    this.usersService.resetTimeout();
  }
  ngAfterViewChecked() {
    this.cdr.detectChanges(); // Forzar la detección de cambios para refrescar la vista
  }

}