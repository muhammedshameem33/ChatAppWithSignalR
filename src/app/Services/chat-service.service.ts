import { Injectable, EventEmitter } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  private connection: HubConnection;
  messageReceived = new EventEmitter<any>();
  constructor() {
    this.buildConnection();
    this.startConnection();
    this.registerOnServerEvents();
   }

   private registerOnServerEvents(): void {  
    this.connection.on('ReceiveMessage', (data: any) => {  
      this.messageReceived.emit(data);  
    });  
  }  

  private buildConnection(){
    this.connection=new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("http://localhost:50698/chatHub",{
      skipNegotiation:true,
      transport:signalR.HttpTransportType.WebSockets
    }).build();
  }

  private startConnection(){
    this.connection.start()
    .then(()=>console.log("Connection started!........."))
    .catch(err=>{
      console.log("Error while Establishing Connection!.....")
    })
  }

  sendMessage(message) {  
    this.connection.invoke('sendMessage',message);  
  }
}
