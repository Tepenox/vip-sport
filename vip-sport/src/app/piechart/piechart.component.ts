import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent implements OnInit {
  
  public pieLabels = ['Protéines', 'Glucides', 'Lipides'];

  pieData: number[];
  public pieType = 'pie';

  @Input() prot: number;
  @Input() gluc: number;
  @Input() lip: number;

  public colorFont: any = {
    legend: {
      labels: {
        fontColor: 'black',
      },
    },
  };

  constructor() {}

  refreshPie() {
    location.reload();
  }

  ngOnInit(): void {
    this.pieData = [this.prot, this.gluc, this.lip];
  }

  ngOnChanges() {
    this.pieData = [this.prot, this.gluc, this.lip];
  }
}
