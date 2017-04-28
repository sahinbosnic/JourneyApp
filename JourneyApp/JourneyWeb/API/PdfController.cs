using iTextSharp.text;
using iTextSharp.text.pdf;
using JourneyWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
//using System.Web.Mvc;

namespace JourneyWeb.API
{
    public class PdfController : ApiController
    {
        //public IHttpActionResult GeneratePdfUrl(DownloadModel downloadModel)
        [Route("api/pdf/generate")]
        [HttpPost]
        public IHttpActionResult GeneratePdfUrl(List<Trip> tripData)
        {
            var printVar = "Fordon: " + tripData[0].Vehicle.NumberPlate + "\n \n";
            foreach (var trip in tripData)
            {
                printVar += string.Format("Datum: {0} | Start: {1} | Destination: {2} | Körsträcka: {3}km \n \n", trip.TripDate, trip.AddressStart, trip.AddressStop, (trip.OdometerStop - trip.OdometerStart));
            }
            var guidUrl = "demo-" + Guid.NewGuid().ToString() + ".pdf";
            var savePath = HttpContext.Current.Request.PhysicalApplicationPath + "/PDF/" + guidUrl;
            using (Document doc = new Document(PageSize.A4))
            {
                using (PdfWriter writer = PdfWriter.GetInstance(doc, new FileStream(savePath, FileMode.Create)))
                {
                    doc.Open();
                    BaseFont baseHelvetica = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
                    var color = BaseColor.BLACK;
                    Font helvetica = new Font(baseHelvetica, 11, Font.BOLD, color);
                    var para = new Paragraph(printVar, helvetica);
                    doc.Add(para);
                    doc.Close();
                }
            }


                return Ok("/PDF/" + guidUrl);
        }
    }
}