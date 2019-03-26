sap.ui.jsview("TestReports.reports.sumCycleByUserReport", {

      getControllerName : function() {
         return "TestReports.reports.sumCycleByUserReport";
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
  	    	   id : "sumCycleByUserReportTable",
  	    	   title : "test",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });

  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_USER_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Test User"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_USER_NAME"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_SUITE_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Test Suite Name"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_SUITE_NAME"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
				text : "{TEST_PRODUCT_NAME}"});
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Product Name"}),
	            template : oControl,
	            //width: '0px',
	            sortProperty : "TEST_PRODUCT_NAME"
	            //editable: false
	        }));
	        
//  	        // pops up windows for link 
//  	        var oDialog = sap.ui.getCore().byId("linkDialog");
//  	        var linkView = sap.ui.getCore().byId("link_suiteByCycleProductLink");
//  	        
//  	        //ties link to catalog column
//  	        oTable.addColumn(new sap.ui.table.Column({
//  	            label : new sap.ui.commons.Label({text : "Cycle"}),
//  	            //width: '0px',
//  	            sortProperty : "TEST_CYCLE_TAG",
//  	            filterProperty : "TEST_CYCLE_TAG",
//  	            enableColumnFreeze : true,
//  	            editable: false,
//  	            template: new sap.ui.commons.Link({
//	    		   text : { 
//	    			   path : 'TEST_CYCLE_TAG'
//	    		   },
//	    		   press : function(value){
//	    			   var suite = value.getSource().getBindingContext().getObject().TEST_SUITE_NAME;
//	    			   //
//	    			   linkView.data("my_data", {'cycle': cycle,  'init': false}); //'catalog': catalog,
  	      
		   
//	    			   oDialog.removeAllContent();
//	    			   oDialog.addContent(linkView);
//	    			   oDialog.open();
//	    		   }
//  	            }),	   
//  	        }));
  	        
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
//    	    var oControl = new sap.ui.commons.TextView({
//  				text : "{UNTESTED_SUB_QUANTITY}"});
//  	        oTable.addColumn(new sap.ui.table.Column({
//  	            label : new sap.ui.commons.Label({text : "UNTESTED"}),
//  	            template : oControl,
//  	            //width: '0px',
//  	            sortProperty : "UNTESTED_SUB_QUANTITY"
//  	            //editable: false
//  	        }));
  	        
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
	  	        
	  	    	oModel = null; // getODataModel("/Product", "/TestReports/odata/getProductList.xsodata");
	  	    	var oDropdownBoxUser = getDropdownWithModel("dropBoxForCycleByUser", "U_NAME", oModel);
	  	    	oDropdownBoxUser.setWidth("300px");
    	    	    	
    	    	//add drop downs to layout matrix
				//Create row template     
	  	    	oLayoutFilter.createRow("Select a Test User:", oDropdownBoxUser),"";
    	    	
				//actions
	  	    	oLayoutFilter.createRow(new sap.ui.commons.Button({text: "Apply filter", press:function(){
	  	    		oLayout.setBusy(true);
	  	    		
			    	oController.applyFilter(oDropdownBoxUser.getValue(), function(data, textStatus, jqXHR) { // callback called when data is received
			    		var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(data); // fill the received data into the JSONModel
						//oTable.setTitle(oDropdownBoxTestCycle.getValue());
						oTable.setTitle("User: " + oDropdownBoxUser.getValue());		
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
	  	    	
	  	    	
  	    	
	   	       oViewMessage = new sap.ui.commons.TextView("CycleByUserReportMsg",{
	 				text: "An overview of tests cases for each test user. "
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
