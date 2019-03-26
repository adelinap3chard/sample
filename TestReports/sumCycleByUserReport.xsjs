(function main(){
	
	var data = [];
	$.trace.debug("*************Summary Test cases by Test User Report: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	
	var testUser = $.request.parameters.get("testuser");
	$.trace.debug("*************testuser name: " + testUser);
	
	//var query = ['CALL EIMTRD.consolidate_summary_result_for_user_suite(?,?)'].join("\n");
	var query = ['CALL EIMTRD.CONSOLIDATE_SUMMARY_RESULT_FOR_USER_SUITE(?,?)'].join("\n");
		
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, testUser);	
	
	$.trace.debug("*************query: " + oStatement); 
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TEST_USER_NAME = rs.getString(1);
    	vals.TEST_SUITE_NAME = rs.getString(2);
    	vals.TEST_PRODUCT_NAME = rs.getString(3);
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