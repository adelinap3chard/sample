sap.ui.jsview("businessLogic.Start", {

      getControllerName : function() {
         return "TestReport.Start";
      },

      createContent : function(oController) {
			
    	  var oLayout = new sap.ui.commons.layout.MatrixLayout({
		        width: "100%"//,          // table width
		        //widths: ["90%", "10%"]  // the widths of the columns
			});
    	  
    	    // create invisible dropdown boxes which are going to contain the currently selected value (Branch/type/build purpose/platform)
			//branch dropdown   
           oController.getDropdown("Branch", "BRANCH");
		      
			//platform dropdown
           oController.getDropdown("Platform", "PLATFORM");
		    
			//type dropdown
           oController.getDropdown("Type", "TYPE");

			//build purpose dropdown
           oController.getDropdown("BuildPurpose", "BUILD_PURPOSE");
           
		   oRadioButtonGroupMode = getRadioButtonGroup("globalTimeDimensions");
          
           new sap.ui.table.Table("dmc");
           new sap.ui.table.Table("makeQueue");
           new sap.ui.table.Table("makeQueueState");
           new sap.ui.table.Table("makeRate");
           new sap.ui.table.Table("poolSize");
           new sap.ui.table.Table("testRuntime");
           new sap.ui.table.Table("loc");
           new sap.ui.table.Table("mom");
           
           
			var oLink = new sap.ui.commons.Link({text:"TIP Hana Core Q (Berlin) - Community", href:'https://community.wdf.sap.corp/sbs/community/global_hana/hana_make_build', target:'_new'});
			
			oLayout.createRow(new sap.ui.commons.TextView({text : "Hello! \n \n This is the entry to the \'build statistics\' page. You can find this data in tables and charts." +
					" We (TIP HANA Core Q (Berlin)) created this page to simplify the analysis of trends within the software build process. This page is supposed to be a good opportunity for getting a rough overview about" +
					" the behaviour of our infrastructure. If you have any questions or ideas for improvement, please feel free to create a post at our community:"}));
			oLayout.createRow(oLink);
			oLayout.createRow(new sap.ui.commons.TextView({text :
					"\n Best regards," +  
					"\n your TIP HANA Core Q (Berlin) team\n \n"}));
			
		    return oLayout;
			
      }

});
