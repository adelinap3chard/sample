(function main(){
	
	var data = [];
	$.trace.debug("*************Summary Cycle Report: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	
	var productName = $.request.parameters.get("product");
	$.trace.debug("*************productName: " + productName);
	var productVersion = $.request.parameters.get("version");
	$.trace.debug("*************productVersion: " + productVersion);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_CYCLE_SUMMARY_SUITE_RESULT_FOR_TAG(?,?)'].join("\n");
	//var query = ['CALL EIMTRD.CONSOLIDATE_CYCLE_SUMMARY_SUITE_RESULT_FOR_TAG_V2(?,?)'].join("\n");
	//var query = ['call EIMTRD.consolidate_summary_result_for_product_version(?,?,?)'].join("\n");
	var query = ['call EIMTRD.consolidate_summary_result_for_product_version(?,?,?)'].join("\n");
	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, productName);
	oStatement.setString(2, productVersion);
	
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TEST_PRODUCT_NAME = rs.getString(1);
    	vals.TEST_PRODUCT_VERSION = rs.getString(2);
    	vals.TEST_FEATURE = rs.getString(3);
    	vals.PASS_SUB_QUANTITY = rs.getString(4);
    	vals.FAIL_SUB_QUANTITY = rs.getString(5);
    	vals.NO_RESULT_SUB_QUANTITY = rs.getString(6);
    	vals.TOTAL_QUANTITY = rs.getString(7);
    	vals.PASS_RATE = rs.getString(8);
    	vals.FINISH_RATE = rs.getString(9);
    	
    	data.push(vals);
    	//$.trace.debug("*************current val: " + JSON.stringify(vals));
    	//$.trace.debug("*************data: " + JSON.stringify(data));
    	
    }
   
	//oResultSet.close();
	oStatement.close();
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(data));   
	$.response.status = $.net.http.OK;   

})();