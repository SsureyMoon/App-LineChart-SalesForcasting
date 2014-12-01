(function(){

  var app = angular.module('SalesShow', []);

  app.controller('TabController', function(){
    this.parameters = parameters;
    this.error_rate = error_rate;

    this.tab = 1;

    this.setTab = function(val){
      this.tab = val;
    };

    this.isSet = function(val){
      return this.tab === val;
    };

  });

  app.controller('SelectController', function(){
    this.store = 1;
    this.depart = 1;

    this.listofstores = (function(){
      var list = [];
      for(i = 1; i <= 45; i++) {
        list.push(i)
      }
      return list;
    })();

    this.draw = draw_chart;


    this.listofdepartments = (function(){
      var list = [];
      for(i = 1; i <= 99; i++) {
        list.push(i)
      }
      return list;
    })();

    draw_chart(this.store, this.depart);

    this.setStore = function(val){
      this.store = val;
    };
    this.setDepart = function(val){
      this.depart = val;
    };

    this.isStore = function(val){
      return this.store === val;
    };

    this.isDepart = function(val){
      return this.depart === val;
    };
  });

  var parameters = null;

  //Get data from an external JSON file
  $.ajax({
    url: "./js/c_gamma1.json",
    async: false,
    dataType: "json",
    success: function(data) {
      parameters = data;
    }
  })


  var error_rate = null;

  //Get data from an external tsv file
  error_rate = (function(){
    var listoferror = [];
    d3.tsv("./js/error_rate_store_dept.tsv", function(data) {
      for(i=0; i<99; i++){
        var errorofdepartments = [];
        for(j=0; j<45; j++){
          errorofdepartments.push("NA");
        }
        listoferror.push(errorofdepartments);
      }

      data.forEach(function(d) {
        listoferror[d.depart-1][d.store-1]=d.error;
      });


    });
    return listoferror;
  })();


})();
