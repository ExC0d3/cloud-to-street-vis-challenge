const drawFloodMap = () => {
    const floodMap = L.map("floodMap").setView([7.873054, 80.7717972], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(floodMap);
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
};

const renderFloodMap = () => {
  drawFloodMap();
};
