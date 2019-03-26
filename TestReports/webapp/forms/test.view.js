sap.ui.jsview("TestReports.forms.test", {

    getControllerName : function() {
        return "TestReports.forms.test";
    },

    createContent : function(oController) {
        var layout = new sap.ui.commons.layout.MatrixLayout({
            id : 'testpageaMatrix',
            layoutFixed : false,
 
    });

       
        //Action buttons
        var oToolbar1 = new sap.ui.commons.Toolbar("testTb1");
    	oToolbar1.setDesign(sap.ui.commons.ToolbarDesign.Standard);

    	var oCreate = new sap.ui.commons.Button("b1",{
    		text : "click here",
    		tooltip : "click here to see page2",
    		press : function() {
    			oController.navigateToPage("Test1");
    			
            }
    	});
    	oToolbar1.addItem(oCreate);
    	

        	
       
        layout.createRow(oToolbar1);
                
        //
        // Display Layout
        this.addContent(layout);
        
    },
    
    
});
