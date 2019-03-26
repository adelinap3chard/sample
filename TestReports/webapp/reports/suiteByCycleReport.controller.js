sap.ui.controller("TestReports.reports.suiteByCycleReport",
		{
			onBeforeRendering : function() {
				var oDropdownBoxTestCycle = sap.ui.getCore().byId("oDropBoxForCycle");
				var oModel = getCycles()
				oDropdownBoxTestCycle.unbindItems();
		        var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", "CYC_TAG");
				oDropdownBoxTestCycle.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter("CYC_TAG", false, true), null);
				oDropdownBoxTestCycle.setModel(oModel);

				var currentValueTestCycle = oDropdownBoxTestCycle.getValue();

				var oTable = sap.ui.getCore().byId("suiteByCycleReportTable");
				//oTable.setBusy(true);
				oModel = this.applyFilter(currentValueTestCycle, function(data, textStatus, jqXHR) { // callback called when data is received
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(data); // fill the received data into the JSONModel
					oTable.setTitle(currentValueTestCycle);
					oTable.setModel(oModel);
			    	//oTable.setBusy(false);
				}, function(data, textStatus, jqXHR) { // callback called when data is received
					//oTable.setBusy(false);
					alert(jqXHR);
					alert(textStatus);
					alert(errorThrown);
				});
				
			},


			applyFilter : function(testCycle, dataCB, errorCB) {
				url = "/TestReports/sumCycleReport.xsjs?cycle=";
				
				if (testCycle != '') {
					url = "/TestReports/sumSuiteCycleReport.xsjs?cycle=" + testCycle;
				}			
				getModelWithDataASYNC(url, dataCB, errorCB);
			},
			formatDate : function(date) {
		    	var yyyy = date.slice(0, 4);
				var MM = date.slice(4, 6);
				var dd = date.slice(6, 8);
				return yyyy + "-" + MM + "-" + dd
			}
			
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
