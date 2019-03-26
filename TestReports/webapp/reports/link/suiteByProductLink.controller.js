sap.ui.controller("TestReports.reports.link.suiteByProductLink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("suiteByProductTable");
				var my_data = this.getView().data("my_data");
				
				if (my_data.init == false) {
					//oTable.setBusy(true);
					oModel = this.applyFilter(my_data.cycle, function(data, textStatus, jqXHR) { // callback called when data is received
						var oModel = new sap.ui.model.json.JSONModel();
						var filteredData = _.filter(data, function(item){
			    		    return item.TEST_CATALOG === my_data.catalog;
			    		});
						oModel.setData(filteredData); // fill the received data into the JSONModel
						oTable.setTitle(my_data.cycle + " -  Total Row count: " + oModel.oData.length);
						
						oTable.setModel(oModel);
				    	//oTable.setBusy(false);
					}, function(data, textStatus, jqXHR) { // callback called when data is received
						//oTable.setBusy(false);
						alert(jqXHR);
						alert(textStatus);
						alert(errorThrown);
					});
				}
				my_data.init = true;
			},


			applyFilter : function(testCycle, dataCB, errorCB) {
				url = "/TestReports/sumSuiteCycleReport.xsjs?cycle=" + testCycle;		
				getModelWithDataASYNC(url, dataCB, errorCB);
			}
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
