(function main(){
	
	var data = [];
	$.trace.debug("*************before connection: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	$.trace.debug("*************connection: " + oConnection);
	var cycleName = $.request.parameters.get("cycle");
	var featureName = $.request.parameters.get("feature");
	
	$.trace.debug("*************cycleName: " + cycleName);
	$.trace.debug("*************featureName: " + featureName);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_CASE (?,?)'].join("\n");
	var query = ['select TEST_CATALOG,TEST_FEATURE,ASSGINEE,TEST_SUITE_NAME,TEST_CASE_NAME,',
	             'case when RESULT is null then \'Unknown\'',
	             'when RESULT is not null then RESULT',
	             'end as RESULT,BUG_ID from "EIMTRD"."ETRD_CYCLE_RESULTS_LATEST"',
	             'where test_cycle_tag = ? and TEST_FEATURE = ?',
	             'and (result !=\'PASS\' or result is null)',
	             'order by TEST_CATALOG,TEST_FEATURE,ASSGINEE,TEST_SUITE_NAME,TEST_CASE_NAME,RESULT,BUG_ID'].join("\n");
	
	
	$.trace.debug("*************query: " + query); 	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, cycleName);
	oStatement.setString(2, featureName);
	
    oStatement.execute();
    var rs = oStatement.getResultSet();
    //TEST_CATALOG,TEST_FEATURE,ASSGINEE,TEST_SUITE_NAME,TEST_CASE_NAME,RESULT,BUG_ID
    while (rs.next()){
    	var vals = {};
    	vals.TEST_CATALOG = rs.getString(1);
    	vals.TEST_FEATURE= rs.getString(2);
    	vals.ASSGINEE= rs.getString(3);
    	vals.TEST_SUITE_NAME = rs.getString(4);
    	
    	vals.TEST_CASE_NAME = rs.getString(5);
    	vals.RESULT = rs.getString(6);
    	vals.BUG_ID = rs.getString(7);

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