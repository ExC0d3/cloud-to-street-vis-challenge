const drawFloodMap = floodMap => {
  const floodLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }
  ).addTo(floodMap);
  L.tileLayer(
    "datasets/c2s_developer_exercise/SentinelCombo_20180516_20180612/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: "your.mapbox.access.token"
    }
  ).addTo(floodMap);
  return floodLayer;
};

function getColor(d) {
  return d > 1000
    ? "#800026"
    : d > 500
    ? "#BD0026"
    : d > 200
    ? "#E31A1C"
    : d > 100
    ? "#FC4E2A"
    : d > 50
    ? "#FD8D3C"
    : d > 20
    ? "#FEB24C"
    : d > 10
    ? "#FED976"
    : "#FFEDA0";
}

const calculateImpactDays = () => {
  const began = new Date(impactDatastore[0].Began);
  const ended = new Date(impactDatastore[0].Ended);

  const days = (ended.getTime() - began.getTime()) / (1000 * 3600 * 24);
  return days;
}

const addLegend = floodMap => {
  const legend = L.control({ position: "bottomright" });

  legend.onAdd = function(floodMap) {
    const div = L.DomUtil.create("div", "info legend"),
      grades = [0, 10, 20, 50, 100, 200],
      colors = ['#f1eef6','#d0d1e6','#a6bddb','#74a9cf','#2b8cbe','#045a8d'];
    // loop through our density intervals and generate a label with a colored square for each interval
    
    // const wrapped_div = $(div).append($("div"));
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        colors[i] +
        '"></i> ';
    }
    
    div.innerHTML += `<br><div class="">
    <p class="m-0 float-left text-center">0</p>
    <p class="m-0 float-right text-center">${calculateImpactDays()}</p>
    </div>`
    div.innerHTML += `<p class="m-0 text-center">Days</p>`;

    return div;
  };

  legend.addTo(floodMap);
};

const renderFloodMap = () => {
  const floodMap = L.map("floodMap").setView([7.873054, 80.7717972], 7);
  drawFloodMap(floodMap);
  addLegend(floodMap);
};
