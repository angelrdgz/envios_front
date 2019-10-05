import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Chart } from 'chart.js';

import { ApiService } from '../services/api.service';

import { first } from 'rxjs/operators';
import Swal from 'sweetalert2'




@Component({
   selector: 'app-dashboard',
   templateUrl: './dashboard.component.html',
   styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

   @ViewChild('revenueLineChart', { static: false }) chart: ElementRef;

   public data: any = [];
   public months: any = [];
   public currentMonth: string = "01";
   public monthNames: any = ["", "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

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
   myDoughnutChart: any = []
   myDoughnutChart2: any = []
   myDoughnutChart3: any = []

   constructor(private _apiService: ApiService) { }

   ngOnInit() {
      var d = new Date();
      var n = d.getMonth()
      this.currentMonth = ("0" + (d.getMonth() + 1)).slice(-2);
      for (let index = 0; index <= n; index++) {
         this.months.push({id: ("0" + (index + 1)).slice(-2), name:this.monthNames[(index+1)]+" "+d.getFullYear()})      
       }
      this.getDashboard(n + 1);
   }

   getDashboard(month) {
      this._apiService.getDashboard(parseInt(month)).subscribe(
         data => { this.data = data.data },
         err => {
            console.log(err)
         },
         () => {
            this.drawStatusChart(this.data)
         }
      );
   }

   drawStatusChart(data) {

      this.myDoughnutChart = new Chart('DoughnutChart', {
         type: 'doughnut',
         data: {
            datasets: [{
               data: [this.data.totalDeliveied, this.data.totalCancelled, this.data.totalProcess],
               backgroundColor: ['#2B388F', '#EC1C24', '#ffffff'],
            }],

            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
               'Entregadas',
               'Canceladas',
               'En Proceso'
            ]
         },
         options: {
            responsive: true,

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
