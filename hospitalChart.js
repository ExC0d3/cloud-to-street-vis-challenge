const drawHospitalMap = features => {
  const geojsonMarkerOptions = {
    radius: 4,
    fillColor: "#789abc",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };
  const hospitalMap = L.map("hospitalMap").setView([7.873054, 80.7717972], 7);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
  }).addTo(hospitalMap);
  debugger;
  L.geoJSON(features, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  })
    .bindPopup(layer => {
      return layer.feature.properties.name;
    })
    .addTo(hospitalMap);
};

const renderHospitalChart = () => {
  drawHospitalMap(hospitalDatatstore.features);
};
