sap.ui.controller("TestReports.forms.overview", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("overviewTestTableID");

		//var url = "/TestReports/odata/getManualTestResults.xsodata/LIST/?";
		
		//url += "$format=json";
		//var model = getModelWithData(url);
		
		var model = new sap.ui.model.odata.ODataModel("/TestReports/odata/getManualTestResults.xsodata", false);
		
		oTestResult.setModel(model);
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
                	 var oTestResult = sap.ui.getCore().byId("overviewTestTableID");
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
    	var oCreate = sap.ui.getCore().byId("manualCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("manualUpdate");
    	oUpdate.setEnabled(true);
    	var oDelete = sap.ui.getCore().byId("manualDelete");
    	oDelete.setEnabled(true);
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("manualCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("manualUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("manualDelete");
    	oDelete.setEnabled(false);
    },
	
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("sf2");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.TEST_PLAN);
        content[4].setValue(oEntry.TEST_CYCLE);
        content[6].setValue(oEntry.CASE_NAME);
        content[8].setValue(oEntry.USER_NAME);
        content[10].setValue(oEntry.BUG_LIST);
        content[12].setValue(oEntry.TEST_CASE_NAME);
        content[15].setValue(oEntry.TOTAL_TESTS);
        content[17].setValue(oEntry.PASS);
        content[19].setValue(oEntry.FAIL);
        content[21].setValue(oEntry.SKIP_TESTS);
    },

});
 
