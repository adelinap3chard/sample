sap.ui.jsview("TestReports.forms.overview", {

    getControllerName : function() {
        return "TestReports.forms.overview";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'overviewMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("enterTestMsg",{
			text: "To record a test result, please select one of the button below to create a new test result, or update exiting test result or remove an entry of a test result."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "overviewTestTableID",
            title: "Over view test entry",
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
        
        var oControl = new sap.ui.commons.TextView({
			text : "{ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TEST_PLAN}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Plan"}),
            template : oControl,
            sortProperty : "TEST_PLAN",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TEST_CYCLE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Catalog"}),
            template : oControl,
            sortProperty : "TEST_CYCLE",
            editable: false
        }));
		
        var oControl = new sap.ui.commons.TextView({
			text : "{CASE_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Feature"}),
            template : oControl,
            sortProperty : "CASE_NAME",
            editable: false
        }));

        var oControl = new sap.ui.commons.TextView({
			text : "{USER_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Assignee"}),
            template : oControl,
            sortProperty : "USER_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TOTAL_TESTS}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Total Tests"}),
            template : oControl,
            sortProperty : "TOTAL_TESTS",
            editable: false
        }));

        var oControl = new sap.ui.commons.TextView({
			text : "{PASS}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Pass"}),
            template : oControl,
            sortProperty : "PASS",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{FAIL}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Fail"}),
            template : oControl,
            sortProperty : "FAIL",
            editable: false
        }));

        var oControl = new sap.ui.commons.TextView({
			text : "{SKIP_TESTS}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Skip Tests"}),
            template : oControl,
            sortProperty : "SKIP_TESTS",
            editable: false
        }));
        
       var oControl = new sap.ui.commons.TextView({
			text : { 
				   path : 'PASS_RATE',
				   formatter : function(value){
					   if (value != undefined) {
    					   this.removeStyleClass('green');  
    					   this.removeStyleClass('yellow');  
    					   this.removeStyleClass('red');  
    					   // Set style Conditionally  
    					   if (value < 75) {
    						   this.addStyleClass('red');
    					   } else if(value < 90 && value >= 75) {  
    						   this.addStyleClass('yellow');  
    					   } /*else {  
    						   this.addStyleClass('green');
    					   }  */
    					   return value + "%";
    				   }
    				   else
    					   return value;
				   }
			   }
       });
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Pass Rate"}),
            template : oControl,
            sortProperty : "PASS_RATE",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{BUG_LIST}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Comments"}),
            template : oControl,
            sortProperty : "BUG_LIST",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TEST_CASE_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Case"}),
            template : oControl,
            sortProperty : "TEST_CASE_NAME",
            editable: false
        }));
        
        var oToolbar1 = new sap.ui.commons.Toolbar("tb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("manualCreate",{
    		text : "Create",
    		tooltip : "Create New Manual Test",
    		press : function() {
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("manualUpdate",{
    		text : "Update",
    		tooltip : "Update selected Manual Test",
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
    	
    	var oDelete = new sap.ui.commons.Button("manualDelete",{
    		text : "Delete",
    		tooltip : "Delete selected Manual Test",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; //new
            	var oData = oTable.getContextByIndex(idx);
            	var id = oData.getObject().ID;
                oController.Delete(id); // new test[0].getValue()
            }
    	});
    	oToolbar1.addItem(oDelete);
    	
    	var oCreateForm = this.createInsert(oController);
    	var oUpdateForm = this.createUpdate(oController);
        	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        layout.createRow(oCreateForm);
        layout.createRow(oUpdateForm);
        
        oTable.bindRows("/LIST");
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'layoutCreate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"sf1",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test Description"}),
			    new sap.ui.commons.Label({text:"Test Plan"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Catalog"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Feature"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Assignee"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Comments"}),
                new sap.ui.commons.TextField({value:"",width:'500px',required: true}),
                new sap.ui.commons.Label({text:"Test Case Name"}),
                new sap.ui.commons.TextField({value:"",width:'500px',required: true}),
                
                new sap.ui.core.Title({text:"Test Data"}),
                new sap.ui.commons.Label({text:"Total Tests"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Pass"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Fail"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Skip Tests"}),
                new sap.ui.commons.TextField({value:"0",width:'100px',required: true}),
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("tbManualCreate");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("ManualInsert",{
    		text : "Insert",
    		tooltip : "Create New Manual Test",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.TEST_PLAN = content[2].getValue();
                oEntry.TEST_CYCLE = content[4].getValue();
                oEntry.CASE_NAME = content[6].getValue();
                oEntry.USER_NAME = content[8].getValue();
                oEntry.BUG_LIST = content[10].getValue();
                oEntry.TEST_CASE_NAME = content[12].getValue();
                oEntry.TOTAL_TESTS = content[15].getValue();
                oEntry.PASS = content[17].getValue();
                oEntry.FAIL = content[19].getValue();
                oEntry.SKIP_TESTS = content[21].getValue();
                oEntry.ID = 0;
                var oTestResult = sap.ui.getCore().byId("overviewTestTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                        content[15].setValue("");
                        content[17].setValue("");
                        content[19].setValue("");
                        content[21].setValue("0");
                    },function(){
                        alert("Create failed");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("ManualCancel",{
    		text : "Cancel",
    		tooltip : "Dismiss New Manual Test",
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
            id : 'layoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"sf2",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test Description"}),
			    new sap.ui.commons.Label({text:"Test Plan"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Catalog"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Feature"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Assignee"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Comments"}),
                new sap.ui.commons.TextField({value:"",width:'500px',required: true}),
                new sap.ui.commons.Label({text:"Test Case Name"}),
                new sap.ui.commons.TextField({value:"",width:'500px',required: true}),
                
                new sap.ui.core.Title({text:"Test Data"}),
                new sap.ui.commons.Label({text:"Total Tests"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Pass"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Fail"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Skip Tests"}),
                new sap.ui.commons.TextField({value:"0",width:'100px',required: true}),
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("tbManualUpdate");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("ManualUpdate",{
    		text : "Update",
    		tooltip : "Update Manual Test",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.TEST_PLAN = content[2].getValue();
                oEntry.TEST_CYCLE = content[4].getValue();
                oEntry.CASE_NAME = content[6].getValue();
                oEntry.USER_NAME = content[8].getValue();
                oEntry.BUG_LIST = content[10].getValue();
                oEntry.TEST_CASE_NAME = content[12].getValue();
                oEntry.TOTAL_TESTS = content[15].getValue();
                oEntry.PASS = content[17].getValue();
                oEntry.FAIL = content[19].getValue();
                oEntry.SKIP_TESTS = content[21].getValue();
                
                var oTestResult = sap.ui.getCore().byId("overviewTestTableID");
                var idx = oTestResult.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTestResult.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.ID;
                oTestResult.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTestResult.getModel().refresh();
                    },function(){
                        alert("Update failed");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("ManualCancel2",{
    		text : "Cancel",
    		tooltip : "Dismiss Update Manual Test",
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
