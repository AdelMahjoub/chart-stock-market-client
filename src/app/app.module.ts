import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { StockItemComponent } from './stocks/stock-item/stock-item.component';
import { StockChartComponent } from './stocks/stock-chart/stock-chart.component';
import { StockSearchComponent } from './stocks/stock-search/stock-search.component';

import { IOService } from './services/io.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StocksComponent,
    StockListComponent,
    StockItemComponent,
    StockChartComponent,
    StockSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [IOService],
  bootstrap: [AppComponent]
})
export class AppModule { }
