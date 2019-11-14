const drawBaseMap = (features) => {
    const geojsonMarkerOptions = {
        radius: 4,
        fillColor: "#789abc",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    const hospitalMap = L.map("hospitalMap").setView([7.873054, 80.7717972], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(hospitalMap);
    // L.tileLayer(
    //   "datasets/c2s_developer_exercise/SentinelCombo_20180516_20180612/{z}/{x}/{y}.png",
    //   {
    //     attribution:
    //       'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: "mapbox.streets",
    //     accessToken: "your.mapbox.access.token"
    //   }
    // ).addTo(hospitalMap);
    debugger;
    L.geoJSON(features, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).bindPopup((layer) => {
        return layer.feature.properties.name
    }).addTo(hospitalMap);
};

const renderHospitalChart = () => {
  drawBaseMap(hospitalDatatstore.features);
};
