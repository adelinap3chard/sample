sap.ui.controller("TestReports.forms.testproductsuite", {
	onBeforeRendering : function(oEvent) {
		if (this.initialize == undefined) {
			this.refresh(this);
			this.initialize = true;
			var user = getUser();
	    	if (!user.isAdmin) {
		    	var oDelete = sap.ui.getCore().byId("testProductSuiteDelete");
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
                var oCyclePlanTree = sap.ui.getCore().byId("testProductSuiteTree");
                var parent = node.getParent();
    			var menu = null;
    			if (parent.sId == "testProductSuiteTree") {
    				var cycleName = node.getText();
    				menu = sap.ui.getCore().byId("productMenu");
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
		_.forEach(data.d.results, function(item) {
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
	
	getProducts: function() {
		var oModel = sap.ui.getCore().getModel("/testCyclePlan");
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestCycleList.xsodata/LIST/?$format=json&$orderby=CYC_TAG asc";
    		var oModel = getModelWithData(url);
    		sap.ui.getCore().setModel(oModel, "/testCaseReport");
    	}
    	return oModel;
	},
	
	getProduct: function(productName) {
		var oModel = this.getProducts();
		var data = oModel.getData();
		var cycle = _.find(data.d.results, function(item) {
			return item.CYC_TAG == productName;
		});
		return cycle;
	},
	
	getSuiteForProduct : function(productName) {
    	var productSuite = sap.ui.getCore().getModel("/testProductSuiteSuite");
    	if (productSuite == null) {
    		productSuite = {};
    		sap.ui.getCore().setModel(productSuite, "/testProductSuiteSuite");
    	}
    	
    	var name = productName;
    	var oModel = planSuite[productName];
    	if (oModel == null) {
    		var url = "/TestReports/odata/getTestSuiteForProductList.xsodata/LIST/?";
    		url += "$filter=CYC_TAG%20eq%20'" + cycleName + "'&";
    		url += "$format=json&$orderby=TS_NAME asc";

    		oModel = getModelWithData(url);
    		productSuite[name] = oModel;
    	}
    	return oModel;
	},
	
	getSuite : function(productName, suiteName) {
		var oModel = this.getSuiteForProduct(productName);
		var data = oModel.getData();
		var cycle = _.find(data.d.results, function(item) {
			return item.TS_NAME == productName;
		});
		return cycle;
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
    
    showProduct : function(productName) {
    	var cycle = this.getProduct(productName);
    	var layout = sap.ui.getCore().byId("testProductSuiteLayoutForm");
    	var form = sap.ui.getCore().byId("testProductSuiteProductLayout");
    	var productForm = sap.ui.getCore().byId("testProductSuiteProductForm");
    	var content = productForm.getContent();
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
    
    showSuite : function(productName, suiteName) {
    	var suite = this.getSuite(cycleName, suiteName);
    	var layout = sap.ui.getCore().byId("testProductSuiteLayoutForm");
    	var form = sap.ui.getCore().byId("testProductSuiteSuiteLayout");
    	var suiteForm = sap.ui.getCore().byId("testProductSuiteSuiteForm");
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
    },
    
    getSelectedProductNode: function() {
    	var oTree = sap.ui.getCore().byId("testProductSuiteTree");
    	var nodes = oTree.getNodes();
    	for (var node in nodes) {
    		if (nodes[node].getIsSelected()) return nodes[node];
        }
    	return null;
    }    
});
 
