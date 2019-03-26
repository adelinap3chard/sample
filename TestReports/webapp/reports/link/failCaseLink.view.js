sap.ui.jsview("TestReports.reports.link.failCaseLink", {

      getControllerName : function() {
         return "TestReports.reports.link.failCaseLink";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "failCaseLinkTable",
  	    	   title : "Fail Cases Table",
 	    	   //width : "100%",
 	    	   visibleRowCount: 20,
 	    	   firstVisibleRow: 3,
 	    	   selectionMode: sap.ui.table.SelectionMode.Single,
 	    	   //navigationMode: sap.ui.table.NavigationMode.Paginator,
	        });
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
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_SUITE_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Suite Name"}),
  	            template : oControl,
  	            width: '150px',
  	            sortProperty : "TEST_SUITE_NAME",
  	            enableColumnFreeze : true,
  	            
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{TEST_CASE_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Case Name"}),
  	            template : oControl,
  	            width: '150px',
  	            sortProperty : "TEST_CASE_NAME",
  	            enableColumnFreeze : true,
  	            
  	            //editable: false
  	            	
  	        }));
  	        var oControl = new sap.ui.commons.TextView({
  				text : "{RESULT}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Result"}),
  	            //template : oControl,
  	            width: '70px',
  	            sortProperty : "RESULT",
  	            enableColumnFreeze : true,
	            
  	            //editable: false,
  	            template: new sap.ui.commons.TextView({
 	    		   text : { 
 	    			   path : 'RESULT',
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
  	            width: '150px',
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
