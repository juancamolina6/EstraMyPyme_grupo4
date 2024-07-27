import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  // Datos ficticios para la gráfica
  chartData = [30, 35, 40, 45, 50, 55, 60];

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    // Implementación de la gráfica
  }
}
