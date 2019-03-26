sap.ui.controller("TestReports.forms.testcycleplan", {
	onBeforeRendering : function(oEvent) {
		if (this.initialize == undefined) {
			this.refresh(this);
			this.initialize = true;
			var user = getUser();
	    	if (!user.isAdmin) {
		    	var oDelete = sap.ui.getCore().byId("testCyclePlanDelete");
		    	oDelete.setEnabled(false);
	    	}
		}
	},
	
	onAfterRendering : function(oEvent) {
		var oSource = oEvent.getSource();
        oSource.$().on('contextmenu', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var element = e.target;
            while (element && !element.attributes["id"]) {
                element = element.parentElement;
            }
            if (element && element.attributes["id"]) {
                var sId = element.attributes["id"].value;
                var node = sap.ui.getCore().byId(sId);
                node.select();
                var oCyclePlanTree = sap.ui.getCore().byId("testCyclePlanTree");
                var parent = node.getParent();
    			var menu = null;
    			if (parent.sId == "testCyclePlanTree") {
    				var cycleName = node.getText();
    				menu = sap.ui.getCore().byId("cycleMenu");
    			}
    			else {
    				var cycleName = parent.getText();
    				var suiteName = node.getText();
    			}
    			if (menu != null) {
    				var offset = parseInt(e.offsetX) + " -12";
	    			var eDock = sap.ui.core.Popup.Dock;
	    			menu.open(
	    					false,
	    					node.getFocusDomRef(),
	    					eDock.BeginTop,
	    					eDock.BeginBottom,
	    					node.getDomRef(),
	    					offset
	    			);
    			}
            }
			
        })
	},
	
	refresh: function(controller) {
		var oModel = this.getCycles();
		var data = oModel.getData();
		var otestCyclePlanTree = sap.ui.getCore().byId("testCyclePlanTree");
		otestCyclePlanTree.removeAllNodes();
		_.forEach(data, function(item) {
			var treeNode = new sap.ui.commons.TreeNode({text: item.CYC_TAG, icon:"images/system.gif", expanded: false,
				toggleOpenState : function(e) {
					var source = e.getSource();
					var opened = e.getParameters().opened;
					if (opened) {
						var cycle = source.getText();
						var text = source.getNodes()[0].getText();
						if (text == "Pending...") {
							var suites = controller.getSuiteForCycle(cycle);
							var data = suites.getData();
							source.removeAllNodes();
							_.forEach(data.d.results, function(item) {
								var treeNode = new sap.ui.commons.TreeNode({text: item.TS_NAME, icon:"images/system.gif", expanded: false});
								source.addNode(treeNode);
							});
						}
					}
				}});
			treeNode.addNode(new sap.ui.commons.TreeNode({text: "Pending...", icon:"images/system.gif"}));
			otestCyclePlanTree.addNode(treeNode);
		})
	},
	
	getCycles: function() {
		var oModel = sap.ui.getCore().getModel("/testCyclePlan");
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestCycleList.xsodata/LIST/?";
    		url += "$format=json&$orderby=CYC_TAG asc";
    		var oModel = getModelWithData(url);
    		sap.ui.getCore().setModel(oModel, "/testCaseReport");
    	}
    	
    	var stateModel = new sap.ui.model.json.JSONModel();
    	var data = oModel.getData()['d']['results'];
    	var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
    	if (productFilter != null && productFilter != '') {
    		var filteredData = _.filter(data, function(item) {
    			return item.PRO_NAME === productFilter;
    		});
    		stateModel.setData(filteredData);
    	}
    	else {
    	     var uniques = _.map(_.groupBy(data, function(item){
    	    	  return item.CYC_TAG;
    	    	}),function(grouped){
    	    	  return grouped[0];
    	    	});
    	     stateModel.setData(uniques);
    	}
    	return stateModel;
	},
	
	getCycle: function(cycleName) {
		var oModel = this.getCycles();
		var data = oModel.getData();
		var cycle = _.find(data.d.results, function(item) {
			return item.CYC_TAG == cycleName;
		});
		return cycle;
	},
	
	getSuiteForCycle : function(cycleName) {
    	var planSuite = sap.ui.getCore().getModel("/testCyclePlanSuite");
    	if (planSuite == null) {
    		planSuite = {};
    		sap.ui.getCore().setModel(planSuite, "/testCyclePlanSuite");
    	}
    	
    	var name = cycleName;
    	var oModel = planSuite[cycleName];
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestSuiteForCycleList.xsodata/LIST/?";
    		url += "$filter=CYC_TAG%20eq%20'" + cycleName + "'&";
    		url += "$format=json&$orderby=TS_NAME asc";

    		oModel = getModelWithData(url);
    		planSuite[name] = oModel;
    	}
    	return oModel;
	},
	
	getSuite : function(cycleName, suiteName) {
		var oModel = this.getSuiteForCycle(cycleName);
		var data = oModel.getData();
		var cycle = _.find(data.d.results, function(item) {
			return item.TS_NAME == suiteName;
		});
		return cycle;
	},
	
	getExAppForCycle : function(cycleName) {
    	var planSuite = sap.ui.getCore().getModel("/testCyclePlanExApp");
    	if (planSuite == null) {
    		planSuite = {};
    		sap.ui.getCore().setModel(planSuite, "/testCyclePlanExApp");
    	}
    	
    	var name = cycleName;
    	var oModel = planSuite[cycleName];
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestExAppForCycleList.xsodata/LIST/?";
    		url += "$filter=CYC_TAG%20eq%20'" + cycleName + "'&";
    		url += "$format=json&$orderby=TS_NAME asc";

    		oModel = getModelWithData(url);
    		planSuite[name] = oModel;
    	}
    	return oModel;
	},
	
	getExApp : function(cycleName, suiteName) {
		var oModel = this.getExAppForCycle(cycleName);
		var data = oModel.getData();
		var filteredData = _.filter(data.d.results, function(item){
			return item.TS_NAME == suiteName;
  		});
  	
		var model = new sap.ui.model.json.JSONModel();
		model.setData(filteredData);
		return model
	},
	
	Delete:function(id){
	     var oDeleteDialog = new sap.ui.commons.Dialog();
         oDeleteDialog.setTitle("Delete test");
         var oText = new sap.ui.commons.TextView({text: "Are you sure to delete this Test Cycle?"});
         oDeleteDialog.addContent(oText);
         oDeleteDialog.addButton(
             new sap.ui.commons.Button({
                 text: "Confirm", 
                 press:function(){ 
                	 var oTestResult = sap.ui.getCore().byId("testCycleTableID");
                     oTestResult.getModel().remove("/LIST(" + id + ")", null, function() {
                    	 oTestResult.getModel().refresh();
                         oDeleteDialog.close();
                     },function(){
                         oDeleteDialog.close();
                         alert("Delete failed");
                     });
                 }
             })
         );
         oDeleteDialog.open();

	},
	
    enableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testCyclePlanCreate");
    	oCreate.setEnabled(true);
    	var oUpdate = sap.ui.getCore().byId("testCyclePlanUpdate");
    	oUpdate.setEnabled(true);
    	var user = getUser();
    	if (user.isAdmin) {
	    	var oDelete = sap.ui.getCore().byId("testCyclePlanDelete");
	    	oDelete.setEnabled(true);
    	}
    },
    
    disableActions : function() {
    	var oCreate = sap.ui.getCore().byId("testCyclePlanCreate");
    	oCreate.setEnabled(false);
    	var oUpdate = sap.ui.getCore().byId("testCyclePlanUpdate");
    	oUpdate.setEnabled(false);
    	var oDelete = sap.ui.getCore().byId("testCyclePlanDelete");
    	oDelete.setEnabled(false);
    },
	
    //update form values
    updateEntry: function(oEntry) {
    	var oUpdateForm = sap.ui.getCore().byId("testCyclePlanUpdateForm");
    	var content = oUpdateForm.getContent();
    	content[2].setValue(oEntry.CYC_TAG);
        content[4].setValue(oEntry.CYC_DESC);
        content[6].setValue(oEntry.PROJECT_NAME);
        content[8].setValue(oEntry.CONTRACTOR);
        content[10].setValue(oEntry.STARTDATE);
        content[12].setValue(oEntry.ENDDATE);

    },
    
	updateList: function(value) {
    	var filters = new Array();  
        var filter = new sap.ui.model.Filter("TS_NAME", sap.ui.model.FilterOperator.Contains, value);  
        filters.push(filter);  
		var itemTemplate = new sap.ui.core.ListItem({key:"{TS_ID}", text:"{TS_NAME}", description:"TS_DESC"})
		var oList = sap.ui.getCore().byId("testSuiteTableID");
		oList.unbindAggregation();
		oList.bindAggregation("items", "/LIST", itemTemplate, null, filter);
    },
    
    showCycle : function(cycleName) {
    	var cycle = this.getCycle(cycleName);
    	var layout = sap.ui.getCore().byId("testCyclePlanLayoutForm");
    	var form = sap.ui.getCore().byId("testCyclePlanCycleLayout");
    	var cycleForm = sap.ui.getCore().byId("testCyclePlanCycleForm");
    	var content = cycleForm.getContent();
    	content[2].setText(cycle.CYC_TAG);
        content[4].setText(cycle.CYC_DESC);
        content[6].setText(cycle.PROJECT_NAME);
        content[8].setText(cycle.CONTRACTOR);
        content[10].setText(cycle.STARTDATE);
        content[12].setText(cycle.ENDDATE);
        layout.removeAllRows();
        var oCell = new sap.ui.commons.layout.MatrixLayoutCell({vAlign: sap.ui.commons.layout.VAlign.Top});
	    oCell.addContent(form);
    	layout.createRow(oCell);
    },
    
    showSuite : function(cycleName, suiteName) {
    	var suite = this.getSuite(cycleName, suiteName);
		var exApp = this.getExApp(cycleName, suiteName);
    	var layout = sap.ui.getCore().byId("testCyclePlanLayoutForm");
    	var form = sap.ui.getCore().byId("testCyclePlanSuiteLayout");
    	var suiteForm = sap.ui.getCore().byId("testCyclePlanSuiteForm");
    	var content = suiteForm.getContent();
    	content[2].setText(suite.TS_NAME);
        content[4].setText(suite.PRO_NAME);
        content[6].setText(suite.PRO_VER);
        content[8].setText(suite.PLAT_NAME);
        content[10].setText(suite.OS_NAME);
        content[12].setText(suite.ENV);
        content[15].setText(suite.CYC_TAG);
        content[17].setText(suite.ASSGINEE);
        content[19].setText(suite.FEATURE);
        content[21].setText(suite.CATALOG);
    	layout.removeAllRows();
    	var oCell = new sap.ui.commons.layout.MatrixLayoutCell({vAlign: sap.ui.commons.layout.VAlign.Top});
	    oCell.addContent(form);
    	layout.createRow(oCell);
    	
    	var oTestResult = sap.ui.getCore().byId("testCyclePlanExApp");
		oTestResult.setModel(exApp);
    },
    
    getSelectedCycleNode: function() {
    	var oCyclePlanTree = sap.ui.getCore().byId("testCyclePlanTree");
    	var nodes = oCyclePlanTree.getNodes();
    	for (var node in nodes) {
    		if (nodes[node].getIsSelected()) return nodes[node];
        }
    	return null;
    },
    
    getCheckedSubNodes: function(node, _checkedNodes, controller) {
    	  node.getNodes().forEach(function(subNode) {
    	       if (subNode.getIsSelected()) { _checkedNodes = node; return; }
    	       else controller.getCheckedSubNodes(subNode. controller);
    	  });
    }
    
});
 
