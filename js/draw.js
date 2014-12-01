function draw_chart (istore, idept) {

  delete_chart();

  var filename1 = "actual_store"+istore+"store_dept"+idept+".tsv"
  var filename2 = "pred_store"+istore+"store_dept"+idept+".tsv"

  var margin = {top:20, right:20, bottom: 30, left:50},
    width = 500 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 500 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

  var parseDate = d3.time.format("%Y-%m-%d").parse;



  var y = d3.scale.linear()
    .range([height, 0]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


  var svg = d3.select("#graph_window").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var color_hash = {  0 : ["history", "steelblue"],
    1 : ["prediction", "red"]
  }

  var actual_size = "";
  var pred_size = "";

  var draw_line1 = function(){
    d3.tsv("js/data/"+filename1, function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.sales = +d.sales;
      });

      var size = data.length;
      var x1 = d3.time.scale()
      .range([0, width*size/pred_size]);

      var xAxis1 = d3.svg.axis()
      .scale(x1)
      .orient("bottom");

      var line1 = d3.svg.line()
      .x(function(d) { return x1(d.date); })
      .y(function(d) { return y(d.sales); });

      x1.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.sales; }));

      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis1);

      svg.append("path")
      .datum(data)
      .attr("class", "line1")
      .attr("d", line1);
    });
  }


  var draw_line2 = function(){
    d3.tsv("js/data/"+filename2, function(error, data) {
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.sales = +d.sales;
      });

      var legend = svg.append("g")
      .attr("class", "legend")
      .attr("x", width - 65)
      .attr("y", 25)
      .attr("height", 100)
      .attr("width", 100);


      var size = data.length;
      pred_size = data.length;
      var x2 = d3.time.scale()
      .range([0, width]);

      var xAxis2 = d3.svg.axis()
      .scale(x2)
      .orient("bottom");

      var line2 = d3.svg.line()
      .x(function(d) { return x2(d.date); })
      .y(function(d) { return y(d.sales); });

      x2.domain(d3.extent(data, function(d) { return d.date; }));
      y.domain(d3.extent(data, function(d) { return d.sales; }));

      svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Weekly sales ($)");

      var size = data.length;
      svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2);

      svg.append("path")
      .datum(data)
      .attr("class", "line2")
      .attr("d", line2);


      legend.selectAll('g').data([1,2])
      .enter()
      .append('g')
      .each(function(d, i) {
        var g = d3.select(this);
        g.append("rect")
        .attr("x", width - 65)
        .attr("y", i*25)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color_hash[String(i)][1]);

        g.append("text")
        .attr("x", width - 50)
        .attr("y", i * 25 + 8)
        .attr("height",30)
        .attr("width",100)
        .style("fill", color_hash[String(i)][1])
        .text(color_hash[String(i)][0]);
      });
    });

  }

  draw_line2();
  draw_line1();


  d3.selectAll(".form-group").style("width", "200px");

}



function delete_chart(){
  d3.selectAll("svg").remove();
}
