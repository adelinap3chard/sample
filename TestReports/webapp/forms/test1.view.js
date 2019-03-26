sap.ui.jsview("TestReports.forms.test1", {

    getControllerName : function() {
        return "TestReports.forms.test1";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'test1Matrix',
            layoutFixed : false,
            //width : '1000px',
        });
        
        oViewMessage = new sap.ui.commons.TextView("test1Msg",{
			text: "To manage a test1 user, please select one of the button below to create a new test1 user, or update exiting test1 User or remove an entry of a test1 user."
		});

        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("test1Tb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("test_tb1",{
    		text : "back",
    		tooltip : "click to go back to test",
    		press : function() {
    			oController.navigateToPage("Test");
    			
            }
    	});
    	oToolbar1.addItem(oCreate);
    
        //layout 	
        layout.createRow(oViewMessage);
        layout.createRow(oToolbar1);
        
        // Display Layout
        this.addContent(layout);
        
    },
  
 
    

});
