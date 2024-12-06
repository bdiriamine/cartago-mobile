import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from 'src/app/core/services/socket.service';

@Component({
  selector: 'app-element-maintain',
  templateUrl: './element-maintain.component.html',
  styleUrls: ['./element-maintain.component.css']
})
export class ElementMaintainComponent implements OnInit {
@Input() page : string;
  constructor(private socketServ: SocketService) { }

  ngOnInit(): void {
  }


}
