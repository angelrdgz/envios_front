import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'chart.js';



@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

   @ViewChild('revenueLineChart', {static: false}) chart: ElementRef;   

   Highcharts: typeof Highcharts = Highcharts;

   pieChartOptions = {
      chart: {
         plotBorderWidth: null,
         plotShadow: false
      },
      title: {
         text: 'Browser market shares at a specific website, 2014'
      },
      tooltip: {
         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
         pie: {
            allowPointSelect: true,
            cursor: 'pointer',

            dataLabels: {
               enabled: false
            },

            showInLegend: true
         }
      },
      series: [{
         type: 'pie',
         name: 'Browser share',
         data: [
            ['Firefox', 45.0],
            ['IE', 26.8],
            {
               name: 'Chrome',
               y: 12.8,
               sliced: true,
               selected: true
            },
            ['Safari', 8.5],
            ['Opera', 6.2],
            ['Others', 0.7]
         ]
      }]
   };

   pieChartOptionsDougnt = {
      type: 'pie',
      data: {
         labels: ['OK', 'WARNING', 'CRITICAL', 'UNKNOWN'],
         datasets: [{
            label: '# of Tomatoes',
            data: [12, 19, 3, 5],
            backgroundColor: [
               'rgba(255, 99, 132, 0.5)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
               'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
               'rgba(255,99,132,1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
               'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
         }]
      },
      options: {
         cutoutPercentage: 40,
         responsive: false,

      }
   }

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
   myDoughnutChart:any = []
   myDoughnutChart2:any = []
   myDoughnutChart3:any = []

   constructor() { }

   ngOnInit() {
      this.myDoughnutChart = new Chart('DoughnutChart', {
         type: 'doughnut',
         data: {
            datasets: [{
                data: [35, 10],
                backgroundColor:[ '#EC1C24', '#ccc'],
            }],       
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Entregadas',
                'Faltantes',
            ]
        },
        options: {
         responsive: true,
         maintainAspectRatio: false,
         legend: {
            display: false
         },
         scales: {
             yAxes: [{
                 ticks: {
                     beginAtZero:true
                 }
             }]
         }
     }
     });

     this.myDoughnutChart = new Chart('DoughnutChart2', {
      type: 'doughnut',
      data: {
         datasets: [{
             data: [10, 20],
             backgroundColor: ['#2B388F', '#ccc'],
         }],
     
         // These labels appear in the legend and in the tooltips when hovering different arcs
         labels: [
             'Canceladas',
             'Total',
         ]
     },
     options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
         display: false
      },
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
  });

  this.myDoughnutChart = new Chart('DoughnutChart3', {
   type: 'doughnut',
   data: {
      datasets: [{
          data: [30,15],
          backgroundColor:['#4D4D4D', '#CCC']
      }],
  
      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
          'En Proceso',
          'Total'
      ]
  },
  options: {
   responsive: true,
   maintainAspectRatio: false,
   legend: {
      display: false
   },
   scales: {
       yAxes: [{
           ticks: {
               beginAtZero:true
           }
       }]
   }
}
});
   }

   public generateFake(count: number): Array<number> {
      const indexes = [];
      for (let i = 0; i < count; i++) {
         indexes.push(i);
      }
      return indexes;
   }

}
