sap.ui.controller("TestReports.forms.detail", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("detailTestTableID");
		var oModel = getODataModel("/TestResultDetail", "/TestReports/odata/getTestResultList.xsodata");
		var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
		var filters = new Array();  
		if (productFilter != null && productFilter != '') {
	        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
	        filters.push(filter);  
		}
		oTestResult.unbindRows();
		oTestResult.bindRows("/LIST", null, filters);
		oTestResult.setModel(oModel);
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this test?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("detailTestTableID");
                     oTestResult.getModel().remove("/LIST(" + id + ")", null, function() {
                    	 oTestResult.getModel().refresh();
                         oDeleteDialog.close();
                     },function(){
                         oDeleteDialog.close();
                         alert("Delete failed");
                     });
                 }
             })
         );
         oDeleteDialog.open();

	},
	
    enableActions : function() {
    	var oCreate = sap.ui.getCore().byId("d_manualCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("d_manualUpdate");
    	oUpdate.setEnabled(true);
    	//var oDelete = sap.ui.getCore().byId("d_manualDelete");
    	//oDelete.setEnabled(true);
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("d_manualCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("d_manualUpdate");
    	oUpdate.setEnabled(false);
    	//var oDelete = sap.ui.getCore().byId("d_manualDelete");
    	//oDelete.setEnabled(false);
    },
	
    updateEntry: function(oEntry) {
    	var oDropdownBoxCycle = sap.ui.getCore().byId("d_TestPlanCycleUpdate");
		var oDropdownBoxTestCase = sap.ui.getCore().byId("d_TestCaseUpdate");
		var cycle = oEntry.CYC_NAME;
		oDropdownBoxTestCase.unbindItems();
		var filters = new Array();  
        var filter = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
        filters.push(filter);  
        var oItemTemplateBranch = new sap.ui.core.ListItem();
		oItemTemplateBranch.bindProperty("text", "TC_NAME");
		oDropdownBoxTestCase.bindItems("/LIST", oItemTemplateBranch, null, filters);
		
		var oDropdownBoxProduct = sap.ui.getCore().byId("d_TestPlanProductUpdate");
		var oDropdownBoxVersion = sap.ui.getCore().byId("d_TestPlanProductVersionUpdate");
		var product = oEntry.PRO_NAME;
		oDropdownBoxVersion.unbindItems();
		var filters2 = new Array();  
        var filter2 = new sap.ui.model.Filter("PRODUCT", sap.ui.model.FilterOperator.EQ, product);  
        filters2.push(filter2);  
        var oItemTemplateBranch2 = new sap.ui.core.ListItem();
		oItemTemplateBranch2.bindProperty("text", "VERSION");
		oDropdownBoxVersion.bindItems("/LIST", oItemTemplateBranch2, null, filters2);
		
    	var oUpdateForm = sap.ui.getCore().byId("d_form2");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.CYC_NAME);
    	content[4].setValue(oEntry.TC_NAME);
        content[6].setValue(oEntry.PRO_NAME);
        content[8].setValue(oEntry.PRO_VER);
        content[10].setValue(oEntry.PRO_VER_STR);
        content[13].setValue(oEntry.TC_RESULT);
        content[15].setValue(oEntry.BUG_ID);
        content[17].setValue(oEntry.EXEC_USER);
        content[19].setValue(oEntry.START_TIME);
        content[21].setValue(oEntry.END_TIME);
        var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
        content[23].setValue(oDateFormat.format(oEntry.EXEC_TS));
        content[25].setValue(oEntry.EXEC_TIME);
        content[27].setValue(oEntry.PLAT_NAME);
        content[29].setValue(oEntry.OS_NAME);
        content[31].setValue(oEntry.HOST_NAME);
       
    },
    getCaseForCycle : function(testCycle) {
    	
    	var detailReport = sap.ui.getCore().getModel("/DetailReport");
    	if (detailReport == null) {
    		detailReport = {};
    		sap.ui.getCore().setModel(detailReport, "/DetailReport");
    	}
    	
    	var name = testCycle;
    	var oModel = detailReport[name];
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestCaseForCycleList.xsodata/LIST/?";
    		url += "$filter=CYC_TAG%20eq%20'" + testCycle + "'&";
    		url += "$format=json";

    		oModel = getModelWithData(url);
    		detailReport[name] = oModel;
    	}
    	return oModel;
	},
    getCases : function(testCycle, testSuite, assignee, plat, os) {
    	var oModel = this.getCaseForCycle(testCycle);
    	var data = oModel.getData();
    	var filteredData = _.filter(data.d.results, function(item){
    		  return item.TS_NAME === testSuite && item.ASSGINEE === assignee && item.PLAT_NAME === plat && item.OS_NAME === os;
    		});
    	
    	var model = new sap.ui.model.json.JSONModel();
    	model.setData(filteredData);
    	return model
	},

	applyFilter : function(testCycle, dataCB, errorCB) {
		//url = "/TestReports/CallConsolidateProcedures.xsjs?cycle=";
		url = "/TestReports/CallConsolidateProcedures.xsjs?cycle=" + testCycle;
		//url = "/TestReports/CallConsolidateProcedures.xsjs";
		getModelWithDataASYNC(url, dataCB, errorCB);

	}
});
 
