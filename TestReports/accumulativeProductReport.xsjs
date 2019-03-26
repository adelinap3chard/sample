(function main(){
	
	var data = [];
	$.trace.debug("*************accumulative product report: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	
	//var productName = $.request.parameters.get("product");
	//var productVer = $.request.parameters.get("version");
	//$.trace.debug("*************productName: " + productName);
	//$.trace.debug("*************productVer: " + productVer);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_CYCLE_SUMMARY_CATALOG_RESULT_FOR_TAG(?,?)'].join("\n");
	//var query = ['CALL EIMTRD.CONSOLIDATE_SUMMARY_RESULT_FOR_PRODUCT_VERSION(?,?,?)'].join("\n");
	var query = ['call EIMTRD.consolidate_summary_result_for_each_product(?)'].join("\n");
		
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	
	$.trace.debug("*************query: " + oStatement); 
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TEST_PRODUCT_NAME = rs.getString(1);
    	vals.TEST_PRODUCT_VERSION = rs.getString(2);
    	//vals.TEST_FEATURE = rs.getString(3);
    	vals.PASS_SUB_QUANTITY = rs.getString(3);
    	vals.FAIL_SUB_QUANTITY = rs.getString(4);
//    	vals.UNTESTED_SUB_QUANTITY = rs.getString(6);
    	vals.NO_RESULT_SUB_QUANTITY = rs.getString(5);
    	vals.TOTAL_QUANTITY = rs.getString(6);
    	vals.PASS_RATE = rs.getString(7);
    	vals.FINISH_RATE = rs.getString(8);
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