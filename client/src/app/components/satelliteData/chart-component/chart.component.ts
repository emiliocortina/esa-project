import { Component, OnInit } from '@angular/core';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
import { Chart } from 'chart.js';

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
  data: SatelliteData;
  chart: Chart;

  constructor() 
  {
  }

  ngOnInit()
  {
  }

  setData(data: SatelliteData) {
    this.data = data;
    this.buildChart();
  }

  private buildChart()
  {
    this.chart = new Chart("myChart",
    {
      type: 'line', // type of chart
      data: this.buildData()
    });
  }

  private buildData() : any
  {
    var keys = []
    var values = [];

    // TODO remove this and fill properly
    for (var i = 0; i < 10; i ++)
    {
      keys.push("Key " + i);
      values.push(Math.random());
    }

    var data = {
      labels: keys,
      datasets: [{ // We can have several data sets for the same chart x axis
          label: 'our values',
          data: values,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
      }]
    };
    return data;
  }




  
}
