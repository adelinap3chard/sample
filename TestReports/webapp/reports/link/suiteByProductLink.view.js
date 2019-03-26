sap.ui.jsview("TestReports.reports.link.suiteByProductLink", {

      getControllerName : function() {
         return "TestReports.reports.link.suiteByProductLink";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
 			       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.Table({
  	    	   id : "suiteByProductTable",
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
  	        
  	        var linkView = sap.ui.getCore().byId("link_suiteByCycleLink");//to open link       
	        var oDialog = sap.ui.getCore().byId("linkDialog");
	        var oView = sap.ui.getCore().byId("link_suiteByProductLink");// this file link 
	        
	        //suite column = link function
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Test Suite"}),
  	            //width: '0px',
  	            sortProperty : "TEST_SUITE_NAME",
  	            editable: false,
  	            template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'TEST_SUITE_NAME'
	    		   },
	    		   press : function(value){
	    			   var cycle = oView.data("my_data").cycle;
	    			   var catalog = oView.data("my_data").catalog;
	    			   var suite = this.getText();
	    			   linkView.data("my_data", {'cycle': cycle, 'catalog': catalog, 'suite': suite, 'init': false, 'back_id': "link_suiteByProductLink"});//back to this link 
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(linkView);
	    		   }
 	            }),	   
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
	  	        //oLayout.createRow("\n");
			    oLayoutTable.createRow(oTable);
  	    	
	  	        var oToolbar1 = new sap.ui.commons.Toolbar();
	  	        oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);
	  	        oLayout.createRow(oToolbar1);
			    
			    //main 
			    oLayout.createRow(oLayoutTable);
			    return oLayout;  
	      }

});
