sap.ui.controller("TestReports.FAQ", {
   onInit: function() {
      this.counter = 0;
   }
});


var oControllerHome;

var oButtonShow;
var oTextFieldWeeksBack;

var DEFAULT_NUMBER_OF_WEEKS = 8;
var URL_CHARTS_APP = "../chartsUI5/";
var ACTION_PER_WEEK_SERVLET = "ActionsPerWeekServlet";
var ACTION_COUNTER_SERVLET = "ActionsCounterServlet";

var COUNTER_REFRESH_TIME = 5000;
var COUNTER_DURATION = 350;

sap.ui.controller("com.sap.slautomation.portal.home", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 */
	onInit: function() {
		oControllerHome = this;
		oTextFieldWeeksBack = sap.ui.getCore().getControl("oTextFieldWeeksBack");
		oButtonShow = sap.ui.getCore().getControl("oButtonShow");
		oControllerHome.onLoadActionsPerWeekChart(DEFAULT_NUMBER_OF_WEEKS);
		oControllerHome.onLoadCounters();
		window.overallInterval = setInterval(function(){
			oControllerHome.onLoadCounters();
		}, COUNTER_REFRESH_TIME);
	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 */
//	onBeforeRendering: function() {

//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 */
//	onAfterRendering: function() {
		
//	},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 */
//	onExit: function() {

//	}

	onLoadCounters: function(init){
		var URL = URL_CHARTS_APP + ACTION_COUNTER_SERVLET;
		
		jQuery.ajax({type: 'GET', url: URL, data: {}, success: function(response) {
			if(response.status === "success"){					
				var oldCounterDailyTESI = jQuery("#counterDailyTESI").flipCounter("getNumber");   
				jQuery("#counterDailyTESI").flipCounter("startAnimation", {
					number: oldCounterDailyTESI,
					end_number: response.counterDailyTESI,
					duration: COUNTER_DURATION
				});
			}
		},
		dataType: "json",
		async:true
		});
	},
	
	onLoadActionsPerWeekChart: function(numberOfWeeks){
		oButtonShow.setText("Loading....");
		oButtonShow.setEnabled(false);
        oTextFieldWeeksBack.setEnabled(false);
		
		try{
			numberOfWeeks = parseInt(numberOfWeeks, 10);
			if(!numberOfWeeks){
				numberOfWeeks = DEFAULT_NUMBER_OF_WEEKS;
				oTextFieldWeeksBack.setValue(DEFAULT_NUMBER_OF_WEEKS);
			}
		}catch(exception){
			numberOfWeeks = DEFAULT_NUMBER_OF_WEEKS;
			oTextFieldWeeksBack.setValue(DEFAULT_NUMBER_OF_WEEKS);
		}

		var URL = URL_CHARTS_APP + ACTION_PER_WEEK_SERVLET;
		var args = {};
		args.numberOfWeeks = numberOfWeeks;
		jQuery.ajax({type: 'GET', url: URL, data: args, success: function(response) {

			if(response.status === "success"){
				var weeks;
				var years;
				var actions;       
				var data = [];

				weeks = JSON.parse(response.weeks);
				years = JSON.parse(response.years);
				actions = response.actions;
				jQuery.each(response.data, function(index, value) {
					data.push(JSON.parse(value));
				});

				var ds = new sap.viz.data.CrosstableDataset();
				ds.setData({
					'analysisAxis': [
					                 {
					                	 'index' : 1,
					                	 'data' : [
					                	           {
					                	        	   'type': 'Dimension',
					                	        	   'name' : 'Year',
					                	        	   'values' : years
					                	           },
					                	           {
					                	        	   'type': 'Dimension',
					                	        	   'name' : 'Calendar week',
					                	        	   'values' : weeks
					                	           }
					                	           ]
					                 },
					                 {
					                	 'index' : 2,
					                	 'data' : [
					                	           {
					                	        	   'type': 'Dimension',
					                	        	   'name' : 'Action',
					                	        	   'values' : actions
					                	           }
					                	           ]
					                 }
					                 ], 

					                 'measureValuesGroup':[{
					                	 'index': 1,
					                	 'data' :[{
					                		 'type': 'Measure',
					                		 'name' : 'Executions',
					                		 //'values' : [[35, 39, 1, 2, 3, 4, 5, 8, 9], [35, 39, 1, 2, 3, 4, 5, 8, 9]]
					                		 'values' : data
					                	 }]
					                 }]});

				var chartOption = {
						title : {
							visible : true,
							text : 'Executions of TESI steps per calendar week'
						},

						xAxis : {
							title : {
								visible : true,
								text: 'Calendar week'
							}        
						}        
				};

				var divChart = jQuery('#divChart');
				if(divChart.children() != undefined){
					divChart.children().remove();
				};
				sap.viz.core.createViz({
					type : 'viz/area',
					data : ds,
					container : divChart,
					options : chartOption
				});
			} else {
				jQuery('#divChart').html(response.text);
			}
			
			// restore controls state
			oTextFieldWeeksBack.setEnabled(true);
			oButtonShow.setText("Show");
			oButtonShow.setEnabled(true);
		},
		dataType: "json",
		async:true
		});
	}
});
//@ sourceURL=./com/sap/slautomation/portal/home.controller.js
