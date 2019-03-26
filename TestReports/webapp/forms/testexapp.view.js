sap.ui.jsview("TestReports.forms.testexapp", {

    getControllerName : function() {
        return "TestReports.forms.testexapp";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testexappMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testexappMsg",{
			text: "To manage a test external application, please select one of the button below to create a new test external application, or update exiting test external application or remove an entry of a test external application."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testexappTableID",
            title: "Test external application table",
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
			text : "{APP_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "APP_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{APP_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Application Name"}),
            template : oControl,
            sortProperty : "APP_NAME",
            filterProperty : "APP_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{APP_VER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Application Version"}),
            template : oControl,
            sortProperty : "APP_VER",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{APP_VER_STR}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Application Full Version"}),
            template : oControl,
            sortProperty : "APP_VER_STR",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{APP_PLATFORM}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Platform"}),
            template : oControl,
            sortProperty : "APP_PLATFORM",
            filterProperty : "APP_PLATFORM",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{APP_OS}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "OS"}),
            template : oControl,
            sortProperty : "APP_OS",
            filterProperty : "APP_OS",
            editable: false
        }));   

        var oControl = new sap.ui.commons.TextView({
			text : "{APP_HOST}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Host"}),
            template : oControl,
            sortProperty : "APP_HOST",
            filterProperty : "APP_HOST",
            editable: false
        }));
                

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testexappTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testexappCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		tooltip : "Create New Test external application",
    		press : function() {
    			
            	var oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
            	var oDropdownBoxPlatform = sap.ui.getCore().byId("TestPlanPlatformUpdate");
            	oDropdownBoxPlatform.setModel(oModel);
            	
            	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
            	var oDropdownBoxOS = sap.ui.getCore().byId("TestPlanOSUpdate");
            	oDropdownBoxOS.setModel(oModel);
            	
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testexappUpdate",{
    		text : "Update",
    		icon: "sap-icon://journey-change",
    		tooltip : "Update selected Test external application. Please select a row then click on Update button to modify.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	
            	var oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
            	var oDropdownBoxPlatform = sap.ui.getCore().byId("TestExtAppPlatformUpdate");
            	oDropdownBoxPlatform.setModel(oModel);
            	
            	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
            	var oDropdownBoxOS = sap.ui.getCore().byId("TestExtAppOSUpdate");
            	oDropdownBoxOS.setModel(oModel);
            	            	
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testexappDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		tooltip : "Delete selected Test external application",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1) return; //new
		            	var oData = oTable.getContextByIndex(idx);
		            	var id = oData.getObject().APP_ID;
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
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("APP_NAME", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
        
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testexappLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

       	oModel = null; // getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	var oDropdownBoxPlatform = getDropdownWithModel("TestExtAppPlatformInsert", "PLAT_NAME", oModel);
    	oDropdownBoxPlatform.setWidth("300px");
    	
    	oModel = null; // getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	var oDropdownBoxOS = getDropdownWithModel("TestExtAppOSInsert", "OS_NAME", oModel);
    	oDropdownBoxOS.setWidth("300px");
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testexappCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"External application registration: "}),
			    new sap.ui.commons.Label({text:"Application Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Application Version"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Application Full Version"}),
                new sap.ui.commons.TextField({value:"",width:'150px',required: true}),
                new sap.ui.commons.Label({text:"Platform"}),
                oDropdownBoxPlatform,
                new sap.ui.commons.Label({text:"OS"}),
                oDropdownBoxOS,
                //new sap.ui.commons.Label({text:"Platform"}),
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                //new sap.ui.commons.Label({text:"OS"}),
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Host"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testexapptb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testexappInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register external application",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.APP_NAME = content[2].getValue();
                oEntry.APP_VER = content[4].getValue();
                oEntry.APP_VER_STR = content[6].getValue();
                oEntry.APP_PLATFORM = content[8].getValue();
                oEntry.APP_OS = content[10].getValue();
                oEntry.APP_HOST = content[12].getValue();
                oEntry.APP_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testexappTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                    },function(){
                        alert("Create failed");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testexappCancel",{
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
            id : 'testexappLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
       	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testexappUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test Case: "}),
			    new sap.ui.commons.Label({text:"Application Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Application Version"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Application Full Version"}),
                new sap.ui.commons.TextField({value:"",width:'150px',required: true}),
                new sap.ui.commons.Label({text:"Platform"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"OS"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Host"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                           
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testexapptb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testexappUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test external application",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.APP_NAME = content[2].getValue();
                oEntry.APP_VER = content[4].getValue();
                oEntry.APP_VER_STR = content[6].getValue();
                oEntry.APP_PLATFORM = content[8].getValue();
                oEntry.APP_OS = content[10].getValue();
                oEntry.APP_HOST = content[12].getValue();
                
                var oTable = sap.ui.getCore().byId("testexappTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.APP_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                    },function(){
                        alert("Update failed");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testexappCancel2",{
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
