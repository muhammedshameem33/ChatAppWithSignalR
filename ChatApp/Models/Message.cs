namespace ChatApp.Models
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;


    public class Message
    {
        public string Clientuniqueid { get; set; }
        public string SenderName { get; set; }

        public string Type { get; set; }


        public string Msg { get; set; }
        public DateTime Date { get; set; }
    }
}
