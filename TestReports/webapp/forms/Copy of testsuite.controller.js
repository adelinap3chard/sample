sap.ui.controller("TestReports.forms.testsuite", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("testSuiteTableID");
		var model = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata", 'TS_NAME');
		var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
		if (productFilter != null && productFilter != '') {
			var filters = new Array();  
	        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
	        filters.push(filter);  
		}
		var itemTemplate = new sap.ui.core.ListItem({key:"{TS_ID}", text:"{TS_NAME}", description:"TS_DESC"});
		oTestResult.unbindAggregation();
		oTestResult.bindAggregation("items", "/LIST", itemTemplate, null, filters);
		oTestResult.setModel(model);
		
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testSuiteDelete");
        	oDelete.setEnabled(false);
        	var oRemove = sap.ui.getCore().byId("testSuiteRemoveCase");
        	oRemove.setEnabled(false);
    	}
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Suite?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testSuiteTableID");
                	 var oTable = sap.ui.getCore().byId("testSuiteCaseTableID");
                	 var oModel = oTable.getModel();
                	 var batchChanges = [];
                	 var length = oTable._getRowCount();
                	 for(var i = 0; i != length; ++i) {
                		 var oData = oTable.getContextByIndex(i);
                		 var entry = oData.getObject();
                		 batchChanges.push(oModel.createBatchOperation("/LIST(TS_ID=" + entry.TS_ID + ",TC_ID=" + entry.TC_ID + "L)", "DELETE", null, null));
                	 }
                	 if (batchChanges.length > 0) {
	                	 oModel.addBatchChangeOperations(batchChanges); 
	                	 oModel.setUseBatch(true);
	                	 oModel.submitBatch(function() {
	                		 oTestResult.getModel().remove("/LIST('" + id + "')", null, function() {
	                        	 oTestResult.getModel().refresh();
	                         },function(){
	                             alert("Delete failed");
	                         });
	                		 oModel.refresh();
	                		 oDeleteDialog.close();
	                	 },function(){
	                		 oDeleteDialog.close();
	                		 alert("Delete failed");
	                	 });
                	 }
                	 else {
                		 oTestResult.getModel().remove("/LIST('" + id + "')", null, function() {
                        	 oTestResult.getModel().refresh();
                         },function(){
                             alert("Delete failed");
                         });
                		 oDeleteDialog.close();
                	 }
                 }
             })
         );
         oDeleteDialog.open();

	},
	
    enableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testSuiteCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testSuiteUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testSuiteDelete");
        	oDelete.setEnabled(true);
        	var oRemove = sap.ui.getCore().byId("testSuiteRemoveCase");
        	oRemove.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testSuiteCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testSuiteUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testSuiteDelete");
    	oDelete.setEnabled(false);
    	var oRemove = sap.ui.getCore().byId("testSuiteRemoveCase");
    	oRemove.setEnabled(false);
    },
	
    updateEntry: function(oEntry) {
        var oTable = sap.ui.getCore().byId("testSuiteCaseTableID");
        var model = null;
        if (oEntry != undefined) {
        	var oUpdateForm = sap.ui.getCore().byId("testSuiteUpdateForm");
        	var content = oUpdateForm.getContent();
        	content[1].setValue(oEntry.TS_NAME);
            content[3].setValue(oEntry.TS_DESC);
            
	        var url = "/TestReports/odata/getTestSuiteCaseList.xsodata";
	        var filters = new Array();  
	        var filter = new sap.ui.model.Filter("TS_ID", sap.ui.model.FilterOperator.EQ, oEntry.TS_ID);  
	        filters.push(filter);  
			model = getODataModel("/TestSuiteCase", url);
			oTable.unbindRows();
			oTable.bindRows("/LIST", null, filters);
        }
        oTable.setModel(model);
    },
    
    updateList: function(value) {
    	var filters = new Array();  
        var filter = new sap.ui.model.Filter("TS_NAME", sap.ui.model.FilterOperator.Contains, value);  
        filters.push(filter); 
        var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
		if (productFilter != null) {
	        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
	        filters.push(filter);
		}
		var itemTemplate = new sap.ui.core.ListItem({key:"{TS_ID}", text:"{TS_NAME}", description:"TS_DESC"})
		var oList = sap.ui.getCore().byId("testSuiteTableID");
		oList.unbindAggregation();
		oList.bindAggregation("items", "/LIST", itemTemplate, null, filters);
    }

});
 
