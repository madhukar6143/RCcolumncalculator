import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rccolumncalculator';
  
  Load:number
  concreatestrength:number
  gradeofsteel:number
  percentageofsteel:number
  effectivelength:number
  grossarea:number
  grossareaofconcreate:number
  areaofsteel:number
  areaofconcreate:number
  grossareaofsteel:number
  sizeofcolumn:number
  numberofbars:number
  diaofsteel:number=16
  areaofonesteelbar:number=200.96
  

  rcColumnCalculator()
  {
    this.areaofsteel=this.percentageofsteel/100;
   this.areaofconcreate=1-this.areaofsteel

    this.grossarea=(this.Load*1000)/(0.4*this.concreatestrength*(this.areaofconcreate)+0.67*this.gradeofsteel*this.areaofsteel)

    this.grossareaofconcreate=this.grossarea*this.areaofconcreate
    this.grossareaofsteel=this.grossarea-this.grossareaofconcreate
    this.sizeofcolumn=Math.sqrt(this.grossarea)
    this.numberofbars=this.grossareaofsteel/this.areaofonesteelbar
  }
}
