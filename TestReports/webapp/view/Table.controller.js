sap.ui.controller("TestReports.view.Table",
		{

			/**
			 * Called when a controller is instantiated and its View controls
			 * (if available) are already created. Can be used to modify the
			 * View before it is displayed, to bind event handlers and do other
			 * one-time initialization.
			 */
			// onInit: function() {
			//
			// },
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the
			 * controller's View is re-rendered (NOT before the first rendering!
			 * onInit() is used for that one!).
			 */
			onBeforeRendering : function() {
				var currentValueProduct = sap.ui.getCore().byId("TestStatusTableProductList").getValue();
				var currentValueVersion = sap.ui.getCore().byId("TestStatusTableVersionList").getValue();
				
			
				var fromDate = sap.ui.getCore().byId("date1").getYyyymmdd();
				var toDate = sap.ui.getCore().byId("date2").getYyyymmdd();
				
				var oTestResult = sap.ui.getCore().byId("DetailTestResult");
				var oModel = oTestResult.getModel();
				if (oModel) {
					var oData = oModel.getData();
					if ((oData.d.results.length == 0) || 
							(oData.d.results[1].PRODUCT != currentValueProduct)
							|| (oData.d.results[1].VERSION != currentValueVersion)) {

						oModel = this.applyFilter(currentValueProduct, currentValueVersion, this.formatDate(fromDate), this.formatDate(toDate));
						oTestResult.setModel(oModel);
					}
				} else {
					var today = (new Date()).toISOString().slice(0,10);
					oModel = this.applyFilter(currentValueProduct, currentValueVersion, today, today);
					oTestResult.setModel(oModel);
				}
			},

			/**
			 * Called when the View has been rendered (so its HTML is part of
			 * the document). Post-rendering manipulations of the HTML could be
			 * done here. This hook is the same one that SAPUI5 controls get
			 * after being rendered.
			 */
			// onAfterRendering: function() {
			//
			// },
			/**
			 * Called when the Controller is destroyed. Use this one to free
			 * resources and finalize activities.
			 */
			// onExit: function() {
			//
			// }
			applyFilter : function(product, version, result, fromDate, toDate) {
				var url = "/TestReports/odata/getTestResult.xsodata/LIST/?";
				if (result == '' || result == undefined){
					if (product != '' && version != '' && fromDate != '' && toDate != '') {
						url += "$filter=PRODUCT%20eq%20'" + product + "'%20and%20" + "VERSION%20eq%20'" + version + "'%20and%20" + "SCH_DATE%20ge%20'" + fromDate + "'%20and%20" + "SCH_DATE%20lt%20'" + toDate + "'&"
					}
				}
				else{
					if (product != '' && version != '' && fromDate != '' && toDate != '') {
						url += "$filter=PRODUCT%20eq%20'" + product + "'%20and%20" + "VERSION%20eq%20'" + version + "'%20and%20" + "SCH_DATE%20ge%20'" + fromDate + "'%20and%20" + "SCH_DATE%20lt%20'" + toDate +"'%20and%20" + "TEST_STATUS%20eq%20'" + result + "'&"
					}
				}
				url += "$format=json";

				return getModelWithData(url);

			},
		      
		    formatDate : function(date) {
		    	var yyyy = date.slice(0, 4);
				var MM = date.slice(4, 6);
				var dd = date.slice(6, 8);
				return yyyy + "-" + MM + "-" + dd
			},

			getListModel : function(kindOfList, productFilter) {

				var url = "/TestReports/odata/get" + kindOfList + "List.xsodata/LIST/?$format=json";
				if (productFilter != null && productFilter != '') {
					url += "&$filter=PRODUCT%20eq%20%27" + productFilter + "%27";
				}
				return this.getModelWithData(url);
			},

			getModelWithData : function (url){
				
				var oModel = new sap.ui.model.json.JSONModel();// url);

				$.ajax({
					url : url, // for different servers cross-domain
								// restrictions need to be handled
					async : false,
					contentType : "application/json; charset=utf-8",
					dataType : "json",
					success : function(data, textStatus, jqXHR) { // callback called when data is received

						oModel.setData(data); // fill the received data into the JSONModel
						
					},
					error : function(jqXHR, textStatus, errorThrown) {
						alert(jqXHR);
						alert(textStatus);
						alert(errorThrown);
					}
				});
				
				return oModel;
				
			},

			getDropdown : function(kindOfDD, keyDD, productFilter) {

				var oItemTemplateBranch = new sap.ui.core.ListItem();
				oItemTemplateBranch.bindProperty("text", keyDD);

				var dropdownBoxKey = "TestStatusTable" + kindOfDD + "List";
				var oDropdownBox = new sap.ui.commons.DropdownBox(dropdownBoxKey);
				oDropdownBox.bindItems("/d/results", oItemTemplateBranch);

				var oListModel = this.getListModel(kindOfDD, productFilter); //get the JSON model which contains the data
				oListModel.iSizeLimit = 2000;
				
				oDropdownBox.setModel(oListModel);

				return oDropdownBox;
			},

			getTable : function() {
				
				var oTable = new sap.ui.table.DataTable({
					id : "DetailTestResult",
					title: "Details report",
					width : "100%",
					//visibleRowCount: 10,
					selectionMode : sap.ui.table.SelectionMode.Single,
				});
				
				//var oTable = new sap.ui.table.Table("DetailTestResult");

				var oControl = new sap.ui.commons.TextView({
					text : "{PRODUCT}"
				}); // short binding notation
				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Product Name"
					}),
					template : oControl,
					sortProperty : "PRODUCT",
					filterProperty : "PRODUCT",
					//width : "100px"
				}));
				
				
				var oControl = new sap.ui.commons.TextView({
					text : "{VERSION}"
				}); // short binding notation
				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Product Version"
					}),
					template : oControl,
					sortProperty : "VERSION",
					filterProperty : "VERSION",
					//width : "100px"
				}));

				var oControl = new sap.ui.commons.TextView({
					text : "{PLATFORM}"
				});

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Platform"
					}),
					template : oControl,
					sortProperty : "PLATFORM",
					filterProperty : "PLATFORM",
					//width : "100px"
				}));
				
				var oControl = new sap.ui.commons.TextView({
					text : "{TESTCASE}"
				}); // short binding notation

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Test Case"
					}),
					template : oControl,
					sortProperty : "TESTCASE",
					filterProperty : "TESTCASE",
					//width : "100px"
				}));

				var oControl = new sap.ui.commons.TextView({
					text : "{TEST_STATUS}"
				}); // short binding notation

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Test Status"
					}),
					template : oControl,
					sortProperty : "TEST_STATUS",
					filterProperty : "TEST_STATUS",
					//width : "50px"
				}));
				var oControl = new sap.ui.commons.TextView({
					text : "{TESTER}"
				}); // short binding notation

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Tester"
					}),
					template : oControl,
					sortProperty : "TESTER",
					filterProperty : "TESTER"
				}));

				var oControl = new sap.ui.commons.TextView({
					text : "{SCH_DATE}"
				}); // short binding notation

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Start Time"
					}),
					template : oControl,
					sortProperty : "SCH_DATE",
					filterProperty : "SCH_DATE"
				}));

				var oControl = new sap.ui.commons.TextView({
					text : "{EXEC_TIME}"
				});

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Execution Time"
					}),
					template : oControl,
					sortProperty : "EXEC_TIME",
					filterProperty : "EXEC_TIME",
					//width : "100px"
				}));
				
			
				var oControl = new sap.ui.commons.TextView({
					text : "{CYCLE_NAME}"
				});

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "Cycle"
					}),
					template : oControl,
					sortProperty : "CYCLE_NAME",
					filterProperty : "CYCLE_NAME",
					//width : "100px"
				}));
		
				
				var oControl = new sap.ui.commons.TextView({
					text : "{BUG_ID}"
				});

				oTable.addColumn(new sap.ui.table.Column({
					label : new sap.ui.commons.Label({
						text : "BUG ID"
					}),
					template : oControl,
					sortProperty : "BUG_ID",
					filterProperty : "BUG_ID",
					//width : "100px"
				}));
		
				
				return oTable;

			}

		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
