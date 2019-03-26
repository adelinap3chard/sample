jQuery.sap.declare("sap.ui.demo.Component");

sap.ui.core.UIComponent.extend("sap.ui.demo.Component", {

  metadata : {  
  routing : {  
  config : {  
  viewType : "JS",  
  viewPath : "routingdemo",  
  targetControl : "NavContainer",  
  clearTarget : false,  
  },  
  routes : [  
  {  
  pattern : "", // which appears in URL, while you navigate  
  name : "first",     // Name that is used in navTo method  
  view : "FirstPage",   // this is the target view that you are navigating to  
  viewPath : "routingdemo", // path of the target view  
  targetAggregation : "pages" // this defines whether the target view is a [pages/content/masterpages/detailpages]  
  },  
 {  
  pattern : "InSecondPage",  
  name : "second",  
  view : "SecondPage",  
  viewPath : "routingdemo",  
  targetAggregation : "pages"  
  },  
 ]  
  }  
  },  
 init : function () {  
 // 1. some very generic requires  
  jQuery.sap.require("sap.m.routing.RouteMatchedHandler");  
  jQuery.sap.require("sap.ui.demo.MyRouter");  
  // 2. call overridden init (calls createContent)  
  sap.ui.core.UIComponent.prototype.init.apply(this, arguments);  
// 3a. monkey patch the router  
  var router = this.getRouter();  
  router.myNavBack = sap.ui.demo.MyRouter.myNavBack;  
  // 4. initialize the router  
  this.routeHandler = new sap.m.routing.RouteMatchedHandler(router);  
  router.initialize();  
  },  
  destroy : function () {  
  if (this.routeHandler) {  
  this.routeHandler.destroy();  
  }  
  // call overridden destroy  
  sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);  
  },  
  createContent : function () {  
  // create root view  
  var oView = sap.ui.view({  
  id : "app",  
  viewName : "routingdemo.App",  
  type : "JS",  
  });  
var oModel = new sap.ui.model.json.JSONModel();  
       
      oModel.setData(  
      {  
       myName : null,  
        myPass : null  
      }  
       
      );  
       
oView.setModel(oModel);  
return oView;  
  }  
});  
