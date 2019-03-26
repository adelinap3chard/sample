(function main(){
	var conn = $.db.getConnection();
	$.trace.debug("*************Refresh: call plan detail results for cycle");
	var cycleName = $.request.parameters.get("cycle");
	
	var query = ['CALL EIMTRD.CONSOLIDATE_PLAN_DETAIL_RESULT_FOR_TAG(?)'].join("\n");
	$.trace.debug("*************query: " + query);
	$.trace.debug("*************cycle: " + cycleName); 
	var oStatement = conn.prepareCall(query);
	oStatement.setString(1, cycleName);	
    oStatement.execute();
	oStatement.close();
	$.trace.debug("*************query completed");	
	conn.commit();
	conn.close();
})();