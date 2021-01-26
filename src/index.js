/*
The web service will tell you the distance in Km between two points,
given the Latitude and Longitude. 

Input URL:
https://ywcdl.sse.codesandbox.io/ ?latA=29.77432&lonA=-95.36348&latB=30.26766&lonB=-97.74242
Location Names: Houston, TX and Austin, TX
Output Distance (Km): 235.51
*/
var http = require("http");
http
  .createServer(function (request, response) {
    // Read the URL used to contact the web service and extract the latitude and longitude values, saving them each to a variable
    var requestUrl = new URL("http://" + request.headers.host + request.url);
    var latA = requestUrl.searchParams.get("latA");
    var lonA = requestUrl.searchParams.get("lonA");
    var latB = requestUrl.searchParams.get("latB");
    var lonB = requestUrl.searchParams.get("lonB");

    // Use the spherical law of cosines formula to calculate distance along the surface of a sphere. It is not the most accurate method for Earth, but it is good enough. Source: https://www.movable-type.co.uk/scripts/latlong.html
    const φ1 = (latA * Math.PI) / 180;
    const φ2 = (latB * Math.PI) / 180;
    const Δλ = ((lonB - lonA) * Math.PI) / 180;
    const R = 6371; // Earth's radius in km
    const d =
      Math.acos(
        Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ)
      ) * R;

    // Output the calculated distance value to the client and complete the execution of the program.
    response.write("{distance: " + d + "}");
    response.end();
  })
  .listen(8080);
