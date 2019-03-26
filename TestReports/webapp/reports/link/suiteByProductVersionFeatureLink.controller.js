sap.ui.controller("TestReports.reports.link.suiteByProductVersionFeatureLink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("suiteByProductVersionFeatureTable");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter(my_data.product, my_data.version, my_data.feature);
		    	oTable.setTitle(my_data.feature);
		    	oTable.setModel(oModel);
			},
			applyFilter : function(product,version, feature) {
				url = "/TestReports/suiteByProductVersionFeatureReport.xsjs?product=" + product +"&version="+ version +"&feature="+ feature;		
				var model = getModelWithData(url);
				return model;
			}
		});
