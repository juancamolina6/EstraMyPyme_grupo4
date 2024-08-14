import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataService } from '../../services/chart.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnChanges {
  @ViewChild('chartContainer') private chartContainer!: ElementRef;
  @Input() companyId?: number| null = null;
  @Input() chartType: string = ''; // Tipo de gráfico: 'bar' o 'radar'

  constructor(private chartDataService: ChartDataService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['companyId'] && this.companyId) {
      d3.select(this.chartContainer.nativeElement).selectAll('*').remove();

      if (this.chartType === 'radar') {
        this.chartDataService.getRadarData(this.companyId).subscribe({
          next: (data: any) => this.renderRadarChart(data[0]),
          error: (error) => console.error('Error al cargar los datos del radar:', error),
        });
      } else if(this.chartType === 'clock'){
        this.chartDataService.getClockData(this.companyId).subscribe({
          next: (data: any) => this.renderClockChart(data[0]),
          error: (error) => console.error('Error al cargar los datos del gráfico:', error),
        });
      }
    }
  }
  
// crea la grafica de reloj
  private renderClockChart(data: any) {
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

  // crea la Grafica del radar 
  private renderRadarChart(data: any) {
    const element = this.chartContainer.nativeElement;
    const margin = { top: 50, right: 80, bottom: 50, left: 80 };
    const width = 400 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    const levels = 4; // Número de niveles en el radar
    const allAxis = ['Coherencia', 'Conocimiento cliente', 'Salud Financiera', 'Alineacion financiera', 'Conocimiento negosio']; // Los ejes fijos para el radar

    const svg = d3.select(element).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${width / 2 + margin.left},${height / 2 + margin.top})`);

    const radius = Math.min(width / 2, height / 2);
    const angleSlice = Math.PI * 2 / allAxis.length;

    // Escala radial
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100]); // Suponiendo que los datos están en el rango de 0 a 100

    // Dibujar niveles circulares
    for (let i = 0; i < levels; i++) {
      const levelFactor = (i + 1) / levels;
      svg.selectAll(".levels")
        .data(allAxis)
        .enter()
        .append("circle")
        .attr("r", levelFactor * radius)
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("fill", "none")
        .attr("stroke", "gray")
        .attr("stroke-opacity", "0.5");
    }

    // Ejes
    const axis = svg.selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("g")
      .attr("class", "axis");

    axis.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", (d: any, i: number) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y2", (d: any, i: number) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("stroke", "gray")
      .attr("stroke-width", "1px");

    axis.append("text")
      .attr("x", (d: any, i: number) => rScale(100 * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("y", (d: any, i: number) => rScale(100 * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("dy", "0.35em")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .text((d: any) => d);

    // Data de radar
    const radarLine = d3.lineRadial()
      .curve(d3.curveLinearClosed)
      .radius((d: any) => rScale(d))
      .angle((d: any, i: number) => i * angleSlice);

    svg.append("path")
      .datum(data.data)
      .attr("d", radarLine)
      .attr("fill", data.backgroundColor)
      .attr("fill-opacity", 0.3)
      .attr("stroke", data.borderColor)
      .attr("stroke-width", 2);

    // Puntos en los vértices
    svg.selectAll(".radarCircle")
      .data(data.data)
      .enter()
      .append("circle")
      .attr("cx", (d: any, i: number) => rScale(d) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr("cy", (d: any, i: number) => rScale(d) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr("r", 3)
      .attr("fill", data.borderColor)
      .attr("fill-opacity", 0.8);
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
