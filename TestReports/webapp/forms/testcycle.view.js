sap.ui.jsview("TestReports.forms.testcycle", {

    getControllerName : function() {
        return "TestReports.forms.testcycle";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCycleMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testCycleMsg",{
			text: "To manage a test cycle, please select one of the button below to create a new test cycle, or update exiting test Cycle or remove an entry of a test cycle."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "testCycleTableID",
            title: "Test cycle table",
            width : "100%",
            visibleRowCount: 20,
            //visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
            //height: "100%",
            selectionMode : sap.ui.table.SelectionMode.Single,
            rowSelectionChange: function(e) {
            	if (oUpdateForm.getVisible() == true || oCopyForm.getVisible() == true) {
                	var idx = e.getParameter('rowIndex');
                	if (oTable.isIndexSelected(idx)) {
                		var oData = oTable.getContextByIndex(idx);
                    	var entry = oData.getObject();
                    	oController.updateEntry(entry);
                    	oController.copyEntry(entry); 
                	}
            	}
        	}
        });
        
        // table columns
        var oControl = new sap.ui.commons.TextView({
			text : "{CYC_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "CYC_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{CYC_TAG}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Cycle Tag"}),
            template : oControl,
            sortProperty : "CYC_TAG",
            filterProperty : "CYC_TAG",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{CYC_DESC}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Cycle Description"}),
            template : oControl,
            sortProperty : "CYC_DESC",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PROJECT_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Project Name"}),
            template : oControl,
            sortProperty : "PROJECT_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{CONTRACTOR}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "User"}),
            template : oControl,
            sortProperty : "CONTRACTOR",
            filterProperty : "CONTRACTOR",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{STARTDATE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Start Date"}),
            template : oControl,
            sortProperty : "STARTDATE",
            editable: false
        }));   

        var oControl = new sap.ui.commons.TextView({
			text : "{ENDDATE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "End Date"}),
            template : oControl,
            sortProperty : "STARTDATE",
            editable: false
        }));
        

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testCycleTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testCycleCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		tooltip : "Create New Test Cycle",
    		press : function() {
    			var oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("TestCycleUserInsert");
    	    	oDropdownBoxUser.setModel(oModel);
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testCycleUpdate",{
    		text : "Update",
    		icon: "sap-icon://journey-change",
    		tooltip : "Update selected Test Cycle. Please select a row then click Update to modify.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	} 
            	var oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("TestCycleUserUpdate");
    	    	oDropdownBoxUser.setModel(oModel);
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oCopy = new sap.ui.commons.Button("testCycleCopy",{
    		text : "Copy",
    		icon: "sap-icon://journey-change",
    		tooltip : "Copy selected Test Cycle. Please select a row then click Update to modify.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to copy!",'',"INFO");
            		return; // new
            	} 
            	var oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("TestCycleUserCopy");
    	    	oDropdownBoxUser.setModel(oModel);
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.copyEntry(entry);
            	oController.disableActions();
            	oCopyForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCopy);
    	
    	
    	var oDelete = new sap.ui.commons.Button("testCycleDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		tooltip : "Delete selected Test Cycle",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1){
		            		sap.ui.commons.MessageBox.alert("Please select a row to delete!",'',"INFO");
		            		return; // new
		            	} 
		            	var oData = oTable.getContextByIndex(idx);
		            	var entry = oData.getObject();
		            	var product = "null";
						if (entry.PRO_NAME != null) {
							product = "'" + entry.PRO_NAME + "'";
						}
						var id = "CYC_ID=" + entry.CYC_ID + "L,PRO_NAME=" + product;
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
    	var oCopyForm = this.createCopy(oController);
        	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        layout.createRow(oCreateForm);
        layout.createRow(oUpdateForm);
        layout.createRow(oCopyForm);
        
        //oTable.bindRows("/LIST");
        oTable.bindRows("/LIST", new sap.ui.model.Sorter("CYC_TAG", false, true));
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCycleLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

    	//var oModel = oController.getDropdown("TestSuiteTestType","TestType", "TP_NAME", null).getModel();
    	//var oDropdownBoxTestType = oController.getDropdownWithModel("TestSuiteTestTypeInsert", "TP_NAME", oModel);
    	//oDropdownBoxTestType.setWidth("100px");
    	var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
    	var oDatePicker1 = new sap.ui.commons.DatePicker('tc_date1',{width:'200px'});
    	oDatePicker1.__proto__._formatValue = function(oDate) {
			var oFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd", strictParsing: true, relative: false}, null);
			// convert to date object
			var sValue = oFormat.format(oDate);
			return sValue;

		};
		oDatePicker1.setYyyymmdd(today);
		oDatePicker1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oDatePicker2 = new sap.ui.commons.DatePicker('tc_date2',{width:'200px'});
		oDatePicker2.setYyyymmdd(today);
		oDatePicker2.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);

    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestCycleUserInsert", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testCycleCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test cycle registration: "}),
			    new sap.ui.commons.Label({text:"Cycle Tag"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Cycle Description"}),
                new sap.ui.commons.TextField({value:"",width:'800px',required: true}),
                new sap.ui.commons.Label({text:"Project Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Contractor"}),
                oDropdownBoxUser,
                //new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Start Date"}),
                oDatePicker1,
                new sap.ui.commons.Label({text:"End Date"}),
                oDatePicker2,  
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testCycletb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("testCycleInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register test cycle",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.CYC_TAG = content[2].getValue();
                oEntry.CYC_DESC = content[4].getValue();
                oEntry.PROJECT_NAME = content[6].getValue();
                oEntry.CONTRACTOR = content[8].getValue();
                oEntry.STARTDATE = content[10].getValue();
                oEntry.ENDDATE = content[12].getValue();
                oEntry.PRO_NAME = sap.ui.getCore().byId("ProductFilter").getValue();
                oEntry.CYC_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testCycleTableID");
                var oModel = getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
				oModel.create('/LIST', oEntry, null, function(){
					oTestResult.setModel(refreshCycles());
                        sap.ui.commons.MessageBox.alert("Insert successfully!",'',"Success");
                    },function(res){
                    	if (res.response != undefined && res.response.body != undefined) {
    						message = getMessage(res.response.body);
    						sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
    					}
    					else {
    						oTestResult.setModel(refreshCycles());
    						sap.ui.commons.MessageBox.alert("Insert successfully!",'',"Success");
    					}
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCycleCancel",{
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
            id : 'testCycleLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	//var oModel = oController.getDropdown("TestSuiteTestType","TestType", "TP_NAME", null).getModel();
    	//var oDropdownBoxTestType = oController.getDropdownWithModel("TestSuiteTestTypeUpdate", "TP_NAME", oModel);
    	//oDropdownBoxTestType.setWidth("100px");
    	
    	var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
    	var oDatePicker1 = new sap.ui.commons.DatePicker('tc_date3',{width:'200px'} );
		oDatePicker1.setYyyymmdd(today);
		oDatePicker1.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDatePicker1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oDatePicker2 = new sap.ui.commons.DatePicker('tc_date4',{width:'200px'});
		oDatePicker2.setYyyymmdd(today);
		oDatePicker2.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDatePicker2.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
				
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestCycleUserUpdate", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
		
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testCycleUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Update Test Cycle: "}),
			    new sap.ui.commons.Label({text:"Cycle Tag"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Cycle Description"}),
                new sap.ui.commons.TextField({value:"",width:'800px',required: true}),
                new sap.ui.commons.Label({text:"Project Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Contractor"}),
                oDropdownBoxUser,
                //new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Start Date"}),
                oDatePicker1,
                new sap.ui.commons.Label({text:"End Date"}),
                oDatePicker2, 
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testCycletb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testCycleUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test Cycle",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.CYC_TAG = content[2].getValue();
                oEntry.CYC_DESC = content[4].getValue();
                oEntry.PROJECT_NAME = content[6].getValue();
                oEntry.CONTRACTOR = content[8].getValue();
                oEntry.STARTDATE = content[10].getValue();
                oEntry.ENDDATE = content[12].getValue();
                
                
                var oTable = sap.ui.getCore().byId("testCycleTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oEntry.PRO_NAME = "pro_name";
            	var product = "null";
				if (entry.PRO_NAME != null) {
					product = "'" + entry.PRO_NAME + "'";
					oEntry.PRO_NAME = entry.PRO_NAME;
				}
				var id = "/LIST(CYC_ID=" + entry.CYC_ID + "L,PRO_NAME=" + product + ")"
				var oModel = getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
				oModel.update(id, oEntry, null, function(){
					oTable.setModel(refreshCycles());
                	sap.ui.commons.MessageBox.alert("Updated successfully!",'',"Success");
                    },function(){
                    	sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCycleCancel2",{
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
    },
    
    createCopy : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCycleLayoutCopy',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
    	var oDatePicker1 = new sap.ui.commons.DatePicker('tc_date5',{width:'200px'} );
		oDatePicker1.setYyyymmdd(today);
		oDatePicker1.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDatePicker1.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
		var oDatePicker2 = new sap.ui.commons.DatePicker('tc_date6',{width:'200px'});
		oDatePicker2.setYyyymmdd(today);
		oDatePicker2.setLocale("en-US"); // Try with "de" or "fr" instead!
		oDatePicker2.attachChange(
				function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
					}else{
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
					}
				}
		);
				
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestCycleUserCopy", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
		
    	//Update form
    	var oCopyForm = new sap.ui.layout.form.SimpleForm(
		"testCycleCopyForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Copy Test Cycle: "}),
			    new sap.ui.commons.Label({text:"Cycle Tag"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Cycle Description"}),
                new sap.ui.commons.TextField({value:"",width:'800px',required: true}),
                new sap.ui.commons.Label({text:"Project Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Contractor"}),
                oDropdownBoxUser,
                //new sap.ui.commons.TextField({value:"",width:'200px',required: true}),
                new sap.ui.commons.Label({text:"Start Date"}),
                oDatePicker1,
                new sap.ui.commons.Label({text:"End Date"}),
                oDatePicker2, 
			]
		});
    	
    	var oCopyToolBar = new sap.ui.commons.Toolbar("testCycletb4");
    	oCopyToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oCopy = new sap.ui.commons.Button("testCycleCopy3",{
    		text : "Copy",
    		icon: "sap-icon://accept",
    		tooltip : "Copy Test Cycle",
    		press : function() {
    			var content = oCopyForm.getContent();
                var oEntry = {};
                oEntry.CYC_TAG = content[2].getValue();
                oEntry.CYC_DESC = content[4].getValue();
                oEntry.PROJECT_NAME = content[6].getValue();
                oEntry.CONTRACTOR = content[8].getValue();
                oEntry.STARTDATE = content[10].getValue();
                oEntry.ENDDATE = content[12].getValue();
                
                var oTable = sap.ui.getCore().byId("testCycleTableID");
                var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	
            	var JSONString = JSON.stringify(oEntry);
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	url = "/TestReports/copyCycle.xsjs?from_cycle_id=" + entry.CYC_ID + "&to_cycle_info=" + JSONString;
            	
        		getModelWithDataASYNC(url, function() {
					oTable.setModel(refreshCycles());
                	sap.ui.commons.MessageBox.alert("Copy successfully!",'',"Success");
                    },function(e){
                    	oTable.setModel(refreshCycles());
                    	sap.ui.commons.MessageBox.alert("Copy successfully!",'',"Success");
                    }
                );
            }
    	});
    	oCopyToolBar.addItem(oCopy);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCycleCancel3",{
    		text : "Cancel",
    		icon: "sap-icon://decline",
    		tooltip : "Dismiss Copy",
    		press : function() {
    			layout.setVisible(false);
    			oController.enableActions();
            }
    	});
    	oCopyToolBar.addItem(oCancel1);
    	
    	layout.createRow(oCopyForm);
        layout.createRow(oCopyToolBar);
        
        layout.setVisible(false);
    	
    	return layout;
    }
});
