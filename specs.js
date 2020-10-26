function get(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}


data = get("data")

cells = data.split(",")

document.write(`
  Name: ${cells[5]}<br>
  Style: ${cells[4]}<br>
  Brewery: ${cells[6]}<br>
  State: ${cells[0]}<br>
  City: ${cells[1]}<br>
  Alcohol percentage: ${cells[3] * 100 + "%"}
`)

xhttp = new XMLHttpRequest()
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       console.log(xhttp.response);
    }
}

query = `PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT DISTINCT ?latitude ?longitude WHERE {
  ?country rdfs:label "United States"@en.
  ?country dbp:latd ?latitude.
  ?country dbp:longd ?longitude.
}`

uri = "https://dbpedia.org/sparql?query=" + encodeURIComponent(query)
xhttp.open("GET", uri, true);
xhttp.setRequestHeader("Content-Type", "application/sparql-results+json");
xhttp.send();

document.write("<br><br>")

document.write(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13007083.57009763!2d-104.65487438640365!3d37.258204710134166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2snl!4v1603746816634!5m2!1sen!2snl" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>`)
