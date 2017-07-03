import { IOService } from '../../services/io.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  constructor(public ioService: IOService) { }

  stocks = [];

  ngOnInit() {
    let socket = this.ioService.socket;
    socket.on('user connected', stocks => {
      this.stocks = stocks;
    });
    socket.on('stock found', stocks => {
      this.stocks = stocks;
    });
  }

}
