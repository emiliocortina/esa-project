import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
import { PlainValuesComponent } from '../plain-values-component/plain-values.component';
import { ChartComponent } from '../chart-component/chart.component';
import { SatelliteDataValues } from 'src/app/services/models/satellite-data/satellite-data-values.model';


@Component({
  selector: 'app-satellite-data-display',
  templateUrl: './satellite-data-display.component.html',
  styleUrls: ['./satellite-data-display.component.scss'],
})
export class SatelliteDataDisplay implements OnInit
{

  @Input() isExtended: boolean;
  @Input() displayType: string;
  @Input() values: SatelliteDataValues;



  @ViewChild("Chart") chart: ChartComponent;
  @ViewChild("PlainValues") plainValues: PlainValuesComponent;

  showChart : boolean;
  showPlainValues : boolean;

  constructor() 
  {
  }

  ngOnInit()
  {
    console.log(this.displayType);
    console.log(this.values);
    console.log(this.chart);

    switch (this.displayType.toLowerCase())
    {
      case "chart":
        this.displayChart(this.values);
        break;

      default:
        console.error("CANNOT DISPLAY DATA IN FORMAT: " + this.displayType);
    }
  }

  public displayChart(values: SatelliteDataValues)
  {
    console.log("SatelliteDataDisplay with Chart");
    this.chart.setDataValues(values, this.isExtended);
    this.showChart = true;
    this.showPlainValues= false;
  }

  public displayConstants(values: SatelliteDataValues)
  {
    console.log("Display Constants");
    //TODO this.plainValues.setData(values);
    this.showPlainValues= true;
    this.showChart= false;
  }

}
