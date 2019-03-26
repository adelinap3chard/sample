sap.ui.controller("TestReports.reports.sumCycleReport",
		{
			onBeforeRendering : function() {
				var oDropdownBoxTestCycle = sap.ui.getCore().byId("dropBoxForCycle");
				var oModel = getCycles();
				oDropdownBoxTestCycle.unbindItems();
		        var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", "CYC_TAG");
				oDropdownBoxTestCycle.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter("CYC_TAG", false, true), null);
				oDropdownBoxTestCycle.setModel(oModel);
			},
			
			onAfterRendering : function() {
				var oDropdownBoxTestCycle = sap.ui.getCore().byId("dropBoxForCycle");
				var cycle = oDropdownBoxTestCycle.getValue();
				if (cycle == null || cycle == '') {
					cycle = sap.ui.getCore().getModel("rpt_summaryGlobalCycleValue");
					feature = sap.ui.getCore().getModel("rpt_summaryGlobalFeatureValue");
					if (cycle != null && cycle != '') {
						var oTable = sap.ui.getCore().byId("sumCycleReportTable");
						//oTable.setBusy(true);
						oModel = this.applyFilter(cycle, feature, function(data, textStatus, jqXHR) { // callback called when data is received
							var oModel = new sap.ui.model.json.JSONModel();
							oModel.setData(data); // fill the received data into the JSONModel
							oTable.setTitle(cycle);
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

			applyFilter : function(testCycle, feature, dataCB, errorCB) {
				url = "/TestReports/sumCycleReport.xsjs?cycle=";
				
				if (feature != null && feature != '') {
					url = "/TestReports/sumCycleReport.xsjs?cycle=" + testCycle + "&feature=" + feature;
				}
				else if (testCycle != '') {
					url = "/TestReports/sumCycleReport.xsjs?cycle=" + testCycle;
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
