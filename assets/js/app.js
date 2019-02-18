

//set SVG and chart area dimensions
function defineSVG(){

   //SVG area  
    var svgWidth = 920;
    var svgHeight = 620;

    var margin = {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60
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
function makeScatterPlot(xdata, ydata, abbr, chartGroup, chrtHt, chrtWd){

    //create tuples of x,y values to plot the data
    var plotData = [];
    for (var i = 0; i< xdata.length; i++){
        plotData.push([xdata[i], ydata[i], abbr[i]]);
    };
 

    //=====================================================    
    //scales 
    //=====================================================
    var xScale = d3.scaleLinear()
                .domain(d3.extent(xdata))
                .range([0, chrtWd]);

    var yScale = d3.scaleLinear()
                .domain(d3.extent(ydata))
                .range([chrtHt, -5]);

   

    //=====================================================
    //create axes
    //=====================================================
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale).ticks(10);
  

    //Set x to bottom of chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chrtHt})`)
        .call(xAxis);

    //Set y to the left of chart (no shift needed for y axis to be on the left)
    chartGroup.append("g")
        //.attr("transform", `translate(${chrtWd}, 0)`)
        .call(yAxis);


    //Y Axis
    chartGroup.append("text")
    // Position the text
    // Center the text:
    // (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor)
    .classed("AxisText", true)
    .attr("transform", `translate(${-30}, ${chrtHt/2}) rotate(-90)`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Lacks HealthCare (%)");

    //X axis
    chartGroup.append("text")
    .classed("AxisText", true)
    .attr("transform", `translate(${chrtWd / 2}, ${chrtHt + 40})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("In Poverty(%)");


    //======================================================================
    //Create the variable to hold circles and text in the scatter plot
    //======================================================================

    var gdots =  chartGroup.selectAll("#scatter")
        .data(plotData)
        .enter().append('g');

    //create circles
    gdots.append("circle")
        .attr("class", "stateCircle")
        .attr("r", 15)
        .attr("cx", d => xScale(d[0]))
        .attr("cy", d => yScale(d[1]))
        .style("fill", "lightskyblue")
        // .on('mouseover', tool_tip.show)
        // .on('mouseout', tool_tip.hide)
        ;    
        // node.on('mouseout', function() {
        //     d3.select(".d3-tip")
        //     .transition()
        //       .delay(100)
        //       .duration(600)
        //       .style("opacity",0)
        //       .style('pointer-events', 'none')
        //     });


    //create text to be displayed inside the circle
    gdots.append("text").text(d => d[2])
        .classed("stateText", true)
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        ;





    //======================================================================
    //Create the tooltip
    //======================================================================

   
    //Step 1: Initialize the tooltip
    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d, i) {
            return (`<strong>${plotData[i][2]}</strong><hr> Poverty: ${plotData[i][0]} <br> Healthcare: ${plotData[i][1]}`);
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







var chartWidth = 0;
var chartHeight = 0;


//read the csv file
d3.csv("assets/data/data.csv").then(function(censusData) {
    

    //create arrays to hold the data. cast numeric data into numeric values
    var id = censusData.map(data => +data.id);
    var state = censusData.map(data => data.state);
    var abbr = censusData.map(data => data.abbr);
    var poverty = censusData.map(data => +data.poverty);
    var povertyMoe = censusData.map(data => +data.povertyMoe);

    var age = censusData.map(data => +data.age);
    var ageMoe  = censusData.map(data => +data.ageMoe);
    var income = censusData.map(data => +data.income);
    var incomeMoe = censusData.map(data => +data.incomeMoe);
    var healthcare = censusData.map(data => +data.healthcare);
    var healthcareLow = censusData.map(data => +data.healthcareLow);

    var healthcareHigh = censusData.map(data => +data.healthcareHigh);
    var obesity = censusData.map(data => +data.obesity);
    var obesityLow = censusData.map(data => +data.obesityLow);
    var obesityHigh = censusData.map(data => +data.obesityHigh);
    var smokes = censusData.map(data => +data.smokes);
    var smokesLow = censusData.map(data => +data.smokesLow);
    var smokesHigh = censusData.map(data => +data.smokesHigh);

    

    //define SVG chart
    var chrtgrp = defineSVG();

    //poverty vs. heathcare
    makeScatterPlot(poverty, healthcare, abbr, chrtgrp, chartHeight, chartWidth);

  });
    

  

    

