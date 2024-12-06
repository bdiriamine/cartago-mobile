import { Component, OnInit } from '@angular/core';
import { JackpotService } from 'src/app/services/jackpot/jackpot.service';

@Component({
  selector: 'app-pub',
  templateUrl: './pub.component.html',
  styleUrls: ['./pub.component.css']
})
export class PubComponent implements OnInit {
  winners = [];
  bolVA : boolean;
  constructor(private jackpotServ: JackpotService) { }

  ngOnInit(): void {
    this.getWinner();
 
  }

  getWinner() {
    this.jackpotServ.getJackpotWinner().subscribe((res: any) => {

      if(res.status == 200){
        console.log(res.data.length)
        res.data.forEach(element => {
          this.winners.push(element.user.username)
          this.winners.push(',')
        });
        this.winners.splice(this.winners.length -1, 1);
        if(res.data.length==0){
          this.bolVA= false
        }else{
          this.bolVA = true
        }
        console.log(this.bolVA)
      }
    })
  }

}
