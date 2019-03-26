sap.ui.controller("TestReports.chart.testResults.TestChart",
		{
			onInit: function() {
//      1.Get the id of the VizFrame		
		var oVizFrame = this.getView().byId("idcolumn");
		
//      2.Create a JSON Model and set the data
		var oModel = new sap.ui.model.json.JSONModel();
		var data = {
				'Population' : [
		            {"Year": "2010","Value": "158626687"},
		            {"Year": "2011","Value": "531160986"},
		            {"Year": "2012","Value": "915105168"},
		            {"Year": "2013","Value": "1093786762"},
		            {"Year": "2014","Value": "1274018495"},
		           ]};
		oModel.setData(data);
		
//      3. Create Viz dataset to feed to the data to the graph
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions : [{
				name : 'Year',
				value : "{Year}"}],
			               
			measures : [{
				name : 'Population',
				value : '{Value}'} ],
			             
			data : {
				path : "/Population"
			}
		});		
		oVizFrame.setDataset(oDataset);
		oVizFrame.setModel(oModel);	
		oVizFrame.setVizType('column');
		
//      4.Set Viz properties
		oVizFrame.setVizProperties({
            plotArea: {
            	colorPalette : d3.scale.category20().range()
                }});
		
		var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "valueAxis",
		      'type': "Measure",
		      'values': ["Population"]
		    }), 
		    feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
		      'uid': "categoryAxis",
		      'type': "Dimension",
		      'values': ["Year"]
		    });
		oVizFrame.addFeed(feedValueAxis);
		oVizFrame.addFeed(feedCategoryAxis);
		//
		}
});