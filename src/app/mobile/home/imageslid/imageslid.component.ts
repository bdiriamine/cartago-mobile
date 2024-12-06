import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-imageslid',
  templateUrl: './imageslid.component.html',
  styleUrls: ['./imageslid.component.css']
})
export class ImageslidComponent implements OnInit {
  //--------------- Carousel de casino --------------------//
  slides = [{
    url: '../../../assets/images/b2.webp',

  },{
    url: '../../../assets/images/mini2.webp',

  },{
    url: '../../../assets/images/x-game.webp',

  },
    {
      url: '../../../assets/images/b5.webp',
  
    },{
      url: '../../../assets/images/CL2.webp',
  
    },
  ];



  constructor() {
  }

  ngOnInit() {
  }

}