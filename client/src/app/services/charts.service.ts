import {Injectable} from '@angular/core';
import { SatelliteDataValues } from './models/satellite-data/satellite-data-values.model';
import { Chart } from 'chart.js';

@Injectable({
    providedIn: 'root'
})
export class ChartsService {
    
    constructor()
    {
        this.setUpMarkersPlugin();
    }




    private setUpMarkersPlugin()
    {
        var plugin = {
            getLinePosition: function (chart, pointIndex) {
                const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
                const data = meta.data;
                var pointData = data[pointIndex];
                if (pointData)
                    return data[pointIndex]._model.x;
                return 0;
            },
            renderVerticalLine: function (chartInstance, pointIndex, text, isExtended) {
                const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
                const scale = chartInstance.scales['y-axis-0'];
                const context = chartInstance.chart.ctx;
        
                // render vertical line
                context.strokeStyle = '#FDDE49';

                context.beginPath();
                context.moveTo(lineLeftOffset, scale.top);
                context.lineTo(lineLeftOffset, scale.bottom);
                context.stroke();

                context.beginPath();
                context.moveTo(lineLeftOffset+1, scale.top);
                context.lineTo(lineLeftOffset+1, scale.bottom);
                context.stroke();
        
                // write label
                if (isExtended)
                {
                    var textX = lineLeftOffset + 6;
                    var textY = /*(scale.bottom - scale.top) / 2*/ + scale.top + 12;

                    /*
                    context.save();
                    context.translate(textX, textY);
                    context.rotate(-Math.PI/2);
                    context.fillStyle = "#000000";
                    context.textAlign = "center";
                    context.fillText(text, 0, 0);
                    context.restore();
                    */
                    context.fillStyle = "#000000";
                    context.textAlign = 'left';
                    context.fillText(text, textX, textY);
                }
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

                        this.renderVerticalLine(chart, index, text, chart.config.isExtended);
                    }
                }
            }
        };
        Chart.plugins.register(plugin);
    }










    public buildMinimalChart(dataValues: SatelliteDataValues, ctx)
    {
        console.log("Chats service: minimal chart construction starting...");
        var indices = [];
        var titles = [];
        this.buildMarkers(dataValues, indices, titles);

        var obj = {
            type: 'line', // type of chart
            data: this.buildData(dataValues, ctx),
            options: this.buildMinimalOptions(dataValues),
            markerIndices: indices,
            markerTitles: titles,
            isExtended: false
          };
        console.log("Chats service: chart construction completed!");
        return obj;
    }


    public buildExtendedChart(dataValues: SatelliteDataValues, ctx)
    {
        console.log("Chats service: extended chart construction starting...");
        var indices = [];
        var titles = [];
        this.buildMarkers(dataValues, indices, titles);

        var obj = {
            type: 'line', // type of chart
            data: this.buildData(dataValues, ctx),
            options: this.buildExtendedOptions(dataValues),
            markerIndices: indices,
            markerTitles: titles,
            isExtended: true
          };
        console.log("Chats service: chart construction completed!");
        return obj;
    }


    private buildMarkers(dataValues: SatelliteDataValues, indices, titles)
    {
        for (var i = 0; i < dataValues.markers.length; i ++)
        {
            var marker = dataValues.markers[i];
            var percent = (marker.date.getTime() - dataValues.start.getTime()) / (dataValues.end.getTime() - dataValues.start.getTime());

            if (percent < 0 || percent >= 1)
                continue;

            indices.push(Math.round(percent * dataValues.keyValuePairs.length));
            titles.push(marker.name);
        }
    }



    private buildData(dataValues: SatelliteDataValues, ctx)
    {
        console.log("Chats service building data...");
        var keys = []
        var values = [];
    
        // TODO remove this keyValuePairs and fill properly, with a least squares approximation
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

        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(252, 99, 122, 0.4)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
    
        var data = {
            labels: keys,
            datasets: [{ // We can have several data sets for the same chart x axis
                label: dataValues.dataCategory.name,
                data: values,
                backgroundColor: gradient, //'rgba(252, 99, 122, 0.4)', 
                borderColor: 'rgba(255, 99, 122, 1)',
                borderWidth: 2
            }]
        };
        return data;
    }







    /**
     * Builds the display options object for an extended
     * visualization of a graph.
     * @param dataValues
     */
    private buildExtendedOptions(dataValues: SatelliteDataValues)
    {
        var options = {

            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 4
                    }//,
                    //gridLines: {
                        //display:false
                    //}
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true//,
                        //labelString: dataValues.dataCategory.name
                    },
                    ticks: {
                        beginAtZero: true
                    }//,
                    //gridLines: {
                    //    display:false
                    //}
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






    private buildMinimalOptions(dataValues: SatelliteDataValues)
    {
        var options = {

            scales: {
                xAxes: [{
                    ticks: {
                        display:false
                    },
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true//,
                    //    //display:false
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
                enabled: false
            },

            elements: {
                point:{
                    radius: 0
                }
            }

        };

        return options;
    }




    


}
