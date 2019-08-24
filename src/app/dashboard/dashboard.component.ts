import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  pieChartOptions = {   
    chart : {
       plotBorderWidth: null,
       plotShadow: false
    },
    title : {
       text: 'Browser market shares at a specific website, 2014'   
    },
    tooltip : {
       pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
       pie: {
          allowPointSelect: true,
          cursor: 'pointer',
    
          dataLabels: {
             enabled: false           
          },
    
          showInLegend: true
       }
    },
    series : [{
       type: 'pie',
       name: 'Browser share',
       data: [
          ['Firefox',   45.0],
          ['IE',       26.8],
          {
             name: 'Chrome',
             y: 12.8,
             sliced: true,
             selected: true
          },
          ['Safari',    8.5],
          ['Opera',     6.2],
          ['Others',      0.7]
       ]
    }]
 };

  chartOptions: Highcharts.Options = {
    series: [{
      data: [{
        name: 'Point 1',
        color: '#00FF00',
        y: 3
    },
    {
        name: 'Point 2',
        color: '#FF00FF',
        y: 8
    },
    {
      name: 'Point 3',
      color: '#FF00FF',
      y: 6
  },
{
        name: 'Point 4',
        color: '#FF00FF',
        y: 15
    }],
      type: 'areaspline',
      lineWidth: 5,
    }]
  };

  users: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

  public generateFake(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

}
