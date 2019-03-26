sap.ui.jsview("TestReports.reports.detailResultCycleReport", {

      getControllerName : function() {
         return "TestReports.reports.detailResultCycleReport";
      },
      
      createContent : function(oController) {
    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
  	    		layoutFixed : true,
	    	  	columns : 3,
	    	  	width : '600px'});
	    	  	
  	       oLayoutFilter.setWidths(["20px","50px","30px"]);

  	       //****************************************************************************************
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.TreeTable({
  	    	   id : "DetailResultCycle",
  	    	   title : "test",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	       });

  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_SUITE_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Suite Name"}),
  	           template : oControl,
  	           sortProperty : "TEST_SUITE_NAME",
  	           filterProperty : "TEST_SUITE_NAME",
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_CASE_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Case Name"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "TEST_CASE_NAME",
  	           filterProperty : "TEST_CASE_NAME",
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{RESULT}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Result"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "RESULT",
  	           filterProperty : "RESULT",
  	           enableColumnFreeze : true,
   	           template: new sap.ui.commons.TextView({
   	        	   text : { 
   	        		   path : 'RESULT',
 	    			   formatter : function(value){
 	    				   if (value != undefined) {
 	    					   this.removeStyleClass('green');  
 	    					   this.removeStyleClass('yellow');  
 	    					   this.removeStyleClass('red');  
 	    					   // Set style Conditionally  
 	    					   if (value == "PASS" ) {
 	        						   this.addStyleClass('green');
 	        					   } else {  
 	        						   this.addStyleClass('red');
 	        					   } 
 	    					   return value;
 	    				   }
 	    				   else
 	    					   return value;
 	    			   }
 	    		   }
   	            }),
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
  	       
  	   	
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{EXEC_USER}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Test User"}),
  	           template : oControl,
  	           sortProperty : "EXEC_USER",
  	           filterProperty : "EXEC_USER",
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{EXEC_TS}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Initial Time"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "EXEC_TS"
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{EXEC_TIME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Run Time"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "EXEC_TIME"
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_PRODUCT_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Product"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "TEST_PRODUCT_NAME"
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_PRODUCT_VERSION}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Product Ver"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "TEST_PRODUCT_VERSION",
  	           filterProperty : "TEST_PRODUCT_VERSION",
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_PLATFORM_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Platform"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "TEST_PLATFORM_NAME",
  	           filterProperty : "TEST_PLATFORM_NAME",
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_OS_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "OS"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "TEST_OS_NAME",
  	           filterProperty : "TEST_OS_NAME",
  	           //editable: false
  	       }));

  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_CATALOG}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Catalog"}),
  	           template : oControl,
  	           sortProperty : "TEST_CATALOG",
  	           filterProperty : "TEST_CATALOG"
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_FEATURE}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Feature"}),
  	           template : oControl,
  	           sortProperty : "TEST_FEATURE",
  	           filterProperty : "TEST_FEATURE",
  	       }));
  	       
  	       oTable.bindRows("/root"); //tree table binding
  	       //oTable.bindRows("/");
  	        
  	       //****************************************************************************************
  	       //dropdown menu 
  	       var oModel = null; //getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
  	       var oDropdownBoxTestCycle = getDropdownWithModel("dropBoxForDetailCycle", "CYC_TAG", oModel);
  	       oDropdownBoxTestCycle.setWidth("300px");
  	    	
  	       //apply filter button 
  	       //actions
  	       var applyBnt = new sap.ui.commons.Button({
  	    	   text: "Apply filter",
  	    	   tooltip: "This will run query and display results in table below",
  	    	   press:function(){
  	    		   oTable.setBusy(true);
  	    		   var oModel = oController.applyFilter(oDropdownBoxTestCycle._sTypedChars);
  	    		   oTable.setTitle("Cycle: " + oDropdownBoxTestCycle.getValue() + " -  Total test: " + oModel.oData.length);		
  	    		   oTable.setModel(oModel);
  	    		   oTable.setBusy(false);
  	    	   }
  	       });
  	        	
  	       //****************************************************************************************
  	       //export button 
  	       var exportBnt = new sap.ui.commons.Button({
  	    	   text: "Export to excel",
  	    	   tooltip: "This will export the results to a file with casename as filename",
  	    	   press:function(){
  	    		   //window.open("/TestReports/webapp/reports/testcasereport.xsjs?caseName=" + oDropdownBoxTestCase.getValue());
  	    		   var oModel = oController.applyFilter2(oDropdownBoxTestCycle.getValue());
  	    		   save_xlsx_for_entries("TestCycle_" + oDropdownBoxTestCycle.getValue()+ ".xlsx", oDropdownBoxTestCycle.getValue(), oModel.oData);
  	    		   }
  	       });
  	    	
   	       oViewMessage = new sap.ui.commons.TextView("DetailCycleReportMsg",{
 				text: "Detail report of Suites and Cases for each Cycle. "
 			});
		    
   	       //add to layout matrix
   	       oLayoutFilter.createRow("Select A Test Cycle:", oDropdownBoxTestCycle),"";
		   oLayoutFilter.createRow(applyBnt, exportBnt),"";
		   oLayoutTable.createRow(oTable);
		    
		   //main 
		   oLayout.createRow(oViewMessage);
		   oLayout.createRow("\n");
		   oLayout.createRow(oLayoutFilter);	
		   oLayout.createRow("\n");
		   oLayout.createRow(oLayoutTable);
		   return oLayout;  
     }

});
