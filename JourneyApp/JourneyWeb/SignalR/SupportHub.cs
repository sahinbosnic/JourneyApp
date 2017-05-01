using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace JourneyWeb.SignalR
{
    public class SupportHub : Hub
    {

        static List<string> CurrentConnections = new List<string>();
        static string adminId;

        public void Hello()
        {
            Clients.All.hello();
        }

        public void Send(string name, string message)
        {
            //client writes
            if (Context.QueryString["user"] == "client")
            {
                if(CurrentConnections.First() == Context.ConnectionId)
                {

                    Clients.Client(adminId).broadcastMessage(name, message);
                    Clients.Client(Context.ConnectionId).broadcastMessage(name, message);
                }
                else
                {
                    Clients.Client(Context.ConnectionId).broadcastMessage("server", "Det är inte din tur att skriva med en admin");
                }
                //Clients.All.broadcastMessage(name, message );
            }
            //Admin writes
            if(Context.QueryString["user"] == "admin")
            {
                try
                {
                    if (message == "/kö") { Clients.Client(adminId).broadcastMessage("server", "Anslutna klienter: " + CurrentConnections.Count()); }
                    else if (message == "/kill") { CurrentConnections = null; } //Not done yet
                    else if (message == "/nästa")
                    {
                        if (CurrentConnections.Count() > 0)
                        {
                            Clients.Client(CurrentConnections.First()).broadcastMessage("server", "Du är inte längre i chat med en admin");
                            CurrentConnections.Remove(CurrentConnections.First());
                            PrintQueue();
                        }
                    }
                    else
                    {
                        Clients.Client(CurrentConnections.First()).broadcastMessage(name, message);
                        Clients.Client(adminId).broadcastMessage(name, message);
                    }
                }
                catch(Exception) { Clients.Client(adminId).broadcastMessage("server", "Inga anslutna klienter i kön"); }
            }
        }

        public override Task OnConnected()
        {
            var connectionId = Context.ConnectionId;
            var user = Context.QueryString["user"];

            if (Context.QueryString["user"] == "client")
            {
                CurrentConnections.Add(connectionId);
                PrintQueue();
            }
            else if (Context.QueryString["user"] == "admin")
            {
                adminId = connectionId;
            }

           

            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var connection = CurrentConnections.FirstOrDefault(x => x == Context.ConnectionId);

            if (connection != null)
            {
                CurrentConnections.Remove(connection);
            }

            PrintQueue();

            try
            {
                Clients.Client(CurrentConnections[0]).broadcastMessage("Admin", "Hej hur kan jag hjälpa dig?");
                Clients.Client(adminId).broadcastMessage("Admin", "Hej hur kan jag hjälpa dig?");
            } catch(Exception) { } 


            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            return base.OnReconnected();
        }

        //return list of all active connections
        public List<string> GetAllActiveConnections()
        {
            return CurrentConnections.ToList();
        }

        public void PrintQueue()
        {
            var tempList = CurrentConnections.ToList();
            for (int i = 0; i < tempList.Count(); i++)
            {
                if (i > 0)
                {
                    Clients.Client(tempList[i]).broadcastMessage("Server", "Du har plats " + i + " i kön");
                }
            }

        }

    }
}