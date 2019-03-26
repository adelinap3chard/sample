sap.ui.jsview("TestReports.forms.testgroup", {

    getControllerName : function() {
        return "TestReports.forms.testgroup";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testGroupMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testGroupMsg",{
			text: "To manage a test group, please select one of the button below to create a new test group, or update exiting test Group or remove an entry of a test group."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testGroupTableID",
            title: "Test group table",
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
			text : "{G_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "G_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{G_VAL}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Group Name"}),
            template : oControl,
            sortProperty : "G_VAL",
            editable: false
        }));    

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testGroupTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testGroupCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		tooltip : "Create New Test Group",
    		press : function() {
    			//oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testGroupUpdate",{
    		text : "Update",
    		icon: "sap-icon://journey-change",
    		tooltip : "Update selected Test Group. Please select a row then click Update button to modify.",
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
    	
    	var oDelete = new sap.ui.commons.Button("testGroupDelete",{
    		text : "Delete",
    		enabled : false,
    		icon: "sap-icon://delete",
    		tooltip : "Delete selected Test Group",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1){
		            		sap.ui.commons.MessageBox.alert("Please select a row to delete!",'',"INFO");
		            		return; // new
		            	} 
		            	var oData = oTable.getContextByIndex(idx);
		            	var id = oData.getObject().TC_ID;
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
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("G_VAL", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
        
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testGroupLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testGroupCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test group registration: "}),
			    new sap.ui.commons.Label({text:"Group Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                                
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testGrouptb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testGroupInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register test group",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.G_VAL = content[2].getValue();
                oEntry.G_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testGroupTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                    },function(){
                        alert("Create failed");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testGroupCancel",{
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
            id : 'testGroupLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testGroupUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test Group: "}),
			    new sap.ui.commons.Label({text:"Group Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                                
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testGrouptb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testGroupUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test Group",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.G_VAL = content[2].getValue();
                              
                var oTable = sap.ui.getCore().byId("testGroupTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.G_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                    },function(){
                        alert("Update failed");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testGroupCancel2",{
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
