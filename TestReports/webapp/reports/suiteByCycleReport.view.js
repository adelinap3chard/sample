sap.ui.jsview("TestReports.reports.suiteByCycleReport", {

      getControllerName : function() {
         return "TestReports.reports.suiteByCycleReport";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
  	    		layoutFixed : true,
	    	  	columns : 3,
	    	  	width : '600px'});
	    	  	
  	       oLayoutFilter.setWidths(["20px","50px","30px"]);
 			       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.Table({
  	    	   id : "suiteByCycleReportTable",
  	    	   title : "test",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });

  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_CYCLE_TAG}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Cycle Name"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_CYCLE_TAG"
  	            //editable: false
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_CATALOG}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Catalog"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_CATALOG",
  	            enableColumnFreeze : true
  	            //editable: false
  	            	
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_FEATURE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Feature"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_FEATURE"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_SUITE_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Test Suite"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_SUITE_NAME"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{CONTRACTOR}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Contractor"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "CONTRACTOR",
  	            enableColumnFreeze : true,
  	            filterProperty : "CONTRACTOR"
  	            //editable: false
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{ASSGINEE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Assignee"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "ASSGINEE",
  	            enableColumnFreeze : true,
  	            filterProperty : "ASSGINEE"
  	            //editable: false
  	        })); 
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{PASS_SUB_QUANTITY}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "PASS"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "PASS_SUB_QUANTITY",
	            //editable: false,
	            template: new sap.ui.commons.TextView({
	    		   text : { 
	    			   path : 'PASS_SUB_QUANTITY',
	    			   formatter : function(value){
	    				   if (value != undefined) {
  	    					   this.removeStyleClass('green');  
  	    					   this.removeStyleClass('yellow');  
  	    					   this.removeStyleClass('red');  
  	    					   // Set style Conditionally  
  	    					   if (value > 0) {
	        						   this.addStyleClass('green');
	        					   }
  	    					   return value;
  	    				   }
  	    				   else
  	    					   return value;
  	    			   }
  	    		   }}),
	          
	        	}));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{FAIL_SUB_QUANTITY}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "FAIL"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "FAIL_SUB_QUANTITY",
  	            //editable: false
  		            template: new sap.ui.commons.TextView({
  		    		   text : { 
  		    			   path : 'FAIL_SUB_QUANTITY',
  		    			   formatter : function(value){
  		    				   if (value != undefined) {
  	  	    					   this.removeStyleClass('green');  
  	  	    					   this.removeStyleClass('yellow');  
  	  	    					   this.removeStyleClass('red');  
  	  	    					   // Set style Conditionally  
  	  	    					   if (value > 0) {
  		        						   this.addStyleClass('red');
  		        					   }
  	  	    					   return value;
  	  	    				   }
  	  	    				   else
  	  	    					   return value;
  	  	    			   }
  	  	    		   }}),  	            
  	        }));
    	    var oControl = new sap.ui.commons.TextView({
  				text : "{UNTESTED_SUB_QUANTITY}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "UNTESTED"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "UNTESTED_SUB_QUANTITY"
  	            //editable: false
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{NO_RESULT_SUB_QUANTITY}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Unknown"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "NO_RESULT_SUB_QUANTITY",
  	            //editable: false
  		            template: new sap.ui.commons.TextView({
   		    		   text : { 
   		    			   path : 'NO_RESULT_SUB_QUANTITY',
   		    			   formatter : function(value){
   		    				   if (value != undefined) {
   	  	    					   this.removeStyleClass('green');  
   	  	    					   this.removeStyleClass('yellow');  
   	  	    					   this.removeStyleClass('red');  
   	  	    					   // Set style Conditionally  
   	  	    					   if (value > 0) {
   		        						   this.addStyleClass('yellow');
   		        					   }
   	  	    					   return value;
   	  	    				   }
   	  	    				   else
   	  	    					   return value;
   	  	    			   }
   	  	    		   }}),  	   	            	
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TOTAL_QUANTITY}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Total"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TOTAL_QUANTITY"
  	            //editable: false
  	        }));
  	          	      
  	        var oControl = new sap.ui.commons.TextView({
				text : "{PASS_RATE}"});
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Pass Rate"}),
	            //template : oControl,
	            //width: '0px',
	            sortProperty : "PASS_RATE",
	            enableColumnFreeze : true,
	            // width : '80px',
	            //editable: false,
	            template: new sap.ui.commons.TextView({
	    		   text : { 
	    			   path : 'PASS_RATE',
	    			   formatter : function(value){
	    				   if (value != undefined) {
  	    					   this.removeStyleClass('green');  
  	    					   this.removeStyleClass('yellow');  
  	    					   this.removeStyleClass('red');  
  	    					   // Set style Conditionally  
  	    					   if (value < 75.00) {
	        						   this.addStyleClass('red');
	        					   } else if(value < 90.00 && value >= 75.00) {  
	        						   this.addStyleClass('yellow');  
	        					   } else {  
	        						   this.addStyleClass('green');
	        					   } 
  	    					   return value + "%";
  	    				   }
  	    				   else
  	    					   return value;
  	    			   }
  	    		   }}),
	          
	        	}));
	  	        var oControl = new sap.ui.commons.TextView({
	  				text : "{FINISH_RATE}"});
	  	        oTable.addColumn(new sap.ui.table.Column({
	  	            label : new sap.ui.commons.Label({text : "Finish Rate"}),
	  	            template : oControl,
	  	            sortProperty : "FINISH_RATE",
	  	            	enableColumnFreeze : true,
	  		            // width : '80px',
	  		            //editable: false,
	  		            template: new sap.ui.commons.TextView({
	  		    		   text : { 
	  		    			   path : 'FINISH_RATE',
	  		    			   formatter : function(value){
	  		    				   if (value != undefined) {
	  	  	    					   this.removeStyleClass('green');  
	  	  	    					   this.removeStyleClass('yellow');  
	  	  	    					   this.removeStyleClass('red');  
	  	  	    					   // Set style Conditionally  
	  	  	    					   if (value < 75.00) {
	  		        						   this.addStyleClass('red');
	  		        					   } else if(value < 90.00 && value >= 75.00) {  
	  		        						   this.addStyleClass('yellow');  
	  		        					   } else {  
	  		        						   this.addStyleClass('green');
	  		        					   }  
	  	  	    					   return value + "%";
	  	  	    				   }
	  	  	    				   else
	  	  	    					   return value;
	  	  	    			   }
	  	  	    		   }}),
	  	            
	  	        }));
	  	        
  	       
	  	        oTable.bindRows("/");
	  	        
				//dropdown menu 
	  	    	var oModel = null; // getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
	  	    	var oDropdownBoxTestCycle = getDropdownWithModel("oDropBoxForCycle", "CYC_TAG", oModel);
	  	    	oDropdownBoxTestCycle.setWidth("300px");
	            
			    //add drop downs to layout matrix
				//Create row template     
	  	    	oLayoutFilter.createRow("Select A Test Cycle:", oDropdownBoxTestCycle),"";
				//actions
	  	    	oLayoutFilter.createRow(new sap.ui.commons.Button({text: "Apply filter", press:function(){
	  	    		oLayout.setBusy(true);
	  	    		
			    	oController.applyFilter(oDropdownBoxTestCycle.getValue(), function(data, textStatus, jqXHR) { // callback called when data is received
			    		var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(data); // fill the received data into the JSONModel
						oTable.setTitle("Cycle: " + oDropdownBoxTestCycle.getValue());
				    	oTable.setModel(oModel);
				    	oLayout.setBusy(false);
					}, function(data, textStatus, jqXHR) { // callback called when data is received
						oLayout.setBusy(false);
						alert(jqXHR);
						alert(textStatus);
						alert(errorThrown);
						
					});
					}
			    }));
  	    	
	   	       oViewMessage = new sap.ui.commons.TextView("SuiteByCycleReportMsg",{
	 				text: "An overview of test Suites for each test cycle. "
	 			});
			    
			    //oLayout.createRow("\n");
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
