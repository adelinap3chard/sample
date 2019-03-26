sap.ui.jsview("TestReports.forms.testcycleplan", {

    getControllerName : function() {
        return "TestReports.forms.testcycleplan";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("testCyclePlanMsg",{
			text: "To manage a test cycle, please select one of the button below to create a new test cycle, or update exiting test Cycle or remove an entry of a test cycle."
		});
        
        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testCyclePlanTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testCyclePlanCreate",{
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
    	
    	var oUpdate = new sap.ui.commons.Button("testCyclePlanUpdate",{
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
    	
    	var oDelete = new sap.ui.commons.Button("testCyclePlanDelete",{
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
		            	var id = oData.getObject().CYC_ID;
		                oController.Delete(id); // new test[0].getValue()
	    			} else {
	    				oDelete.setEnabled(false);
	    			}
    			});
            }
    	});
    	oToolbar1.addItem(oDelete);
    	
    	// add toolbar separator
    	oToolbar1.addItem(new sap.ui.commons.ToolbarSeparator());
    	
    	var oSearch = new sap.ui.commons.SearchField("testCyclePlanSearch",{
			width: "400px",
			enableListSuggest: false,
			enableClear: true,
			placeHolder: "search for a cycle",
			startSuggestion: 0,
			suggest: function(oEvent){
				oController.updateList(oEvent.getParameter("value"));
			}
		});
    	oToolbar1.addItem(oSearch);
    	
    	var optionDialog = new sap.ui.commons.Dialog({
	        id : "optionDialog",
  			modal : true,
  			width: "1250px",
			height: "700px",
			resizable: true,
			buttons: [
				new sap.ui.commons.Button({
					text: 'OK',
					//enabled: false,
					press: function (oEvent) {
						var parent = oEvent.getSource().getParent();
						var content = parent.getContent();
						optionDialog.close();
					}
				}),
				new sap.ui.commons.Button({
					text: 'Cancel',
					press: function (oEvent) {
						optionDialog.close();
					}
				})
			]
  		});
    	
    	var insertPlan = this.createInsertPlan(oController);
    	
    	var oCycleMenu = new sap.ui.commons.Menu("cycleMenu", {ariaDescription: "Cycle Menu", tooltip: "Menu containing file related actions"});
    	//Create the items and add them to the menu
    	var oCycleEdit = new sap.ui.commons.MenuItem("cycleEdit",{text: "Edit Cycle", icon: "images/new.gif", tooltip: "Edit selected cycle"});
    	oCycleMenu.addItem(oCycleEdit);
    	var oCycleDelete = new sap.ui.commons.MenuItem("cycleDelete",{text: "Delete Cycle", enabled: false,
    		select: function(oEvent) {
    			
    		}
    	});
    	oCycleMenu.addItem(oCycleDelete);
    	var oCreatePlan = new sap.ui.commons.MenuItem("createPlan",{text: "Create Plan",
            select: function(oEvent) {
            	var oModel = getTestsuites();
    	    	var oDropdownBoxTestSuite = sap.ui.getCore().byId("TestCyclePlanTestSuiteInsert");
    	    	oDropdownBoxTestSuite.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	    	var oDropdownBoxProduct = sap.ui.getCore().byId("TestCyclePlanProductInsert");
    	    	oDropdownBoxProduct.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	    	var oDropdownBoxVersion = sap.ui.getCore().byId("TestCyclePlanProductVersionInsert");
    	    	oDropdownBoxVersion.setModel(oModel);
    	    	
    	    	oModel = getCycles();
    	    	var oDropdownBoxCycle = sap.ui.getCore().byId("TestCyclePlanCycleInsert");
    	    	oDropdownBoxCycle.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("TestCyclePlanUserInsert");
    	    	oDropdownBoxUser.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	    	var oDropdownBoxPlatform = sap.ui.getCore().byId("TestCyclePlanPlatformInsert");
    	    	oDropdownBoxPlatform.setModel(oModel);

    	    	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	    	var oDropdownBoxOS = sap.ui.getCore().byId("TestCyclePlanOSInsert");
    	    	oDropdownBoxOS.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
    	    	var oDropdownBoxFeature = sap.ui.getCore().byId("TestCyclePlanFeatureInsert");
    	    	oDropdownBoxFeature.setModel(oModel);
    	    
    	    	oModel = getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
    	    	var oDropdownBoxCatalog = sap.ui.getCore().byId("TestCyclePlanCatalogInsert");
    	    	oDropdownBoxCatalog.setModel(oModel);

    	    	var node = oController.getSelectedCycleNode();
    	    	var cycle = node.getText();
    	    	oDropdownBoxCycle.setValue(cycle);
    	    	oDropdownBoxCycle.setEnabled(false);
    	    	
            	optionDialog.setTitle("Create Test Plan");
            	optionDialog.removeAllContent();
            	optionDialog.addContent(insertPlan);
            	optionDialog.open();
    		}
    	});
    	oCycleMenu.addItem(oCreatePlan);
    	
    	//split table view
        var oSplitterV = new sap.ui.commons.Splitter("splitterV2");
		oSplitterV.setSplitterOrientation(sap.ui.commons.Orientation.vertical);
		oSplitterV.setSplitterPosition("20%");
		oSplitterV.setMinSizeFirstPane("20%");
		oSplitterV.setMinSizeSecondPane("30%");
		//oSplitterV.setWidth("100%");
		oSplitterV.setHeight("750px");	
		
		//left
		var oTree = new sap.ui.commons.Tree("testCyclePlanTree", {
			showHeader: false,
			select : function(e) {
				var param = e.getParameters();
				var node = param.node;
				var parent = node.getParent();
				if (parent.sId == "testCyclePlanTree") {
					var cycleName = node.getText();
					oController.showCycle(cycleName);
				}
				else {
					var cycleName = parent.getText();
					var suiteName = node.getText();
					oController.showSuite(cycleName, suiteName);
				}
			},
		});
	
		
		var oLayoutLeft = new sap.ui.commons.layout.MatrixLayout({
			layoutFixed : false,
	    	width: "100%",
	    	height: "100%"
	    });
		
		//oLayoutLeft.createRow(new sap.ui.commons.Toolbar({items: [oSearch]}));
		oLayoutLeft.createRow(oTree);
		
		//right
		// table layout
	    var oLayoutTable = new sap.ui.commons.layout.MatrixLayout("testCyclePlanLayoutForm", {
	    	width: "100%",  // table width
	    	height: "100%"
	    });
	    
		var oTable = this.createCyclePlanForm(oController);
		var oTable = this.createCyclePlanSuiteForm(oController);
		//oLayoutTable.createRow(oTable);
		
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
    
    createCyclePlanForm: function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanCycleLayout',
            layoutFixed : true,
            width : "100%",
        });
	    
    	var oCycleForm = new sap.ui.layout.form.SimpleForm("testCyclePlanCycleForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: false,
			content:[
			    new sap.ui.core.Title({text:"Test cycle information: "}),
			    new sap.ui.commons.Label({text:"Cycle Tag:"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"Cycle Description:"}),
                new sap.ui.commons.TextView({text:"",width:'800px'}),
                new sap.ui.commons.Label({text:"Project Name:"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"Contractor:"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"Start Date:"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"End Date:"}),
                new sap.ui.commons.TextView({text:"",width:'300px'})
			]
		});
    	layout.createRow(oCycleForm);
    	
    	return layout;
    },
    
    createCyclePlanSuiteForm: function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanSuiteLayout',
            layoutFixed : true,
            width : "100%",
        });
    	
    	var oCycleForm = new sap.ui.layout.form.SimpleForm("testCyclePlanSuiteForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: false,
			content:[
			    new sap.ui.core.Title({text:"Test plan information: "}),
			    new sap.ui.commons.Label({text:"Test Suite"}),
			    new sap.ui.commons.TextView({text:"",width:'500px'}),
                new sap.ui.commons.Label({text:"Product Name"}),
                new sap.ui.commons.TextView({text:"",width:'200px'}),
                new sap.ui.commons.Label({text:"Product Version"}),
                new sap.ui.commons.TextView({text:"",width:'100px'}),
                new sap.ui.commons.Label({text:"Platform"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"OS"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"ENV"}),
                new sap.ui.commons.TextView({text:"",width:'500px'}),
                new sap.ui.core.Title({text:"Test plan assignment: "}),
                new sap.ui.commons.Label({text:"Cycle"}),
                new sap.ui.commons.TextView({text:"",width:'400px'}),
                new sap.ui.commons.Label({text:"Assignee"}),
                new sap.ui.commons.TextView({text:"",width:'200px'}),
                new sap.ui.commons.Label({text:"Feature"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"Catalog"}),
                new sap.ui.commons.TextView({text:"",width:'300px'})
			]
		});
    	
    	/*
    	var oEmptyForm = new sap.ui.layout.form.SimpleForm("testCyclePlanSuiteEmptyForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: false,
			content:[
			    new sap.ui.core.Title({text:"External application information: "})
			]
		});
		*/
    	
    	var oExAppForm = this.createExApp(oController, ""); 
    	
    	layout.createRow(oCycleForm);
    	// layout.createRow(oEmptyForm);
    	layout.createRow(oExAppForm);
    	
    	return layout;
    },
    
    createExApp : function(oController, action) {
    	 var layout = new sap.ui.commons.layout.MatrixLayout({
             id : 'testCyclePlanLayoutExApp' + action,
             layoutFixed : false,
             //width : '1000px',
         });
    	 
    	 var oTable = new sap.ui.table.Table({
             id : "testCyclePlanExApp" + action, 
             title: "External application information:",
             //width : "100%",
             visibleRowCount: 10,
             //visibleRowCountMode: sap.ui.table.VisibleRowCountMode.Auto,
             //height: "100%",
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
         
         var oControl = new sap.ui.commons.TextView({
    			text : "{ENV}"});
            oTable.addColumn(new sap.ui.table.Column({
                label : new sap.ui.commons.Label({text : "ENV"}),
                template : oControl,
                sortProperty : "ENV",
                filterProperty : "ENV",
                editable: false
            }));

         var oControl = new sap.ui.commons.TextView({
  			text : "{SOURCE}"});
          oTable.addColumn(new sap.ui.table.Column({
              label : new sap.ui.commons.Label({text : "Source"}),
              template : oControl,
              sortProperty : "SOURCE",
              filterProperty : "SOURCE",
              editable: false
          }));
         
         oTable.bindRows("/");
         layout.createRow(oTable);
         
         return layout;
         
    },
    
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

    	//var oModel = oController.getDropdown("TestSuiteTestType","TestType", "TP_NAME", null).getModel();
    	//var oDropdownBoxTestType = oController.getDropdownWithModel("TestSuiteTestTypeInsert", "TP_NAME", oModel);
    	//oDropdownBoxTestType.setWidth("100px");
    	var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
    	var oDatePicker1 = new sap.ui.commons.DatePicker('tcp_date1',{width:'200px'});
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
		var oDatePicker2 = new sap.ui.commons.DatePicker('tcp_date2',{width:'200px'});
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
    	var oDropdownBoxUser = getDropdownWithModel("TestCyclePLanUserInsert", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	//Create Form
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testCyclePlanCreateForm",
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
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testCyclePlantb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("testCyclePLanInsert",{
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
                oEntry.CYC_ID = 0;
                var oTestResult = sap.ui.getCore().byId("testCycleTableID");
                oTestResult.getModel().create('/LIST', oEntry, null, function(){
                        oTestResult.getModel().refresh();
                        sap.ui.commons.MessageBox.alert("Insert successfully!",'',"Success");
                    },function(){
                    	sap.ui.commons.MessageBox.alert("Insert failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oCreateToolBar.addItem(oInsert);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCyclePlanCancel",{
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
            id : 'testCyclePlanLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	//var oModel = oController.getDropdown("TestSuiteTestType","TestType", "TP_NAME", null).getModel();
    	//var oDropdownBoxTestType = oController.getDropdownWithModel("TestSuiteTestTypeUpdate", "TP_NAME", oModel);
    	//oDropdownBoxTestType.setWidth("100px");
    	
    	var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
    	var oDatePicker1 = new sap.ui.commons.DatePicker('tcp_date3',{width:'200px'} );
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
		var oDatePicker2 = new sap.ui.commons.DatePicker('tcp_date4',{width:'200px'});
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
    	var oDropdownBoxUser = getDropdownWithModel("TestCyclePlanUserUpdate", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
		
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testCyclePlanUpdateForm",
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
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testCyclePlantb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testCyclePlanUpdate2",{
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
                var id = entry.CYC_ID;
                oTable.getModel().update("/LIST(" + id + ")", oEntry, null, function(){
                	oTable.getModel().refresh();
                	sap.ui.commons.MessageBox.alert("Updated successfully!",'',"Success");
                    },function(){
                    	sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testCyclePlanCancel2",{
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

    //****************************************************************************
    //Create plan pop up page
    createInsertPlan : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanLayoutCreate2',
            layoutFixed : false,
            width : "100%",
        });
	    var envDetailButton = new sap.ui.commons.Button("testCyclePlanEnvDetails",{
    		icon: "sap-icon://create",
    		tooltip : "Add environment details Application",
    		width : "30px",
    		press : function() {
    			optionDialog.open();
            }
    	});
    	
    	var oModel = null; // getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
    	var oDropdownBoxTestSuite = getDropdownWithModel2("TestCyclePlanTestSuiteInsert", "TS_NAME", oModel);
    	oDropdownBoxTestSuite.setWidth("400px");
    	
    	oModel = null; // getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	var oDropdownBoxProduct = getDropdownWithModel("TestCyclePlanProductInsert", "PRO_NAME", oModel);
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
    	var oDropdownBoxVersion = getDropdownWithModel("TestCyclePlanProductVersionInsert", "VERSION", oModel);
    	oDropdownBoxVersion.setWidth("100px");
    	
    	//oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	//var oDropdownBoxProduct = getDropdownWithModel("TestPlanProductInsert", "PRO_NAME", oModel);
    	//oDropdownBoxProduct.setWidth("300px");
    	
    	//oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	//var oDropdownBoxVersion = getDropdownWithModel("TestPlanProductVersionInsert", "VERSION", oModel);
    	//oDropdownBoxVersion.setWidth("200px");
    	
    	oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
    	var oDropdownBoxCycle = getDropdownWithModel2("TestCyclePlanCycleInsert", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("400px");
    	
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestCyclePlanUserInsert", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	oModel = null; // getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	var oDropdownBoxPlatform = getDropdownWithModel("TestCyclePlanPlatformInsert", "PLAT_NAME", oModel);
    	oDropdownBoxPlatform.setWidth("300px");
    	
    	oModel = null; // getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	var oDropdownBoxOS = getDropdownWithModel("TestCyclePlanOSInsert", "OS_NAME", oModel);
    	oDropdownBoxOS.setWidth("300px");
    	
    	oModel = null; // getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
    	var oDropdownBoxFeature = getDropdownWithModel("TestCyclePlanFeatureInsert", "TSF_NAME", oModel);
    	oDropdownBoxFeature.setWidth("300px");
    
    	oModel = null; // getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
    	var oDropdownBoxCatalog = getDropdownWithModel("TestCyclePlanCatalogInsert", "TSC_NAME", oModel);
    	oDropdownBoxCatalog.setWidth("300px");
    	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testCyclePlanCreateForm2",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: true,
			content:[
			    new sap.ui.core.Title({text:"Test plan registration: "}),
			    new sap.ui.commons.Label({text:"Test Suite"}),
			    oDropdownBoxTestSuite,
                new sap.ui.commons.Label({text:"Product Name"}),
                oDropdownBoxProduct,
                new sap.ui.commons.Label({text:"Product Version"}),
                oDropdownBoxVersion,
                new sap.ui.commons.Label({text:"Platform"}),
                oDropdownBoxPlatform,
                new sap.ui.commons.Label({text:"OS"}),
                oDropdownBoxOS,
                new sap.ui.commons.Label({text:"ENV"}),
                new sap.ui.commons.TextField({value:"",required: true}),
                envDetailButton,
                new sap.ui.core.Title({text:"Test plan assignment: "}),
                new sap.ui.commons.Label({text:"Cycle"}),
                oDropdownBoxCycle,
                new sap.ui.commons.Label({text:"Assignee"}),
                oDropdownBoxUser,
                new sap.ui.commons.Label({text:"Feature"}),
                oDropdownBoxFeature,
                new sap.ui.commons.Label({text:"Catalog"}),
                oDropdownBoxCatalog
			]
		});
    	
    	var oExAppForm = this.createExApp(oController, "Insert"); 
    	
    	layout.createRow(oCreateForm);
    	
    	var exAppcontent = this.createInsertExApp(oController);
    	var optionDialog = new sap.ui.commons.Dialog({
	        id : "optionDialog2",
  			modal : true,
  			width: "700px",
			height: "400px",
			resizable: true,
			buttons: [
				new sap.ui.commons.Button({
					text: 'OK',
					//enabled: false,
					press: function (oEvent) {
						var parent = oEvent.getSource().getParent();
						var content = parent.getContent();
						optionDialog.close();
					}
				}),
				new sap.ui.commons.Button({
					text: 'Cancel',
					press: function (oEvent) {
						optionDialog.close();
					}
				})
			],
    		content: [exAppcontent]
  		});
    	
    	var bLayout = new sap.ui.commons.layout.MatrixLayout({width:"150px"});
    	
	    var addButton = new sap.ui.commons.Button("testCyclePlanAddExApp",{
    		text : "Add External App",
    		icon: "sap-icon://create",
    		tooltip : "Add External Application",
    		press : function() {
    			var oModel = getODataModel("/TestExApp", "/TestReports/odata/getTestExAppList.xsodata");
    	    	var oDropdownBoxExApp = sap.ui.getCore().byId("TestCyclePlanExAppInsert");
    	    	oDropdownBoxExApp.setModel(oModel);
    			optionDialog.open();
            }
    	});
	    var oCell = new sap.ui.commons.layout.MatrixLayoutCell({vAlign: sap.ui.commons.layout.VAlign.Middle});
	    oCell.addContent(addButton);
	    bLayout.createRow(oCell);
	    
	    var deleteButton = new sap.ui.commons.Button("testCyclePlanDeleteExApp",{
    		text : "Delete External App",
    		icon: "sap-icon://delete",
    		tooltip : "Add External Application",
    		press : function() {
    			
            }
    	});
	    bLayout.createRow(deleteButton);
	    
    	
    	var hLayout = new sap.ui.commons.layout.HorizontalLayout();
    	hLayout.addContent(bLayout);
    	hLayout.addContent(oExAppForm);
    	layout.createRow(hLayout);
    	
    	return layout;
    },
    
    //****************************************************************************
    //insert external app pop up 
    createInsertExApp : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanLayoutCreate3',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; 
    	var oDropdownBoxExApp = getDropdownWithModel("TestCyclePlanExAppInsert", "APP_NAME", oModel);
    	oDropdownBoxExApp.setWidth("400px");
    	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
			"testCyclePlanCreateForm3",
			{
				layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				width : "100%",
				editable: true,
				content:[
				    new sap.ui.core.Title({text:"External Application Information: "}),
				    new sap.ui.commons.Label({text:"External App"}),
				    oDropdownBoxExApp,
	                new sap.ui.commons.Label({text:"ENV"}),
	                new sap.ui.commons.TextField({value:"",width:'400px',required: true})
				]
			});
    	layout.createRow(oCreateForm);
    	return layout;
    	},
    	
    	//****************************************************************************
        //insert env detail pop up   	
    	createInsertExApp : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanLayoutCreate4',
            layoutFixed : false,
            width : "100%",
        });
    	
		
		var oModel = getODataModel("/TestExApp", "/TestReports/odata/getTestEnvDetailList.xsodata");
	    var oEnvDetailAutoC = new sap.ui.commons.AutoComplete("detailbox",{items:{path:"/LIST",template:new sap.ui.core.ListItem({text: "{DETAIL_NAME}"})}});
	    oEnvDetailAutoC.setModel(oModel)
	    
	    var oEnvDetailAutoC1 = new sap.ui.commons.AutoComplete("detailbox1",{items:{path:"/LIST",template:new sap.ui.core.ListItem({text: "{DETAIL_NAME}"})}});
	    oEnvDetailAutoC1.setModel(oModel)

	    var oEnvDetailAutoC2 = new sap.ui.commons.AutoComplete("detailbox2",{items:{path:"/LIST",template:new sap.ui.core.ListItem({text: "{DETAIL_NAME}"})}});
	    oEnvDetailAutoC2.setModel(oModel)

	    var oEnvDetailAutoC3 = new sap.ui.commons.AutoComplete("detailbox3",{items:{path:"/LIST",template:new sap.ui.core.ListItem({text: "{DETAIL_NAME}"})}});
	    oEnvDetailAutoC3.setModel(oModel)



    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
			"testCyclePlanCreateForm4",
			{
				layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
				width : "100%",
				editable: true,
				content:[
				    new sap.ui.core.Title({text:"Environment detail information: "}),
				    new sap.ui.commons.Label({text:"Select ENV 1: ",width:'500px'}),
				    oEnvDetailAutoC,
				    new sap.ui.commons.Label({text:"Select ENV 2: ",width:'500px'}),
				    oEnvDetailAutoC1,
				    new sap.ui.commons.Label({text:"Select ENV 3: ",width:'500px'}),
				    oEnvDetailAutoC2,
				    new sap.ui.commons.Label({text:"Select ENV 4: ",width:'500px'}),
				    oEnvDetailAutoC3
				]
			});
    	layout.createRow(oCreateForm);
    	return layout;
    	},    	
    
});
