import { IOService } from '../../services/io.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {

  @Input() symbol: string;

  constructor(public ioService: IOService) { }

  ngOnInit() {
  }

  removeStock() {
    let socket = this.ioService.socket;
    socket.emit('remove stock', this.symbol)
  }

}
