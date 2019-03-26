sap.ui.jsview("TestReports.reports.testplanreport", {

      getControllerName : function() {
         return "TestReports.reports.testplanreport";
      },
      
      createContent : function(oController) {

    	   //Create a matrix layout
  	       var oLayoutMain = new sap.ui.commons.layout.MatrixLayout();
  	       
  	       var oLayoutFilter = new sap.ui.commons.layout.MatrixLayout({
  	    		layoutFixed : true,
	    	  	columns : 3,
	    	  	width : '600px'});
	    	  	
  	       oLayoutFilter.setWidths(["20px","50px","30px"]);
  	       
  	       //****************************************************************************************
  	       // table layout
  	       var oLayoutTable = new sap.ui.commons.layout.MatrixLayout({
	    	  width: "100%"  // table width
	    	  });
  	       
  	       var oTable = new sap.ui.table.TreeTable({
  	    	    id: "TestPlanReportTable",
  	    	    //width: "100%",
 	  	   	   	visibleRowCount: 20,
 	  	   	   	selectionMode: sap.ui.table.SelectionMode.Single,
 	  	   	   	//navigationMode: sap.ui.table.NavigationMode.Paginator,
  	    	    
  	       });
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{TS_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Suite"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TS_NAME",
  	            enableColumnFreeze : true,
  	            width : '150px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{TC_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Case"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "TC_NAME",
  	            enableColumnFreeze : true,
  	            width : '150px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{PRO_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Product"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "PRO_NAME",
  	            enableColumnFreeze : true,
  	            width : '70px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{PRO_VER}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Version"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "PRO_VER",
  	            enableColumnFreeze : true,
  	            width : '50px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{PLAT_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Platform"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "PLAT_NAME",
  	            enableColumnFreeze : true,
  	            width : '50px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{OS_NAME}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "OS"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "OS_NAME",
  	            enableColumnFreeze : true,
  	            width : '50px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{ASSGINEE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Assignee"}),
  	            template : oControl,
  	            //width: '0px',
  	            sortProperty : "ASSGINEE",
  	            filterProperty : "ASSGINEE",
  	            enableColumnFreeze : true,
  	            width : '70px'
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
  	            width : '70px'
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{STARTDATE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "StartDate"}),
  	            template : oControl,
  	            width: '70px',
  	            //sortProperty : "STARTDATE",
  	            enableColumnFreeze : true
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{ENDDATE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "EndDate"}),
  	            template : oControl,
  	            width: '70px',
  	            //sortProperty :"ENDDATE",
  	            enableColumnFreeze : true,
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{FEATURE}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Feature"}),
  	            template : oControl,
  	            width: '70px',
  	            //sortProperty : "FEATURE",
  	            enableColumnFreeze : true
  	            //editable: false
  	            	
  	        }));
 	        var oControl = new sap.ui.commons.TextView({
  				text : "{CATALOG}"});
  	        oTable.addColumn(new sap.ui.table.Column({
  	            label : new sap.ui.commons.Label({text : "Catalog"}),
  	            template : oControl,
  	            width: '70px',
  	            //sortProperty : "CATALOG",
  	            enableColumnFreeze : true
  	            //editable: false
  	            	
  	        }));
  	        
  	       oTable.bindRows("/root"); // so that it shows tree without root
		   
  	       //****************************************************************************************
			//dropdown menu 
  	        var oModel = null; //getODataModel("/TestCycle", "/TestReports/odata/getTestCycleList.xsodata");
            var oDropdownBoxTestCycle = getDropdownWithModel("TestReportCycle", "CYC_TAG", oModel);
            oDropdownBoxTestCycle.setWidth("350px");
 		    
  	    	//apply filter button 
  	    	var applyBnt = new sap.ui.commons.Button({
  	    		text: "Apply filter", 
  	    		tooltip: "This will run query and display results in table below",
  	    		press:function(){
		    	//window.open("/TestReports/webapp/reports/testcasereport.xsjs?caseName=" + oDropdownBoxTestCase.getValue());
		    	var oModel = oController.applyFilter(oDropdownBoxTestCycle._sTypedChars);
		    	oTable.setTitle("Cycle: "+ oDropdownBoxTestCycle._sTypedChars + " - Total test run: "+ oModel.oData.length);
		    	oTable.setModel(oModel);
		    
				}
		    });
		    
	  	    oViewMessage = new sap.ui.commons.TextView("CaseMsg",{
	  	    	text: "To have an overview of which test suite(s) and case(s) belongs in paticular test plan cycle. Please select the Cycle tag below and apply filter. "
	  		});		    
		    		    
   	        //add to layout matrix
		    oLayoutFilter.createRow("Select A Cycle:", oDropdownBoxTestCycle),"";
  	    	oLayoutFilter.createRow(applyBnt),"";
  	    	oLayoutTable.createRow(oTable);
		    
		    
		    //add to main layout
		    oLayoutMain.createRow(oViewMessage);
		    oLayoutMain.createRow("\n");
		    oLayoutMain.createRow(oLayoutFilter);
		    oLayoutMain.createRow("\n");
		    oLayoutMain.createRow(oLayoutTable);		    
		    return oLayoutMain;
      }
});

