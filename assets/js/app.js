

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
function makeScatterPlot(data, chartGroup, chrtHt, chrtWd){

    console.log("Number of columns is ",  Object.keys(data).length);

    // let count = 0;
    // for (var c in data) {
    //     count = count + 1;
    // }
    // console.log(count);// 2

    console.log(data);




    //unpack the data
    var state = data.map(data => data.state);
    var abbr = data.map(data => data.abbr);
    var poverty = data.map(data => +data.poverty);
    var healthcare = data.map(data => +data.healthcare);
 
    var xdata = poverty;
    var ydata = healthcare;


    //create tuples of x,y values to plot the data
    var plotData = [];
    for (var i = 0; i< xdata.length; i++){
        plotData.push([xdata[i], ydata[i], abbr[i], state[i]]);
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
        ;

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
            return (`<strong>${plotData[i][3]}</strong><br>Poverty: ${plotData[i][0]}% <br> Healthcare: ${plotData[i][1]}%`);
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









//Declare chart width and height
var chartWidth = 0;
var chartHeight = 0;


//read the csv file
d3.csv("assets/data/data.csv").then(function(censusData) {
        
    //define SVG chart
    var chrtgrp = defineSVG();

    //poverty vs. heathcare
    makeScatterPlot(censusData, chrtgrp, chartHeight, chartWidth);

  });
    

  

    

