(function main(){
	
	var data = [];
	$.trace.debug("*************detail result Report: ");
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	
	var cycleName = $.request.parameters.get("cycle");
	$.trace.debug("*************cycleName: " + cycleName);
	var suiteName = $.request.parameters.get("suite");
	$.trace.debug("*************suiteName: " + suiteName);
	
	//var query = ['CALL EIMTRD.CONSOLIDATE_PLAN_DETAIL_RESULT_FOR_TAG(?,?)'].join("\n");
	//var query = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_TAG_LATEST(?,?)'].join("\n");
	var query = ['select * from "EIMTRD"."ETRD_CYCLE_RESULTS_LATEST" where "TEST_CYCLE_TAG" = ? order by TEST_SUITE_NAME'].join("\n");
	if (suiteName !== undefined) {
		query = ['select * from "EIMTRD"."ETRD_CYCLE_RESULTS_LATEST" where "TEST_CYCLE_TAG" = ? and "TEST_SUITE_NAME" = ?'].join("\n");
	}
	$.trace.debug("*************query: " + query); 
	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, cycleName);	
	if (suiteName !== undefined) {
		oStatement.setString(2, suiteName);
		$.trace.debug("*************suiteName2: " + suiteName);
	}
		
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TEST_CYCLE_TAG = rs.getString(1);
    	vals.TEST_CATALOG = rs.getString(2);
    	vals.TEST_FEATURE = rs.getString(3);
    	//vals.TEST_PLAN_ID = rs.getString(4);
    	//vals.CONTRACTOR = rs.getString(5);
    	vals.ASSGINEE = rs.getString(6);
    	vals.TEST_SUITE_NAME = rs.getString(7);
    	//vals.TEST_SUITE_ID = rs.getString(8);
    	//vals.TEST_CASE_ID = rs.getString(9);
    	vals.TEST_CASE_NAME = rs.getString(10);
    	vals.TEST_PRODUCT_NAME = rs.getString(11);
    	vals.TEST_PRODUCT_VERSION = rs.getString(12);
    	vals.TEST_PLATFORM_NAME = rs.getString(13);
    	vals.TEST_OS_NAME = rs.getString(14);
    	vals.START_DATE = rs.getString(15);
    	vals.END_DATE = rs.getString(16);
    	//vals.TEST_DETAILS = rs.getString(17);
    	//vals.TRES_ID = rs.getString(18);
    	//vals.RESULT_CASE_NAME = rs.getString(19);
    	vals.RESULT = rs.getString(20);
    	vals.EXEC_USER = rs.getString(21);
    	//vals.RESULT_CYCLE_TAG = rs.getString(22);
    	//vals.START_TIME = rs.getString(23);
    	//vals.END_TIME = rs.getString(24);
    	vals.EXEC_TS = rs.getString(25);
    	vals.EXEC_TIME = rs.getString(26);
    	vals.BUG_ID = rs.getString(27);
    	//vals.RESULT_PRODUCT_NAME = rs.getString(28);
    	//vals.RESULT_PRODUCT_VERSION = rs.getString(29);
    	//vals.RESULT_PRODUCT_VER_STR = rs.getString(30);
    	//vals.RESULT_PLATFORM_NAME = rs.getString(31);
    	//vals.RESULT_OS_NAME = rs.getString(32);
    	//vals.RESULT_HOST_NAME = rs.getString(33);
    	//vals.RESULT_DETAILS = rs.getString(34);
    	//vals.UPDATE_TS = rs.getString(35);
	
    	
    	
    	/* old col for store proc
    	vals.TRES_ID = rs.getString(1); //ID
    	vals.TC_NAME = rs.getString(2);
    	vals.TC_RESULT = rs.getString(3);
    	vals.EXEC_USER = rs.getString(4);
    	vals.CYC_NAME = rs.getString(5);
    	vals.START_TIME = rs.getString(6);
    	vals.END_TIME = rs.getString(7);
    	vals.EXEC_TS = rs.getString(8);
    	vals.EXEC_TIME = rs.getString(9);
    	vals.BUG_ID = rs.getString(10);
    	vals.PRO_NAME = rs.getString(11);
    	vals.PRO_VER = rs.getString(12);
    	vals.PRO_VER_STR = rs.getString(13);
    	vals.PLAT_NAME = rs.getString(14);
    	vals.OS_NAME = rs.getString(15);
    	vals.HOST_NAME = rs.getString(16);
    	vals.DETAILS = rs.getString(17);
    	vals.QUALIFIED_PLAN_ID = rs.getString(18);
    	*/
    	
    	data.push(vals);
    	$.trace.debug("*************current val: " + JSON.stringify(vals));
    	$.trace.debug("*************data: " + JSON.stringify(data));
    	
    }
   
	//oResultSet.close();
	oStatement.close();
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(data));   
	$.response.status = $.net.http.OK;   

})();