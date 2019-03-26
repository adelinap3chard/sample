(function main(){
	
	var data = [];
	$.trace.debug("*************before connection: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	// sample cycle: all_regression
	// sample case: DPAdapterAAOraBarrier.test77
	$.trace.debug("*************connection: " + oConnection);
	//var cycleName = $.request.parameters.get("cycle");
	
	var caseName = $.request.parameters.get("case");
	$.trace.debug("*************caseName: " + caseName);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_CASE (?,?)'].join("\n");
	var query = ['select test_cycle_tag,test_suite_name,test_case_name,result,bug_id,exec_ts,exec_user,test_product_name,test_product_version,test_platform_name,test_os_name,test_details, tc_details', 
	             'from "EIMTRD"."ETRD_CYCLE_RESULTS_LATEST" r, eimtrd.etrd_test_cases c', 
	             'where test_case_name = ?',
	             'and result != \'\' and  r.test_case_name = c.tc_name', 
	             'order by test_cycle_tag, exec_ts desc, test_suite_name, test_case_name'].join("\n");	
	//var query1 = ['select tc_details from eimtrd.etrd_test_cases where tc_name = ?'];
	
	$.trace.debug("*************query: " + query); 	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, caseName);	
    oStatement.execute();
       
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.test_cycle_tag = rs.getString(1);
    	vals.test_suite_name= rs.getString(2);
    	vals.test_case_name = rs.getString(3);
    	vals.result = rs.getString(4);
    	vals.bug_id = rs.getString(5);
    	vals.exec_ts = rs.getString(6);
    	vals.exec_user = rs.getString(7);
    	vals.test_product_name = rs.getString(8);
    	vals.test_product_version = rs.getString(9);
    	vals.test_platform_name = rs.getString(10);
    	vals.test_os_name = rs.getString(11);
    	vals.test_details = rs.getString(12);
    	vals.tc_details = rs.getString(13);
    	data.push(vals);

    }
    oStatement.close();
 
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(data));   
	$.response.status = $.net.http.OK;   

})();