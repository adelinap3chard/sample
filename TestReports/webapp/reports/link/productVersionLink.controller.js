sap.ui.controller("TestReports.reports.link.productVersionLink",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("productVersionTable");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter(my_data.product, my_data.version);
		    	oTable.setTitle("summary of product by version");
		    	oTable.setModel(oModel);
			},
			applyFilter : function(product, version) {
				url = "/TestReports/productVersionReport.xsjs?product=" + product +"&version="+ version;		
				var model = getModelWithData(url);
				return model;
			}
		});
