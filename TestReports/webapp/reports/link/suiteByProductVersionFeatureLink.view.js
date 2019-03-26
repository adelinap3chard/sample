sap.ui.jsview("TestReports.reports.link.suiteByProductVersionFeatureLink", {

      getControllerName : function() {
         return "TestReports.reports.link.suiteByProductVersionFeatureLink";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "suiteByProductVersionFeatureTable",
  	    	   title : "Summary by Product version and Feature",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });
  	       var oControl = new sap.ui.commons.TextView({
				text : "{TEST_CYCLE_TAG}"});
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Cycle"}),
	            template : oControl,
	            width: '150px',
	            sortProperty : "TEST_CYCLE_TAG",
	            enableColumnFreeze : true,
	            
	        }));
  	       var oControl = new sap.ui.commons.TextView({
				text : "{TEST_CATALOG}"});
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Catalog"}),
	            template : oControl,
	            width: '150px',
	            sortProperty : "TEST_CATALOG",
	            enableColumnFreeze : true,
	            
	        }));
  	       var oControl = new sap.ui.commons.TextView({
 				text : "{TEST_FEATURE}"});
 	        oTable.addColumn(new sap.ui.table.Column({
 	            label : new sap.ui.commons.Label({text : "Feature"}),
 	            template : oControl,
 	            width: '150px',
 	            sortProperty : "TEST_FEATURE",
 	            enableColumnFreeze : true,
 	            
 	        }));
  	       var oControl = new sap.ui.commons.TextView({
  				text : "{ASSGINEE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "ASSIGNEE"}),
  	            template : oControl,
  	            width: '150px',
  	            sortProperty : "ASSGINEE",
  	            enableColumnFreeze : true,
  	            
  	        }));
  	        
  	        // pops up link for case from suite name
  	        var linkView = sap.ui.getCore().byId("link_lifetimeDetailResultCycleLink");	 //to open     
	        var oDialog = sap.ui.getCore().byId("linkDialog");
	        var oView = sap.ui.getCore().byId("link_suiteByProductVersionFeatureLink"); // this link 
	        
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
	    			   var cycle = value.getSource().getBindingContext().getObject().TEST_CYCLE_TAG;
	    			   var catalog = value.getSource().getBindingContext().getObject().TEST_CATALOG;
	    			   //var cycle = oView.data("my_data").cycle;
	    			   //var catalog = oView.data("my_data").catalog;
	    			   var suite = this.getText();
	    			   linkView.data("my_data", {'cycle': cycle, 'catalog': catalog, 'suite': suite, 'init': false, 'back_id': "link_suiteByProductVersionFeatureLink"}); // back to this link
	    			   oDialog.removeAllContent();
	    			   oDialog.addContent(linkView);
	    		   }
 	            }),	   
  	        }));
  	        
  	        /*
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_SUITE_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Suite Name"}),
  	            template : oControl,
  	            width: '150px',
  	            sortProperty : "TEST_SUITE_NAME",
  	            enableColumnFreeze : true,
  	        }));
  	        */
  	        
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_PRODUCT_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product"}),
  	            template : oControl,
  	            width: '150px',
  	            sortProperty : "TEST_PRODUCT_NAME",
  	            enableColumnFreeze : true,
  	           
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_PRODUCT_VERSION}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product Version"}),
  	            template : oControl,
  	            width: '70px',
  	            sortProperty : "TEST_PRODUCT_VERSION",
  	            enableColumnFreeze : true,
 	        }));
  	        
  	       var oControl = new sap.ui.commons.TextView({
				text : "{UPDATE_TS}"});
	        oTable.addColumn(new sap.ui.table.Column({
	            label : new sap.ui.commons.Label({text : "Last update"}),
	            template : oControl,
	            width: '70px',
	            sortProperty : "UPDATE_TS",
	            enableColumnFreeze : true,
	       }));
	        
	  	   var oControl = new sap.ui.commons.TextView({
				text : "{TEST_DETAILS}"});
		   oTable.addColumn(new sap.ui.table.Column({
		        label : new sap.ui.commons.Label({text : "Details"}),
		        template : oControl,
		        width: '70px',
		        sortProperty : "TEST_DETAILS",
		        enableColumnFreeze : true,
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
