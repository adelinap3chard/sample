sap.ui.jsview("com.sap.slautomation.portal.home", {

	getControllerName : function() {
		return "com.sap.slautomation.portal.home";
	},

	createContent : function(oController) {
		
		var oMatrixLayoutHomeView = new sap.ui.commons.layout.MatrixLayout({
			width : "100%"
		});

		// WELCOME
		
		var sHtmlWelcomeText = 'What is SL CRS about?';
		sHtmlWelcomeText += '<ul><li>SL Collaboration and Report Services (SL CRS) is the place where all SL inhouse and customer\'s operations report their statuses</li>';
		sHtmlWelcomeText += '<li>It is integrated with Jenkins, Perforce, and virtual infrastructures like vCloud Drector and Microsoft Azure; provides history for all TESI operations, context-rich reports, and statistics</li>';

		var oPanelWelcome = new sap.ui.commons.Panel({
			title: new sap.ui.commons.Title({text: "Welcome"}),
			showCollapseIcon : false,
			content: new sap.ui.commons.FormattedTextView({
				htmlText: sHtmlWelcomeText
			})
		});

		oMatrixLayoutHomeView.addRow(new sap.ui.commons.layout.MatrixLayoutRow({
			cells : [ new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Begin,
				vAlign : sap.ui.commons.layout.VAlign.Top,
				content : oPanelWelcome
			}) ]
		}));
		
		// STATISTICS
		
		//-// CHART
		var oLabelChartInfo = new sap.ui.commons.Label({
			text: "Show TESI executions for specified weeks back"
		}); 
			
		var oTextFieldWeeksBack = new sap.ui.commons.TextField('oTextFieldWeeksBack', {
			 value: "8",
			 maxLength: 3,
			 width: "50px"
		}).addStyleClass("chartMarginLeftTextField");
			
		var oButtonShow = new sap.ui.commons.Button("oButtonShow", {
	        text : "Show",
	        tooltip : "Show TESI executions for specified weeks back   ",
	        press : function() {
	        	oController.onLoadActionsPerWeekChart(oTextFieldWeeksBack.getValue());
	        }
		});
			
		var oChartHolder = new sap.ui.core.HTML({content: "<div id='divChart' style='width:800px; height:500px;' />"});
		
		var oMatrixLayoutStatisticsPanel = new sap.ui.commons.layout.MatrixLayout({
			width : "100%"
		});
		
		
		//-// COUNTERS
		
		//-// COUNTERS //-// TESI
		var oLabelCounterDailyInfoTESI = new sap.ui.commons.Label({
			text: "Number of TESI executions for today:"
		}).addStyleClass("counterText").addStyleClass("counterFirst");
		var oCounterDailyHolderTESI = new sap.ui.core.HTML({content: "<div id='counterDailyTESI' class='counterDigits' />"});
		
		oMatrixLayoutStatisticsPanel.addRow(new sap.ui.commons.layout.MatrixLayoutRow({
			cells : [ 
			    new sap.ui.commons.layout.MatrixLayoutCell({
					hAlign : sap.ui.commons.layout.HAlign.Begin,
					vAlign : sap.ui.commons.layout.VAlign.Top,
					content : [oLabelChartInfo, oTextFieldWeeksBack, oButtonShow, oChartHolder]
			    }),
			    new sap.ui.commons.layout.MatrixLayoutCell({
					hAlign : sap.ui.commons.layout.HAlign.Begin,
					vAlign : sap.ui.commons.layout.VAlign.Top,
					content : [oLabelCounterDailyInfoTESI, oCounterDailyHolderTESI]
			    })]
		}));
		
		var oPanelStatistics = new sap.ui.commons.Panel({
			title : new sap.ui.commons.Title({text : "Statistics Corner"}),
			showCollapseIcon : false,
			content: oMatrixLayoutStatisticsPanel
		});
		
		oMatrixLayoutHomeView.addRow(new sap.ui.commons.layout.MatrixLayoutRow({
			cells : [ new sap.ui.commons.layout.MatrixLayoutCell({
				hAlign : sap.ui.commons.layout.HAlign.Begin,
				vAlign : sap.ui.commons.layout.VAlign.Top,
				content : oPanelStatistics
			}) ]
		}));
		
		return oMatrixLayoutHomeView;
	}
});
//@ sourceURL=./com/sap/slautomation/portal/home.view.js

