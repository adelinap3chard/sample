sap.ui.controller("TestReports.chart.testResults.Chart",
{

	/**
	 * Called when a controller is instantiated and its View controls
	 * (if available) are already created. Can be used to modify the
	 * View before it is displayed, to bind event handlers and do other
	 * one-time initialization.
	 */
	// onInit: function() {
	//
	// },
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 */
	onBeforeRendering : function() {
		//var oModel = getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
		//var oDropdownBoxTestCycle = sap.ui.getCore().byId("cycleForChart");
		//oDropdownBoxTestCycle.setModel(oModel);	
		
		var oDropdownBoxTestCycle = sap.ui.getCore().byId("cycleForChart");
		var oModel = getCycles();
		oDropdownBoxTestCycle.unbindItems();
        var oItemTemplateBranch = new sap.ui.core.ListItem();
		oItemTemplateBranch.bindProperty("text", "CYC_TAG");
		oDropdownBoxTestCycle.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter("CYC_TAG", false, true), null);
		oDropdownBoxTestCycle.setModel(oModel);
	},
	
	onAfterRendering : function() {
		var oDropdownBoxTestCycle = sap.ui.getCore().byId("cycleForChart");
		var cycle = oDropdownBoxTestCycle.getValue();
		if (cycle == null || cycle == '') {
			cycle = sap.ui.getCore().getModel("chart_overviewGlobalCycleValue");
			if (cycle != null && cycle != '') {
				var oTable = sap.ui.getCore().byId("stackChart");
				//oTable.setBusy(true);
				oModel = this.applyFilter(cycle, function(data, textStatus, jqXHR) { // callback called when data is received
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(data); // fill the received data into the JSONModel
					oTable.setModel(oModel);
			    	//oTable.setBusy(false);
					oDropdownBoxTestCycle.setValue(cycle);
				}, function(data, textStatus, jqXHR) { // callback called when data is received
					//oTable.setBusy(false);
					alert(jqXHR);
					alert(textStatus);
					alert(errorThrown);
				});
			}
		}
	},

	/**
	 * Called when the View has been rendered (so its HTML is part of
	 * the document). Post-rendering manipulations of the HTML could be
	 * done here. This hook is the same one that SAPUI5 controls get
	 * after being rendered.
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free
	 * resources and finalize activities.
	 */
	// onExit: function() {
	//
	// }
	applyFilter : function(testCycle, dataCB, errorCB) {
		url = "/TestReports/sumCycleReport.xsjs?cycle=";
		
		if (testCycle != '') {
			url = "/TestReports/sumCycleReport.xsjs?cycle=" + testCycle;
		}			
		getModelWithDataASYNC(url, dataCB, errorCB);
	}

});
