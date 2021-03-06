

//set SVG and chart area dimensions
function defineSVG(){

   //SVG area  
    var svgWidth = 820;
    var svgHeight = 520;

    var margin = {
        top: 60,
        right: 60,
        bottom: 80,
        left: 80
    };

    // Define dimensions of the chart area
    chartWidth = svgWidth - margin.left - margin.right;
    chartHeight = svgHeight - margin.top - margin.bottom;

    // Select body, append SVG area to it, and set its dimensions
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    // Append a group area, then set its margins
    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

     return chartGroup;
};



//create scatterplot
function makeScatterPlot(data, xvble, yvble, chartGroup, chrtHt, chrtWd){

    //unpack the data
    var state = data.map(data => data.state);
    var abbr = data.map(data => data.abbr);    
    var xdata = data.map(data => +data[xvble]);
    var ydata = data.map(data => +data[yvble]);



    //=====================================================    
    //scales 
    //=====================================================
    var xScale = d3.scaleLinear()
                .domain(d3.extent(xdata))
                .range([0, chrtWd]);

    var yScale = d3.scaleLinear()
                .domain(d3.extent(ydata))
                .range([chrtHt, 0]);

 
    //=====================================================
    //create axes
    //=====================================================
    var yAxis = d3.axisLeft(yScale).ticks(7);
    var xAxis = d3.axisBottom(xScale).ticks(10);
  

    //Set x to bottom of chart
    chartGroup.append("g")
        .attr("transform", `translate(-20, ${chrtHt+30})`)
        .call(xAxis);

    //Set y to the left of chart (no shift needed for y axis to be on the left)
    chartGroup.append("g")
        .attr("transform", `translate(-20, 30)`)
        .call(yAxis);
        

    //Y Axis
    chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .classed("AxisText", true)
    .attr("transform", `translate(${-50}, ${chrtHt/2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Lacks HealthCare (%)");

    //X axis
    chartGroup.append("text")
    .classed("AxisText", true)
    .attr("transform", `translate(${chrtWd / 2}, ${chrtHt + 70})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("In Poverty(%)");


    //======================================================================
    //Create the variable to hold circles and text in the scatter plot
    //======================================================================

    var gdots =  chartGroup.selectAll("#scatter")
        .data(data)
        .enter().append('g');

    //create circles
    gdots.append("circle")
        .attr("class", "stateCircle")
        .attr("r", 15)
        .attr("cx", d => xScale(d[xvble]))
        .attr("cy", d => yScale(d[yvble]))
        .style("fill", "lightskyblue")
        ;

    //create text to be displayed inside the circle
    gdots.append("text").text(d => d["abbr"])
        .classed("stateText", true)
        .attr("x", d => xScale(d[xvble]))
        .attr("y", d => yScale(d[yvble]))
        ;





    //======================================================================
    //Create the tooltip
    //======================================================================

   
    //Step 1: Initialize the tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d, i) {
            return (`<strong>${data[i]["state"]}</strong><br>Poverty: ${data[i][xvble]}% <br> Healthcare: ${data[i][yvble]}%`);
    });

    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    gdots.on("mouseover", function(d, i) {
        toolTip.show(d, i, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
        toolTip.hide(d);
        });
    

};






////program start here


//Declare chart width and height
var chartWidth = 0;
var chartHeight = 0;


//read the csv file
d3.csv("assets/data/data.csv").then(function(censusData) {
        
    //define SVG chart
    var chrtgrp = defineSVG();

    //poverty vs. heathcare
    makeScatterPlot(censusData, "poverty", "healthcare", chrtgrp, chartHeight, chartWidth);

  });
    

  

    

