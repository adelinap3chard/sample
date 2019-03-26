sap.ui.controller("TestReports.forms.testfeature", {
	onBeforeRendering : function() {
		var oTestResult = sap.ui.getCore().byId("testFeatureTableID");
		var oModel = getODataModel("/TestFeature", "/TestReports/odata/getTestFeatureList.xsodata");	
		oTestResult.setModel(oModel);
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Feature?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testFeatureTableID");
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
    	var oCreate = sap.ui.getCore().byId("testFeatureCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testFeatureUpdate");
    	oUpdate.setEnabled(true);
    	//var oDelete = sap.ui.getCore().byId("testFeatureDelete");
    	//oDelete.setEnabled(true);
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testFeatureCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testFeatureUpdate");
    	oUpdate.setEnabled(false);
    	//var oDelete = sap.ui.getCore().byId("testFeatureDelete");
    	//oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testFeatureUpdateForm");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.TSF_NAME);

    },
    
    getListModel : function(kindOfList, featureFilter) {

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
	
	getDropdown : function(id, kindOfDD, keyDD, featureFilter) {

		//var dropdownBoxKey = kindOfDD + "List";
		var oDropdownBox = sap.ui.getCore().byId(id);
		if (oDropdownBox == null) {
			oDropdownBox = new sap.ui.commons.DropdownBox(id);
		}
		
		var oItemTemplateBranch = new sap.ui.core.ListItem();
		oItemTemplateBranch.bindProperty("text", keyDD);

		oDropdownBox.bindItems("/d/results", oItemTemplateBranch);

		var oListModel = this.getListModel(kindOfDD, featureFilter); //get the JSON model which contains the data
		oListModel.iSizeLimit = 2000;
		
		oDropdownBox.setModel(oListModel);

		return oDropdownBox;
	}

});
 
