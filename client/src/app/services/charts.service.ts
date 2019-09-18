import {Injectable} from '@angular/core';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';

@Injectable({
    providedIn: 'root'
})
export class ChartsService {
    
    constructor() {
    }

    public buildChartObject(dataValues: SatelliteDataValues)
    {
        var obj = {
            type: 'line', // type of chart
            data: this.buildData(dataValues),
            options: this.buildOptions(dataValues)
          };
        console.log("Chats service: chart construction completed!")
        return obj;
    }

    private buildData(dataValues: SatelliteDataValues)
    {
        console.log("Chats service building data...");
        var keys = []
        var values = [];
    
        // TODO remove this and fill properly
        for (var i = 0; i < dataValues.keyValuePairs.length; i ++)
        {
            var keyValuePair = dataValues.keyValuePairs[i];

            var startTime = dataValues.start.getTime();// + (dataValues.end - dataValues.start) * 
            startTime += (dataValues.end.getTime() - dataValues.start.getTime()) * keyValuePair.x;

            var date = new Date();
            date.setTime(startTime);

            keys.push(date.toDateString());
            values.push(keyValuePair.y);
        }
    
        var data = {
            labels: keys,
            datasets: [{ // We can have several data sets for the same chart x axis
                label: dataValues.dataCategory.name,
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        };
        return data;
    }



    private buildOptions(dataValues: SatelliteDataValues)
    {
        var options = {


            scales: {
            xAxes: [{
                gridLines: {
                display:false
                }
            }],
            yAxes: [{
                ticks: {
                beginAtZero: true
                },
                gridLines: {
                display:false
                }
            }]
            },

            responsive: true,

            maintainAspectRatio: false,


            legend: {
            display: false
            },

            tooltips: {
            enabled: true
            },


        };

        return options;
    }

}
