sap.ui.controller("TestReports.reports.sumCycleByUserReport",
		{
			onBeforeRendering : function() {
				//oDataModel = new sap.ui.model.odata.ODataModel("/TestReports/odata/getUserList.xsodata", false);
				oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("dropBoxForCycleByUser");
    	    	oDropdownBoxUser.setModel(oModel);
			},

			onAfterRendering : function() {
    	    	var userFilter = sap.ui.getCore().byId("dropBoxForCycleByUser").getValue();
    			if (userFilter != null && userFilter != '') {
    				var oDropdownBoxUser = sap.ui.getCore().byId("dropBoxForCycleByUser");
    				oDropdownBoxUser.setValue(userFilter);
    			}
			},
			
			applyFilter : function(testuser, dataCB, errorCB) {
				url = "/TestReports/sumCycleByUserReport.xsjs";
				
				if (testuser != '' ) {
					url = "/TestReports/sumCycleByUserReport.xsjs?testuser=" + testuser;
				}			
				getModelWithDataASYNC(url, dataCB, errorCB);
			},
			
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
