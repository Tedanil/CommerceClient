import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(private alertify: AlertifyService, spinner: NgxSpinnerService, private singalRService: SignalRService) {
    super(spinner)
    singalRService.start(HubUrls.ProductHub)
   }
   

  ngOnInit(): void {
    this.singalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: MessageType.Success,
        position: Position.TopRight
      })
    });
    

  }

  m() {
    this.alertify.message("Merhaba", {
      messageType: MessageType.Success,
      delay: 3,
      position: Position.BottomRight,
      dismissOthers: true



    }
    )
  }
  d() {
    this.alertify.dismiss()
  }

}
 