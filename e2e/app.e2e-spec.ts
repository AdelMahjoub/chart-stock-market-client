import { ChartStocksMarketClientPage } from './app.po';

describe('chart-stocks-market-client App', () => {
  let page: ChartStocksMarketClientPage;

  beforeEach(() => {
    page = new ChartStocksMarketClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
