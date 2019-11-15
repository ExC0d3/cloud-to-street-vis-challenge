let tileLayer, geoLayer, floodLayer, hospitalMap;
const defaultGeojsonMarkerOptions = {
  radius: 4,
  fillColor: "#789abc",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
};
const drawHospitalMap = (features, hospitalMap, geojsonMarkerOptions) => {
  tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 18
    }
  ).addTo(hospitalMap);

  addGeoLayer(hospitalMap, features, geojsonMarkerOptions);
};

const addGeoLayer = (hospitalMap, features, geojsonMarkerOptions) => {
  geoLayer = L.geoJSON(features, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    }
  })
    .bindPopup(layer => {
      return layer.feature.properties.name;
    })
    .addTo(hospitalMap);
};

const toggleFloodLayerOnHospitalMap = e => {
  if (e.currentTarget.checked) {
    const geojsonMarkerOptions = {
      ...defaultGeojsonMarkerOptions,
      fillColor: "#ff8c00"
    };
    hospitalMap.removeLayer(geoLayer);
    floodLayer = drawFloodMap(hospitalMap);
    addGeoLayer(hospitalMap, hospitalDatatstore.features, geojsonMarkerOptions);
  } else {
    hospitalMap.eachLayer(function(layer) {
      hospitalMap.removeLayer(layer);
    });
    drawHospitalMap(
      hospitalDatatstore.features,
      hospitalMap,
      defaultGeojsonMarkerOptions
    );
  }
};

const renderHospitalChart = () => {
  hospitalMap = L.map("hospitalMap").setView([7.873054, 80.7717972], 7);
  drawHospitalMap(
    hospitalDatatstore.features,
    hospitalMap,
    defaultGeojsonMarkerOptions
  );
};
