(function main(){
	var conn = $.db.getConnection();
	$.trace.debug("*************Refresh: calling consolidate all cycle results");
	var query = "{CALL EIMTRD.consolidate_all_cycle_result}";
	$.trace.debug(query);
	var pcall = conn.prepareCall(query);
	pcall.execute();
	pcall.close();
	
		
	conn.commit();
	conn.close();
})();