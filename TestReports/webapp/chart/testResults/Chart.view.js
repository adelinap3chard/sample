sap.ui.jsview("TestReports.chart.testResults.Chart", {

	getControllerName : function() {
		return "TestReports.chart.testResults.Chart";
	},
      
	createContent : function(oController) {
		//Create a matrix layout
		var oLayout = new sap.ui.commons.layout.MatrixLayout();
		   
		var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : true,
			columns : 3,
			width : '600px'});
			  	
		oLayoutFilter.setWidths(["20px","50px","30px"]);
		
		var oLayoutChart = new sap.ui.commons.layout.MatrixLayout({width: "100%"});
		
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
	        dimensions: [{
	            name: 'Feature',
	            value: "{TEST_FEATURE}"
	        }],
	        measures: [{
               name: 'Pass',
               value: '{PASS_SUB_QUANTITY}'
            },{
               name: 'Fail',
               value: '{FAIL_SUB_QUANTITY}'
            },{
                name: 'No Result',
                value: '{NO_RESULT_SUB_QUANTITY}'
             }],
	        data: {
	            path: "/",
	        }
	    });
		
	    var oStackChart = new sap.viz.ui5.controls.VizFrame("stackChart", {
	    	id: "overviewChart",
	    	vizType: "stacked_column",
	    	//title : "Summary of test results by cycle",
	        width: "100%",
	        height: "400px",
	        plotArea: {
	            colorPalette: ["green", "red", "yellow"]
	        },
	        title: {
	            visible: true,
	            text: 'Cycle Title'
	        },
	        dataset: oDataset
	    });
	    oStackChart.setVizProperties({
            plotArea: {
            	colorPalette : ["yellow", "red", "green"]
                }});
	    
	    var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "valueAxis",
		      'type': "Measure",
		      'values': ["No Result","Fail","Pass"]
		    }), 
		    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "categoryAxis",
		      'type': "Dimension",
		      'values': ["Feature"]
		    });
	    oStackChart.addFeed(feedValueAxis);
	    oStackChart.addFeed(feedCategoryAxis);
	    
	    //dropdown menu 
    	var oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
    	var oDropdownBoxTestCycle = getDropdownWithModel("cycleForChart", "CYC_TAG", oModel);
    	oDropdownBoxTestCycle.setWidth("300px");
        
	    //add drop downs to layout matrix
		//Create row template     
	    oLayoutFilter.createRow("Select A Test Cycle:", oDropdownBoxTestCycle),"";
		//actions
	    oLayoutFilter.createRow(new sap.ui.commons.Button({text: "Apply filter", press:function(){
	    	oLayout.setBusy(true);
	    		
		    oController.applyFilter(oDropdownBoxTestCycle.getValue(), function(data, textStatus, jqXHR) { // callback called when data is received
	    		var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(data); // fill the received data into the JSONModel
				oStackChart.setModel(oModel);
		    	oLayout.setBusy(false);
			}, function(data, textStatus, jqXHR) { // callback called when data is received
				oLayout.setBusy(false);
				alert(jqXHR);
				alert(textStatus);
				alert(errorThrown);
				
			});
		}
	    }));
  	
	    oViewMessage = new sap.ui.commons.TextView("cycleChartMsg",{
	    	text: "An overview of tests for each feature per cycle. "
		});
	    
	    
	    //oLayout.createRow("\n");
	    oLayoutChart.createRow(oStackChart);
	    
	    //main 
	    oLayout.createRow(oViewMessage);
	    oLayout.createRow("\n");
	    oLayout.createRow(oLayoutFilter);	
	    //oLayout.createRow("\n");
	    oLayout.createRow(oLayoutChart);
	    return oLayout;  
	}

});
