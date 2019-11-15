let precipitationDatastore, hospitalDatatstore, impactDatastore;

async function loadData() {
  precipitationDatastore = await d3.csv(
    "datasets/c2s_developer_exercise/Sri-Lanka_GSMaP_20180516_20180612.csv"
  );
  hospitalDatatstore = await d3.json("datasets/c2s_developer_exercise/sri-lanka_hospitals_osm.geojson");
  impactDatastore = await d3.csv("datasets/c2s_developer_exercise/SentinelCombo_20180516_20180612_Impact_Estimates.csv")
}

(function(){
    loadData()
    .then(() => {
        $('#hospitalMapCheckbox').on('click', (e) => toggleFloodLayerOnHospitalMap(e))
        renderPrecipitationData();
        renderHospitalChart();
        renderFloodMap();
    })
})()