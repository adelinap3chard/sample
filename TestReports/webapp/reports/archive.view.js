sap.ui.jsview("TestReports.reports.archive", {

      getControllerName : function() {
         return "TestReports.reports.archive";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout with 3 columns
  	       var oLayoutMain = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
  	    		layoutFixed : true,
	    	  	columns : 3,
	    	  	width : '600px'});
	    	  	
  	       oLayoutFilter.setWidths(["20px","30px","50px"]);
 
  	       
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.TreeTable({
  	    	   columns: [
  	    	       new sap.ui.table.Column({label: "Catalog", template: "TEST_CYCLE"}),
  	    	       new sap.ui.table.Column({label: "Feature", template: "CASE_NAME"}),
  	    	       new sap.ui.table.Column({label: "Assignee", template: "USER_NAME"}),
  	    	       new sap.ui.table.Column({label: "Total Tests", template: "TOTAL_TESTS"}),
  	    	       new sap.ui.table.Column({label: "Pass", template: "PASS"}),
  	    	       new sap.ui.table.Column({label: "Fail", template: "FAIL"}),
  	    	       new sap.ui.table.Column({label: "Skip Tests", template: "SKIP_TESTS"}),
  	    	       new sap.ui.table.Column({label: "Pass Rate",
  	    	    	   template: new sap.ui.commons.TextView({
  	    	    		   text : { 
  	    	    			   path : 'PASS_RATE',
  	    	    			   formatter : function(value){
  	    	    				   if (value != undefined) {
  	    	    					   this.removeStyleClass('green');  
  	    	    					   this.removeStyleClass('yellow');  
  	    	    					   this.removeStyleClass('red');  
  	    	    					   // Set style Conditionally  
  	    	    					   if (value < 75) {
	  	        						   this.addStyleClass('red');
	  	        					   } else if(value < 90 && value >= 75) {  
	  	        						   this.addStyleClass('yellow');  
	  	        					   } /*else {  
	  	        						   this.addStyleClass('green');
	  	        					   }  */
  	    	    					   return value + "%";
  	    	    				   }
  	    	    				   else
  	    	    					   return value;
  	    	    			   }
  	    	    		   }
  	    	           }),
  	    	       }),
  	    	       new sap.ui.table.Column({label: "Comments", template: "BUG_LIST"}),
  	    	       new sap.ui.table.Column({label: "Test Case", template: "TEST_CASE_NAME"})
  	    	
  	    	   ],
  	    	   id: "ManualTestReport",
  	    	   width : "100%",
	  	   	   selectionMode: sap.ui.table.SelectionMode.Single,
	  	   	   //enableColumnReordering: true,
	  	   	   expandFirstLevel: true,
	  	       enableColumnFreeze : true,
	  	   	   visibleRowCount: 20
  	       });
		   oTable.bindRows("/root");

			//dropdown menu
			//product dropdown   
            var oDropdownBoxTestPlan = oController.getDropdown("ManualTestPlan", "TEST_PLAN", null);
            var initialTestPlan = null;
            var oModel = oDropdownBoxTestPlan.getModel();
			if (oModel) {
				var oData = oModel.getData();
				initialTestPlan = oData.d.results[0].TEST_PLAN;
			}

		    //add drop downs to layout matrix
			//Create row template     
			oLayoutFilter.createRow("Test Plan:",oDropdownBoxTestPlan),"";

			//actions
		    oLayoutFilter.createRow(new sap.ui.commons.Button({text: "Apply filter", press:function(){ 	
		    	
		    	var oModel = oController.applyFilter(oDropdownBoxTestPlan._sTypedChars);
		    	oTable.setTitle(oDropdownBoxTestPlan._sTypedChars);
		    	oTable.setModel(oModel);
		    	// sap.ui.getCore().byId("buildStatus").setModel(oModel);
		    	
		    }}));
		    
		    oLayoutFilter.createRow("\n");
		    oLayoutTable.createRow(oTable);
		    
		    oLayoutMain.createRow(oLayoutFilter);	    
		    oLayoutMain.createRow(oLayoutTable);
		    
		    return oLayoutMain;
    	  
      }

});
