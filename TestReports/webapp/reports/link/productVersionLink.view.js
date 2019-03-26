sap.ui.jsview("TestReports.reports.link.productVersionLink", {

      getControllerName : function() {
         return "TestReports.reports.link.productVersionLink";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "productVersionTable",
  	    	   title : "Summary report by product version",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });
  	        
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_PRODUCT_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product Name"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_PRODUCT_NAME",
  	            filterProperty : "TEST_PRODUCT_NAME"
  	            //editable: false
  	        }));
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_PRODUCT_VERSION}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product Version"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TEST_PRODUCT_VERSION"
  	            //editable: false
  	        }));
  	       
  	        // pops up link for case from suite name
  	        var oDialog = sap.ui.getCore().byId("linkDialog");
  	        var linkView = sap.ui.getCore().byId("link_suiteByProductVersionFeatureLink");//link to open suiteByProductVersionFeatureReport
	        //var oView = sap.ui.getCore().byId("link_byProductVersionLink");// this file link 
	        
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Test feature"}),
  	            //width: '0px',
  	            sortProperty : "TEST_FEATURE",
  	            editable: false,
  	            template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'TEST_FEATURE'
	    		   },
	    		   press : function(value){
	    			   var product = value.getSource().getBindingContext().getObject().TEST_PRODUCT_NAME;
	    			   var version = value.getSource().getBindingContext().getObject().TEST_PRODUCT_VERSION;
	    			   var feature = this.getText();
	    			   linkView.data("my_data", {'product': product, 'version': version, 'feature': feature, 'init': false, 'back_id': "link_productVersionLink"});// go back to this file link
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(linkView);
	    		   }
 	            }),	   
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
  	        /*
  	        var oToolbar1 = new sap.ui.commons.Toolbar();
  	        oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);
  	        oLayout.createRow(oToolbar1);
	      
  	        var oCreate = new sap.ui.commons.Button({
  	        	text : "back",
  	        	tooltip : "click to go back",
  	        	press : function() {
  	        		var oView = sap.ui.getCore().byId("link_testCaseLink");
	    		    var id = oView.data('my_data').back_id;
	    		    var linkView = sap.ui.getCore().byId(id);
	    		    var oDialog = sap.ui.getCore().byId("linkDialog");
	    		    oDialog.removeAllContent();
	    		    oDialog.addContent(linkView);
  	        	}
	    	});
	    	oToolbar1.addItem(oCreate);
  	    	*/
  	        
  	    	oLayoutTable.createRow(oTable);
		    oLayout.createRow(oLayoutTable);
		    return oLayout;  
      }

});
