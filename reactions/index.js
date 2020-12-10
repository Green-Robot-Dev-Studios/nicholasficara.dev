var ptable = {}

let requestURL = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  ptable = request.response;
  
}

var poly = {
  "NH4": 1,
  "C2H3O2": -1,
  "HCO3": -1,
  "HSO4": -1,
  "HS": -1,
  "BrO3": -1,
  "ClO3": -1,
  "CN": -1,
  "H2PO4": -1,
  "IO3": -1,
  "MnO4": -1,
  "SCN": -1,
  "CrO4": -2,
  "Cr2O7": -2,
  "C2O4": -2,
  "S2O3": -2,
}

function is_poly(input) {
  if (input in poly) {
    return true;
  }
  return false;
}

function read_single(input) {

  if (is_poly(input)) {
    console.log("Polyatomic");
    return [input, poly[input]];
  }

  regexp = /([A-Z][a-z]*)(\d*)|(\()|(\))(\d*)/g
  matches = input.matchAll(regexp);
  for (let match of matches) {
    if (match[1]) {
      for (i of ptable["elements"]) {
        if (i["symbol"] == match[1]) {
          var charge = (i["shells"][i["shells"].length-1] > 4 ? (8-i["shells"][i["shells"].length-1])*-1 : 8-i["shells"][i["shells"].length-1]);
        }
      }
      console.log("Not Polyatomic");
      return [match[1], charge];
    }
  }
}

function synth() {
  var first = document.getElementById("synth-1").value;
  var second = document.getElementById("synth-2").value;
  
  var cation = read_single(first);
  var anion = read_single(second);
  
  if (second == "CO2" || first == "CO2") {
    if (second == "CO2"){
      anion[0] = "CO3";
      anion[1] = -2;
    } else {
      cation[0] = anion[0];
      cation[1] = anion[1];
      anion[0] = "CO3";
      anion[1] = -2;
    }
  } else if ((first == "O2" && /[A-Z][a-z]*[1-9]*Cl/g.test(second)) || (second == "O2" && /[A-Z][a-z]*[1-9]*Cl/g.test(first))) {
    if (first == "O2" && /[A-Z][a-z]*[1-9]*Cl/g.test(second)) {
      anion[0] = "ClO3";
      anion[1] = -1;
    } else {
      cation[0] = anion[0];
      cation[1] = anion[1];
      anion[0] = "ClO3";
      anion[1] = -1;
    }
    
  } else if (second == "H2O" || first == "H2O") {
    if (first == "H2O") {
      if (anion[1] > 0) {
        cation[0] = anion[0];
        cation[1] = anion[1];
        anion[0] = "OH";
        anion[1] = -1;
      }
    } else {
        anion[0] = "OH";
        anion[1] = -1;
    }
  }

  var ans = "";

  ans += "The answer is: "

  ans += first + " + " + second + " -> ";
  ans += cation[0] + (anion[1] == 1 || -1 ? "" : Math.abs(anion[1]));
  ans += anion[0] + (cation[1] == 1 || -1 ? "" : Math.abs(cation[1]));

  ans += "<br>Now! How do we get that? Let's see the steps I took...<br>"

  

  document.getElementById("ans").innerHTML = ans;

  //NH4 + Cl2 -> NH4Cl ✅
  //MgO + CO2 -> MgCO3
  //NaCl + O2 -> NaClO3
  //K2O + H2O -> KOH
  //CO2 + H2O -> ___
}