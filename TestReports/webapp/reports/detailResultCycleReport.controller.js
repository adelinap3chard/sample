sap.ui.controller("TestReports.reports.detailResultCycleReport",
		{
			onBeforeRendering : function() {
				var oDropdownBoxTestCycle = sap.ui.getCore().byId("dropBoxForDetailCycle");
				
				var oModel = getCycles();
				oDropdownBoxTestCycle.unbindItems();
		        var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", "CYC_TAG");
				oDropdownBoxTestCycle.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter("CYC_TAG", false, true), null);
				oDropdownBoxTestCycle.setModel(oModel);
			},

			// filter for tree view 
			applyFilter : function(testCycle) {
				url = "/TestReports/DetailResultCycleReport.xsjs?cycle=";
				
				if (testCycle != '') {
					url = "/TestReports/DetailResultCycleReport.xsjs?cycle=" + testCycle;
				}			
				//getModelWithDataASYNC(url, dataCB, errorCB);
				
				var model = getModelWithData(url);
				
				
				// mold data to fit TreeTable model
				var data = model.getData();
				var oData = {
						root: {}
				};
				var used_index = {};
				var current_index = 0;
				var results = data;
				var length = results.length;
				oData.length = length;
				var subtotal = 0;
				for (var i = 0; i < length; i++) {
					delete results[i].__metadata;
					var index = used_index[results[i].TEST_SUITE_NAME];
					if (index == undefined) { // new catalog
						if (i != 0) {
							// insert empty row between catalog group
							oData["root"][++current_index] = {TEST_SUITE_NAME: 'TOTAL', TEST_CASE_NAME: subtotal};
							oData["root"][++current_index] = {};
						}
						index = ++current_index;
						used_index[results[i].TEST_SUITE_NAME] = index;
						oData["root"][index] = results[i];
						++current_index;
						subtotal = 1;
					}
					else { // existing catalog, use CASE_NAME to insert under existing
						var key = results[i].TEST_CASE_NAME + results[i].ASSGINEE + results[i].TEST_PLATFORM_NAME + results[i].TEST_OS_NAME + results[i].TEST_FEATURE + results[i].TEST_CATALOG;
						oData["root"][index][key] = results[i];
						results[i].TEST_SUITE_NAME = '';
						subtotal++;
					}
				}
				oData["root"][++current_index] = {TEST_SUITE_NAME: 'TOTAL', TEST_CASE_NAME: subtotal};
				
				model.setData(oData);
				model.setSizeLimit(100000);
				
				
				return model;


			},
			
			//for normal table view
			applyFilter2 : function(testCycle) {
				url = "/TestReports/DetailResultCycleReport.xsjs?cycle=";
				
				if (testCycle != '') {
					url = "/TestReports/DetailResultCycleReport.xsjs?cycle=" + testCycle;
				}			
				var model = getModelWithData(url);
				return model;

			},
			
			formatDate : function(date) {
		    	var yyyy = date.slice(0, 4);
				var MM = date.slice(4, 6);
				var dd = date.slice(6, 8);
				return yyyy + "-" + MM + "-" + dd
			}
			
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
