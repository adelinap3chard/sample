sap.ui.jsview("TestReports.reports.testresults", {

      getControllerName : function() {
         return "TestReports.reports.testresults";
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
 	    	  width: "100%"// table width
 	    	  });
 		
 			var oTable = oController.getTable();
 			oTable.bindRows("/d/results");

 			//dropdown menu
 			//product dropdown   
             var oDropdownBoxProduct = oController.getDropdown("Product", "PRO_NAME", null);
             var initialProduct = null;
             var oModel = oDropdownBoxProduct.getModel();
 			if (oModel) {
 				var oData = oModel.getData();
 				if (oData.d.results[0] != null) {
 					initialProduct = oData.d.results[0].PRODUCT;
 				}
 			}
 		      
 			//version dropdown
             var oDropdownBoxVersion = oController.getDropdown("Version", "VERSION", initialProduct);
             var oDropdownBoxResult = oController.getDropdown("Result", "TEST_STATUS", null);
             
 			//schedule dropdown
             //var oDropdownBoxScheduleDate = oController.getDropdown("From", "SCHEDULEDATE", null);
         	// create a simple DatePicker
             var today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
 			var oDatePicker1 = new sap.ui.commons.DatePicker('date1');
 			oDatePicker1.setYyyymmdd(today);
 			oDatePicker1.setLocale("en-US"); // Try with "de" or "fr" instead!
 			oDatePicker1.attachChange(
 					function(oEvent){
 						if(oEvent.getParameter("invalidValue")){
 							oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
 						}else{
 							oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
 						}
 					}
 			);
 			
 			var oDropdownSchedule = new sap.ui.commons.DropdownBox("Schedule", {
 				tooltip: "Schedule",
 				items: [new sap.ui.core.ListItem("Today",{text: "Today", key: "Today"}),
 				        new sap.ui.core.ListItem("Last3",{text: "Last 3 Days", key: "Last3"}),
 				        new sap.ui.core.ListItem("LastWeek",{text: "Last Week", key: "LastWeek"}),
 				        new sap.ui.core.ListItem("DateRange",{text: "Select Date Range", key: "DateRange"})]
 			});

 			var oDatePicker2 = new sap.ui.commons.DatePicker('date2');
 			oDatePicker2.setYyyymmdd(today);
 			oDatePicker2.setLocale("en-US"); // Try with "de" or "fr" instead!
 			oDatePicker2.attachChange(
 					function(oEvent){
 						if(oEvent.getParameter("invalidValue")){
 							oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
 						}else{
 							oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
 						}
 					}
 			);

 		    //add drop downs to layout matrix
 			//Create row template     
 			oLayoutFilter.createRow("Product:",oDropdownBoxProduct),"";
 			oLayoutFilter.createRow("Version:",oDropdownBoxVersion,"");
 			oLayoutFilter.createRow("Result:",oDropdownBoxResult,"");
 			
 			oLayoutFilter.createRow("Time:",oDropdownSchedule,"");
 			oLayoutFilter.createRow("","or Date: (select date range)"),"";	
 			oLayoutFilter.createRow("","From:",oDatePicker1);
 			oLayoutFilter.createRow("","To:",oDatePicker2);
 			
 		
 			oDropdownBoxProduct.attachChange(function() {
    	    	 var oListModel = oController.getListModel("Version", oDropdownBoxProduct.getValue());
    	    	 oDropdownBoxVersion.setModel(oListModel);
   			});
 			
 			
 			//actions
 		    oLayoutFilter.createRow(new sap.ui.commons.Button({text: "Apply filter", press:function(){

 		    	var toDate = (new Date(new Date().setTime( new Date().getTime() + 1 * 86400000 ))).toISOString().slice(0,10);
 		    	var fromDate;
 		    	var id = oDropdownSchedule.getSelectedItemId();
 		    	if (id === "Today") {
 		    		fromDate = (new Date()).toISOString().slice(0,10);
 		    	}
 		    	else if (id === "Last3") {
 		    		fromDate = (new Date(new Date().setTime( new Date().getTime() - 2 * 86400000 ))).toISOString().slice(0,10);
 		    	}
 		    	else if (id === "LastWeek") {
 		    		fromDate = (new Date(new Date().setTime( new Date().getTime() - 6 * 86400000 ))).toISOString().slice(0,10);
 		    	}
 		    	else {
 		    		var to = new Date(oController.formatDate(oDatePicker2.getYyyymmdd()));
 		    		toDate = (new Date(new Date().setTime( to.getTime() + 1 * 86400000 ))).toISOString().slice(0,10);
 		    		fromDate = oController.formatDate(oDatePicker1.getYyyymmdd());
 		    	}		    	
 		    	
 		    	var oModel = oController.applyFilter
 		    			(oDropdownBoxProduct._sTypedChars,
 		    			 oDropdownBoxVersion._sTypedChars,
 		    			 oDropdownBoxResult._sTypedChars,
 		    			 fromDate, toDate);
 		    	
 		    	oTable.setModel(oModel);
 		    	// sap.ui.getCore().byId("DetailTestResult").setModel(oModel);
 		    	
 		    }}));
 		    
 		    oLayoutFilter.createRow("\n");
 		    oLayoutTable.createRow(oTable);
 		    
 		    oLayoutMain.createRow(oLayoutFilter);	    
 		    oLayoutMain.createRow(oLayoutTable);
 		    
 		    return oLayoutMain;
     	  
       }

 });
