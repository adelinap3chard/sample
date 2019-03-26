sap.ui.jsview("TestReports.forms.testuser", {

    getControllerName : function() {
        return "TestReports.forms.testuser";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testUserMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testUserMsg",{
			text: "To manage a test user, please select one of the button below to create a new test user, or update exiting test User or remove an entry of a test user."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testUserTableID",
            title: "Test user table",
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
			text : "{U_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "U_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{U_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "User Name"}),
            template : oControl,
            sortProperty : "U_NAME",
            filterProperty : "U_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{G_VAL}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Group Name"}),
            template : oControl,
            sortProperty : "G_VAL",
            filterProperty : "G_VAL",
            editable: false
        }));
        
        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testUserTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testUserCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		tooltip : "Create New Test User",
    		press : function() {
    			var oModel = getODataModel("/TestGroup", "/TestReports/odata/getTestGroupList.xsodata");
    			var oDropdownBoxTestType = sap.ui.getCore().byId("TestUserGroupInsert");
    			oDropdownBoxTestType.setModel(oModel);
    	    	
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testUserUpdate",{
    		text : "Update",
    		icon: "sap-icon://journey-change",
    		tooltip : "Update selected Test User. Please select a row then click Update to modify. ",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	} 
            	var oModel = getODataModel("/TestGroup", "/TestReports/odata/getTestGroupList.xsodata");
    			var oDropdownBoxTestType = sap.ui.getCore().byId("TestUserGroupUpdate");
    			oDropdownBoxTestType.setModel(oModel);
    			
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testUserDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		tooltip : "Delete selected Test User",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			try {
		    				var idx = oTable.getSelectedIndex(); //new
		    				//if (idx == -1) return; //new
		                	var oData = oTable.getContextByIndex(idx);
		                	var id = oData.getObject().U_ID;
		    			}catch(e){
		    				console.error(e); //gives you the red error message
		        			console.log(e); //gives the default message
		        			console.warn(e); //gives the warn message with the exclamation mark in front of it
		        			console.info(e); //gives an info message with an 'i' in front of the message
		   
		        			sap.ui.commons.MessageBox.alert("There is an error with your selection. Please check your selection and try again.",'',"ERROR");
		        			return false;
		    			}
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
        
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("U_NAME", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
        
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testUserLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

    	var oModel = null; //getODataModel("/TestGroup", "/TestReports/odata/getTestGroupList.xsodata");
    	var oDropdownBoxTestType = getDropdownWithModel("TestUserGroupInsert", "G_VAL", oModel);
    	oDropdownBoxTestType.setWidth("300px");

    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testUserCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test user registration: "}),
			    new sap.ui.commons.Label({text:"User Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Group Name"}),
                oDropdownBoxTestType,
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testUsertb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testUserInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register test user",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.U_NAME = content[2].getValue();
                oEntry.G_VAL = content[4].getValue();
                oEntry.U_ID = 0;
                
                var oTestResult = sap.ui.getCore().byId("testUserTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                        sap.ui.commons.MessageBox.alert("Created successfully!",'',"User");
                    },function(){
                        //alert("Create failed");
                        sap.ui.commons.MessageBox.alert("Create failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testUserCancel",{
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
            id : 'testUserLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; // getODataModel("/TestGroup", "/TestReports/odata/getTestGroupList.xsodata");
    	var oDropdownBoxTestType = getDropdownWithModel("TestUserGroupUpdate", "G_VAL", oModel);
    	oDropdownBoxTestType.setWidth("300px");
    	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testUserUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test User: "}),
			    new sap.ui.commons.Label({text:"User Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Group Name"}),
                oDropdownBoxTestType,
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testUsertb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testUserUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test User",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.U_NAME = content[2].getValue();
                oEntry.G_VAL = content[4].getValue();
                
                var oTable = sap.ui.getCore().byId("testUserTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.U_ID;
                oEntry.U_ID = entry.U_ID; 
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                	sap.ui.commons.MessageBox.alert("Updated successfully!",'',"User");
                    },function(){
                        //alert("Update failed");
                        sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testUserCancel2",{
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
