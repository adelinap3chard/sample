sap.ui.jsview("TestReports.forms.testproduct", {

    getControllerName : function() {
        return "TestReports.forms.testproduct";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testProductMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testProductMsg",{
			text: "To manage a test product, please select one of the button below to create a new test product, or update exiting test Product or remove an entry of a test product."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testProductTableID",
            title: "Test product table",
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
			text : "{PRO_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "PRO_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Product Name"}),
            template : oControl,
            sortProperty : "PRO_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_VER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Product Version"}),
            template : oControl,
            sortProperty : "PRO_VER",
            editable: false
        }));
        
        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testProductTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testProductCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Create New Test Product",
    		press : function() {
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testProductUpdate",{
    		text : "Edit",
    		//icon: "sap-icon://journey-change",
    		icon: "sap-icon://edit",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Change selected Test Product. Please select a row then click on Update button to modify.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testProductDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Delete selected Test Product",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1) return; //new
		            	var oData = oTable.getContextByIndex(idx);
		            	var id = oData.getObject().PRO_ID;
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
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("PRO_NAME", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
        
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testProductLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testProductCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test product registration: "}),
			    new sap.ui.commons.Label({text:"Product Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Product Version"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                                
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testProducttb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testProductInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register test product",
    		press : function() {
    		try{
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.PRO_NAME = content[2].getValue();
                oEntry.PRO_VER = content[4].getValue();
                oEntry.PRO_ID = 0;
    		}catch(e){
    			console.error(e); //gives you the red error message
    			console.log(e); //gives the default message
    			console.warn(e); //gives the warn message with the exclamation mark in front of it
    			console.info(e); //gives an info message with an 'i' in front of the message
    			sap.ui.commons.MessageBox.alert("Internal Error! Please contact admin",'',"ERROR");
    			return false;
    		};
                var oTestResult = sap.ui.getCore().byId("testProductTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                        sap.ui.commons.MessageBox.alert("Insert successfully!",'',"Success");
                    },function(){
                        //alert("Create failed");
                        sap.ui.commons.MessageBox.alert("Insert failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testProductCancel",{
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
            id : 'testProductLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testProductUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test Product: "}),
			    new sap.ui.commons.Label({text:"Product Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Product Version"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                                
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testProducttb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testProductUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test Product",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.PRO_NAME = content[2].getValue();
                oEntry.PRO_VER = content[4].getValue();
                               
                var oTable = sap.ui.getCore().byId("testProductTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.PRO_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                    sap.ui.commons.MessageBox.alert("Update successfully!",'',"Success");
                    oList.getModel().refresh();
                },function(){
                    //alert("Create failed");
                    sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testProductCancel2",{
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
