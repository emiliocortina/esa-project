import { Component, OnInit } from '@angular/core';
import { SatelliteData } from 'src/app/services/models/satellite-data/satellite-data.model';
import { SatelliteDataValues } from 'src/app/services/models/satellite-data/satellite-data-values.model';

/**
 * The CartComponent represents with plain values the data
 * stored in a SatelliteStats instance.
 */
@Component({
  selector: 'app-plain-values-component',
  templateUrl: './plain-values.component.html',
  styleUrls: ['./plain-values.component.scss'],
})
export class PlainValuesComponent
{
  data: SatelliteData;
  values: SatelliteDataValues[]; // We get it from 'data'
  // TODO we should use an array. For now, let's just use the primary value from 'data'


  constructor() 
  {
  }

  public setData(data: SatelliteData)
  {
    this.data = data;
    this.values = data.values;
  }

  
}
