import { ChartDataService } from '../../services/chart.service';
import { Observable } from 'rxjs';
import { Component, ElementRef, ViewChild, OnInit, OnChanges, SimpleChanges, Input, AfterViewInit} from '@angular/core';


@Component({
  selector: 'app-circulo-dorado',
  standalone: true,
  templateUrl: './circulo-dorado.component.html',
  styleUrls: ['./circulo-dorado.component.css']
})
export class CirculoDoradoComponent implements OnChanges {
  @ViewChild('whyElement', { static: true }) whyElement!: ElementRef;
  @ViewChild('howElement', { static: true }) howElement!: ElementRef;
  @ViewChild('whatElement', { static: true }) whatElement!: ElementRef;
  @ViewChild('explanationElement', { static: true }) explanationElement!: ElementRef;
  @Input() companyId?: number | null = null;

  private queData: string | null = null;
  private comoData: string | null = null;
  private porqueData: string | null = null;

  constructor(private chartDataService: ChartDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && this.companyId) {
      this.resetData(); // Restablecer los datos al cambiar de empresa
      this.chartDataService.getCirculoData(this.companyId).subscribe({
        next: (data: any) => this.storeCirculoData(data ? data[0]: null),
        error: (error) => console.error('Error al cargar los datos del círculo:', error),
      });
    }
  }
  ngAfterViewInit(): void {
    this.setupEventListeners(); // Aquí configuramos los listeners después de que los elementos están en el DOM
  }
  private resetData() {
    // Restablece los datos al cambiar de empresa
    this.queData = null;
    this.comoData = null;
    this.porqueData = null;
    this.explanationElement.nativeElement.innerText = ''; // Limpia el contenido del modal
    this.explanationElement.nativeElement.style.display = 'none'; // Oculta el modal hasta que se haga clic
  }

  private storeCirculoData(data: any | null) {
    console.log(data)
    if (!data) {
      console.error('No se recibieron datos válidos para el gráfico');
      this.queData = null;
      this.comoData = null;
      this.porqueData = null;
      return;
    }

    this.queData = data.que || null;
    this.comoData = data.como || null;
    this.porqueData = data.porque || null;
    // Mantener los textos iniciales en los círculos
    this.explanationElement.nativeElement.innerText = 'Haga clic en un círculo para obtener más información.';  }

  private setupEventListeners() {
    // Agrega listeners de eventos para los círculos, que usarán los datos guardados
    this.whyElement.nativeElement.addEventListener('click', () => this.displayExplanation(this.porqueData, '¿Por qué?'));
    this.howElement.nativeElement.addEventListener('click', () => this.displayExplanation(this.comoData, '¿Cómo?'));
    this.whatElement.nativeElement.addEventListener('click', () => this.displayExplanation(this.queData, '¿Qué?'));
  }

  private displayExplanation(data: string | null, label: string) {
    const explanationDiv = this.explanationElement.nativeElement;
    explanationDiv.style.display = 'block';  // Muestra el modal

    if (data) {
      explanationDiv.innerText = `${label}: ${data}`;
    } else {
      explanationDiv.innerText = `${label}: No tiene datos`; // Mensaje si no hay datos
    }
  }

  //metodo para agrandar la vista grafica 3 

  showModal = false; // Variable para controlar la visibilidad del modal

  // Método para alternar la visibilidad del modal
  toggleModal() {
    this.showModal = !this.showModal;
  }
}
