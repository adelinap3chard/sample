(function main(){
	
	var data = [];
	$.trace.debug("*************before connection: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	$.trace.debug("*************connection: " + oConnection);
	var productName = $.request.parameters.get("product");
	var productVersion = $.request.parameters.get("version");
	var featureName = $.request.parameters.get("feature");
	
	$.trace.debug("*************productName: " + productName);
	$.trace.debug("*************productVersion: " + productVersion);
	$.trace.debug("*************featureName: " + featureName);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_CASE (?,?)'].join("\n");
	var query = ['select distinct TEST_SUITE_NAME,TEST_CYCLE_TAG,TEST_CATALOG,TEST_FEATURE,ASSGINEE, TEST_PRODUCT_NAME, TEST_PRODUCT_VERSION, UPDATE_TS, TEST_DETAILS',
	             'from "EIMTRD"."ETRD_CYCLE_RESULTS_LATEST"', 
	             'where test_product_name = ?',
	             'and test_product_version = ?',
	             'and test_feature = ?',
	             'order by TEST_CYCLE_TAG,TEST_CATALOG,TEST_FEATURE,ASSGINEE,UPDATE_TS,TEST_SUITE_NAME'].join("\n");
	
	$.trace.debug("*************query: " + query); 	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, productName);
	oStatement.setString(2, productVersion);
	oStatement.setString(3, featureName);
	
    oStatement.execute();
    var rs = oStatement.getResultSet();
    //TEST_CATALOG,TEST_FEATURE,ASSGINEE,TEST_SUITE_NAME,TEST_CASE_NAME,RESULT,BUG_ID
    while (rs.next()){
    	var vals = {};
    	vals.TEST_SUITE_NAME = rs.getString(1);
    	vals.TEST_CYCLE_TAG= rs.getString(2);
    	vals.TEST_CATALOG= rs.getString(3);
    	vals.TEST_FEATURE= rs.getString(4);
    	vals.ASSGINEE = rs.getString(5);
    	
    	vals.TEST_PRODUCT_NAME = rs.getString(6);
    	vals.TEST_PRODUCT_VERSION = rs.getString(7);
    	vals.UPDATE_TS = rs.getString(8);
    	vals.TEST_DETAILS = rs.getString(9);
   	
    	data.push(vals);
    	
    	//$.trace.debug("*************current val: " + vals.TEST_PRODUCT_VERSION ));
    	//$.trace.debug("*************data: " + JSON.stringify(data));
    	
    }
   
	//oResultSet.close();
	oStatement.close();
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(data));   
	$.response.status = $.net.http.OK;   

})();