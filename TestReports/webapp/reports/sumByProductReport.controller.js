sap.ui.controller("TestReports.reports.sumByProductReport",
		{
			onBeforeRendering : function() {
				var oTable = sap.ui.getCore().byId("sumByProductReportTable");
				var my_data = this.getView().data("my_data");
				var oModel = this.applyFilter();
		    	oTable.setTitle("Accumulative summary for each product of RTC: ");
		    	oTable.setModel(oModel);
			},
			applyFilter : function() {
				url = "/TestReports/accumulativeProductReport.xsjs?";		
				var model = getModelWithData(url);
				return model;
			}
		});

