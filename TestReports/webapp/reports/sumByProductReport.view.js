sap.ui.jsview("TestReports.reports.sumByProductReport", {

      getControllerName : function() {
         return "TestReports.reports.sumByProductReport";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();  	      
 			       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.Table({
  	    	   id : "sumByProductReportTable",
  	    	   title : "test",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });
  	       /*
 	        // link for list of feature for each product
 	        var oDialog = sap.ui.getCore().byId("linkDialog");
  	        var productLinkView = sap.ui.view({
                id : "link_byProductVersionLink",
                viewName : "TestReports.reports.link.byProductVersionLink",
               type : sap.ui.core.mvc.ViewType.JS
  	        });
  	       	        
	        //Product column = link function
 	        oTable.addColumn(new sap.ui.table.Column({
 	            label : new sap.ui.commons.Label({text : "Product Name"}),
 	            //width: '0px',
 	            sortProperty : "TEST_PRODUCT_NAME",
 	            filterProperty : "TEST_PRODUCT_NAME",
 	            editable: false,
 	            template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'TEST_PRODUCT_NAME'
	    		   },
	    		   press : function(value){
	    			   var product = this.getText();
	    			   var version = value.getSource().getBindingContext().getObject().TEST_PRODUCT_VERSION;
	    			   productLinkView.data("my_data", {'product': product, 'version': version,'init': false});
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(productLinkView);
	    			   oDialog.open();
	    		   }
	            }),	   
 	        }));
 	        */
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
  	        
 	        // link for list of feature for each product
 	        var oDialog = sap.ui.getCore().byId("linkDialog");
  	        var linkView = sap.ui.getCore().byId("link_productVersionLink")
  	        
  	        //var oControl = new sap.ui.commons.TextView({
  				//text : "{TEST_PRODUCT_VERSION}"});
  	        
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product Version"}),
  	            sortProperty : "TEST_PRODUCT_VERSION",
  	            filterProperty : "TEST_PRODUCT_VERSION",
  	            editable: false,
  	            template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'TEST_PRODUCT_VERSION'
	    		   },
	    		   press : function(value){
	    			   var version = this.getText();
	    			   var product = value.getSource().getBindingContext().getObject().TEST_PRODUCT_NAME;
	    			   linkView.data("my_data", {'product': product, 'version': version,'init': false});
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(linkView);
	    			   oDialog.open();
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
  	    	
	   	       oViewMessage = new sap.ui.commons.TextView("CycleByProductReportMsg",{
	 				text: "An overview of test by each product RTC . "
	 			});
			    
			    //oLayout.createRow("\n");
			    oLayoutTable.createRow(oTable);
			    
			    //main 
			    //oLayout.createRow(oViewMessage);
			    //oLayout.createRow("\n");
			    oLayout.createRow(oLayoutTable);
			    return oLayout;  
	      }

});
