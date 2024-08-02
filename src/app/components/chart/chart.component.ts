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
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = element.offsetHeight - margin.top - margin.bottom;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([-1.2, 1.2]).range([0, width]);

    const y = d3.scaleLinear().domain([-1.2, 1.2]).range([height, 0]);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    // Añadir el punto central
    svg
      .append('circle')
      .attr('cx', x(0))
      .attr('cy', y(0))
      .attr('r', 10)
      .style('fill', 'black');

    // Añadir las flechas
    data.arrows.forEach((arrow: any) => {
      svg
        .append('line')
        .attr('x1', x(0))
        .attr('y1', y(0))
        .attr('x2', x(arrow.x))
        .attr('y2', y(arrow.y))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('marker-end', 'url(#arrow)');

      // Añadir las etiquetas de las flechas
      svg
        .append('text')
        .attr('x', x(arrow.x))
        .attr('y', y(arrow.y))
        .attr('dy', -5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(arrow.label);
    });

    // Definir el marcador de flecha
    svg
      .append('defs')
      .append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 5)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', 'black');
    // Añadir la elipse
    const oval = data.oval;
    svg
      .append('ellipse')
      .attr('cx', x(oval.center.x))
      .attr('cy', y(oval.center.y))
      .attr('rx', x(oval.radiusX) - x(0))
      .attr('ry', y(0) - y(oval.radiusY))
      .attr(
        'transform',
        `rotate(${oval.rotation}, ${x(oval.center.x)}, ${y(oval.center.y)})`
      )
      .style('fill', 'none')
      .style('stroke', 'black')
      .style('stroke-dasharray', '5,5');
    // Añadir la posición deseada (estrella)
    const star = data.desiredPosition.coordinates;
    svg
      .append('path')
      .attr(
        'd',
        'M256,32L317.5,191.8L480,191.8L347.2,287.2L408.7,447L256,351.8L103.3,447L164.8,287.2L32,191.8L194.5,191.8L256,32z'
      )
      .attr(
        'transform',
        `translate(${x(star.x) - 12}, ${y(star.y) - 12}) scale(0.1)`
      )
      .attr('fill', 'yellow');
  }
}
