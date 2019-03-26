sap.ui.controller("TestReports.forms.testcycle", {
	onBeforeRendering : function() {
		var oTestCycle = sap.ui.getCore().byId("testCycleTableID");
		var oModel = getCycles()
		oTestCycle.unbindRows();
		oTestCycle.bindRows("/", null, null);
		oTestCycle.setModel(oModel);
		
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testCycleDelete");
        	oDelete.setEnabled(false);
    	}
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Cycle?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testCycleTableID");
                	 var oModel = getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
                	 oModel.remove("/LIST(" + id + ")", null, function() {
                    	 oTestResult.setModel(refreshCycles());
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
    	var oCreate = sap.ui.getCore().byId("testCycleCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testCycleUpdate");
    	oUpdate.setEnabled(true);
    	var oCopy = sap.ui.getCore().byId("testCycleCopy");
    	oCopy.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testCycleDelete");
        	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testCycleCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testCycleUpdate");
    	oUpdate.setEnabled(false);
    	var oCopy = sap.ui.getCore().byId("testCycleCopy");
    	oCopy.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testCycleDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testCycleUpdateForm");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.CYC_TAG);
        content[4].setValue(oEntry.CYC_DESC);
        content[6].setValue(oEntry.PROJECT_NAME);
        content[8].setValue(oEntry.CONTRACTOR);
        content[10].setValue(oEntry.STARTDATE);
        content[12].setValue(oEntry.ENDDATE);

    },
    
    copyEntry: function(oEntry) {
    	var oCopyForm = sap.ui.getCore().byId("testCycleCopyForm");
    	var content = oCopyForm.getContent();
    	content[2].setValue("CopyOf_" + oEntry.CYC_TAG);
        content[4].setValue(oEntry.CYC_DESC);
        content[6].setValue(oEntry.PROJECT_NAME);
        content[8].setValue(oEntry.CONTRACTOR);
        content[10].setValue(oEntry.STARTDATE);
        content[12].setValue(oEntry.ENDDATE);

    }

});
 
