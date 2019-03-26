sap.ui.jsview("TestReports.forms.testcase", {

    getControllerName : function() {
        return "TestReports.forms.testcase";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCaseMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testCaseMsg",{
			text: "To manage a test case, please select one of the button below to create a new test case, or update exiting test Case or remove an entry of a test case."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testCaseTableID",
            title: "Test case table",
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
			text : "{TC_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "TC_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "TC_ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test name"}),
            template : oControl,
            sortProperty : "TC_NAME",
            filterProperty : "TC_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TFILE_CASE_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test number"}),
            template : oControl,
            sortProperty : "TFILE_CASE_NAME",
            filterProperty : "TFILE_CASE_NAME",
            editable: false
        }));
        

             
        var oControl = new sap.ui.commons.TextView({
			text : "{TFILE_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "File Path"}),
            template : oControl,
            sortProperty : "TFILE_NAME",
            filterProperty : "TFILE_NAME",
            editable: false
        }));
           
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_ACTIVE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Mode"}),
            tooltip : 'This field requires an integer',
            template : oControl,
            sortProperty : "TC_ACTIVE",
            filterProperty : "TC_ACTIVE",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_DETAILS}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Details"}),
            tooltip : 'Steps of test case',
            template : oControl,
            sortProperty : "TC_DETAILS",
            //filterProperty : "TC_DETAILS",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_EXPECTED_RESULT}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Expected Result"}),
            tooltip : 'What to expect',
            template : oControl,
            sortProperty : "TC_EXPECTED_RESULT",
            //filterProperty : "TC_DETAILS",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_OWNER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Owner"}),
            template : oControl,
            sortProperty : "TC_OWNER",
            filterProperty : "TC_OWNER",
            editable: false
        }));   

        var oControl = new sap.ui.commons.TextView({
			text : "{TC_COMMENT}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Comments"}),
            template : oControl,
            sortProperty : "TC_COMMENT",
            filterProperty : "TC_COMMENT",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TP_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test type"}),
            template : oControl,
            sortProperty : "TP_NAME",
            filterProperty : "TP_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{B_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Branch"}),
            template : oControl,
            sortProperty : "B_NAME",
            filterProperty : "B_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PROJECT}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Project Link"}),
            template : oControl,
            sortProperty : "PROJECT",
            filterProperty : "PROJECT",
            editable: false
        }));

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testCaseTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testCaseCreate",{
    		text : "Create",
    		tooltip : "Create New Test Case",
    		press : function() {
    			var oModel = getODataModel("/TestType", "/TestReports/odata/getTestTypeList.xsodata");
    			var oDropdownBoxTestType = sap.ui.getCore().byId("TestSuiteTestTypeInsert");
    			oDropdownBoxTestType.setModel(oModel);
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testCaseUpdate",{
    		text : "Update",
    		tooltip : "Update selected Test Case",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	}
            	var oModel = getODataModel("/TestType", "/TestReports/odata/getTestTypeList.xsodata");
    			var oDropdownBoxTestType = sap.ui.getCore().byId("TestSuiteTestTypeUpdate");
    			oDropdownBoxTestType.setModel(oModel);
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testCaseDelete",{
    		text : "Delete",
    		tooltip : "Delete selected Test Case",
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
    	
    	//cheat since I can't find filereader support in ui5
    	var oFileReader = new sap.ui.core.HTML("CaseHtml", {
    		content:
    			'<input type="file" id="testCaseSelectedFile" style="display: none;" onchange="read_xlsx(event, import_testcases)" />',
    		preferDOM : false,
    	});
    	oToolbar1.addItem(oFileReader);
    	
    	var oImport = new sap.ui.commons.Button("testCaseImport",{
    		text : "Import",
    		tooltip : "Import test case(s) from xlsx file",
    		press : function() {
    			document.getElementById('testCaseSelectedFile').click();
    		}
    	});
    	oToolbar1.addItem(oImport);
    	
    	var oExport = new sap.ui.commons.Button("testCaseExport",{
    		text : "Export",
    		tooltip : "Export a test case to xlsx file",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to export!",'',"INFO");
            		return; // new
            	}
            	var oData = oTable.getContextByIndex(idx);
            	var oEntry = oData.getObject();
                save_xlsx("TestCases.xlsx", "TestCases", oEntry);
            }
    	});
    	oToolbar1.addItem(oExport);
    	
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
            id : 'testCaseLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

    	var oModel = null; // getODataModel("/TestType", "/TestReports/odata/getTestTypeList.xsodata");
    	var oDropdownBoxTestType = getDropdownWithModel("TestSuiteTestTypeInsert", "TP_NAME", oModel);
    	oDropdownBoxTestType.setWidth("100px");

    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testCaseCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test case registration: "}),
                new sap.ui.commons.Label({text:"Test Name"}),
                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Test Number"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"File Path"}),
                new sap.ui.commons.TextField({value:"",width:'600px'}),
                new sap.ui.commons.Label({text:"Mode"}),
                new sap.ui.commons.TextField({value:"1",width:'50px',required: true}),
                new sap.ui.commons.Label({text:"Test Details"}),
                new sap.ui.commons.TextArea({value:"",rows:5, height:'50px'}),
                new sap.ui.commons.Label({text:"Expected result"}),
                new sap.ui.commons.TextArea({value:"",rows:5, height:'50px'}),            
                new sap.ui.commons.Label({text:"Owner"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Comments"}),
                new sap.ui.commons.TextField({value:"",width:'600px'}),
                new sap.ui.commons.Label({text:"Case Type"}),
                oDropdownBoxTestType,
                new sap.ui.commons.Label({text:"Branch"}),
                new sap.ui.commons.TextField({value:"",width:'200px'}),           
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testCasetb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	
    	var oInsert = new sap.ui.commons.Button("testCaseInsert",{
    		text : "Insert",
    		tooltip : "Register test case",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};   
                oEntry.TC_NAME = content[2].getValue(); // test case name
                oEntry.TFILE_CASE_NAME = content[4].getValue(); // test case number
                oEntry.TFILE_NAME = content[6].getValue(); //test file path
                oEntry.TC_ACTIVE = content[8].getValue(); // test mode
                oEntry.TC_DETAILS = content[10].getValue(); 
                oEntry.TC_EXPECTED_RESULT = content[12].getValue();
                oEntry.TC_OWNER = content[14].getValue();
                oEntry.TC_COMMENT = content[16].getValue();
                oEntry.TP_NAME = content[18].getValue();
                oEntry.B_NAME = content[20].getValue();
                oEntry.TC_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testCaseTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                    },function(){
                        alert("Create failed");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCaseCancel",{
    		text : "Cancel",
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
            id : 'testCaseLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; // getODataModel("/TestType", "/TestReports/odata/getTestTypeList.xsodata");
    	var oDropdownBoxTestType = getDropdownWithModel("TestSuiteTestTypeUpdate", "TP_NAME", oModel);
    	oDropdownBoxTestType.setWidth("100px");
    	    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testCaseUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
					    new sap.ui.core.Title({text:"Test case registration: "}),
		                new sap.ui.commons.Label({text:"Test Name"}),
		                new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
		                new sap.ui.commons.Label({text:"Test Number"}),
		                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
		                new sap.ui.commons.Label({text:"File Path"}),
		                new sap.ui.commons.TextField({value:"",width:'600px'}),
		                new sap.ui.commons.Label({text:"Mode"}),
		                new sap.ui.commons.TextField({value:"1",width:'50px',required: true}),
		                new sap.ui.commons.Label({text:"Test Details"}),
		                new sap.ui.commons.TextArea({value:"",rows:5, height:'50px'}),
		                new sap.ui.commons.Label({text:"Expected result"}),
		                new sap.ui.commons.TextArea({value:"",rows:5, height:'50px'}),            
		                new sap.ui.commons.Label({text:"Owner"}),
		                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
		                new sap.ui.commons.Label({text:"Comments"}),
		                new sap.ui.commons.TextField({value:"",width:'600px'}),
		                new sap.ui.commons.Label({text:"Case Type"}),
		                oDropdownBoxTestType,
		                new sap.ui.commons.Label({text:"Branch"}),
		                new sap.ui.commons.TextField({value:"",width:'200px'}),
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testCasetb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testCaseUpdate2",{
    		text : "Update",
    		tooltip : "Update Test Case",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.TC_NAME = content[2].getValue(); // test case name
                oEntry.TFILE_CASE_NAME = content[4].getValue(); // test case number
                oEntry.TFILE_NAME = content[6].getValue(); //test file path
                oEntry.TC_ACTIVE = content[8].getValue(); // test mode
                oEntry.TC_DETAILS = content[10].getValue(); 
                oEntry.TC_EXPECTED_RESULT = content[12].getValue();
                oEntry.TC_OWNER = content[14].getValue();
                oEntry.TC_COMMENT = content[16].getValue();
                oEntry.TP_NAME = content[18].getValue();
                oEntry.B_NAME = content[20].getValue();
                
                var oTable = sap.ui.getCore().byId("testCaseTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.TC_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                    },function(){
                        alert("Update failed");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCaseCancel2",{
    		text : "Cancel",
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
