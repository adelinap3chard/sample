sap.ui.controller("TestReports.reports.archive",
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
				var oDropdownBoxTestPlan = sap.ui.getCore().byId("ManualTestStatusTableManualTestPlanList");
				
				var oListModel = this.getListModel("ManualTestPlan", null);
				oDropdownBoxTestPlan.setModel(oListModel);
	   	    	 
				var currentValueTestPlan = oDropdownBoxTestPlan.getValue();

				var oTestResult = sap.ui.getCore().byId("ManualTestReport");
				var oModel = this.applyFilter(currentValueTestPlan);
				oTestResult.setTitle(currentValueTestPlan);
				oTestResult.setModel(oModel);
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
			applyFilter : function(testPLan) {
				var url = "/TestReports/odata/getManualTestResults.xsodata/LIST/?";
				if (testPLan != '') {
					url += "$filter=TEST_PLAN%20eq%20'" + testPLan + "'&";
				}
				url += "$format=json";

				var model = getModelWithData(url);
				
				// mold data to fit TreeTable model
				var data = model.getData();
				var oData = {
						root: {}
				};
				var used_index = {};
				var current_index = 0;
				var results = data.d.results;
				var length = results.length;
				for (var i = 0; i < length; i++) {
					delete results[i].__metadata;
					var index = used_index[results[i].TEST_CYCLE];
					if (index == undefined) { // new catalog
						index = current_index;
						used_index[results[i].TEST_CYCLE] = index;
						oData["root"][index] = results[i];
						// insert empty row between catalog group
						oData["root"][++current_index] = {};
						++current_index;
					}
					else { // existing catalog, use CASE_NAME to insert under existing
						oData["root"][index][results[i].CASE_NAME] = results[i];
						results[i].TEST_CYCLE = '';
					}
				}
				model.setData(oData);
				
				return model;

			},
		      
		    formatDate : function(date) {
		    	var yyyy = date.slice(0, 4);
				var MM = date.slice(4, 6);
				var dd = date.slice(6, 8);
				return yyyy + "-" + MM + "-" + dd
			},

			getListModel : function(kindOfList, productFilter) {

				var url = "/TestReports/odata/get" + kindOfList + "List.xsodata/LIST/?$format=json";

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

				var dropdownBoxKey = "ManualTestStatusTable" + kindOfDD + "List";
				var oDropdownBox = new sap.ui.commons.DropdownBox(dropdownBoxKey);
				oDropdownBox.bindItems("/d/results", oItemTemplateBranch);

				var oListModel = this.getListModel(kindOfDD, productFilter); //get the JSON model which contains the data
				oListModel.iSizeLimit = 2000;
				
				oDropdownBox.setModel(oListModel);

				return oDropdownBox;
			}
		});
// @ sourceURL=./businessLogic/MakeRate/Table.controller.js
