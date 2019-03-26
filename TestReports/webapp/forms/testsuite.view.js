sap.ui.jsview("TestReports.forms.testsuite", {

    getControllerName : function() {
        return "TestReports.forms.testsuite";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testsuiteMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        // message:
        oViewMessage = new sap.ui.commons.TextView("testSuiteMsg",{
			text: "To manage a test suite, please select one of the button below to create a new test suite, or update exiting test suite or remove an entry of a test suite."
		});
        
        // search message:
        oSearchMsg = new sap.ui.commons.TextView("TestSuiteSearchMsg",{
			text: "For better view use Search engine to find a test suite: "
		});
        
        // tool bar 1: menu 
        var oToolbar1 = new sap.ui.commons.Toolbar("testSuiteTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	//left menubutton
    	var oCreate = new sap.ui.commons.Button("testSuiteCreate",{
    		text: "Create",
    		//style: sap.ui.commons.ButtonStyle.Accept,
    		style: sap.ui.commons.ButtonStyle.Emph,
    		icon: "sap-icon://create",
    		tooltip: "Create New Test Suite",
    		press: function() {
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});

    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testSuiteUpdate",{
    		text : "Update",
    		icon: "sap-icon://edit",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Update selected Test Suite, Please select a row from Suite table then click update button to modify.",
    		press : function() {
    			var item = oList.getSelectedItem();
				if (item == null) {
					sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
				} 
				var context = item.getBindingContext();
				var entry = context.getProperty(null, context);
				oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);   
    	
    	var oFileReader = new sap.ui.core.HTML("testSuitehtml", {
    		content:
    			'<input type="file" id="testSuiteSelectFile" style="display: none;" onchange="read_xlsx(event, import_testsuites)" />',
    		preferDOM : false,
    	});
    	oToolbar1.addItem(oFileReader);
    	
    	var oImport = new sap.ui.commons.Button("testSuiteImport",{
    		text : "Import",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		//icon: "sap-icon://folder",
    		icon: "sap-icon://download",
    		tooltip : "Import test suites from xlsx file",
    		press : function() {
    			document.getElementById('testSuiteSelectFile').click();
    			oList.setModel(refreshTestsuites());
    		}
    	});
    	oToolbar1.addItem(oImport);
    	  	
    	// add toolbar separator
    	oToolbar1.addItem(new sap.ui.commons.ToolbarSeparator());
    	
    	var oSearch = new sap.ui.commons.SearchField("testSuiteSearch",{
			width: "400px",
			enableListSuggest: false,
			enableClear: true,
			placeHolder: "search for a suite",
			startSuggestion: 0,
			suggest: function(oEvent){
				oController.updateList(oEvent.getParameter("value"));
			}
		});
    	oToolbar1.addItem(oSearch);
    	
    	// add toolbar separator
    	oToolbar1.addItem(new sap.ui.commons.ToolbarSeparator());
    	
    	//right menubuttons
       	var oDelete = new sap.ui.commons.Button("testSuiteDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Delete selected Test Suite, select a test suite then click Delete button",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			//var idx = oTable.getSelectedIndices(); 
		    			var item = oList.getSelectedItem();
						if (item == null){
							sap.ui.commons.MessageBox.alert("Please select a row to Delete!",'',"INFO");
		            		return; // new
						}
		                oController.Delete(item.getText()); // new test[0].getValue()
		    		} else {
						oDelete.setEnabled(false);
						oRemoveCase.setEnabled(false);
					}
				});
            }
    	});
    	oToolbar1.addRightItem(oDelete);
    	
    	var oRemoveCase = new sap.ui.commons.Button("testSuiteRemoveCase",{
    		text : "Remove case",
    		icon: "sap-icon://action",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Remove Test cases from selected Test Suite, select a case from case table and click on Remote Testcases",
    		press : function() {
    			checkUser(function(isAdmin) {
	    			if (isAdmin) {
		    			var oTable = sap.ui.getCore().byId("testSuiteCaseTableID");
		            	var indices = oTable.getSelectedIndices();
		            	if (indices.length == 0) {
		            		sap.ui.commons.MessageBox.alert("Please select a case to remove case!",'',"INFO");
		            		return; // new
		            	}
		    			var oDeleteDialog = new sap.ui.commons.Dialog();
		    	        oDeleteDialog.setTitle("Remove Test case");
		    	        var oText = new sap.ui.commons.TextView({text: "Are you sure to remove test case?"});
		    	        oDeleteDialog.addContent(oText);
		    	        oDeleteDialog.addButton(
		    	            new sap.ui.commons.Button({
		    	                text: "Confirm", 
		    	                press:function(){ 
		    	                	var oTable = sap.ui.getCore().byId("testSuiteCaseTableID");
		    	                	var indices = oTable.getSelectedIndices();
		    	                	if (indices.length == 0) {
		    	                		sap.ui.commons.MessageBox.alert("Please select a case to delete!",'',"INFO");
		    	                		return; // new
		    	                	}
		    	                	var deleteFail = false;
		    	                	var batchChanges = [];
		    	                	for(var i = 0; i != indices.length; ++i) {
		    	                		var oData = oTable.getContextByIndex(indices[i]);
		    	                		var entry = oData.getObject();
		    	                        batchChanges.push(oTable.getModel().createBatchOperation("/LIST(TS_ID=" + entry.TS_ID + ",TC_ID=" + entry.TC_ID + "L)", "DELETE", null, null));
		    	                	}
		    	                	oTable.getModel().addBatchChangeOperations(batchChanges); 
		    	                	oTable.getModel().setUseBatch(true);
		    	                	oTable.getModel().submitBatch(function() {
		    	                		oTable.getModel().refresh();
		    	                		sap.ui.commons.MessageBox.alert("Case removed from suite successfully",'',"Success");
		    	                    },function(){
		    	                    	//alert("Delete failed");
		    	                    	sap.ui.commons.MessageBox.alert("Case remove failed! Please contact admin",'',"Failure");
		    	                    });
			                        oDeleteDialog.close();
		    	                }
		    	            })
		    	        );
		    	        oDeleteDialog.open();
	    			} else {
	    				oDelete.setEnabled(false);
	    				oRemoveCase.setEnabled(false);
	    			}
    			});
            }
    	});
    	oToolbar1.addRightItem(oRemoveCase);
    	    	
    	var oExport = new sap.ui.commons.Button("testSuiteExport",{
    		text : "Export",
    		//icon: "sap-icon://save",
    		icon: "sap-icon://upload",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Export test suites and cases to xlsx file",
    		press : function() {
    			var item = oList.getSelectedItem();
				if (item == null) return;
				layout.setBusy(true);
				var context = item.getBindingContext();
				var oEntry = context.getProperty(null, context);
				var wb = new Workbook();
			    var ws = gen_xls_sheet(oEntry);
			    wb.SheetNames.push("TestSuites");
			    wb.Sheets["TestSuites"] = ws;
			    
			    //filter test case base on test suite ID
				var oModel = getODataModel("/TestSuiteCase", "/TestReports/odata/getTestSuiteCaseList.xsodata");
				var filteredData = _.filter(oModel.oData, function(item) {
					return item.TS_ID === oEntry.TS_ID;
				});
				filteredData = _.map(filteredData, _.clone);
				_.transform(filteredData, function(memo, val, idx) {
					delete val.TS_ID;
				    // memo[idx] = val;
				});
				//console.info(filteredData);
			    ws = gen_xls_sheet_for_entries(filteredData);
			    
			    wb.SheetNames.push(oEntry.TS_NAME);
			    wb.Sheets[oEntry.TS_NAME] = ws;
                save_workbook("TestSuites.xlsx", wb);
                layout.setBusy(false);
            }
    	});
    	oToolbar1.addRightItem(oExport);
    	   	
    	
    	var oExportSuite = new sap.ui.commons.Button("testSuiteOnlyExport",{
    		text : "Export Suites List",
    		icon: "sap-icon://documents",
    		style: sap.ui.commons.ButtonStyle.Emph,
    		tooltip : "Export all test suites only to xlsx file",
    		press : function() {
    			layout.setBusy(true);
    			
    			var model = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
    			var data = oModel.getData()['d']['results'];
    			var suites = _.filter(data, function(item) {
					return true;
				}); 

    			var wb = new Workbook();
			    var ws = gen_xls_sheet_for_entries(suites);
			    wb.SheetNames.push("TestSuites");
			    wb.Sheets["TestSuites"] = ws;
			    
			    /*
			    var oData = model.oData;
			    var oModel = getODataModel("/TestSuiteCase", "/TestReports/odata/getTestSuiteCaseList.xsodata");
			    Object.keys(oData).forEach(function (key) {
				    var oEntry = oData[key];
				    //filter test case base on test suite ID
					
					var filteredData = _.filter(oModel.oData, function(item) {
						return item.TS_ID === oEntry.TS_ID;
					}); 
					//console.info(filteredData);
			    	var ws = gen_xls_sheet_for_entries(filteredData);
			    
			    	wb.SheetNames.push(oEntry.TS_NAME);
			    	wb.Sheets[oEntry.TS_NAME] = ws;
				});
				*/
			    
			    save_workbook("TestSuites.xlsx", wb);
                layout.setBusy(false);
            }
    	});
    	oToolbar1.addRightItem(oExportSuite);
    	
    	//split table view
        var oSplitterV = new sap.ui.commons.Splitter("splitterV");
		oSplitterV.setSplitterOrientation(sap.ui.commons.Orientation.vertical);
		oSplitterV.setSplitterPosition("20%");
		oSplitterV.setMinSizeFirstPane("20%");
		oSplitterV.setMinSizeSecondPane("30%");
		//oSplitterV.setWidth("100%");
		oSplitterV.setHeight("750px");	
		
		var oLayoutList = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
	    	width: "100%",
	    	height: "100%"
	    });
		
		//left
		var oList = new sap.ui.commons.ListBox("testSuiteTableID", {
			select : function(e) {
				var item = oList.getSelectedItem();
				if (item == null) return;
				var context = item.getBindingContext();
				var entry = context.getProperty(null, context);
				oController.updateEntry(entry);
			}
		});
		var itemTemplate = new sap.ui.core.ListItem({key:"{TS_ID}", text:"{TS_NAME}", description:"TS_DESC"})
		oList.bindAggregation("items", "/LIST", itemTemplate);
		oList.setWidth("100%");
		oList.setHeight("100%");
		oLayoutList.createRow(oList);
		
		var oLayoutLeft = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
	    	width: "100%",
	    	height: "100%"
	    });
		
		//oLayoutLeft.createRow(new sap.ui.commons.Toolbar({items: [oSearch]}));
		oLayoutLeft.createRow(oLayoutList);
		
		//right
		// table layout
	    var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	width: "100%",  // table width
	    	height: "100%"
	    });
	    
		var oTable = this.createTestCaseTable(oController);
		// oLayoutTable.createRow(new sap.ui.commons.Label({text:"Test Cases"}));
		oLayoutTable.createRow(oTable);
			
		//display list
		oSplitterV.addFirstPaneContent(oLayoutLeft);
		oSplitterV.addSecondPaneContent(oLayoutTable);    
        		
    	var oCreateForm = this.createInsert(oController);
    	var oUpdateForm = this.createUpdate(oController);
    	    	    	       	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        layout.createRow(oCreateForm);
        layout.createRow(oUpdateForm);
        layout.createRow(oSplitterV);
      
        // Display Layout
        this.addContent(layout);
    },
    
    //create table columns for test cases
    createTestCaseTable: function(oController) {
		    var oTable = new sap.ui.table.Table({
		        inset : true,
		    	id : "testSuiteCaseTableID",
		        includeItemSelection : false,
		        //width : "100%",
		        //height: "750px",
		        visibleRowCount: 25,
		        //visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto
		    });
		    
			var oControl = new sap.ui.commons.TextView({
				text : "{TC_NAME}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Case name"}),
		        template : oControl,
		        sortProperty : "TC_NAME",
		        filterProperty : "TC_NAME",
		        editable: false
		    }));
		    
		    var oControl = new sap.ui.commons.TextView({
				text : "{TFILE_CASE_NAME}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Case Number"}),
		        template : oControl,
		        sortProperty : "TFILE_CASE_NAME",
		        editable: false
		    }));
		    
	        /*
	         * changed file file from text to link 
		    var oControl = new sap.ui.commons.TextView({
				text : "{TFILE_NAME}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "File Path"}),
		        template : oControl,
		        sortProperty : "TFILE_NAME",
		        editable: false
		    }));
		    */
		    
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "File Path"}),
	            sortProperty : "TFILE_NAME",
	            filterProperty : "TFILE_NAME",
	            editable: false,
	            template: new sap.ui.commons.Link({
		    		   text : { 
		    			   path : 'TFILE_NAME'
		    		   },
		    		   press : function(value){
		    			   var text = this.getText();
		    			   var bugs = text.split(',');
		    			   _.forEach(bugs, function(filepath) {
		    				   if (filepath != undefined && filepath != '') {
		    					   window.open(filepath, '_blank');
		    				   }
		    			   });
	    			   }
	            }),	   
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
		        editable: false
		    }));   
		    /*
		    var oControl = new sap.ui.commons.TextView({
				text : "{TC_COMMENT}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Comments"}),
		        template : oControl,
		        sortProperty : "TC_COMMENT",
		        editable: false
		    }));
		    */
		    var oControl = new sap.ui.commons.TextView({
				text : "{TP_NAME}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Test type"}),
		        template : oControl,
		        sortProperty : "TP_NAME",
		        editable: false
		    }));
		    
		    var oControl = new sap.ui.commons.TextView({
				text : "{B_NAME}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Branch"}),
		        template : oControl,
		        sortProperty : "B_NAME",
		        editable: false
		    }));
		    /*
		    var oControl = new sap.ui.commons.TextView({
				text : "{PROJECT}"});
		    oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Project link"}),
		        template : oControl,
		        sortProperty : "PROJECT",
		        editable: false
		    }));
		    */
		    
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Jira Link"}),
	            sortProperty : "PROJECT",
	            filterProperty : "PROJECT",
	            editable: false,
	            template: new sap.ui.commons.Link({
		    		   text : { 
		    			   path : 'PROJECT'
		    		   },
		    		   press : function(value){
		    			   var text = this.getText();
		    			   var bugs = text.split(',');
		    			   _.forEach(bugs, function(projectLink) {
		    				   if (projectLink != undefined && projectLink != '') {
		    					   window.open(projectLink, '_blank');
		    				   }
		    			   });
	    			   }
	            }),	   
	        }));
		    
        return oTable;
    },
    
    // Create New suite forms
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testSuiteLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testSuiteCreateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.commons.Label({text:"Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Description"}),
                new sap.ui.commons.TextField({value:"",width:'600px',required: true}),
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testSuitetb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("testSuiteInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		style: sap.ui.commons.ButtonStyle.Accept,
    		tooltip : "Create New Test Suite",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.TS_NAME = content[1].getValue();
                oEntry.TS_DESC = content[3].getValue();
                oEntry.PRO_NAME = sap.ui.getCore().byId("ProductFilter").getValue();
                oEntry.TS_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testSuiteTableID");
                var model = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
                model.create('/LIST', oEntry, null, function(){
    					oTestResult.setModel(oController.refreshTestsuites());
                        sap.ui.commons.MessageBox.alert("Inserted successfully",'',"Success");
                    },function(){
                        console.info("Create failed");
                        sap.ui.commons.MessageBox.alert("Insert failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testSuiteCancel",{
    		text : "Cancel",
    		icon: "sap-icon://decline",
    		style: sap.ui.commons.ButtonStyle.Reject,
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
    
    // create update form
    createUpdate : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testSuiteLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testSuiteUpdateForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.commons.Label({text:"Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Description"}),
                new sap.ui.commons.TextField({value:"",width:'600px',required: true}),
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testSuitetb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testSuiteUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		style: sap.ui.commons.ButtonStyle.Accept,
    		tooltip : "Update Test Suite",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.TS_NAME = content[1].getValue();
                oEntry.TS_DESC = content[3].getValue();
                oEntry.NEW_TS_NAME = content[1].getValue(); 
                
                var oList = sap.ui.getCore().byId("testSuiteTableID");
                var item = oList.getSelectedItem();
				if (item == null) return;
				var context = item.getBindingContext();
				var entry = context.getProperty(null, context);
				oEntry.TS_ID = entry.TS_ID;
				oEntry.PRO_NAME = '';
				var product = "null";
				if (entry.PRO_NAME != null) {
					product = "'" + entry.PRO_NAME + "'";
					oEntry.PRO_NAME = entry.PRO_NAME;
				}
				var id = "LIST(TS_NAME='" + entry.TS_NAME + "',PRO_NAME=" + product + ")";
				var model = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
                model.update(id, oEntry, null, function(){
                	oList.setModel(oController.refreshTestsuites());
                	sap.ui.commons.MessageBox.alert("Updated successfully",'',"Success");
                    },function(){
                        console.info("Update failed");
                        sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testSuiteCancel2",{
    		text : "Cancel",
    		icon: "sap-icon://decline",
    		style: sap.ui.commons.ButtonStyle.Reject,
    		tooltip : "Dismiss Update Test Suite",
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

});
