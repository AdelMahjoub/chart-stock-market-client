import { 
  Component, 
  OnInit, 
  ViewChild, 
  ElementRef } from '@angular/core';
import Chart from 'chart.js';
import randomColor from 'randomcolor';
import { IOService } from '../../services/io.service';


@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {

  @ViewChild('chart') canvas: ElementRef; 
  ctx: CanvasRenderingContext2D;
  chart: Chart;
  datasets: any[];
  labels: string[];
  loading = true;
  stocksToLoad: number;
  stocksLoaded = 0;

  constructor(public ioService: IOService) { }

  ngOnInit() {
    let socket = this.ioService.socket;
    this.ctx = (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d');

    socket.on('user connected', stocks => {
      this.loading = false;
      this.drawChart(stocks);
    });

    socket.on('stock found', stocks => {
      this.loading = false;
      this.drawChart(stocks);
    });

    socket.on('total', total => {
      if(!this.stocksToLoad) {
        this.stocksToLoad = total;
      }
    });

    socket.on('updated', updated => {
      this.stocksLoaded = updated;
    });
  }

  drawChart(stocks) {
    let width = (<HTMLCanvasElement>this.canvas.nativeElement).width;
    let height = (<HTMLCanvasElement>this.canvas.nativeElement).height;
    if(this.chart) this.chart.destroy();
    this.ctx.clearRect(0, 0, width, height);
    this.datasets = [];
    this.labels = [];

    if(stocks.length > 0) {
      stocks[0]['series'].forEach(serie => {
        this.labels.push(serie['moment']);
      });

      stocks.forEach(obj => {
        let color = randomColor({luminosity: 'dark', format: 'rgba', alpha: 1});
        let data = [];
        obj['series'].forEach(obj => {
          data.push(Number(obj['value']));
        });
        this.datasets.push({
          label: obj['symbol'],
          borderColor: color,
          borderWidth: 2,
          pointRadius: 2,
          pointStyle: 'rect',
          spanGaps: true,
          data: data,
          fill: false
        });
      });
    }
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: {
        scales: {
          xAxes: [{
            min: this.labels[this.labels.length - 1],
            ticks: {
                autoSkip: false
              }
          }]
        },
        tooltips: {
            mode: 'index'
        }
      }
    });
  }

}
