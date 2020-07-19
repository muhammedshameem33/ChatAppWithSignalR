namespace ChatApp
{
    using ChatApp.Models;
    using Microsoft.AspNetCore.SignalR;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            // invoke this ReceiveMessage method in the client
            // Broadcast to all clients
            await Clients.All.SendAsync("ReceiveMessage",message);
        }
    }
}
