(function main(){
	
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	var cycleId = $.request.parameters.get("from_cycle_id");
	var cycleString = $.request.parameters.get("to_cycle_info");
	var cycleInfo = JSON.parse(cycleString);
	
	var query = '{CALL "EIMTRD"."TestReports.proc::COPY_CYCLE"(?,?,?,?,?,?,?)}';
	var oStatement = oConnection.prepareCall(query);
	
	$.trace.debug("*************from_cycle_id: " + cycleId);
	$.trace.debug("*************CYC_TAG: " + cycleInfo.CYC_TAG);
	$.trace.debug("*************CYC_DESC: " + cycleInfo.CYC_DESC);
	$.trace.debug("*************PROJECT_NAME: " + cycleInfo.PROJECT_NAME);
	$.trace.debug("*************CONTRACTOR: " + cycleInfo.CONTRACTOR);
	$.trace.debug("*************STARTDATE: " + cycleInfo.STARTDATE);
	$.trace.debug("*************ENDDATE: " + cycleInfo.ENDDATE);
	
	oStatement.setString(1, cycleId);
	oStatement.setString(2, cycleInfo.CYC_TAG);
	oStatement.setString(3, cycleInfo.CYC_DESC);
	oStatement.setString(4, cycleInfo.PROJECT_NAME);
	oStatement.setString(5, cycleInfo.CONTRACTOR);
	oStatement.setString(6, cycleInfo.STARTDATE);
	oStatement.setString(7, cycleInfo.ENDDATE);
	
	$.trace.debug("*************query: " + query);
	
    oStatement.execute();
    
    $.trace.debug("*************copy complete!");
    
    oConnection.commit();
    
	oStatement.close();
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";
	$.response.status = $.net.http.OK;   

})();