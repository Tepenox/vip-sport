import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  public pieLabels = ['Protéines', 'Glucides', 'Lipides'];
  public pieData = [200, 180, 90];
  public pieType = 'pie';

  public lineChartOptions:any = {
    legend : {
        labels : {
          fontColor : '#ffffff'  
        }
    }
};


  constructor() { }

  ngOnInit(): void {
    
  }




}
