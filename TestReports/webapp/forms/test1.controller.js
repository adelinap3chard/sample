sap.ui.controller("TestReports.forms.test1", {
	navigateToPage: function(view) {
		var oShell = sap.ui.getCore().byId("myShell");
		var oTarget = sap.ui.getCore().byId(view);
		oShell.setContent(oTarget);
	}
});
 
