sap.ui.controller("TestReports.reports.link.failCaseLink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("failCaseLinkTable");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter(my_data.cycle, my_data.feature);
		    	oTable.setTitle(my_data.feature);
		    	oTable.setModel(oModel);
			},
			applyFilter : function(cycle, feature) {
				url = "/TestReports/failCaseReport.xsjs?cycle=" + cycle +"&feature="+ feature;		
				var model = getModelWithData(url);
				return model;
			}
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js

/*
var data = model.getData();
var filteredData = _.filter(data, function(item){
    return item.CYC_NAME === cycle;
});
model.setData(filteredData);
*/