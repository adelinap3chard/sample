sap.ui.controller("TestReports.reports.link.lifetimeTestcaselink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("lifetimeTestcaselink");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter(my_data.cycle, my_data.catalog, my_data.testCase);
		    	oTable.setTitle(my_data.testCase);
		    	oTable.setModel(oModel);
			},

			applyFilter : function(cycle,catalog,testCase) {
				url = "/TestReports/testcasereport.xsjs?case=";
				
				if (testCase != '') {
					url = "/TestReports/testcasereport.xsjs?case=" + testCase;
				}			
				var model = getModelWithData(url);
				return model;
			}
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
