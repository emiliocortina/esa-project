import { Component, OnInit, ViewChild } from '@angular/core';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
import { Chart } from 'chart.js';
import { PlainValuesComponent } from '../plain-values-component/plain-values.component';
import { ChartComponent } from '../chart-component/chart.component';

/**
 * The CartComponent represents in a chart the data
 * stored in a SatelliteStats instance, using Chart.js
 * 
 * https://www.chartjs.org/docs/latest/
 */
@Component({
  selector: 'app-satellite-data-display',
  templateUrl: './satellite-data-display.component.html',
  styleUrls: ['./satellite-data-display.component.scss'],
})
export class SatelliteDataDisplay implements OnInit
{
  @ViewChild("Chart")
  chart: ChartComponent; // To display in chart, if needed

  @ViewChild("PlainValuesComponent")
  plainValues: PlainValuesComponent; // To display in plain values, if needed

  showChart : boolean;
  showPlainValues : boolean;

  constructor() 
  {
  }

  ngOnInit()
  {
  }

  public displayChart(data: SatelliteData)
  {
    this.chart.setData(data);
    this.showChart = true;
  }

  public displayConstants(data: SatelliteData)
  {
    this.plainValues.setData(data);
    this.showPlainValues= true;
  }

}
