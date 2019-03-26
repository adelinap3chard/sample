sap.ui.jsview("TestReports.forms.testproductsuite", {

    getControllerName : function() {
        return "TestReports.forms.testproductsuite";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testProductSuiteMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
            	
    	var optionDialog = new sap.ui.commons.Dialog({
	        id : "productSuiteOptionDialog",
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
    	
    	var insertSuite = this.createInsertSuite(oController);
    	
    	var oProductMenu = new sap.ui.commons.Menu("productMenu", {ariaDescription: "Product Menu", tooltip: "Menu containing file related actions"});
    	//Create the items and add them to the menu
    	var oProductEdit = new sap.ui.commons.MenuItem("productEdit",{text: "Edit Product", icon: "sap-icon://edit", tooltip: "Edit selected Product"});
    	oProductMenu.addItem(oProductEdit);
    	var oProductDelete = new sap.ui.commons.MenuItem("productDelete",{text: "Delete Product", enabled: false,
    		select: function(oEvent) {
    			
    		}
    	});
    	oProductMenu.addItem(oProductDelete);
    	var oProductInsertSuite = new sap.ui.commons.MenuItem("insertSuite",{text: "Insert Test Suites",
            select: function(oEvent) {
    	    	var node = oController.getSelectedProductNode();
    	    	var cycle = node.getText();
    	    	oDropdownBoxCycle.setValue(cycle);
    	    	oDropdownBoxCycle.setEnabled(false);
    	    	
            	optionDialog.setTitle("Insert Test Suites");
            	optionDialog.removeAllContent();
            	optionDialog.addContent(insertSuite);
            	optionDialog.open();
    		}
    	});
    	oProductMenu.addItem(oProductInsertSuite);
    	
    	//split table view
        var oSplitterV = new sap.ui.commons.Splitter("splitterProductSuiteV2");
		oSplitterV.setSplitterOrientation(sap.ui.commons.Orientation.vertical);
		oSplitterV.setSplitterPosition("20%");
		oSplitterV.setMinSizeFirstPane("20%");
		oSplitterV.setMinSizeSecondPane("30%");
		//oSplitterV.setWidth("100%");
		oSplitterV.setHeight("750px");	
		
		//left
		var oTree = new sap.ui.commons.Tree("testProductSuiteTree", {
			showHeader: false,
			select : function(e) {
				var param = e.getParameters();
				var node = param.node;
				var parent = node.getParent();
				if (parent.sId == "testProductSuiteTree") {
					var productName = node.getText();
					oController.showProduct(productName);
				}
				else {
					var productName = parent.getText();
					var suiteName = node.getText();
					oController.showSuite(productName, suiteName);
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
	    var oLayoutTable = new sap.ui.commons.layout.MatrixLayout("testProductSuiteLayoutForm", {
	    	width: "100%",  // table width
	    	height: "100%"
	    });
	    
		var oTable = this.createProductForm(oController);
		var oTable = this.createProductSuiteForm(oController);
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
    
    createProductForm: function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testProductSuiteLayout',
            layoutFixed : true,
            width : "100%",
        });
	    
    	var oCycleForm = new sap.ui.layout.form.SimpleForm("testProductSuiteForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: false,
			content:[
				new sap.ui.core.Title({text:"Product Information: "}),
			    new sap.ui.commons.Label({text:"Product Name"}),
                new sap.ui.commons.TextView({text:"",width:'300px'}),
                new sap.ui.commons.Label({text:"Product Version"}),
                new sap.ui.commons.TextView({text:"",width:'200px'})
			]
		});
    	layout.createRow(oCycleForm);
    	
    	return layout;
    },
    
    createProductSuiteForm: function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testProductSuiteSuiteLayout',
            layoutFixed : true,
            width : "100%",
        });
    	
    	var oCycleForm = new sap.ui.layout.form.SimpleForm("testProductSuiteSuiteForm",
		{
			layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
			width : "100%",
			editable: false,
			content:[
			    new sap.ui.core.Title({text:"Test plan information: "}),
			    new sap.ui.commons.Label({text:"Name"}),
                new sap.ui.commons.TextField({value:"",width:'300px',required: true}),
                new sap.ui.commons.Label({text:"Description"}),
                new sap.ui.commons.TextField({value:"",width:'600px',required: true}),
			]
		});
    	    	
    	layout.createRow(oCycleForm);
    	
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
    
    createInsertPlan : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testCyclePlanLayoutCreate2',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; // getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
    	var oDropdownBoxTestSuite = getDropdownWithModel("TestCyclePlanTestSuiteInsert", "TS_NAME", oModel);
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
    	var oDropdownBoxCycle = getDropdownWithModel("TestCyclePlanCycleInsert", "CYC_TAG", oModel);
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
                new sap.ui.commons.TextField({value:"",width:'400px',required: true}),
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
    }
});
