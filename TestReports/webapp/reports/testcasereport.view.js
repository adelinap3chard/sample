sap.ui.jsview("TestReports.reports.testcasereport", {

      getControllerName : function() {
         return "TestReports.reports.testcasereport";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
  	    		layoutFixed : true,
	    	  	columns : 3,
	    	  	width : '800px'});
	    	  	
  	       oLayoutFilter.setWidths(["10px","60px","10px"]);
 			       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "TestCaseReportTable",
  	    	   title : "test",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
 	    	  

	        });
  	       	// table columns
 	        /*var oControl = new sap.ui.commons.TextView({
  				text : "{TRES_ID}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "ID"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TRES_ID",
  	            editable: false
  	        })); */
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_cycle_tag}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Cycle Name"}),
  	            template : oControl,
  	            //width: '150px',
  	            sortProperty : "test_cycle_tag"
  	            //editable: false
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_suite_name}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Suite Name"}),
  	            template : oControl,
  	            //width: '150px',
  	            sortProperty : "test_suite_name",
  	            enableColumnFreeze : true,
  	            
  	            //editable: false
  	            	
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_case_name}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Case Name"}),
  	            template : oControl,
  	            //width: '70px',
  	            sortProperty : "test_case_name"
  	            //editable: false
  	        }));
  	        
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{result}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Result"}),
  	            //template : oControl,
  	            //width: '70px',
  	            sortProperty : "result",
  	            enableColumnFreeze : true,
	            
  	            //editable: false,
  	            template: new sap.ui.commons.TextView({
 	    		   text : { 
 	    			   path : 'result',
 	    			   formatter : function(value){
 	    				   if (value != undefined) {
 	    					   this.removeStyleClass('green');  
 	    					   //this.removeStyleClass('yellow');   
 	    					   this.removeStyleClass('red');  
 	    					   // Set style Conditionally  
 	    					   if (value == 'FAIL' ) {
	        						   this.addStyleClass('red');
	        					   } else {  
	        						   this.addStyleClass('green');
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
  	            //width: '150px',
  	            sortProperty : "bug_id",
  	            filterProperty : "bug_id",
  	            editable: false,
  	            template: new sap.ui.commons.Link({
  		    		   text : { 
  		    			   path : 'bug_id'
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
  				text : "{exec_ts}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Initial Time"}),
  	            template : oControl,
  	            //width: '100px',
  	            sortProperty : "exec_ts"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{exec_user}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "User"}),
  	            template : oControl,
  	            //width: '70px',
  	            sortProperty : "exec_user"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_product_name}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product"}),
  	            template : oControl,
  	            //width: '70px',
  	            sortProperty : "test_product_name"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_product_version}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Version"}),
  	            template : oControl,
  	            //width: '70px',
  	            sortProperty : "test_product_version",
  	            enableColumnFreeze : true,
	            //width : '80px'
  	            //editable: false
  	        }));

  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_platform_name}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Platform"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "test_platform_name"
  	            //editable: false
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_os_name}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "OS"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "test_os_name"
  	            //editable: false
  	        }));

  	        var oControl = new sap.ui.commons.TextView({
  				text : "{tc_details}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "case details"}),
  	            template : oControl,
  	            //width: '500px',
  	            sortProperty : "tc_details"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{test_details}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Details"}),
  	            template : oControl,
  	            //width: '500px',
  	            sortProperty : "test_details"
  	            //editable: false
  	        }));
		   
  	        oTable.bindRows("/");
  	        
  	        /*
  	        //dropdown for suite
  	        var oModel = null; // getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
	    	var oDropdownBoxTestSuite = getDropdownWithModel("dropBoxForSuite", "TS_NAME", oModel);
	    	oDropdownBoxTestSuite.setWidth("250px");
	    	oDropdownBoxTestSuite.attachChange(function(){
	    		var suite = oDropdownBoxTestSuite.getValue();
	    		
	    		//oDropdownBoxTestCase.unbindItems();
	    		//var filters = new Array();
	            //var filter = new sap.ui.model.Filter("TS_NAME", sap.ui.model.FilterOperator.EQ, suite);  
	            //filters.push(filter); 
	            
	            //var oItemTemplateBranch = new sap.ui.core.ListItem();
	    		//oItemTemplateBranch.bindProperty("text", "TC_NAME");
	    		//oDropdownBoxTestCase.bindItems("/LIST", oItemTemplateBranch, null, filters);
	    		
	    		var oItemTemplateBranch = new sap.ui.core.ListItem();
	    		oItemTemplateBranch.bindProperty("text", "TC_NAME");
	    		oDropdownBoxTestCase.bindItems("/d/results", oItemTemplateBranch);
	    		var model = oController.getCaseForSuite(suite);
	    		oDropdownBoxTestCase.setModel(model);
	    		oDropdownBoxTestCase.setPlaceholder("select...");
	    	});
          
			//dropdown for case 
	    	//var oModel = getODataModel("/TestCase", "/TestReports/odata/getTestCaseList.xsodata");
	    	var oModel = null; // getODataModel("/TestCaseBySuite", "/TestReports/odata/getTestCaseBySuiteList.xsodata");
  	    	var oDropdownBoxTestCase = getDropdownWithModel("dropBoxForCase", "TC_NAME", oModel);
  	    	oDropdownBoxTestCase.setWidth("400px");  	 
  	    		var oTestCaseInput = new sap.ui.commons.TextField({
				id: 'TestCaseInput',
				value: 'Please enter a test case name',
				tooltip: 'Enter case name to get a history of case.',
				width: '400px'
			});       
  	        */
  	        
  	        //auto complete test case box
  	        var oTestCaseInput = new sap.ui.commons.AutoComplete("boxForCase",{
  	        	width: '400px',
  	        	required: true,
  	        	tooltip:"Enter case name",
  	        	items:{
  	        		path:"/LIST",
  	        		template:new sap.ui.core.ListItem({
  	        				text: "{TC_NAME}"})
  	        	}
  	        });
  	        			
  	    	//apply filter button 
  	    	var applyBnt = new sap.ui.commons.Button({
  	    		text: "Apply filter", 
  	    		tooltip: "This will run query and display results in table below",
  	    		press:function(){
		    	//window.open("/TestReports/webapp/reports/testcasereport.xsjs?caseName=" + oDropdownBoxTestCase.getValue());
		    	var oModel = oController.applyFilter(oTestCaseInput.getValue());
		    	oTable.setTitle("TestCase: "+ oTestCaseInput.getValue() + " - Total test run: "+ oModel.oData.length);
		    	oTable.setModel(oModel);
				}
		    });
  	    	
  	    	//export report to excel 
  	    	var exportBnt = new sap.ui.commons.Button({
  	    		text: "Export to excel",
  	    		tooltip: "This will export the results to a file with casename as filename",
  	    		press:function(){
		    	//window.open("/TestReports/webapp/reports/testcasereport.xsjs?caseName=" + oDropdownBoxTestCase.getValue());
		    	var oModel = oController.applyFilter(oTestCaseInput.getValue());
		    	save_xlsx_for_entries("TestCase_" + oTestCaseInput.getValue() + ".xlsx", oDropdownBoxTestCase._sTypedChars, oModel.oData);
				}
		    });
  	    	 	    	
   	        oViewMessage = new sap.ui.commons.TextView("caseReportMsg",{
 				text: "An overview of number of time each test run. "
 			});
		    
   	        //add to layout matrix
  	    	//oLayoutFilter.createRow("Suite Name:", oDropdownBoxTestSuite),"";
  	    	//oLayoutFilter.createRow("Case Name:", oDropdownBoxTestCase),"";
   	        oLayoutFilter.createRow("Case Name:", oTestCaseInput),"";
  	    	oLayoutFilter.createRow(applyBnt, exportBnt),"";
  	    	oLayoutTable.createRow(oTable);
		    
		    //main 
		    oLayout.createRow(oViewMessage);
		    //oLayout.createRow("\n");
		    oLayout.createRow(oLayoutFilter);
		    oLayout.createRow("\n");
		    oLayout.createRow(oLayoutTable);
		    return oLayout;  
      }

});
