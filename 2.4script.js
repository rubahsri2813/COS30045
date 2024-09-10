// Set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 40, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the body of the page
var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Load the data from the CSV file
d3.csv("data.csv").then(function(data) {

  // Parse the data to ensure numbers are treated as such
  data.forEach(function(d) {
    d.wombats = +d.wombats;
  });

  // Define the scales for the x and y axes
  var x = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(function(d, i) { return i; }));

  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function(d) { return d.wombats; })]);

  // Append the bars to the svg
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) { return x(i); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.wombats); })
      .attr("height", function(d) { return height - y(d.wombats); });

  // Add the data labels on top of the bars
  svg.selectAll(".text")
      .data(data)
    .enter().append("text")
      .attr("class", "label")
      .attr("x", function(d, i) { return x(i) + x.bandwidth() / 2; })
      .attr("y", function(d) { return y(d.wombats) - 5; })
      .attr("dy", ".75em")
      .text(function(d) { return d.wombats; });
});