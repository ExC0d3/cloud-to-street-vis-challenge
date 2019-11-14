function getChartHeightAndWidth(dimensions) {
  return {
    height:
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
    width: dimensions.width - dimensions.margin.left - dimensions.margin.right
  };
}

function getPrecipationChartConfig() {
  const dimensions = {
    width: $('#precipitationChart').width(),
    height: 800,
    margin: {
      top: 10,
      bottom: 50,
      left: 30,
      right: 10
    }
  };

  const chart = d3.select("#precipitationChart");

  chart
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("align", "center");

  return {
    dimensions,
    container: chart,
    chartDimensions: getChartHeightAndWidth(dimensions)
  };
}

function getDateFromString(str) {
  const date = new Date(
    str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6)
  );
  return date;
}

function getPrecipitationChartScales(config) {
  const xScale = d3
    .scaleTime()
    .range([0, config.chartDimensions.width])
    .domain(d3.extent(precipitationDatastore, (p) => p.date));
    
  const yScale = d3
    .scaleLinear()
    .range([config.chartDimensions.height,0])
    .domain([0, d3.max(precipitationDatastore.map((p) => p.precip))]);

  return { xScale, yScale };
}

function drawAxes(config, scales) {
  let { xScale, yScale } = scales;

  const { container } = config;

  const axisX = d3
  .axisBottom(xScale)
  .ticks(15)
  .tickFormat(d3.timeFormat("%b-%d"))

  container
    .append("g")
    .style(
      "transform",
      `translate(${config.dimensions.margin.left}px, ${config.dimensions
        .height - config.dimensions.margin.bottom}px)`
    )
    .call(axisX);

  const axisY = d3.axisLeft(yScale);

  container
    .append("g")
    .style(
      "transform",
      `translate(${config.dimensions.margin.left}px, ${config.dimensions.margin.top}px)`
    )
    .call(axisY);
}

function drawLine(config, scales) {
  const { container } = config;
  const { xScale, yScale } = scales;
  
  container
    .append("path")
    .datum(precipitationDatastore)
    .attr("d", 
        d3.line()
        .x(d =>  {
            return xScale(d.date);
        })
        .y(d => {
            return yScale(d.precip)
        })
    )
    .attr("stroke", "blue")
    .style("transform",
    `translate(${config.dimensions.margin.left}px, ${config.dimensions.margin.top}px)`)
    .attr("stroke-width", 2)
    .attr("fill", "none");
}

function preprocessData() {
  precipitationDatastore = precipitationDatastore.map(p => {
    return {
      date: getDateFromString(p.date),
      precip: parseFloat(p.precip)
    };
  });
}

function renderPrecipitationData() {
  preprocessData();
  const config = getPrecipationChartConfig();
  const scales = getPrecipitationChartScales(config);
  drawAxes(config, scales);
  drawLine(config, scales);
}