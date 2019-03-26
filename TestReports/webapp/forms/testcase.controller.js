sap.ui.controller("TestReports.forms.testcase", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("testCaseTableID");
		var oModel = getODataModel("/TestCase", "/TestReports/odata/getTestCaseList.xsodata");	
		oTestResult.setModel(oModel);
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testCaseDelete");
    		oDelete.setEnabled(false);
    	}
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Case?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testCaseTableID");
                     oTestResult.getModel().remove("/LIST(" + id + ")", null, function() {
                    	 oTestResult.getModel().refresh();
                    	 var model = getODataModel("/TestSuiteCase", "/TestReports/odata/getTestSuiteCaseList.xsodata");
                    	 model.refresh();
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
    	var oCreate = sap.ui.getCore().byId("testCaseCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testCaseUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testCaseDelete");
        	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testCaseCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testCaseUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testCaseDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testCaseUpdateForm");
    	var content = oUpdateForm.getContent(); 	
        content[2].setValue(oEntry.TC_NAME); // test case name
        content[4].setValue(oEntry.TFILE_CASE_NAME); // test case number
        content[6].setValue(oEntry.TFILE_NAME); // test file path
        content[8].setValue(oEntry.TC_ACTIVE);
        content[10].setValue(oEntry.TC_DETAILS);
        content[12].setValue(oEntry.TC_EXPECTED_RESULT);
        content[14].setValue(oEntry.TC_OWNER);
        content[16].setValue(oEntry.TC_COMMENT);
        content[18].setValue(oEntry.TP_NAME);
        content[20].setValue(oEntry.B_NAME);
    

    }
});
 
