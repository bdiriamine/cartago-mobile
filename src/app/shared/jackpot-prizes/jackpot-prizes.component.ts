import { Component, OnInit } from '@angular/core';
import { JackpotService } from 'src/app/services/jackpot/jackpot.service';

@Component({
  selector: 'app-jackpot-prizes',
  templateUrl: './jackpot-prizes.component.html',
  styleUrls: ['./jackpot-prizes.component.css']
})
export class JackpotPrizesComponent implements OnInit {
  prizes : Array <string>[] =[] ;
  constructor(private jackpotServ: JackpotService) { }

  ngOnInit(): void {
    this.getPrizes()
    this.getaftermin()
  }

 async getPrizes() {
  this.jackpotServ.getJackpots().subscribe((res:any) => {
    this.prizes[0]= res.data.lvl3_credits
    this.prizes[1]=res.data.lvl4_credits
    this.prizes[2]=res.data.lvl5_credits

  })

  }
  getaftermin(){
    setInterval(() => {
      this.jackpotServ.getJackpots().subscribe((res:any) => {
        this.prizes[0]= res.data.lvl3_credits
        this.prizes[1]=res.data.lvl4_credits
        this.prizes[2]=res.data.lvl5_credits
    
      })
    }, 30000);
  }

}
