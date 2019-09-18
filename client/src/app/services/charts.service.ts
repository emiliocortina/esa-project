import {Injectable} from '@angular/core';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';
import { Chart } from 'chart.js';

@Injectable({
    providedIn: 'root'
})
export class ChartsService {
    
    constructor() {
        this.buildMarkersPlugin();
    }

    public buildChartObject(dataValues: SatelliteDataValues)
    {
        var indices = [];
        var titles = [];
        for (var i = 0; i < dataValues.markers.length; i ++)
        {
            var marker = dataValues.markers[i];
            var percent = (marker.date.getTime() - dataValues.start.getTime()) / (dataValues.end.getTime() - dataValues.start.getTime());
            indices.push(Math.round(percent * dataValues.keyValuePairs.length));
            titles.push(marker.name);
        }
        

        var obj = {
            type: 'line', // type of chart
            data: this.buildData(dataValues),
            options: this.buildOptions(dataValues),
            markerIndices: indices,
            markerTitles: titles
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

            var startTime = dataValues.start.getTime();
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
                borderWidth: 2
            }]
        };
        return data;
    }



    private buildOptions(dataValues: SatelliteDataValues)
    {
        var options = {


            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4
                    },
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: dataValues.dataCategory.name
                    },
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

            elements: {
                point:{
                    radius: 0
                }
            }

        };

        return options;
    }




    public buildMarkersPlugin()
    {
        var plugin = {
            getLinePosition: function (chart, pointIndex) {
                const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
                const data = meta.data;
                return data[pointIndex]._model.x;
            },
            renderVerticalLine: function (chartInstance, pointIndex, text) {
                const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
                const scale = chartInstance.scales['y-axis-0'];
                const context = chartInstance.chart.ctx;
        
                // render vertical line
                context.beginPath();
                context.strokeStyle = '#FFD03E';
                context.moveTo(lineLeftOffset, scale.top);
                context.lineTo(lineLeftOffset, scale.bottom);
                context.stroke();
        
                // write label
                context.fillStyle = "#000000";
                context.textAlign = 'left';
                context.fillText(text, lineLeftOffset + 4, /*(scale.bottom - scale.top) / 2*/ + scale.top + 12);
            },
        
            afterDatasetsDraw: function (chart, easing)
            {
                if (chart.config.markerIndices)
                {
                    for (var i = 0; i < chart.config.markerIndices.length; i ++)
                    {
                        var index = chart.config.markerIndices[i];
                        var text = "";
                        if (chart.config.markerTitles)
                            text = chart.config.markerTitles[i];

                        this.renderVerticalLine(chart, index, text);
                    }
                }
            }
        };
        Chart.plugins.register(plugin);
    }


}
