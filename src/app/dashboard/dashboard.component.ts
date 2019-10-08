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
