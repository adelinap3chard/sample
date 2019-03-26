sap.ui.controller("TestReports.reports.testplanreport",
		{
			onBeforeRendering : function() {
				var oDropdownBoxTestCycle = sap.ui.getCore().byId("TestReportCycle");
				var oModel = getCycles();
				oDropdownBoxTestCycle.unbindItems();
		        var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", "CYC_TAG");
				oDropdownBoxTestCycle.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter("CYC_TAG", false, true), null);
				oDropdownBoxTestCycle.setModel(oModel);

				var currentValueTestCycle = oDropdownBoxTestCycle.getValue();

				var oTable = sap.ui.getCore().byId("TestPlanReportTable");
				oModel = this.applyFilter(currentValueTestCycle);
				oTable.setTitle(currentValueTestCycle);
				oTable.setModel(oModel);
			},

			applyFilter : function(testCycle) {
				var url = "/TestReports/odata/getTestPlanReportList.xsodata/LIST/?";
				var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
				if (testCycle != '' || (productFilter != null && productFilter != '')) {
					url += "$filter=";
					if (testCycle != '') {
						url += "CYC_TAG%20eq%20'" + testCycle + "'&";
					}
					if (productFilter != null && productFilter != '') {
						url += "PRO_NAME%20eq%20'" + testCycle + "'&";
					}
				}
				url += "$format=json";

				var model = getModelWithData(url);
				
				// mold data to fit TreeTable model
				var data = model.getData();
				var oData = {
						root: {}
				};
				var used_index = {};
				var current_index = 0;
				var results = data.d.results;
				var length = results.length;
				var subtotal = 0;
				for (var i = 0; i < length; i++) {
					delete results[i].__metadata;
					var index = used_index[results[i].TS_NAME];
					if (index == undefined) { // new catalog
						if (i != 0) {
							// insert empty row between catalog group
							oData["root"][++current_index] = {TS_NAME: 'TOTAL', TC_NAME: subtotal};
							oData["root"][++current_index] = {};
						}
						index = ++current_index;
						used_index[results[i].TS_NAME] = index;
						oData["root"][index] = results[i];
						++current_index;
						subtotal = 1;
					}
					else { // existing catalog, use CASE_NAME to insert under existing
						var key = results[i].TC_NAME + results[i].ASSGINEE + results[i].PLAT_NAME + results[i].OS_NAME + results[i].FEATURE + results[i].CATALOG;
						oData["root"][index][key] = results[i];
						results[i].TS_NAME = '';
						subtotal++;
					}
				}
				oData["root"][++current_index] = {TS_NAME: 'TOTAL', TC_NAME: subtotal};
				
				model.setData(oData);
				model.setSizeLimit(100000);
				
				return model;

			},
			formatDate : function(date) {
		    	var yyyy = date.slice(0, 4);
				var MM = date.slice(4, 6);
				var dd = date.slice(6, 8);
				return yyyy + "-" + MM + "-" + dd
			}
			
		});
