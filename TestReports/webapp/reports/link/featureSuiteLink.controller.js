sap.ui.controller("TestReports.reports.link.featureSuiteLink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("featureSuiteLinkTable");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter(my_data.cycle, my_data.feature);
		    	oTable.setTitle(my_data.feature);
		    	oTable.setModel(oModel);
			},
			applyFilter : function(cycle, feature) {
				url = "/TestReports/featureSuiteReport.xsjs?cycle=" + cycle +"&feature="+ feature;		
				var model = getModelWithData(url);
				return model;
			}
		});
