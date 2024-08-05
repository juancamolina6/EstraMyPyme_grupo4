import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ChartDataService } from '../../services/chart.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @ViewChild('chartContainer') private chartContainer!: ElementRef;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit(): void {
    this.chartDataService.getChartData().subscribe({
      next: (data: any) => {
        console.log('Data received:', data);
        if (data && data[0]) {
          this.renderChart(data[0]);
        } else {
          console.error('No se recibieron datos válidos para el gráfico');
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del gráfico:', error);
      },
    });
  }
  

  private renderChart(data: any) {
    if (!data || !data.arrows) {
      console.error('No se recibieron datos válidos para el gráfico');
      return;
    }

    const element = this.chartContainer.nativeElement;
  const margin = { top: 20, right: 20, bottom: 40, left: 50 };
  const width = 300 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select(element).append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([-1, 1]).range([0, width]);
  const y = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

  // Ejes
  svg.append('g')
    .attr('transform', `translate(0,${height/2})`)
    .call(d3.axisBottom(x).ticks(0));
  svg.append('g')
    .attr('transform', `translate(${width/2},0)`)
    .call(d3.axisLeft(y).ticks(0));

  // Etiquetas de ejes
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('x', width)
    .attr('y', height/2 + 20)
    .text('Precio');
  svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .attr('y', -margin.left + 10)
    .attr('x', -height/2)
    .text('Valor percibido del producto');

   // Flechas
   data.arrows.forEach((arrow: any) => {
    svg.append('line')
      .attr('x1', x(0))
      .attr('y1', y(0))
      .attr('x2', x(arrow.x))
      .attr('y2', y(arrow.y))
      .attr('stroke', 'black')
      .attr('marker-end', 'url(#arrow)');

    const label = svg.append('text')
      .attr('x', x(arrow.x * 1.1))
      .attr('y', y(arrow.y * 1.1))
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px');

    const lines = this.wrapText(arrow.label, 15);
    lines.forEach((line, i) => {
      label.append('tspan')
        .attr('x', x(arrow.x * 1.1))
        .attr('dy', i ? '1.2em' : '0em')
        .text(line);
    });
  });

  // Estrella
  const star = data.desiredPosition.coordinates;
  const starPath = 'M256,32L317.5,191.8L480,191.8L347.2,287.2L408.7,447L256,351.8L103.3,447L164.8,287.2L32,191.8L194.5,191.8L256,32z';
  svg.append('path')
    .attr('d', starPath)
    .attr('transform', `translate(${x(star.x)},${y(star.y)}) scale(0.05)`)
    .attr('fill', 'yellow')
    .attr('stroke', 'black');

  // Elipse
  const oval = data.oval;
  svg.append('ellipse')
    .attr('cx', x(oval.center.x))
    .attr('cy', y(oval.center.y))
    .attr('rx', width * oval.radiusX / 2)
    .attr('ry', height * oval.radiusY / 2)
    .attr('transform', `rotate(${oval.rotation},${x(oval.center.x)},${y(oval.center.y)})`)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-dasharray', '5,5');
  }
  private wrapText(text: string, width: number): string[] {
    const words = text.split(/\s+/);
    let lines: string[] = [];
    let currentLine: string[] = [];

    words.forEach(word => {
      if ((currentLine.join(' ') + ' ' + word).length <= width) {
        currentLine.push(word);
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine.join(' '));
        }
        currentLine = [word];
      }
    });

    if (currentLine.length > 0) {
      lines.push(currentLine.join(' '));
    }

    return lines;
  }

}
