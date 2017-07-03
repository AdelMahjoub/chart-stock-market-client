import { IOService } from '../../services/io.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {

  constructor(public ioService: IOService) { }

  searchFrom: FormGroup;
  stockFound: boolean;

  ngOnInit() {
    this.initSearchForm();
  }

  initSearchForm() {
    this.searchFrom = new FormGroup({
      'stockSymbol': new FormControl('')
    })
  }

  get stockSymbol(): AbstractControl {
    return this.searchFrom.get('stockSymbol');
  }

  submitSearch() {
    if(this.searchFrom.value['stockSymbol'] !== '') {
      this.stockFound = null;
      let socket = this.ioService.socket;
      socket.emit('add stock', this.searchFrom.value['stockSymbol']);
      socket.on('stock not found', () => {
        this.stockFound = false;
      });
      socket.on('stock found', () => {
        this.stockFound = true;
      })
    }
  }

}
