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
	
	//var query = ['CALL "consolidate_result_for_case" (?,?)'];
	var query = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_CASE (?,?)'].join("\n");
	$.trace.debug("*************query: " + query); 
	
	
	$.trace.debug("***************************************"); 
	var oStatement = oConnection.prepareCall(query);
	oStatement.setString(1, caseName);	
	
    oStatement.execute();
    var rs = oStatement.getResultSet();
    while (rs.next()){
    	var vals = {};
    	vals.TRES_ID = rs.getString(1);
    	vals.TC_NAME= rs.getString(2);
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