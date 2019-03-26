sap.ui.jsview("TestReports.reports.link.detailResultCycleLink", {

      getControllerName : function() {
         return "TestReports.reports.link.detailResultCycleLink";
      },
      
      createContent : function(oController) {
    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       //****************************************************************************************
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.Table({
   	    	    id: "DetailResultCycleLink",
   	    	    //width: "100%",
  	  	   	   	visibleRowCount: 20,
  	  	   	   	selectionMode: sap.ui.table.SelectionMode.Single,
  	  	   	   	//navigationMode: sap.ui.table.NavigationMode.Paginator,
   	       });
  	       /*
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "DetailResultCycle",
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
  	        
  	       */
  	      
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{TEST_SUITE_NAME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Suite Name"}),
  	           template : oControl,
  	           sortProperty : "TEST_SUITE_NAME",
  	           filterProperty : "TEST_SUITE_NAME",
  	       }));
  	       
  	       var linkView = sap.ui.getCore().byId("link_lifetimeTestCaseLink"); //link to open     
	       var oDialog = sap.ui.getCore().byId("linkDialog");
	       var oView = sap.ui.getCore().byId("link_detailResultCycleLink"); // this file link 
	       
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Case Name"}),
  	           //width: '0px',
  	           sortProperty : "TEST_CASE_NAME",
  	           filterProperty : "TEST_CASE_NAME",
  	           editable: false,
  	           template: new sap.ui.commons.Link({
	    		   text : { 
	    			   path : 'TEST_CASE_NAME'
	    		   },
	    		   press : function(value){
	    			   var cycle = oView.data("my_data").cycle;
	    			   var catalog = oView.data("my_data").catalog;
	    			   var testCase = this.getText();
	    			   linkView.data("my_data", {'cycle': cycle, 'catalog': catalog, 'testCase': testCase, 'init': false, 'back_id': "link_detailResultCycleLink"}); //go back to this file link 
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(linkView);
	    		   }
	            }),	  
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
  	       
  	       /*
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{ASSGINEE}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Assginee"}),
  	           template : oControl,
  	           sortProperty : "ASSGINEE",
  	           filterProperty : "ASSGINEE",
  	       }));
  	       */
  	       
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
  	    	   text : "{START_DATE}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Start Date"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "START_DATE"
  	           //editable: false
  	       }));
  	       
  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{END_DATE}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "End Date"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "END_DATE"
  	           //editable: false
  	       }));

  	       var oControl = new sap.ui.commons.TextView({
  	    	   text : "{EXEC_TIME}"});
  	       oTable.addColumn(new sap.ui.table.Column({
  	           label : new sap.ui.commons.Label({text : "Total Time"}),
  	           template : oControl,
  	           //width: '0px',
  	           sortProperty : "EXEC_TIME"
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
 
  	       oTable.bindRows("/"); //tree table binding
		   oLayoutTable.createRow(oTable);
		   
		   var oToolbar1 = new sap.ui.commons.Toolbar();
 	       oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);
 	       oLayout.createRow(oToolbar1);
 	      
 	       var oCreate = new sap.ui.commons.Button({
 	    	   text : "back",
 	    	   tooltip : "click to go back",
 	    	   press : function() {
 	    		   var id = oView.data('my_data').back_id;
 	    		   var linkView = sap.ui.getCore().byId(id);
 	    		   oDialog.removeAllContent();
 	    		   oDialog.addContent(linkView);
 	           }
 	    	});
 	    	oToolbar1.addItem(oCreate);
 	        
		   //main 
		   oLayout.createRow(oLayoutTable);
		   return oLayout;  
     }

});
