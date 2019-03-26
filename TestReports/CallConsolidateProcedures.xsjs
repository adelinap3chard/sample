(function main(){
	
	var data = [];

	//var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	var oConnection = $.db.getConnection();
	$.trace.debug("*****************************************************"); 
	$.trace.debug("*************Call Consolidate Procedure: ");
	
	var cycleName = $.request.parameters.get("cycle");
	$.trace.debug("*************cycleName: " + cycleName);
	
	var query = ['CALL EIMTRD.CONSOLIDATE_PLAN_DETAIL_RESULT_FOR_TAG('+cycleName+')'].join("\n");
	var query1 = ['CALL EIMTRD.CONSOLIDATE_PLAN_FOR_TAG('+cycleName+',?)'].join("\n");
	var query2 = ['CALL EIMTRD.CONSOLIDATE_RESULT_FOR_TAG_LATEST('+cycleName+',?)'].join("\n");
	//var query3 = ['CALL EIMTRD.CONSOLIDATE_ALL_CYCLE_RESULT()'].join("\n");
	
	//$.trace.debug(query);
	$.trace.debug("*****************************************************"); 
	var pcall = oConnection.prepareCall(query);
	pcall.execute();
	var pcall1 = oConnection.prepareCall(query1);
	pcall1.execute();
	var pcall2 = oConnection.prepareCall(query2);
	pcall2.execute();
		  
	//oResultSet.close();
	pcall.close();
	pcall1.close();
	pcall2.close();
	
	oConnection.close();
	$.trace.debug("Procedure executed completely");
	$.trace.debug("*****************************************************"); 
	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(data));   
	$.response.status = $.net.http.OK;   

})();

