function getBeers() {
  var styles = document.forms['styles'].elements

  regex = ""

  for(var s in styles) {
    if(styles[s].checked) regex += (regex.length > 1 ? "|" : "") + styles[s].name
  }

  if(document.getElementById("other").checked) regex = ""

  min_alc = document.getElementById("min_alc").value
  max_alc = document.getElementById("max_alc").value

  xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

         console.log(xhttp.response);

         var table = document.getElementById("table")
         var tbody = document.getElementById("tbody")
         tbody.innerHTML = ""

         lines = xhttp.response.split("\n")

         alert(`${lines.length - 2} results found!`)

         for (var i = 1; i < lines.length; i++) {
           line = lines [i]
           row = tbody.insertRow(-1)

           cells = line.split(",")
           console.log(cells)
           for (var h in cells) {
             if (h<=2) continue
             var cell = row.insertCell(0)

             if (h == 5) cell.innerHTML = `<a href="specs.html?data=${cells.join(",")}">${cells[h]}</a>`
             else cell.innerHTML = cells[h]
           }
         }
      }
  }

  query = `PREFIX beer:<http://www.example.org/beerontologygood/>
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX csvbeer:<http://example.com/csvbeer/>
  PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>

  select ?state ?city ?bid ?alc ?style ?name ?bname where {
  	?s beer:\\#hasAlcoholicContent ?alc .
    ?s beer:hasBrewery ?bid .
    ?s beer:hasStyle ?style .
    ?s rdfs:label ?name .
    ?brewery beer:hasID ?bid .
    ?brewery rdfs:label ?bname .
    ?brewery beer:hasCity ?city .
    ?brewery beer:hasState ?state .
    FILTER (?alc < "${max_alc}" && ?alc > "${min_alc}" && regex(?style, "${regex}", "i"))
  } limit 1000`


  uri = "http://localhost:7200/repositories/beer-result?query=" + encodeURIComponent(query)
  xhttp.open("GET", uri, true);
  xhttp.setRequestHeader("Content-Type", "application/sparql-results+json");
  xhttp.send();
}

function updateAlc () {
  document.getElementById("min_alc_lab").innerHTML = document.getElementById("min_alc").value * 100 + "%"
  document.getElementById("max_alc_lab").innerHTML = document.getElementById("max_alc").value * 100 + "%"
}
