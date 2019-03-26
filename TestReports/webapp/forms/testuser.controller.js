sap.ui.controller("TestReports.forms.testuser", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("testUserTableID");
		var oModel = getODataModel("/TestUserList", "/TestReports/odata/getTestUserList.xsodata");	
		oTestResult.setModel(oModel);
		
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testUserDelete");
        	oDelete.setEnabled(false);
    	}
	},
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
       oDeleteDialog.setTitle("Delete test");
       var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test User?"});
       oDeleteDialog.addContent(oText);
       oDeleteDialog.addButton(
           new sap.ui.commons.Button({
               text: "Confirm", 
               press:function(){ 
              	 var oTestResult = sap.ui.getCore().byId("testUserTableID");
                   oTestResult.getModel().remove("/LIST(" + id + ")", null, function() {
                  	 oTestResult.getModel().refresh();
                       oDeleteDialog.close();
                       sap.ui.commons.MessageBox.alert("Successfully!",'',"Delete user");
                   },function(){
                       oDeleteDialog.close();
                       //alert("Delete failed");
                       sap.ui.commons.MessageBox.alert("Delete failed! Please contact admin",'',"Failure");
                   });
               }
           })
       );
       oDeleteDialog.open();

	},
	
    enableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testUserCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testUserUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testUserDelete");
        	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testUserCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testUserUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testUserDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testUserUpdateForm");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.U_NAME);
        content[4].setValue(oEntry.G_VAL);

    }
});
 
