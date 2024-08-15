import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ChartDataService } from '../../services/chart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-circulo-dorado',
  standalone: true,
  templateUrl: './circulo-dorado.component.html',
  styleUrls: ['./circulo-dorado.component.css']
})
export class CirculoDoradoComponent implements OnInit {
  @ViewChild('whyElement', { static: true }) whyElement!: ElementRef;
  @ViewChild('howElement', { static: true }) howElement!: ElementRef;
  @ViewChild('whatElement', { static: true }) whatElement!: ElementRef;
  @ViewChild('explanationElement', { static: true }) explanationElement!: ElementRef;

  private queData: string = '';
  private comoData: string = '';
  private porqueData: string = '';

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    const companyId = 1; // Reemplaza esto con el ID real de la empresa

    // Llamar al servicio para obtener los datos del círculo
    this.chartDataService.getCirculoData(companyId).subscribe({
      next: (data: any) => this.storeCirculoData(data[0]), // Asumiendo que data es un array y necesitas el primer elemento
      error: (error) => console.error('Error al cargar los datos del círculo:', error),
    });

    this.setupEventListeners();
  }

  private storeCirculoData(data: any) {
    if (!data) {
      console.error('No se recibieron datos válidos para el gráfico');
      return;
    }

    // Guardar los datos en variables
    this.queData = data.que || 'No se encontró el dato "¿Qué?"';
    this.comoData = data.como || 'No se encontró el dato "¿Cómo?"';
    this.porqueData = data.porque || 'No se encontró el dato "¿Por qué?"';

    // Mantener los textos iniciales en los círculos
    this.explanationElement.nativeElement.innerText = 'Haga clic en un círculo para obtener más información.';
  }

  private setupEventListeners() {
    // Agrega listeners de eventos para los círculos, que usarán los datos guardados
    this.whyElement.nativeElement.addEventListener('click', () => this.displayExplanation('¿Por qué?: ' + this.porqueData));
    this.howElement.nativeElement.addEventListener('click', () => this.displayExplanation('¿Cómo?: ' + this.comoData));
    this.whatElement.nativeElement.addEventListener('click', () => this.displayExplanation('¿Qué?: ' + this.queData));
  }

  private displayExplanation(text: string) {
    const explanationDiv = this.explanationElement.nativeElement;
    explanationDiv.style.display = 'block';
    explanationDiv.innerText = text;
  }

  //metodo para agrandar la vista grafica 3 

  showModal = false; // Variable para controlar la visibilidad del modal

  // Método para alternar la visibilidad del modal
  toggleModal() {
    this.showModal = !this.showModal;
  }
}


