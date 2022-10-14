import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
   }

  ngOnInit(): void {
    
  }
  //imagePath: string ="https://imgyukle.com/f/2022/10/14/nb63u1.png";
  //storyPath: string = 'assets/images/erbas.PNG';

}
