let precipitationDatastore, hospitalDatatstore, tiff;

async function loadData() {
  precipitationDatastore = await d3.csv(
    "datasets/c2s_developer_exercise/Sri-Lanka_GSMaP_20180516_20180612.csv"
  );
  hospitalDatatstore = await d3.json("datasets/c2s_developer_exercise/sri-lanka_hospitals_osm.geojson");
  tiff = await GeoTIFF.fromUrl("datasets/c2s_developer_exercise/SentinelCombo_20180516_20180612.tif")
}

(function(){
    loadData()
    .then(() => {
        renderPrecipitationData();
        renderHospitalChart();
    })
})()