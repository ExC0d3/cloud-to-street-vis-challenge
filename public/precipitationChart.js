function getChartHeightAndWidth(dimensions) {
  return {
    height:
      dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
    width: dimensions.width - dimensions.margin.left - dimensions.margin.right
  };
}

function addAxisLabels(config) {
  const { container, dimensions } = config;
  container
    .append("text")
    .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    .attr(
      "transform",
      "translate(" +
        dimensions.margin.bottom / 2 +
        "," +
        dimensions.height / 2 +
        ")rotate(-90)"
    ) // text is drawn off the screen top left, move down and out and rotate
    .text("Precipitation(mm)");

  container
    .append("text")
    .attr("text-anchor", "middle") // this makes it easy to centre the text as the transform is applied to the anchor
    .attr(
      "transform",
      "translate(" +
        dimensions.width / 2 +
        "," +
        (dimensions.height - dimensions.margin.bottom / 3) +
        ")"
    ) // centre below axis
    .text("Date");
}

function getPrecipationChartConfig() {
  const dimensions = {
    width: $("#precipitationChart").width(),
    height: 800,
    margin: {
      top: 10,
      bottom: 50,
      left: 50,
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
    .scaleBand()
    .range([0, config.chartDimensions.width])
    .padding(0.5)
    .domain(precipitationDatastore.map(p => p.date));

  const yScale = d3
    .scaleLinear()
    .range([config.chartDimensions.height, 0])
    .domain([0, d3.max(precipitationDatastore.map(p => p.precip))]);

  return { xScale, yScale };
}

function drawAxes(config, scales) {
  let { xScale, yScale } = scales;

  const { container } = config;

  const axisX = d3
    .axisBottom(xScale)
    .tickValues(xScale.domain().filter((d, idx) => idx % 2 === 0))
    .tickSize(0)
    .tickFormat(d3.timeFormat("%b-%d"));

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

function drawBar(config, scales) {
  const { container } = config;
  const { xScale, yScale } = scales;

  let barArea = container.append("g");

  let bars = barArea.selectAll(".bar").data(precipitationDatastore);
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "toolTip")
    .style("opacity", 0);

  bars
    .enter()
    .append("rect")
    .attr(
      "height",
      d =>
        config.dimensions.height -
        config.dimensions.margin.bottom -
        config.dimensions.margin.top -
        yScale(d.precip)
    )
    .attr("y", d => yScale(d.precip))
    .attr("x", d => xScale(d.date))
    .attr("width", xScale.bandwidth())
    .style(
      "transform",
      `translate(${config.dimensions.margin.left}px, ${config.dimensions.margin.top}px)`
    )
    .attr("fill", "#1F9EB5")
    .on("mouseover", d => {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      let dateTime = d3.timeFormat("%b-%d")(d.date);
      tooltip
        .style("left", d3.event.pageX - 50 + "px")
        .style("top", d3.event.pageY - 70 + "px")
        .html(`${dateTime}-2018<br>Precipitation: ${d.precip}`);
    })
    .on("mouseout", d => {
      tooltip
      .transition()
      .duration(500)
      .style("opacity", 0);
    });
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
  // drawLine(config, scales);
  drawBar(config, scales);
  addAxisLabels(config);
}
