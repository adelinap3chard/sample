sap.ui.controller("TestReports.forms.testplan", {
	onBeforeRendering : function() {
		var oTestPlan = sap.ui.getCore().byId("testPlanTableID");
		var oModel = getODataModel("/TestPlan", "/TestReports/odata/getTestPlanList.xsodata");
		var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
		var filters = new Array();  
		if (productFilter != null && productFilter != '') {
	        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
	        filters.push(filter);  
		}
		var itemTemplate = new sap.ui.core.ListItem({key:"{TS_ID}", text:"{TS_NAME}", description:"TS_DESC"});
		oTestPlan.unbindRows();
		oTestPlan.bindRows("/LIST", null, filters);
		oTestPlan.setModel(oModel);
		
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testPlanDelete");
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
                	 var oTestPlan = sap.ui.getCore().byId("testPlanTableID");
                     oTestPlan.getModel().remove("/LIST(" + id + ")", null, function() {
                    	 oTestPlan.getModel().refresh();
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
    	var oCreate = sap.ui.getCore().byId("testPlanCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testPlanUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testPlanDelete");
        	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testPlanCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testPlanUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testPlanDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testPlanUpdateForm");
    	var content = oUpdateForm.getContent();       
    	content[2].setValue(oEntry.TS_NAME);
        content[4].setValue(oEntry.PRO_NAME);
        content[6].setValue(oEntry.PRO_VER);
        content[8].setValue(oEntry.PLAT_NAME);
        content[10].setValue(oEntry.OS_NAME);
        content[13].setValue(oEntry.CYC_TAG);
        content[15].setValue(oEntry.ASSGINEE);
        content[17].setValue(oEntry.FEATURE);
        content[19].setValue(oEntry.CATALOG);
    }
});
 
