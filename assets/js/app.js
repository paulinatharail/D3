

//set SVG area dimensions
function defineSVG(){

   //SVG area  
    var svgWidth = 900;
    var svgHeight = 600;

    var margin = {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60
    };

    // Define dimensions of the chart area
    var chartWidth = svgWidth - margin.left - margin.right;
    var chartHeight = svgHeight - margin.top - margin.bottom;

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
function makeScatterPlot(xdata, ydata){

    console.log(xdata);
    console.log(ydata);

     var xScale = d3.domain(xdata).range(xdata);

     var yScale = d3.domain(ydata).range(ydata);

     var scatterFig = d3.scatter()
        .x(xdata)
        .y(ydata);

        

};





d3.csv("assets/data/data.csv").then(function(censusData) {
    

    //create arrays to hold the data
    var id = censusData.map(data => data.id);
    var state = censusData.map(data => data.state);
    var abbr = censusData.map(data => data.abbr);
    var poverty = censusData.map(data => data.poverty);
    var povertyMoe = censusData.map(data => data.povertyMoe);

    var age = censusData.map(data => data.age);
    var ageMoe  = censusData.map(data => data.ageMoe);
    var income = censusData.map(data => data.income);
    var incomeMoe = censusData.map(data => data.incomeMoe);
    var healthcare = censusData.map(data => data.healthcare);
    var healthcareLow = censusData.map(data => data.healthcareLow);

    var healthcareHigh = censusData.map(data => data.healthcareHigh);
    var obesity = censusData.map(data => data.obesity);
    var obesityLow = censusData.map(data => data.obesityLow);
    var obesityHigh = censusData.map(data => data.obesityHigh);
    var smokes = censusData.map(data => data.smokes);
    var smokesLow = censusData.map(data => data.smokesLow);
    var smokesHigh = censusData.map(data => data.smokesHigh);

   //console.log(state);

    //define SVG chart
    defineSVG();

    //heathcare vs. poverty
    makeScatterPlot(healthcare, poverty);

  });
    
    // console.log(stateInfo.healthcare);
    // console.log(censusData.state);


    

