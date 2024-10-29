function barChart(data) {
    // Set SVG dimensions
    var w = 600;
    var h = 300;
    var padding = 40;

    // Create SVG element
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w + padding * 2)
        .attr("height", h + padding * 2)
    .append("g")
    .attr("transform", 'translate(${padding},${padding})');

    // Scaling
    var xScale = d3.scaleBand()
        .domain(data.map((d, i) => i))  // Use index for categorical x-axis
        .range([0, w])
        .padding(0.1);
    
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.wombats)])
        .range([h, 0]);
    
    // Create x-axis and y-axis
    var xAxis = d3.axisBottom(xScale).tickFormat((d, i) => `Item ${i + 1}`);
    var yAxis = d3.axisLeft(yScale);
    
    // Append axes
    svg.append("g")
        .attr("transform", `translate(0, ${h})`)
        .call(xAxis);

    svg.append("g").call(yAxis);

    // Create bars
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i))
        .attr("y", d => yScale(+d.wombats))
        .attr("width", xScale.bandwidth())
        .attr("height", d => h - yScale(+d.wombats))
        .attr("fill", d => {
            if (d.wombats <= 10) {
                return "#ffb076";  // For 0 to 10
            } else if (d.wombats <= 20) {
                return "#e89c64";  // For 11 to 20
            } else if (d.wombats <= 30) {
                return "#db8c51";  // For 21 to 30
            } else {
                return "#d68040";  // For values > 30
            }
        });

    // Add labels
    svg.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(d => d.wombats)
        .attr("x", (d, i) => xScale(i) + xScale.bandwidth() / 2)
        .attr("y", d => yScale(+d.wombats) - 5)
        .attr("text-anchor", "middle")
        .attr("fill", "black");
}

// Load CSV data and call barChart function
d3.csv("Task%202.4%20data.csv").then(data => {
    barChart(data);
});
