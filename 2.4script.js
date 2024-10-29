function barChart(data) {
    // Set SVG dimensions
    var w = 500;
    var h = 200;
    var padding = 5;

    // Create SVG element
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Scaling
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.wombats; })])
        .range([0, h]);

    // Create bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / data.length);
        })
        .attr("y", function(d) {
            return h - yScale(+d.wombats);
        })
        .attr("width", (w / data.length) - padding)
        .attr("height", function(d) {
            return yScale(+d.wombats);
        })
        .attr("fill", function(d) {
        if (d.wombats <= 10) {
            return "#ffb076";  //for 0 to 10
        } else if (d.wombats <= 20) {
            return "#e89c64";  //for 11 to 20
        } else if (d.wombats <= 30) {
            return "#db8c51";    //for 21 to 30
        } else {
            return "#d68040";   //for values > 31
        }
    });

    // Add labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d) {
            return d.wombats;
        })
        .attr("x", function(d, i) {
            return i * (w / data.length) + (w / data.length - padding) / 2;
        })
        .attr("y", function(d) {
            return h - yScale(+d.wombats) - 5;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "black");
}

// Load CSV data and call barChart function
d3.csv("Task%202.4%20data.csv").then(function(data) {
    barChart(data);
});
