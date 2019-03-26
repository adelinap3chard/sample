sap.ui.jsview("TestReports.forms.login", {

    getControllerName : function() {
        return "TestReports.forms.login";
    },

    createContent : function(oController) {
    	var oLayout = new sap.ui.commons.layout.AbsoluteLayout({width:"340px",height:"150px"});
    	oLayout.addStyleClass("CustomStyle"); //Add some additional styling for the border

    	var oLabel = new sap.ui.commons.Label({text:"User Name"});
    	var oNameInput = new sap.ui.commons.TextField({id: "UserName", width:"190px"});
    	oLabel.setLabelFor(oNameInput);
    	oLayout.addContent(oLabel, {right:"248px",top:"20px"});
    	oLayout.addContent(oNameInput, {left:"110px",top:"20px"});

    	oLabel = new sap.ui.commons.Label({text:"Password"});
    	oPWInput = new sap.ui.commons.PasswordField({width:"190px"});
    	oLabel.setLabelFor(oPWInput);
    	oLayout.addContent(oLabel, {right:"248px",top:"62px"});
    	oLayout.addContent(oPWInput, {left:"110px",top:"62px"});
      
    	return oLayout;
    },
});
