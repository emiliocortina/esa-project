import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SatelliteDataValues } from 'src/app/services/models/satellite-data/satellite-data-values.model';
import { ChartsService } from 'src/app/services/charts.service';

/**
 * The CartComponent represents in a chart the data
 * stored in a SatelliteStats instance, using Chart.js
 * 
 * https://www.chartjs.org/docs/latest/
 */
@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit
{
  dataValues: SatelliteDataValues;
  chart: Chart;

  isExtended: boolean;

  constructor(private chartsService: ChartsService) 
  {
  }

  ngOnInit()
  {
  }

  async setDataValues(dataValues: SatelliteDataValues, isExtended: boolean)
  {
    this.dataValues = dataValues;
    this.isExtended = isExtended;

    // Wait for the component to appear in the DOM
    await this.sleep(100);

    this.buildChart();
  }

  sleep(ms)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


  private buildChart()
  {
    console.log("ChartComponent building chart...");

    var ctx = document.getElementById("chart");
    
    var canvas : any = document.getElementById("chart");
    var ctx2d = canvas.getContext("2d");

    console.log(ctx);

    var chartObj;
    if (this.isExtended)
    {
      chartObj = this.chartsService.buildExtendedChart(this.dataValues, ctx2d);
    }
    else 
    {
      chartObj = this.chartsService.buildMinimalChart(this.dataValues, ctx2d);
    }

    this.chart = new Chart(ctx, chartObj);

    console.log("ChartComponent chart ready!");
  }


  
}
