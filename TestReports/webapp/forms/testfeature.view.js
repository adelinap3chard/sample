sap.ui.jsview("TestReports.forms.testfeature", {

    getControllerName : function() {
        return "TestReports.forms.testfeature";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testFeatureMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testFeatureMsg",{
			text: "To manage a test feature, please select one of the button below to create a new test feature, or update exiting test Feature or remove an entry of a test feature."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testFeatureTableID",
            title: "Test feature table",
            width : "100%",
            visibleRowCount: 20,
            //visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
            //height: "100%",
            selectionMode : sap.ui.table.SelectionMode.Single,
            rowSelectionChange: function(e) {
            	if (oUpdateForm.getVisible() == true) {
                	var idx = e.getParameter('rowIndex');
                	if (oTable.isIndexSelected(idx)) {
                		var oData = oTable.getContextByIndex(idx);
                    	var entry = oData.getObject();
                    	oController.updateEntry(entry);     
                	}
            	}
        	}
        });
        
        // table columns
        var oControl = new sap.ui.commons.TextView({
			text : "{TSF_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "TSF_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TSF_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Feature Name"}),
            template : oControl,
            sortProperty : "TSF_NAME",
            editable: false
        }));    

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testFeatureTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testFeatureCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		tooltip : "Create New Test Feature",
    		press : function() {
    			//oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testFeatureUpdate",{
    		text : "Update",
    		icon: "sap-icon://journey-change",
    		tooltip : "Update selected Test Feature. Please select a row then click Update button to modify.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	} 
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	//oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testFeatureDelete",{
    		text : "Delete",
    		enabled : false,
    		icon: "sap-icon://delete",
    		tooltip : "Delete selected Test Feature",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1){
		            		sap.ui.commons.MessageBox.alert("Please select a row to delete!",'',"INFO");
		            		return; // new
		            	} 
		            	var oData = oTable.getContextByIndex(idx);
		            	var id = oData.getObject().TSF_ID;
		                oController.Delete(id); // new test[0].getValue()
	    			} else {
	    				oDelete.setEnabled(false);
	    			}
    			});
            }
    	});
    	oToolbar1.addItem(oDelete);
    	
    	var oCreateForm = this.createInsert(oController);
    	var oUpdateForm = this.createUpdate(oController);
        	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        layout.createRow(oCreateForm);
        layout.createRow(oUpdateForm);
        
        //oTable.bindRows("/LIST");
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("TSF_NAME", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
        
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testFeatureLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testFeatureCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test feature registration: "}),
			    new sap.ui.commons.Label({text:"Feature Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                                
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testFeaturetb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testFeatureInsert",{
    		text : "Insert",
    		icon: "sap-icon://edit",
    		tooltip : "Register test feature",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.TSF_NAME = content[2].getValue();
                oEntry.TSF_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testFeatureTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                    },function(){
                        alert("Create failed");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testFeatureCancel",{
    		text : "Cancel",
    		icon: "sap-icon://decline",
    		tooltip : "Dismiss registration",
    		press : function() {
    			layout.setVisible(false);
    			oController.enableActions();
            }
    	});
    	oCreateToolBar.addItem(oCancel1);
    	
    	layout.createRow(oCreateForm);
        layout.createRow(oCreateToolBar);
        
        layout.setVisible(false);
    	
    	return layout;
    },
    
    createUpdate : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testFeatureLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testFeatureUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test Feature: "}),
			    new sap.ui.commons.Label({text:"Feature Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                                
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testFeaturetb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testFeatureUpdate2",{
    		text : "Update",
    		icon: "sap-icon://edit",
    		tooltip : "Update Test Feature",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.TSF_NAME = content[2].getValue();
                              
                var oTable = sap.ui.getCore().byId("testFeatureTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.TSF_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                    },function(){
                        alert("Update failed");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testFeatureCancel2",{
    		text : "Cancel",
    		icon: "sap-icon://decline",
    		tooltip : "Dismiss Update",
    		press : function() {
    			layout.setVisible(false);
    			oController.enableActions();
            }
    	});
    	oUpdateToolBar.addItem(oCancel1);
    	
    	layout.createRow(oUpdateForm);
        layout.createRow(oUpdateToolBar);
        
        layout.setVisible(false);
    	
    	return layout;
    }
});
