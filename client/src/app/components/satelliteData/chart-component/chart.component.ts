import { Component, OnInit } from '@angular/core';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
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
  dataValuesArray: SatelliteDataValues[];
  chart: Chart;

  constructor(private chartsService: ChartsService) 
  {
  }

  ngOnInit()
  {
  }

  async setDataValues(dataValuesArray: SatelliteDataValues[]) {
    this.dataValuesArray = dataValuesArray;

    await this.sleep(100);

    this.buildCharts();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  


  private buildCharts()
  {
    for (var i = 0; i < this.dataValuesArray.length; i ++)
    {
      console.log("ChartComponent building chart...");

      var ctx = document.getElementById("chart" + i);
      console.log(ctx);

      this.chart = new Chart(
          ctx,
          this.chartsService.buildChartObject(this.dataValuesArray[i])
        );

      console.log("ChartComponent chart ready!");
    }
  }


  
}
