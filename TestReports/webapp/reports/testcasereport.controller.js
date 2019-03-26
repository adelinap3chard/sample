sap.ui.controller("TestReports.reports.testcasereport",
		{
			onBeforeRendering : function() {
				/*
				var oModel = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
				var oDropdownBoxTestSuite = sap.ui.getCore().byId("dropBoxForSuite");
				var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
				if (productFilter != null && productFilter != '') {
					var filters = new Array();  
			        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
			        filters.push(filter);
				}
				oDropdownBoxTestSuite.unbindItems();
		        var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", "TS_NAME");
				oDropdownBoxTestSuite.bindItems("/LIST", oItemTemplateBranch, new sap.ui.model.Sorter("TS_NAME", false, true), filters);
				oDropdownBoxTestSuite.setModel(oModel);
				*/
				var oTestCaseInput = sap.ui.getCore().byId("boxForCase");
				var oModel = getODataModel("/TestCaseBySuite", "/TestReports/odata/getTestCaseBySuiteList.xsodata");
				oTestCaseInput.setModel(oModel)
			},
			
			getCaseForSuite : function(testSuite) {
		    	
		    	var testCaseReport = sap.ui.getCore().getModel("/testCaseReport");
		    	if (testCaseReport == null) {
		    		testCaseReport = {};
		    		sap.ui.getCore().setModel(testCaseReport, "/testCaseReport");
		    	}
		    	
		    	var name = testSuite;
		    	var oModel = testCaseReport[testSuite];
		    	if (oModel == null) {
		    		var url = "/TestReports/odata/getTestCaseBySuiteList.xsodata/LIST/?";
		    		url += "$filter=TS_NAME%20eq%20'" + testSuite + "'&";
		    		url += "$format=json";

		    		oModel = getModelWithData(url);
		    		testCaseReport[name] = oModel;
		    	}
		    	return oModel;
			},

		    getCases : function(testSuite, testCase) {
		    	var oModel = getCaseForSuite(testSuite);
		    	var data = oModel.getData();
		    	var filteredData = _.filter(data.d.results, function(item){
		    		  return item.TS_NAME === testSuite && item.TS_CASE === testCase;
		    		});
		    	
		    	var model = new sap.ui.model.json.JSONModel();
		    	model.setData(filteredData);
		    	return model
			},

			applyFilter : function(testCase) {
				url = "/TestReports/testcasereport.xsjs?case=";
				
				if (testCase != '') {
					url = "/TestReports/testcasereport.xsjs?case=" + testCase;
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
