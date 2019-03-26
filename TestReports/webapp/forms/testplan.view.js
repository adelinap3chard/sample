sap.ui.jsview("TestReports.forms.testplan", {

    getControllerName : function() {
        return "TestReports.forms.testplan";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testPlanMatrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
               
        oViewMessage = new sap.ui.core.HTML({content: "" +
        	//"<H3>What is a test plan?</H3>"+
        	"<p>A test plan contains a group of suites belong to a test cycle. "+
        	"<ul>" +
 		   	"<li>Use <b>Create</b> to add suite to a cycle one by one</li>" +
 		   	"<li>Use <b>Import</b> to import a list of suites to a cycle using Excel file. </li></ul>"+
 		   	"For more info please go to <b>FAQ</b> tab for more inforation and template for excel file. </li>" +
 		   	"</p>"
        });
        
        var oTable = new sap.ui.table.Table({
            id : "testPlanTableID",
            title: "Test plan table",
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
			text : "{TSP_ID}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "TSP_ID"}),
            template : oControl,
            width: '0px',
            sortProperty : "ID",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{CYC_TAG}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Cycle"}),
            template : oControl,
            sortProperty : "CYC_TAG",
            filterProperty : "CYC_TAG",
            editable: false
        }));         
        
        var oControl = new sap.ui.commons.TextView({
			text : "{TS_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Test Suite"}),
            template : oControl,
            sortProperty : "TS_NAME",
            filterProperty : "TS_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_NAME}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Product Name"}),
            template : oControl,
            sortProperty : "PRO_NAME",
            filterProperty : "PRO_NAME",
            editable: false
        }));
        
        var oControl = new sap.ui.commons.TextView({
			text : "{PRO_VER}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Product Version"}),
            template : oControl,
            sortProperty : "PRO_VER",
            filterProperty : "PRO_VER",
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
			text : "{ASSGINEE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Assignee"}),
            template : oControl,
            sortProperty : "ASSGINEE",
            filterProperty : "ASSGINEE",
            editable: false
        }));         

        var oControl = new sap.ui.commons.TextView({
			text : "{FEATURE}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Feature"}),
            template : oControl,
            sortProperty : "FEATURE",
            filterProperty : "FEATURE",
            editable: false
        }));  
        
        var oControl = new sap.ui.commons.TextView({
			text : "{CATALOG}"});
        oTable.addColumn(new sap.ui.table.Column({
            label : new sap.ui.commons.Label({text : "Catalog"}),
            template : oControl,
            sortProperty : "CATALOG",
            filterProperty : "CATALOG",
            editable: false
        }));  
        
        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testPlanTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("testPlanCreate",{
    		text : "Create",
    		icon: "sap-icon://create",
    		
    		tooltip : "to create or add suite to a cycle",
    		press : function() {
    			var oModel = getTestsuites();
    	    	var oDropdownBoxTestSuite = sap.ui.getCore().byId("TestPlanTestSuiteInsert");
    	    	oDropdownBoxTestSuite.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	    	var oDropdownBoxProduct = sap.ui.getCore().byId("TestPlanProductInsert");
    	    	oDropdownBoxProduct.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	    	var oDropdownBoxVersion = sap.ui.getCore().byId("TestPlanProductVersionInsert");
    	    	oDropdownBoxVersion.setModel(oModel);
    	    	
    	    	oModel = getCycles();
    	    	var oDropdownBoxCycle = sap.ui.getCore().byId("TestPlanCycleInsert");
    	    	oDropdownBoxCycle.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	    	var oDropdownBoxUser = sap.ui.getCore().byId("TestPlanUserInsert");
    	    	oDropdownBoxUser.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	    	var oDropdownBoxPlatform = sap.ui.getCore().byId("TestPlanPlatformInsert");
    	    	oDropdownBoxPlatform.setModel(oModel);

    	    	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	    	var oDropdownBoxOS = sap.ui.getCore().byId("TestPlanOSInsert");
    	    	oDropdownBoxOS.setModel(oModel);
    	    	
    	    	oModel = getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
    	    	var oDropdownBoxFeature = sap.ui.getCore().byId("TestPlanFeatureInsert");
    	    	oDropdownBoxFeature.setModel(oModel);
    	    
    	    	oModel = getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
    	    	var oDropdownBoxCatalog = sap.ui.getCore().byId("TestPlanCatalogInsert");
    	    	oDropdownBoxCatalog.setModel(oModel);
    	    	
    			oController.disableActions();
    			oCreateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oCreate);
    	
    	var oUpdate = new sap.ui.commons.Button("testPlanUpdate",{
    		text : "Update",
    		icon: "sap-icon://edit",
    		
    		tooltip : "Update selected Test Plan.Please select a row and click Update button to modify the value of existing entry.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to update!",'',"INFO");
            		return; // new
            	} 
            	
            	var oModel = getTestsuites();
            	var oDropdownBoxTestSuite = sap.ui.getCore().byId("TestPlanTestSuiteUpdate");
    	    	oDropdownBoxTestSuite.setModel(oModel);
            	
            	oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
            	var oDropdownBoxProduct = sap.ui.getCore().byId("TestPlanProductUpdate");
            	oDropdownBoxProduct.setModel(oModel);
            	
            	oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
            	var oDropdownBoxVersion = sap.ui.getCore().byId("TestPlanProductVersionUpdate");
            	oDropdownBoxVersion.setModel(oModel);
            	
            	oModel = getCycles();
            	var oDropdownBoxCycle = sap.ui.getCore().byId("TestPlanCycleUpdate");
            	oDropdownBoxCycle.setModel(oModel);
            	
            	oModel = getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
            	var oDropdownBoxUser = sap.ui.getCore().byId("TestPlanUserUpdate");
            	oDropdownBoxUser.setModel(oModel);
            	
            	oModel = getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
            	var oDropdownBoxPlatform = sap.ui.getCore().byId("TestPlanPlatformUpdate");
            	oDropdownBoxPlatform.setModel(oModel);
            	
            	oModel = getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
            	var oDropdownBoxOS = sap.ui.getCore().byId("TestPlanOSUpdate");
            	oDropdownBoxOS.setModel(oModel);
            	
            	oModel = getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
            	var oDropdownBoxFeature = sap.ui.getCore().byId("TestPlanFeatureUpdate");
            	oDropdownBoxFeature.setModel(oModel);
            
            	oModel = getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
            	var oDropdownBoxCatalog = sap.ui.getCore().byId("TestPlanCatalogUpdate");
            	oDropdownBoxCatalog.setModel(oModel);
            	
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	oController.updateEntry(entry);
            	oController.disableActions();
            	oUpdateForm.setVisible(true);
            }
    	});
    	oToolbar1.addItem(oUpdate);
    	
    	var oDelete = new sap.ui.commons.Button("testPlanDelete",{
    		text : "Delete",
    		icon: "sap-icon://delete",
    		
    		tooltip : "Delete selected Test Plan",
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
		                var id = "TSP_ID=" + entry.TSP_ID + "L,PRO_NAME=" + product;
		                oController.Delete(id); // new test[0].getValue()
	    			} else {
	    				oDelete.setEnabled(false);
	    			}
    			});
            }
    	});
    	oToolbar1.addItem(oDelete);
    	
    	//cheat since I can't find filereader support in ui5
    	var oFileReader = new sap.ui.core.HTML("html1", {
    		content:
    			'<input type="file" id="testPlanSelectedFile" style="display: none;" onchange="read_xlsx(event, import_testplans)" />',
    		preferDOM : false,
    	});
    	oToolbar1.addItem(oFileReader);
    	
    	var oImport = new sap.ui.commons.Button("testPlanImport",{
    		text : "Import",
    		icon: "sap-icon://folder",
    		tooltip : "Import test plan from xlsx file",
    		press : function() {
    			document.getElementById('testPlanSelectedFile').click();
    		}
    	});
    	oToolbar1.addItem(oImport);
    	
    	var oExport = new sap.ui.commons.Button("testPlanExport",{
    		text : "Export",
    		icon: "sap-icon://save",
    		tooltip : "Export test plan to xlsx file, which will export all suites were added to a cycle.",
    		press : function() {
    			var idx = oTable.getSelectedIndex(); //new
            	if (idx == -1){
            		sap.ui.commons.MessageBox.alert("Please select a row to export!",'',"INFO");
            		return; // new
            	} 
            	var oData = oTable.getContextByIndex(idx);
            	var oEntry = oData.getObject();
            	var oModel = getODataModel("/TestPlan", "/TestReports/odata/getTestPlanList.xsodata");
            	var oEntries = _.filter(oModel.oData, {'CYC_TAG': oEntry.CYC_TAG});
            	save_xlsx_for_entries("TestPlans.xlsx", "TestPlans", oEntries);
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
    
    // Create Form
    createInsert : function(oController) {
    	var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testPlanLayoutCreate',
            layoutFixed : false,
            width : "100%",
        });

    	var oLayout2 = new sap.ui.layout.form.GridLayout("L2");
    	
    	var oModel = null; // getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
    	var oDropdownBoxTestSuite = getDropdownWithModel2("TestPlanTestSuiteInsert", "TS_NAME", oModel);
    	oDropdownBoxTestSuite.setWidth("500px");
    	
    	oModel = null; // getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	var oDropdownBoxProduct = getDropdownWithModel("TestPlanProductInsert", "PRO_NAME", oModel);
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
    	var oDropdownBoxVersion = getDropdownWithModel("TestPlanProductVersionInsert", "VERSION", oModel);
    	oDropdownBoxVersion.setWidth("100px");
    	
    	//oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	//var oDropdownBoxProduct = getDropdownWithModel("TestPlanProductInsert", "PRO_NAME", oModel);
    	//oDropdownBoxProduct.setWidth("300px");
    	
    	//oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	//var oDropdownBoxVersion = getDropdownWithModel("TestPlanProductVersionInsert", "VERSION", oModel);
    	//oDropdownBoxVersion.setWidth("200px");
    	
    	oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
    	var oDropdownBoxCycle = getDropdownWithModel2("TestPlanCycleInsert", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("400px");
    	
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestPlanUserInsert", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	oModel = null; // getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	var oDropdownBoxPlatform = getDropdownWithModel("TestPlanPlatformInsert", "PLAT_NAME", oModel);
    	oDropdownBoxPlatform.setWidth("300px");
    	
    	oModel = null; // getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	var oDropdownBoxOS = getDropdownWithModel("TestPlanOSInsert", "OS_NAME", oModel);
    	oDropdownBoxOS.setWidth("300px");
    	
    	oModel = null; // getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
    	var oDropdownBoxFeature = getDropdownWithModel("TestPlanFeatureInsert", "TSF_NAME", oModel);
    	oDropdownBoxFeature.setWidth("300px");
    
    	oModel = null; // getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
    	var oDropdownBoxCatalog = getDropdownWithModel("TestPlanCatalogInsert", "TSC_NAME", oModel);
    	oDropdownBoxCatalog.setWidth("300px");
    	/*
    	var oCreateForm = new sap.ui.layout.form.Form("testPlanCreateForm",{
	    	  	//title: new sap.ui.core.Title({text: "Address Book",icon: "../images/logo_corner.jpg", tooltip: "Title tooltip"}),
				//title: new sap.ui.core.Title({}),
				editable: true,
				layout: oLayout2,
	  			formContainers: [
	  			
					new sap.ui.layout.form.FormContainer("C2",{
					title: "Test plan registration:",
					formElements: [
					               new sap.ui.layout.form.FormElement({
					            	   label: new sap.ui.commons.Label({text:"Test Suite:"}),
					            	   fields: [oDropdownBoxTestSuite]
					               }),
					               ]
					}),
		
					]
    	});
    	*/
    	
	
    	var oCreateForm = new sap.ui.layout.form.SimpleForm(
		"testPlanCreateForm",
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
                new sap.ui.core.Title({text:"Test plan assignment: "}),
                new sap.ui.commons.Label({text:"Cycle"}),
                oDropdownBoxCycle,
                new sap.ui.commons.Label({text:"Assignee"}),
                oDropdownBoxUser,
                new sap.ui.commons.Label({text:"Feature"}),
                oDropdownBoxFeature,
                new sap.ui.commons.Label({text:"Catalog"}),
                oDropdownBoxCatalog,
			]
		});
    	
    	var oCreateToolBar = new sap.ui.commons.Toolbar("testPlantb2");
    	oCreateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oInsert = new sap.ui.commons.Button("testPlanInsert",{
    		text : "Insert",
    		icon: "sap-icon://accept",
    		tooltip : "Register test plan",
    		press : function() {
    			var content = oCreateForm.getContent();
                var oEntry = {};
                oEntry.TS_NAME = content[2].getValue();
                oEntry.PRO_NAME = content[4].getValue();
                oEntry.PRO_VER = content[6].getValue();
                oEntry.PLAT_NAME = content[8].getValue();
                oEntry.OS_NAME = content[10].getValue();
                oEntry.CYC_TAG = content[13].getValue();
                oEntry.ASSGINEE = content[15].getValue();
                oEntry.FEATURE = content[17].getValue();
                oEntry.CATALOG = content[19].getValue();
                oEntry.TSP_ID = 0;
                
                var oTestResult = sap.ui.getCore().byId("testPlanTableID");
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
    	
    	var oCancel1 = new sap.ui.commons.Button("testPlanCancel",{
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
            id : 'testPlanLayoutUpdate',
            layoutFixed : false,
            width : "100%",
        });
    	
    	var oModel = null; // getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
    	var oDropdownBoxTestSuite = getDropdownWithModel2("TestPlanTestSuiteUpdate", "TS_NAME", oModel);
    	oDropdownBoxTestSuite.setWidth("200px");
    	
    	oModel = null; // getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	var oDropdownBoxProduct = getDropdownWithModel("TestPlanProductUpdate", "PRO_NAME", oModel);
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
    	var oDropdownBoxVersion = getDropdownWithModel("TestPlanProductVersionUpdate", "VERSION", oModel);
    	oDropdownBoxVersion.setWidth("100px");
    	
    	//oModel = getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
    	//var oDropdownBoxProduct = getDropdownWithModel("TestPlanProductUpdate", "PRO_NAME", oModel);
    	//oDropdownBoxProduct.setWidth("200px");
    	
    	//oModel = getODataModel("/ProductVersion", "/TestReports/odata/getProductVersionList.xsodata");
    	//var oDropdownBoxVersion = getDropdownWithModel("TestPlanProductVersionUpdate", "VERSION", oModel);
    	//oDropdownBoxVersion.setWidth("100px");
    	
    	oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
    	var oDropdownBoxCycle = getDropdownWithModel2("TestPlanCycleUpdate", "CYC_TAG", oModel);
    	oDropdownBoxCycle.setWidth("200px");
    	
    	oModel = null; // getODataModel("/Assignee", "/TestReports/odata/getUserList.xsodata");
    	var oDropdownBoxUser = getDropdownWithModel("TestPlanUserUpdate", "U_NAME", oModel);
    	oDropdownBoxUser.setWidth("200px");
    	
    	oModel = null; // getODataModel("/Platform", "/TestReports/odata/getPlatformList.xsodata");
    	var oDropdownBoxPlatform = getDropdownWithModel("TestPlanPlatformUpdate", "PLAT_NAME", oModel);
    	oDropdownBoxPlatform.setWidth("300px");
    	
    	oModel = null; // getODataModel("/OS", "/TestReports/odata/getOSList.xsodata");
    	var oDropdownBoxOS = getDropdownWithModel("TestPlanOSUpdate", "OS_NAME", oModel);
    	oDropdownBoxOS.setWidth("300px");
    	
    	oModel = null; // getODataModel("/Feature", "/TestReports/odata/getTestFeaturesList.xsodata");
    	var oDropdownBoxFeature = getDropdownWithModel("TestPlanFeatureUpdate", "TSF_NAME", oModel);
    	oDropdownBoxFeature.setWidth("300px");
    
    	oModel = null; // getODataModel("/Catalog", "/TestReports/odata/getTestCatalogsList.xsodata");
    	var oDropdownBoxCatalog = getDropdownWithModel("TestPlanCatalogUpdate", "TSC_NAME", oModel);
    	oDropdownBoxCatalog.setWidth("300px");
    	
    	//Update form
    	var oUpdateForm = new sap.ui.layout.form.SimpleForm(
		"testPlanUpdateForm",
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
                new sap.ui.core.Title({text:"Test plan assignment: "}),
                new sap.ui.commons.Label({text:"Cycle"}),
                oDropdownBoxCycle,
                new sap.ui.commons.Label({text:"Assignee"}),
                oDropdownBoxUser,
                new sap.ui.commons.Label({text:"Feature"}),
                oDropdownBoxFeature,
                new sap.ui.commons.Label({text:"Catalog"}),
                oDropdownBoxCatalog,
			]
		});
    	
    	var oUpdateToolBar = new sap.ui.commons.Toolbar("testPlantb3");
    	oUpdateToolBar.setDesign(sap.ui.commons.ToolbarDesign.Standard);
    	
    	var oUpdate = new sap.ui.commons.Button("testPlanUpdate2",{
    		text : "Update",
    		icon: "sap-icon://accept",
    		tooltip : "Update Test Plan",
    		press : function() {
    			var content = oUpdateForm.getContent();
                var oEntry = {};
                oEntry.TS_NAME = content[2].getValue();
                oEntry.PRO_NAME = content[4].getValue();
                oEntry.PRO_VER = content[6].getValue();
                oEntry.PLAT_NAME = content[8].getValue();
                oEntry.OS_NAME = content[10].getValue();
                oEntry.CYC_TAG = content[13].getValue();
                oEntry.ASSGINEE = content[15].getValue();
                oEntry.FEATURE = content[17].getValue();
                oEntry.CATALOG = content[19].getValue();
                
                var oTable = sap.ui.getCore().byId("testPlanTableID");
                var idx = oTable.getSelectedIndex(); //new
                if (idx == -1) return; // new
            	var oData = oTable.getContextByIndex(idx);
            	var entry = oData.getObject();
            	var product = "null";
				if (entry.PRO_NAME != null) {
					product = "'" + entry.PRO_NAME + "'";
				}
                var id = "/LIST(TSP_ID=" + entry.TSP_ID + "L,PRO_NAME=" + product + ")"
                var temp = oTable.getModel();
                temp.update(id, oEntry, null, function(){
                	temp.refresh();
                	sap.ui.commons.MessageBox.alert("Updated successfully!",'',"Success");
                    },function(){
                    	sap.ui.commons.MessageBox.alert("Update failed! Please contact admin",'',"Failure");
                    }
                );
            }
    	});
    	oUpdateToolBar.addItem(oUpdate);
    	
    	var oCancel1 = new sap.ui.commons.Button("testPlanCancel2",{
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
