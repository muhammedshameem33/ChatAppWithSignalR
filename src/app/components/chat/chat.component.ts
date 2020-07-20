import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { ChatServiceService } from 'src/app/Services/chat-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: FormControl;
  private connection: HubConnection;
  uniqueID: string = new Date().getTime().toString();
  nick: string;
  chatObject = {
    msg: '',
    type: '',
    date: new Date(),
    sender: this.nick,
    clientuniqueid: '',
    senderName:''
  };
  msgArray = new Array();

  constructor(private chatService: ChatServiceService, private ngZone: NgZone) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.messages = new FormControl('');
    // this.nick = window.prompt("your name", '');
    this.nick='name';
  }
  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((msg: any) => {
      this.ngZone.run(() => {
        if (msg.clientuniqueid !== this.uniqueID) {
        msg.type = "reciever";
        this.msgArray.push(msg);
        console.log(this.msgArray)
        }
      });
    });
  }

  public sendMessage() {
    this.chatObject.msg = this.messages.value;
    this.chatObject.clientuniqueid = this.uniqueID;
    this.chatObject.type = "sent";
    this.chatObject.date=new Date();
    this.chatObject.type = "sender";
    this.chatObject.senderName=this.nick
    this.chatService.sendMessage(this.chatObject);
    this.msgArray.push(this.chatObject);
    this.messages.setValue('');
  }

  // public receiveMessage(sender,msg,time){
  //   this.chatObject.type="reciever";
  //   this.chatObject.message=msg;
  //   this.chatObject.sender=sender;
  //   this.chatObject.date=time;
  //   this.msgArray.push(this.chatObject);
  // }

}
