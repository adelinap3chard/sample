sap.ui.controller("TestReports.forms.testproduct", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("testProductTableID");
		var oModel = getODataModel("/TestProduct", "/TestReports/odata/getTestProductList.xsodata");	
		oTestResult.setModel(oModel);
		
		var user = getUser();
    	if (!user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testProductDelete");
        	oDelete.setEnabled(false);
    	}
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Product?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testProductTableID");
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
    	var oCreate = sap.ui.getCore().byId("testProductCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testProductUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
    		var oDelete = sap.ui.getCore().byId("testProductDelete");
        	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testProductCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testProductUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testProductDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testProductUpdateForm");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.PRO_NAME);
        content[4].setValue(oEntry.PRO_VER);
        
    },
    
    getListModel : function(kindOfList, productFilter) {

		var url = "/TestReports/odata/get" + kindOfList + "List.xsodata/LIST/?$format=json";

		return this.getModelWithData(url);
	},

	getModelWithData : function (url){
		
		var oModel = new sap.ui.model.json.JSONModel();// url);

		$.ajax({
			url : url, // for different servers cross-domain
						// restrictions need to be handled
			async : false,
			contentType : "application/json; charset=utf-8",
			dataType : "json",
			success : function(data, textStatus, jqXHR) { // callback called when data is received

				oModel.setData(data); // fill the received data into the JSONModel
				
			},
			error : function(jqXHR, textStatus, errorThrown) {
				alert(jqXHR);
				alert(textStatus);
				alert(errorThrown);
			}
		});
		
		return oModel;
		
	},

	getDropdownWithModel : function(id, keyDD, oModel) {
		oDropdownBox = new sap.ui.commons.DropdownBox(id);
		
		var oItemTemplateBranch = new sap.ui.core.ListItem();
		oItemTemplateBranch.bindProperty("text", keyDD);

		oDropdownBox.bindItems("/d/results", oItemTemplateBranch);
		
		oDropdownBox.setModel(oModel);

		return oDropdownBox;
	},
	
	getDropdown : function(id, kindOfDD, keyDD, productFilter) {

		//var dropdownBoxKey = kindOfDD + "List";
		var oDropdownBox = sap.ui.getCore().byId(id);
		if (oDropdownBox == null) {
			oDropdownBox = new sap.ui.commons.DropdownBox(id);
		}
		
		var oItemTemplateBranch = new sap.ui.core.ListItem();
		oItemTemplateBranch.bindProperty("text", keyDD);

		oDropdownBox.bindItems("/d/results", oItemTemplateBranch);

		var oListModel = this.getListModel(kindOfDD, productFilter); //get the JSON model which contains the data
		oListModel.iSizeLimit = 2000;
		
		oDropdownBox.setModel(oListModel);

		return oDropdownBox;
	}

});
 
