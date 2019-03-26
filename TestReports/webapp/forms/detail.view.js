sap.ui.jsview("TestReports.forms.detail", {

    getControllerName : function() {
        return "TestReports.forms.detail";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'detailMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("DetailTestMsg",{
			text: "To record a test result, please select one of the button below to create a new test result, or update exiting test result or remove an entry of a test result."
		});
        
        var oTable = new sap.ui.table.Table({
            id : "detailTestTableID",
            title: "Detail test result entry",
            width : "100%",
            visibleRowCount: 26,
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
			text : "{CYC_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Cycle"}),
            template : oControl,
            width : '150px',
            sortProperty : "CYC_NAME",
            filterProperty : "CYC_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Product"}),
            template : oControl,
            sortProperty : "PRO_NAME",
            filterProperty : "PRO_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_VER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Version"}),
            template : oControl,
            sortProperty : "PRO_VER",
            filterProperty : "PRO_VER",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_VER_STR}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Full Version"}),
            template : oControl,
            sortProperty : "PRO_VER_STR",
            filterProperty : "PRO_VER_STR",
            editable: false
        }));
                 
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Case"}),
            template : oControl,
            width : '250px',
            sortProperty : "TC_NAME",
            filterProperty : "TC_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TC_RESULT}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Result"}),
            template : oControl,
            sortProperty : "TC_RESULT",
            filterProperty : "TC_RESULT",
            editable: false,
	            template: new sap.ui.commons.TextView({
		    		   text : { 
		    			   path : 'TC_RESULT',
		    			   formatter : function(value){
		    				   if (value != undefined) {
		    					   this.removeStyleClass('green');  
		    					   this.removeStyleClass('yellow');  
		    					   this.removeStyleClass('red');  
		    					   // Set style Conditionally  
		    					   if (value == "FAIL" ) {
		        						   this.addStyleClass('red');
		        					   } 
		    					   return value;
		    				   }
		    				   else
		    					   return value;
		    			   }
		    		   }}),
        }));
        
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "BUG"}),
            sortProperty : "BUG_ID",
            filterProperty : "BUG_ID",
            editable: false,
            template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'BUG_ID'
	    		   },
	    		   press : function(value){
	    			   var text = this.getText();
	    			   var bugs = text.split(',');
	    			   _.forEach(bugs, function(bug) {
	    				   if (bug != undefined && bug != '') {
	    					   window.open('https://hdbits.wdf.sap.corp/bugzilla/show_bug.cgi?id='+bug, '_blank');
	    				   }
	    			   });
    			   }
            }),	   
        }));
        /*
        var oControl = new sap.ui.commons.TextView({
        	text : "{BUG_ID}"});		
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "BUG"}),
            template : oControl,
            sortProperty : "BUG_ID",
            filterProperty : "BUG_ID",
            editable: false
        }));
        */
        
        	
        var oControl = new sap.ui.commons.TextView({
			text : "{EXEC_USER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "User"}),
            template : oControl,
            sortProperty : "EXEC_USER",
            filterProperty : "EXEC_USER",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{START_TIME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Start Time"}),
            template : oControl,
            sortProperty : "START_TIME",
            filterProperty : "START_TIME",
            editable: false
        }));

        var oControl = new sap.ui.commons.TextView({
			text : "{END_TIME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "End Time"}),
            template : oControl,
            sortProperty : "END_TIME",
            filterProperty : "END_TIME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
        	text : { 
    			path : 'EXEC_TS',
    			formatter : function(value){
    				if (value != undefined) {
    					var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
    					return oDateFormat.format(value);
    				}
    				return value;
    			}
         	}
        });
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Ini Time"}),
            template : oControl,
            sortProperty : "EXEC_TS",
            filterProperty : "EXEC_TS",
            editable: false
        }));

        var oControl = new sap.ui.commons.TextView({
			text : "{EXEC_TIME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Run Time"}),
            template : oControl,
            sortProperty : "EXEC_TIME",
            filterProperty : "EXEC_TIME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PLAT_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Platform"}),
            template : oControl,
            sortProperty : "PLAT_NAME",
            filterProperty : "PLAT_NAME",
            editable: false
        }));
       
        var oControl = new sap.ui.commons.TextView({
			text : "{OS_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "OS"}),
            template : oControl,
            sortProperty : "OS_NAME",
            filterProperty : "OS_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{HOST_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Host"}),
            template : oControl,
            sortProperty : "HOST_NAME",
            filterProperty : "HOST_NAME",
            editable: false
        }));
        
        //Tool Bar
        var oToolbar1 = new sap.ui.commons.Toolbar("detail_tb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	//create button
    	var oCreate = new sap.ui.commons.Button("d_manualCreate",{
    		text : "Log",
    		tooltip : "log A new test result",
    		press : function() {
    			var oModel = getODataModel("/TestStatus", "/TestReports/odata/getStatusList.xsodata");
    			var oDropdownBoxTestStatus = sap.ui.getCore().byId("d_TestStatusInsert");
    			oDropdownBoxTestStatus.setModel(oModel);
    			
    	    	oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	    	var oDropdownBoxProduct = sap.ui.getCore().byId("d_TestPlanProductInsert");
    	    	oDropdownBoxProduct.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	    	var oDropdownBoxVersion = sap.ui.getCore().byId("d_TestPlanProductVersionInsert");
    	    	oDropdownBoxVersion.setModel(oModel);
    	    	
    	    	oModel = getCycles();
    	    	var oDropdownBoxCycle = sap.ui.getCore().byId("d_TestPlanCycleInsert");
    	    	oDropdownBoxCycle.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("d_TestPlanUserInsert");
    	    	oDropdownBoxUser.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	    	var oDropdownBoxTestPlat = sap.ui.getCore().byId("d_TestResultsPlatInsert");
    	    	oDropdownBoxTestPlat.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	    	var oDropdownBoxTestOs = sap.ui.getCore().byId("d_TestResultsOsInsert");
    	    	oDropdownBoxTestOs.setModel(oModel);
    	    	
    			oController.disableActions();
    			oCreateForm.setVisible(true);
    			
    			var oDropdownBoxTestCase = sap.ui.getCore().byId("d_TestCaseInsert");
    			var cycle = oDropdownBoxCycle.getValue();
    			/*
        		oDropdownBoxTestCase.unbindItems();
        		oDropdownBoxTestPlat.unbindItems();
        		oDropdownBoxTestOS.unbindItems();
        		var filters = new Array();  
                var filter = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
                filters.push(filter);  
                var oItemTemplateBranch = new sap.ui.core.ListItem();
        		oItemTemplateBranch.bindProperty("text", "TC_NAME");
        		oDropdownBoxTestCase.bindItems("/LIST", oItemTemplateBranch, null, filters);
        		
        		oItemTemplateBranch.bindProperty("text", "PLAT_NAME");
        		oDropdownBoxTestPlat.bindItems("/LIST", oItemTemplateBranch, null, filters);
        		
        		oItemTemplateBranch.bindProperty("text", "OS_NAME");
        		oDropdownBoxTestOs.bindItems("/LIST", oItemTemplateBranch, null, filters);
        		*/
    			var model = oController.getCaseForCycle(cycle);
        		oDropdownBoxTestCase.setModel(model);
        		
        		var product = oDropdownBoxProduct.getValue();
        		oDropdownBoxVersion.unbindItems();
        		var filters2 = new Array();  
                var filter2 = new sap.ui.model.Filter("PRODUCT", sap.ui.model.FilterOperator.EQ, product);  
                filters2.push(filter2);  
                var oItemTemplateBranch2 = new sap.ui.core.ListItem();
        		oItemTemplateBranch2.bindProperty("text", "VERSION");
        		oDropdownBoxVersion.bindItems("/LIST", oItemTemplateBranch2, null, filters2);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	//multi log button
    	var oTest = new sap.ui.commons.Button("d_manualTest",{
    		text : "MultiLog",
    		tooltip : "Log multi results (cases and suites)",
    		press : function() {
    			var oModel = getODataModel("/TestSuiteCycle", "/TestReports/odata/getTestSuiteForCycleList.xsodata");
    			var oDropdownBoxTestSuite = sap.ui.getCore().byId("TestPlanTestSuiteTest");
    			oDropdownBoxTestSuite.setModel(oModel);
    	    	
    	    	//get Platform list for suite
    	    	oModel = getODataModel("/TestPlatFromPlan", "/TestReports/odata/getTestPlatFromPlanList.xsodata");
    	    	var oDropdownBoxPlatform = sap.ui.getCore().byId("d_TestPlatform");
    	    	oDropdownBoxPlatform.setModel(oModel);
    			
    	    	//get OS list for suite
    	    	oModel = getODataModel("/TestOSFromPlan", "/TestReports/odata/getTestOSFromPlanList.xsodata");
    	    	var oDropdownBoxOS = sap.ui.getCore().byId("d_TestOSName");
    	    	oDropdownBoxOS.setModel(oModel);
    	    	
    	    	// suite bind to Assignee
    	     	oModel = getODataModel("/TestUserFromPlan", "/TestReports/odata/getTestUserFromPlanList.xsodata");
    	     	var oDropdownBoxAssignee = sap.ui.getCore().byId("d_TestPlanAssignee");
    	     	oDropdownBoxAssignee.setModel(oModel);
    	    	
    	    	// drop down User bind to cycle 
    	    	oModel = getCycles();
    	    	var oDropdownBoxCycle = sap.ui.getCore().byId("d_TestPlanCycleTest");
    	    	oDropdownBoxCycle.setModel(oModel);
    	     	
    	    	// drop down for tester
    	    	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("d_TestPlanUserTest");
    	    	oDropdownBoxUser.setModel(oModel);
    	    	
    			oController.disableActions();
    			oTestForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oTest);
    	
    	//update button
    	var oUpdate = new sap.ui.commons.Button("d_manualUpdate",{
    		text : "Update",
    		tooltip : "Update selected Manual Test",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	} 
            	var oModel = getODataModel("/TestStatus", "/TestReports/odata/getStatusList.xsodata");
            	var oDropdownBoxTestStatus = sap.ui.getCore().byId("d_TestStatusUpdate");
            	oDropdownBoxTestStatus.setModel(oModel);
            	
            	oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
            	var oDropdownBoxProduct = sap.ui.getCore().byId("d_TestPlanProductUpdate");
            	oDropdownBoxProduct.setModel(oModel);
            	
            	oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
            	var oDropdownBoxVersion = sap.ui.getCore().byId("d_TestPlanProductVersionUpdate");
            	oDropdownBoxVersion.setModel(oModel);
            	
            	oModel = getCycles();
            	var oDropdownBoxCycle = sap.ui.getCore().byId("d_TestPlanCycleUpdate");
            	oDropdownBoxCycle.setModel(oModel);

            	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
            	var oDropdownBoxUser = sap.ui.getCore().byId("d_TestPlanUserUpdate");
            	oDropdownBoxUser.setModel(oModel);
            	
            	var oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
            	var oDropdownBoxTestPlat = sap.ui.getCore().byId("d_TestResultsPlatUpdate");
            	oDropdownBoxTestPlat.setModel(oModel);
            	
            	var oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
            	var oDropdownBoxTestOs = sap.ui.getCore().byId("d_TestResultsOsUpdate");
            	oDropdownBoxTestOs.setModel(oModel);

            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            	
            	var oDropdownBoxTestCase = sap.ui.getCore().byId("d_TestCaseUpdate");
    			var cycle = oDropdownBoxCycle.getValue();
            	var model = oController.getCaseForCycle(cycle);
        		oDropdownBoxTestCase.setModel(model);
        		
        		var product = oDropdownBoxProduct.getValue();
        		oDropdownBoxVersion.unbindItems();
        		var filters2 = new Array();  
                var filter2 = new sap.ui.model.Filter("PRODUCT", sap.ui.model.FilterOperator.EQ, product);  
                filters2.push(filter2);  
                var oItemTemplateBranch2 = new sap.ui.core.ListItem();
        		oItemTemplateBranch2.bindProperty("text", "VERSION");
        		oDropdownBoxVersion.bindItems("/LIST", oItemTemplateBranch2, null, filters2);
        		
        		oController.updateEntry(entry);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	//delete button
    	var oDelete = new sap.ui.commons.Button("d_manualDelete",{
    		text : "Delete",
    		enabled : false,
    		tooltip : "Delete selected Manual Test",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var idx = oTable.getSelectedIndex(); //new
		            	if (idx == -1){
		            		sap.ui.commons.MessageBox.alert("Please select a row to delete!",'',"INFO");
		            		return; // new
		            	} 
		            	var oData = oTable.getContextByIndex(idx);
		            	var id = oData.getObject().TRES_ID;
		                oController.Delete(id); // new test[0].getValue()
	    			} else {
	    				oDelete.setEnabled(false);
	    			}
    			});
            }
    	});
    	oToolbar1.addItem(oDelete);
    	
    	//cheat since I can't find filereader support in ui5
    	var oFileReader = new sap.ui.core.HTML("d_manualhtml", {
    		content:
    			'<input type="file" id="d_manualSelectFile" style="display: none;" onchange="read_xlsx(event, import_log_test_results)" />',
    		preferDOM : false,
    	});
    	oToolbar1.addItem(oFileReader);
    	
    	//import button
    	var oImport = new sap.ui.commons.Button("d_manualImport",{
    		text : "Import",
    		tooltip : "Import detail test result from xlsx file",
    		press : function() {
    			document.getElementById('d_manualSelectFile').click();
    			oController.applyFilter(function(data, textStatus, jqXHR) {},function(data, textStatus, jqXHR) {} );
    		}
    	});
    	oToolbar1.addItem(oImport);

    	//export button
    	var oExport = new sap.ui.commons.Button("d_manualExport",{
    		text : "Export",
    		tooltip : "Export detail test result to xlsx file",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var oEntry = oData.getObject();
                save_xlsx("LogTestResults.xlsx", "LogTestResults", oEntry);
            }
    	});
    	oToolbar1.addItem(oExport);

    	    	
    	var oTestForm = this.createTest(oController);
    	var oCreateForm = this.createInsert(oController);
    	var oUpdateForm = this.createUpdate(oController);
        	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        layout.createRow(oCreateForm);
        layout.createRow(oUpdateForm);
        layout.createRow(oTestForm);
        
        oTable.bindRows("/LIST");
        layout.createRow(oTable);
        // Display Layout
        this.addContent(layout);
    },
    
    createTest : function(oController) {
    	var hasChange = false;
    	var oLayout = new sap.ui.commons.layout.MatrixLayout();
	       
    	var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
    		layoutFixed : true,
    	  	columns : 3,
    	  	width : '600px'});
    	  	
    	oLayoutFilter.setWidths(["20px","50px","30px"]);
		       
    	// table layout
    	var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
    		layoutFixed : true,
    	  	columns : 3,
    	  	width : '1200px'});  // table width
    	
    	oLayoutTable.setWidths(["10px","60px","30px"]);
	    
    	var oTable = new sap.ui.table.Table({
            id : "detailTestResult",
            //width : "800px",
            visibleRowCount: 10,
            //visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
            //height: "100%",
            selectionMode : sap.ui.table.SelectionMode.None
    	});
    	
    	var oControl = new sap.ui.commons.TextView({
    		text : "{TC_NAME}"});
    	oTable.addColumn(new sap.ui.table.Column({
    		label : new sap.ui.commons.Label({text : "Test Case Name"}),
    		template : oControl,
    		sortProperty : "TC_NAME",
    		filterProperty : "TC_NAME",
    		editable: false
    	}));
    	
    	var oControl = new sap.ui.commons.TextField({
    		value : "{TC_RESULT}"});
    	oTable.addColumn(new sap.ui.table.Column({
    		label : new sap.ui.commons.Label({text : "Test Result"}),
    		template : oControl,
    		sortProperty : "TC_RESULT",
    		filterProperty : "TC_RESULT",
    		editable: false
    	}));
    	
    	var oControl = new sap.ui.commons.TextField({
    		value : "{BUG_ID}"});
    	oTable.addColumn(new sap.ui.table.Column({
    		label : new sap.ui.commons.Label({text : "BUG"}),
    		template : oControl,
    		sortProperty : "BUG_ID",
    		filterProperty : "BUG_ID",
    		editable: false
    	}));
    	
    	var oControl = new sap.ui.commons.TextField({
			value : "{EXEC_USER}"});
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Test User"}),
			template : oControl,
			sortProperty : "EXEC_USER",
			filterProperty : "EXEC_USER",
			editable: false
		}));
    	
    	oTable.bindRows("/");
    	
    	oLayoutTable.createRow("Test Cases:", oTable);
    	
    	//get case list for suite
    	var oModel = null; // getODataModel("/TestSuiteCycle", "/TestReports/odata/getTestSuiteForCycleList.xsodata");
    	var oDropdownBoxTestSuite = getDropdownWithModel("TestPlanTestSuiteTest", "TS_NAME", oModel);
    	oDropdownBoxTestSuite.setWidth("300px");
    	
    	oDropdownBoxTestSuite.attachChange(function() {
    		hasChange = false;
    		var cycle = oDropdownBoxCycle.getValue();
    		var testSuite = oDropdownBoxTestSuite.getValue();
    		var assignee = oDropdownBoxAssignee.getValue();
    		var plat = oDropdownBoxPlatform.getValue();
    		var os = oDropdownBoxOS.getValue();
    		var oModel = oController.getCases(cycle, testSuite, assignee, plat, os);
    		oTable.setModel(oModel);
    	});
    	
    	//get Platform list for suite
    	var oDropdownBoxPlatform = getDropdownWithModel("d_TestPlatform", "PLAT_NAME", oModel);
    	oDropdownBoxPlatform.setWidth("300px");
    	oDropdownBoxPlatform.attachChange(function() {
    		var user = oDropdownBoxAssignee.getValue();
    		var cycle = oDropdownBoxCycle.getValue();
    		var plat = oDropdownBoxPlatform.getValue();
    		oDropdownBoxOS.unbindItems();
    		
    		var filters = new Array();
            var filter = new sap.ui.model.Filter("ASSGINEE", sap.ui.model.FilterOperator.EQ, user);  
            filters.push(filter);  
            var filterCycle = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filterCycle);  
            var filterPlat = new sap.ui.model.Filter("PLAT_NAME", sap.ui.model.FilterOperator.EQ, plat);  
            filters.push(filterPlat);  
            
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "OS_NAME");
    		oDropdownBoxOS.bindItems("/LIST", oItemTemplateBranch, null, filters);
    		oDropdownBoxOS.setPlaceholder("select...");
    	});
    	
    	//get OS list for suite
    	var oDropdownBoxOS = getDropdownWithModel("d_TestOSName", "OS_NAME", oModel);
    	oDropdownBoxOS.setWidth("300px");
    	oDropdownBoxOS.attachChange(function() {
    		var user = oDropdownBoxAssignee.getValue();
    		var cycle = oDropdownBoxCycle.getValue();
    		var plat = oDropdownBoxPlatform.getValue();
    		var os = oDropdownBoxOS.getValue();
    		oDropdownBoxTestSuite.unbindItems();
    		
    		var filters = new Array();
            var filter = new sap.ui.model.Filter("ASSGINEE", sap.ui.model.FilterOperator.EQ, user);  
            filters.push(filter);  
            var filterCycle = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filterCycle);  
            var filterPlat = new sap.ui.model.Filter("PLAT_NAME", sap.ui.model.FilterOperator.EQ, plat);  
            filters.push(filterPlat);  
            var filterOS = new sap.ui.model.Filter("OS_NAME", sap.ui.model.FilterOperator.EQ, os);  
            filters.push(filterOS);  
            
            
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "TS_NAME");
    		oDropdownBoxTestSuite.bindItems("/LIST", oItemTemplateBranch, null, filters);
    		oDropdownBoxTestSuite.setPlaceholder("select...");
    	});
    	
    	
    	// suite bind to Assignee
    	var oDropdownBoxAssignee = getDropdownWithModel("d_TestPlanAssignee", "ASSGINEE", oModel);
    	oDropdownBoxAssignee.setWidth("200px");
    	oDropdownBoxAssignee.attachChange(function() {
    		var user = oDropdownBoxAssignee.getValue();
    		var cycle = oDropdownBoxCycle.getValue();

    		oDropdownBoxPlatform.unbindItems();
    		var filters = new Array();
            var filter = new sap.ui.model.Filter("ASSGINEE", sap.ui.model.FilterOperator.EQ, user);  
            filters.push(filter);  
            var filterCycle = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filterCycle);  
            
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "PLAT_NAME");
    		oDropdownBoxPlatform.bindItems("/LIST", oItemTemplateBranch, null, filters);
    		oDropdownBoxPlatform.setPlaceholder("select...");
    		
    	});
    	
    	// drop down User bind to cycle 
    	var oDropdownBoxCycle = getDropdownWithModel2("d_TestPlanCycleTest", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("200px");
    	oDropdownBoxCycle.attachChange(function() {
    		hasChange = false;
    		var cycle = oDropdownBoxCycle.getValue();
    		//oDropdownBoxTestSuite.unbindItems();
    		oDropdownBoxAssignee.unbindItems();
    		var filters = new Array();
            var filter = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filter);  
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		//oItemTemplateBranch.bindProperty("text", "TS_NAME");
    		//oDropdownBoxTestSuite.bindItems("/LIST", oItemTemplateBranch, null, filters);
            oItemTemplateBranch.bindProperty("text", "ASSGINEE");
            oDropdownBoxAssignee.bindItems("/LIST", oItemTemplateBranch, null, filters);
            oDropdownBoxAssignee.setPlaceholder("select...");
    	});

    	// drop down for tester
    	var oDropdownBoxUser = getDropdownWithModel("d_TestPlanUserTest", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	oDropdownBoxUser.attachChange(function() {
    		hasChange = false;
			var data = oTable.getModel().getData();
			_.forEach(data, function(item){
				item.EXEC_USER = oDropdownBoxUser.getValue();
			});
			oTable.getModel().refresh();
        });
    	
    	//pass button
    	var oAllPass = new sap.ui.commons.Button("d_ManualAllPass",{
    		text : "All Pass",
    		tooltip : "Set Test case Result to all PASS",
    		press : function() {
    			hasChange = true;
    			var data = oTable.getModel().getData();
    			_.forEach(data, function(item){
    				item.TC_RESULT = "PASS";
    			});
    			oTable.getModel().refresh();
            }
    	});
    	
    	//fail button
    	var oAllFail = new sap.ui.commons.Button("d_ManualAllFail",{
    		text : "All Fail",
    		tooltip : "Set Test case Result to all FAIL",
    		press : function() {
    			hasChange = true;
    			var data = oTable.getModel().getData();
    			_.forEach(data, function(item){
    				item.TC_RESULT = "FAIL";
    			});
    			oTable.getModel().refresh();
            }
    	});
    	
    	//**********************************************************************************
    	oLayoutFilter.createRow("Cycle Name:", oDropdownBoxCycle);
    	oLayoutFilter.createRow("Assignee:", oDropdownBoxAssignee);
    	oLayoutFilter.createRow("Platform:", oDropdownBoxPlatform);
    	oLayoutFilter.createRow("OS:", oDropdownBoxOS);
    	
    	
    	oLayoutFilter.createRow("Suite Name:", oDropdownBoxTestSuite);
    	oLayoutFilter.createRow("Test User:", oDropdownBoxUser, "If different from Assignee"); 
    	oLayoutFilter.createRow("Test Result:", oAllPass, oAllFail);
    	
    	//**********************************************************************************
    	//Log All 
    	var oCreateToolBar = new sap.ui.commons.Toolbar("d_ManualToolBar");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oReport = new sap.ui.commons.Button("d_ManualReport",{
    		text : "LogAll",
    		tooltip : "Report New Manual Test Result",
    		press : function() {
    			var detailReport = sap.ui.getCore().getModel("/DetailReport");
    			if (detailReport != null) {
    				var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
    				var oTestResult = sap.ui.getCore().byId("detailTestTableID");
    				var oTestResultModel = oTestResult.getModel();
    				var model = oDropdownBoxTestSuite.getModel();
    				var batchChanges = [];
    				_.forOwn(detailReport, function(value, key) {
    					var cycle = key;
    					var suite = oDropdownBoxTestSuite.getValue();
    					var assignee = oDropdownBoxAssignee.getValue().replace(" ","%20");
    					var id = "LIST(TS_NAME='" + suite + "',ASSGINEE='" + assignee + "',CYC_TAG='" + cycle + "')";
    					var entry = model.oData[id];
    					var data = value.getData();
    			    	var filteredData = _.filter(data.d.results, function(item) {
    			    		  return item.TS_NAME === suite && item.TC_RESULT != "";
    			    		});
    			    	if (filteredData.length > 0) {
	    			    	_.forEach(filteredData, function(item) {
	    			    		var hours = new Date();
	    			    		hours.setHours(hours.getHours() - 24);
	    			    		var tmp = {};
	    			    		tmp.TC_NAME = item.TC_NAME;
	    			    		tmp.TC_RESULT = item.TC_RESULT;
	    			    		//tmp.TS_NAME = item.TS_NAME;
	    			    		tmp.CYC_NAME = item.CYC_TAG;
	    			    		tmp.PRO_NAME = entry.PRO_NAME;
	    			    		tmp.PRO_VER = entry.PRO_VER;         
	    			    		tmp.BUG_ID = item.BUG_ID
	        	                //if (tmp.BUG_ID == "") {
	        	                	//tmp.BUG_ID = -1;
	        	                //}
	    			    		//check if exec_user is being use - if not use assignee user from test plan
	    			    		var user = oDropdownBoxUser.getValue();
	    			    		if ( user == ""){
	    			    			user = oDropdownBoxAssignee.getValue(); 
	    			    		}
	        	                tmp.EXEC_USER = user; 
	        	                tmp.EXEC_TS = oDateFormat.format(hours);
	        	                tmp.START_TIME = "";
	        	                tmp.END_TIME = "";
	        	                tmp.EXEC_TIME = "";
	        	                tmp.PRO_VER_STR = "";
	        	                tmp.HOST_NAME = "";
	        	                tmp.PLAT_NAME = entry.PLAT_NAME;
	        	                tmp.OS_NAME = entry.OS_NAME;
	        	                tmp.TRES_ID = 0;
	        	                
	        	                batchChanges.push(oTestResultModel.createBatchOperation("/LIST", "POST", tmp, null));
	    	    			});
    			    	}
    				});
    				if (batchChanges.length > 0) {
    					oTestResultModel.addBatchChangeOperations(batchChanges); 
    					oTestResultModel.setUseBatch(true);
    					oTestResultModel.submitBatch(function() {
    						oTestResultModel.refresh();
    						//add store procedure called to show result in report
    						//oController.applyFilter(function(data, textStatus, jqXHR) {});
    						oController.applyFilter(cycle, data, textStatus, jqXHR);
	                    },function(){
	                        alert("Delete failed");
	                    });
    				}
    			}
    			oLayout.setVisible(false);
    			oController.enableActions();
    			oTable.setModel(null);
    			sap.ui.getCore().setModel(null, "/DetailReport");
    			
    			// add store procedure called to show result in report
    			//oController.applyFilter(function(data, textStatus, jqXHR) {});
    		}
    	});
    	oCreateToolBar.addItem(oReport);
    	
    	var oCancel1 = new sap.ui.commons.Button("d_ManualCancel3",{
    		text : "Cancel",
    		tooltip : "Dismiss New Manual Test",
    		press : function() {
    			oLayout.setVisible(false);
    			oController.enableActions();
    			oTable.setModel(null);
    			sap.ui.getCore().setModel(null, "/DetailReport");
            }
    	});
    	oCreateToolBar.addItem(oCancel1);
    	
    	oLayout.createRow(oLayoutFilter);	
    	oLayout.createRow(oLayoutTable);
    	oLayout.createRow(oCreateToolBar);
        
    	oLayout.setVisible(false);
    	
    	return oLayout;
    },
    
    //**********************************************************************************
    //create new result
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'd_layoutCreate',
            layoutFixed : false,
            width : "100%",
        });
	       
    	var oModel = null;
    	var oDropdownBoxTestStatus = getDropdownWithModel("d_TestStatusInsert", "STATUS_VAL", oModel);
    	oDropdownBoxTestStatus.setWidth("200px");
    	
    	var oDropdownBoxTestCase = getDropdownWithModel("d_TestCaseInsert", "TC_NAME", oModel);
    	oDropdownBoxTestCase.setWidth("300px");
    	
    	var oDropdownBoxProduct = getDropdownWithModel("d_TestPlanProductInsert", "PRO_NAME", oModel);
    	oDropdownBoxProduct.setWidth("200px");
    	oDropdownBoxProduct.attachChange(function() {
    		var product = oDropdownBoxProduct.getValue();
    		oDropdownBoxVersion.unbindItems();
    		var filters = new Array();  
            var filter = new sap.ui.model.Filter("PRODUCT", sap.ui.model.FilterOperator.EQ, product);  
            filters.push(filter);  
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "VERSION");
    		oDropdownBoxVersion.bindItems("/LIST", oItemTemplateBranch, null, filters);
    	});
    	
    	var oDropdownBoxVersion = getDropdownWithModel("d_TestPlanProductVersionInsert", "VERSION", oModel);
    	oDropdownBoxVersion.setWidth("100px");
    	
    	var oDropdownBoxCycle = getDropdownWithModel2("d_TestPlanCycleInsert", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("200px");
    	oDropdownBoxCycle.attachChange(function() {
    		var cycle = oDropdownBoxCycle.getValue();
    		/*
    		oDropdownBoxTestCase.unbindItems();
    		var filters = new Array();  
            var filter = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filter);  
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "TC_NAME");
    		oDropdownBoxTestCase.bindItems("/LIST", oItemTemplateBranch, null, filters);
    		*/
    		var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "TC_NAME");
    		oDropdownBoxTestCase.bindItems("/d/results", oItemTemplateBranch);
    		var model = oController.getCaseForCycle(cycle);
    		oDropdownBoxTestCase.setModel(model);
    	});
    	
    	var oDropdownBoxUser = getDropdownWithModel("d_TestPlanUserInsert", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	var oDropdownBoxTestPlat = getDropdownWithModel("d_TestResultsPlatInsert", "PLAT_NAME", oModel);
    	oDropdownBoxTestPlat.setWidth("300px");

    	var oDropdownBoxTestOs = getDropdownWithModel("d_TestResultsOsInsert", "OS_NAME", oModel);
    	oDropdownBoxTestOs.setWidth("300px");
    	
    	// var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd/MM/yyyy HH:mm"});
    	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm("d_form",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test Description"}),
			    new sap.ui.commons.Label({text:"Cycle Name"}),
			    oDropdownBoxCycle,
			    //get data from test case table
                new sap.ui.commons.Label({text:"Case Name"}),
                oDropdownBoxTestCase,
                new sap.ui.commons.Label({text:"Product Name"}),
                oDropdownBoxProduct,            
                new sap.ui.commons.Label({text:"Product Version"}),
                oDropdownBoxVersion,
                new sap.ui.commons.Label({text:"Full Version"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                
                new sap.ui.core.Title({text:"Test Data"}), 
                //get data from status table
                new sap.ui.commons.Label({text:"Result"}),
                oDropdownBoxTestStatus,
                new sap.ui.commons.Label({text:"Bug"}),
                new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                //get data from test user table
                new sap.ui.commons.Label({text:"Test User"}),
                oDropdownBoxUser,
                //new sap.ui.commons.Label({text:"Start time"}),
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                //new sap.ui.commons.Label({text:"End time"}),
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                //new sap.ui.commons.Label({text:"Execute time"}),
                //new sap.ui.commons.TextField({value:"0",width:'300px',required: true}),
                //new sap.ui.core.HTML("d_html",{content:'<input type="datetime-local" name="exeTime" data-date-format="YYYY-DD-MM hh:mm:ss"/>',preferDOM : false}),
                //new sap.ui.commons.TextField({value:"0",width:'300px',required: true, enabled: false}),
                new sap.ui.commons.Label({text:"Run time"}),
                new sap.ui.commons.TextField({value:"",tooltip:"in minutes",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Platform"}),
                oDropdownBoxTestPlat,
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"OS"}),
                oDropdownBoxTestOs,
                //new sap.ui.commons.TextField({value:"",width:'100px',required: true}),
                new sap.ui.commons.Label({text:"Host name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("d_ManualCreate");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("d_ManualInsert",{
    		text : "Insert",
    		tooltip : "Create New Manual Test",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "yyyy-MM-dd HH:mm:ss"});
                var hours = new Date();
                hours.setHours(hours.getHours() - 24);
                
                oEntry.CYC_NAME = content[2].getValue();
                oEntry.TC_NAME = content[4].getValue();
                oEntry.PRO_NAME = content[6].getValue();
                oEntry.PRO_VER = content[8].getValue();
                oEntry.PRO_VER_STR = content[10].getValue();             
                oEntry.TC_RESULT = content[13].getValue();
                oEntry.BUG_ID = content[15].getValue();
                //if (oEntry.BUG_ID == "") {
                	//oEntry.BUG_ID = -1;
                //}
                oEntry.EXEC_USER = content[17].getValue();
                oEntry.START_TIME = ""; //content[19].getValue();
                oEntry.END_TIME = ""; //content[21].getValue();
                oEntry.EXEC_TS = oDateFormat.format(hours);//content[23].getDomRef().value; // content[23].getContent();
                //skip 3
                oEntry.EXEC_TIME = content[19].getValue();
                oEntry.PLAT_NAME = content[21].getValue();
                oEntry.OS_NAME = content[23].getValue();
                oEntry.HOST_NAME = content[25].getValue();
                oEntry.TRES_ID = 0;
                
                var oTestResult = sap.ui.getCore().byId("detailTestTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                        sap.ui.commons.MessageBox.alert("Successfully inserted new row!",'',"Success");
                        // add store procedure called to show result in report
        	  	    	oController.applyFilter(oDropdownBoxCycle.getValue(), function(data, textStatus, jqXHR) {})
                    },function(){
                        //alert("Create failed");
                        sap.ui.commons.MessageBox.alert("Insert failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("d_ManualCancel",{
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
            id : 'd_layoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; // getODataModel("/TestStatus", "/TestReports/odata/getStatusList.xsodata");
    	var oDropdownBoxTestStatus = getDropdownWithModel("d_TestStatusUpdate", "STATUS_VAL", oModel);
    	oDropdownBoxTestStatus.setWidth("200px");
    	
    	var oModel = null; // getODataModel("/TestCaseForCycle", "/TestReports/odata/getTestCaseForCycleList.xsodata");
    	var oDropdownBoxTestCase = getDropdownWithModel("d_TestCaseUpdate", "TC_NAME", oModel);
    	oDropdownBoxTestCase.setWidth("300px");
    	
    	oModel = null; // getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	var oDropdownBoxProduct = getDropdownWithModel("d_TestPlanProductUpdate", "PRO_NAME", oModel);
    	oDropdownBoxProduct.setWidth("200px");
    	oDropdownBoxProduct.attachChange(function() {
    		var product = oDropdownBoxProduct.getValue();
    		oDropdownBoxVersion.unbindItems();
    		var filters = new Array();  
            var filter = new sap.ui.model.Filter("PRODUCT", sap.ui.model.FilterOperator.EQ, product);  
            filters.push(filter);  
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "VERSION");
    		oDropdownBoxVersion.bindItems("/LIST", oItemTemplateBranch, null, filters);
    	});
    	
    	oModel = null; // getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	var oDropdownBoxVersion = getDropdownWithModel("d_TestPlanProductVersionUpdate", "VERSION", oModel);
    	oDropdownBoxVersion.setWidth("100px");
    	
    	oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
    	var oDropdownBoxCycle = getDropdownWithModel2("d_TestPlanCycleUpdate", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("200px");
    	/*
    	oDropdownBoxCycle.attachChange(function() {
    		var cycle = oDropdownBoxCycle.getValue();
    		oDropdownBoxTestCase.unbindItems();
    		var filters = new Array();  
            var filter = new sap.ui.model.Filter("CYC_TAG", sap.ui.model.FilterOperator.EQ, cycle);  
            filters.push(filter);  
            var oItemTemplateBranch = new sap.ui.core.ListItem();
    		oItemTemplateBranch.bindProperty("text", "TC_NAME");
    		oDropdownBoxTestCase.bindItems("/LIST", oItemTemplateBranch, null, filters);
    	});*/
    	
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("d_TestPlanUserUpdate", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	var oModel = null; // getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	var oDropdownBoxTestPlat = getDropdownWithModel("d_TestResultsPlatUpdate", "PLAT_NAME", oModel);
    	oDropdownBoxTestPlat.setWidth("300px");
    	
    	var oModel = null; // getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	var oDropdownBoxTestOs = getDropdownWithModel("d_TestResultsOsUpdate", "OS_NAME", oModel);
    	oDropdownBoxTestOs.setWidth("300px");
    	
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm("d_form2",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
					    new sap.ui.core.Title({text:"Test Description"}),
					    new sap.ui.commons.Label({text:"Cycle Name"}),
					    new sap.ui.commons.TextField({value:"0",width:'300px', enabled: false}),
					    //oDropdownBoxCycle,
					    //get data from test case table
		                new sap.ui.commons.Label({text:"Case Name", enabled: false}),
		                new sap.ui.commons.TextField({value:"0",width:'320px', enabled: false}),
		                //oDropdownBoxTestCase,
		                new sap.ui.commons.Label({text:"Product Name", enabled: false}),
		                new sap.ui.commons.TextField({value:"0",width:'200px', enabled: false}),
		                //oDropdownBoxProduct,            
		                new sap.ui.commons.Label({text:"Product Version"}),
		                //oDropdownBoxVersion,
		                new sap.ui.commons.TextField({value:"0",width:'1000px', enabled: false}),
		                
		                new sap.ui.commons.Label({text:"Full Version"}),
		                new sap.ui.commons.TextField({value:"",width:'300px',enabled: false}),
		                
		                new sap.ui.core.Title({text:"Test Data"}), 
		                //get data from status table
		                new sap.ui.commons.Label({text:"Result"}),
		                oDropdownBoxTestStatus,
		                new sap.ui.commons.Label({text:"Bug Number"}),
		                new sap.ui.commons.TextField({value:"",width:'100px'}),
		                //get data from test user table
		                new sap.ui.commons.Label({text:"Test User"}),
		                //oDropdownBoxUser,
		                new sap.ui.commons.TextField({value:"",width:'250px',enabled: false}),
		                
		                new sap.ui.commons.Label({text:"Start time"}),
		                new sap.ui.commons.TextField({value:"0",width:'100px', enabled: false}),
		                new sap.ui.commons.Label({text:"End time"}),
		                new sap.ui.commons.TextField({value:"0",width:'100px', enabled: false}),
		                new sap.ui.commons.Label({text:"Execute time"}),
		                new sap.ui.commons.TextField({value:"0",width:'300px', enabled: false}),
		                new sap.ui.commons.Label({text:"Run time"}),
		                new sap.ui.commons.TextField({value:"0",width:'100px'}),
		                new sap.ui.commons.Label({text:"Platform"}),
		                //oDropdownBoxTestPlat,
		                new sap.ui.commons.TextField({value:"",width:'100px',enabled: false}),
		                new sap.ui.commons.Label({text:"OS"}),
		                //oDropdownBoxTestOs,
		                new sap.ui.commons.TextField({value:"",width:'100px',enabled: false}),
		                new sap.ui.commons.Label({text:"Host name"}),
		                new sap.ui.commons.TextField({value:"",width:'100px'}),
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("d_tbManualUpdate");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("d_ManualUpdate",{
    		text : "Update",
    		tooltip : "Update Manual Test",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.CYC_NAME = content[2].getValue();
                oEntry.TC_NAME = content[4].getValue();
                oEntry.PRO_NAME = content[6].getValue();
                oEntry.PRO_VER = content[8].getValue();
                oEntry.PRO_VER_STR = content[10].getValue();
                
                oEntry.TC_RESULT = content[13].getValue();
                oEntry.BUG_ID = content[15].getValue();
                //if (oEntry.BUG_ID == "") {
                	//oEntry.BUG_ID = -1;
                //}
                oEntry.EXEC_USER = content[17].getValue();
                oEntry.START_TIME = content[19].getValue();
                oEntry.END_TIME = content[21].getValue();
                oEntry.EXEC_TS = content[23].getValue();
                oEntry.EXEC_TIME = content[25].getValue();
                oEntry.PLAT_NAME = content[27].getValue();
                oEntry.OS_NAME = content[29].getValue();
                oEntry.HOST_NAME = content[31].getValue();

                var oTestResult = sap.ui.getCore().byId("detailTestTableID");
                var idx = oTestResult.getSelectedIndex(); //new
            	if (idx == -1) return; // new
            	var oData = oTestResult.getContextByIndex(idx);
            	var entry = oData.getObject();
                var id = entry.TRES_ID;
                oTestResult.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTestResult.getModel().refresh();
                	sap.ui.commons.MessageBox.alert("Updated Successfully!",'',"Success");
                    },function(){
                        //alert("Update failed");
                        sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("d_ManualCancel2",{
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
