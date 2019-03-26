sap.ui.controller("TestReports.reports.link.detailResultCycleLink",
		{
			onBeforeRendering : function() {
				var my_data = this.getView().data("my_data");
				if (my_data.init == false) {
					var oTable = sap.ui.getCore().byId("DetailResultCycleLink");
					oModel = this.applyFilter(my_data.cycle, my_data.catalog, my_data.suite);
					oTable.setTitle(my_data.suite + " -  Number of test: " + oModel.oData.length);
					oTable.setModel(oModel);
				}
				my_data.init = true;
			},

			applyFilter : function(testCycle, catalog, suite) {
				url = "/TestReports/DetailResultCycleReport.xsjs?cycle=" + testCycle + "&suite=" + suite;	
				var model = getModelWithData(url);
				var data = model.getData();
				var filteredData = _.filter(data, function(item){
	    		    return item.TEST_CATALOG === catalog;
	    		});
				model.setData(filteredData);
				return model;
			}
			
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
