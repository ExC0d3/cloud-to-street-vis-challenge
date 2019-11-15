const renderImpactChart = () => {
    const populationExposed = impactDatastore[0].Pop_Exposed
    const areaExposed = impactDatastore[0]["Area_flooded_(km2)"]
    const tableRow = `<tr><td>${populationExposed}</td><td>${areaExposed} km^2</td></tr>`
    $("#impactTable tbody")
    .append(tableRow);
}