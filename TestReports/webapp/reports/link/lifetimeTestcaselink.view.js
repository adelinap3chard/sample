sap.ui.jsview("TestReports.reports.link.lifetimeTestcaselink", {

      getControllerName : function() {
         return "TestReports.reports.link.lifetimeTestcaselink";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayout = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.DataTable({
  	    	   id : "lifetimeTestcaselink",
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
  	            label : new sap.ui.commons.Label({text : " Env Details"}),
  	            template : oControl,
  	            //width: '500px',
  	            sortProperty : "test_details"
  	            //editable: false
  	        }));
		   
  	        oTable.bindRows("/");
  	        
  	        var oToolbar1 = new sap.ui.commons.Toolbar();
  	        oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);
  	        oLayout.createRow(oToolbar1);
	      
  	        var oCreate = new sap.ui.commons.Button({
  	        	text : "back",
  	        	tooltip : "click to go back",
  	        	press : function() {
  	        		var oView = sap.ui.getCore().byId("link_lifetimeTestCaseLink");
	    		    var id = oView.data('my_data').back_id;
	    		    var linkView = sap.ui.getCore().byId(id);
	    		    var oDialog = sap.ui.getCore().byId("linkDialog");
	    		    oDialog.removeAllContent();
	    		    oDialog.addContent(linkView);
  	        	}
	    	});
	    	oToolbar1.addItem(oCreate);
  	    	 	    	
  	    	oLayoutTable.createRow(oTable);
		    oLayout.createRow(oLayoutTable);
		    return oLayout;  
      }

});
