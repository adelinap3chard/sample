(function main(){
	
	var data = [];
	$.trace.debug("*************Summary Catalog by Cycle Report: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	
	var cycleName = $.request.parameters.get("cycle");
	$.trace.debug("*************cycleName: " + cycleName);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_CYCLE_SUMMARY_CATALOG_RESULT_FOR_TAG(?,?)'].join("\n");
	var query = ['CALL EIMTRD.CONSOLIDATE_CYCLE_SUMMARY_CATALOG_RESULT_FOR_TAG_V2(?,?)'].join("\n");
		
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, cycleName);	
	
	$.trace.debug("*************query: " + oStatement); 
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TEST_CYCLE_TAG = rs.getString(1);
    	vals.TEST_CATALOG = rs.getString(2);
    	//vals.TEST_FEATURE = rs.getString(3);
    	//vals.CONTRACTOR = rs.getString(4);
    	//vals.ASSGINEE = rs.getString(5);
    	vals.PASS_SUB_QUANTITY = rs.getString(3);
    	vals.FAIL_SUB_QUANTITY = rs.getString(4);
    	vals.UNTESTED_SUB_QUANTITY = rs.getString(5);
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