function CreateDetailTestResult(param) {
	$.trace.debug("*************Create detail test result function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("=================== CREATE Test result============");
		$.trace.debug("F2 -  " + rs.getString(2)); //case name*
		$.trace.debug("F3 -  " + rs.getString(3)); //result
		$.trace.debug("F4 -  " + rs.getString(4)); //user*
		$.trace.debug("F5 -  " + rs.getString(5)); //cycle*
		$.trace.debug("F6 -  " + rs.getString(6)); //start time
		$.trace.debug("F7 -  " + rs.getString(7)); //end time
		$.trace.debug("F8 -  " + rs.getTimestamp(8));//execute time
		$.trace.debug("F9 -  " + rs.getString(9)); // run time 
		$.trace.debug("F10 -  " + rs.getString(10)); // bug
		$.trace.debug("F11 -  " + rs.getString(11)); // product*
		$.trace.debug("F12 -  " + rs.getString(12)); // version*
		$.trace.debug("F13 -  " + rs.getString(13)); // full version
		$.trace.debug("F14 -  " + rs.getString(14)); // platform*
		$.trace.debug("F15 -  " + rs.getString(15)); // os*
		$.trace.debug("F16 -  " + rs.getString(16)); // host
    	
		//verify each column value 
    	var selectCycle = "SELECT TOP 1 CYC_ID FROM EIMTRD.ETRD_TEST_CYCLES WHERE CYC_TAG='" + rs.getString(5) + "'";
		var pcall = param.connection.prepareStatement(selectCycle);
    	var resultSet = pcall.executeQuery();
    	if (resultSet.next()){
    		var rntVal = resultSet.getString(1) 
    		$.trace.debug("return val for Cycle: " + rntVal);
    	}else {
    		$.trace.debug("Cycle: " + rs.getString(5) + " does not exists");
    		throw "Cycle: " + rs.getString(5) + " does not exists";
    	}
    	
    	var selectProduct = "SELECT TOP 1 PRO_ID FROM EIMTRD.ETRD_PRODUCTS WHERE PRO_NAME='" + rs.getString(11) + "' AND PRO_VER='" + rs.getString(12) + "'";
    	var pcall = param.connection.prepareStatement(selectProduct);
    	var resultSet = pcall.executeQuery();
    	if (resultSet.next()){
    		var rntVal = resultSet.getString(1) 
    		$.trace.debug("return val for product: " + rntVal);
    	}else {
    		$.trace.debug("Product: " + rs.getString(12) + " does not exists");
    		throw "Product: " + rs.getString(12) + "  does not exists";
    	}
    	   	
    	var selectPlatform = "SELECT TOP 1 PLAT_ID FROM EIMTRD.ETRD_PLATFORM WHERE PLAT_NAME='" + rs.getString(14) + "'";
    		var pcall = param.connection.prepareStatement(selectPlatform);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for platform: " + rntVal);
	    	}else {
	    		$.trace.debug("Platform: " + rs.getString(14) + " does not exists");
	    		throw "Platform: " + rs.getString(14) + " does not exists";
	    	}
    	
    	var selectOS = "SELECT TOP 1 OS_ID FROM EIMTRD.ETRD_OS WHERE OS_NAME='" + rs.getString(15) + "'";
    		var pcall = param.connection.prepareStatement(selectOS);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for OS: " + rntVal);
	    	}else {
	    		$.trace.debug("OS: " + rs.getString(15) + " does not exists");
	    		throw "OS: " + rs.getString(15) + " does not exists";
	
	    	}
	    	
    	var selectAssignee = "SELECT TOP 1 U_ID FROM EIMTRD.ETRD_USERS WHERE U_NAME='" + rs.getString(4) + "'";
	    	var pcall = param.connection.prepareStatement(selectAssignee);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for assignee: " + rntVal);
	    	}else {
	    		$.trace.debug("Test User: " + rs.getString(4) + " does not exists");
	    		throw"Test User: " + rs.getString(4) + "  does not exists";
	
	    	}
	    	
    	var selectCase = "SELECT TOP 1 TC_ID FROM EIMTRD.ETRD_TEST_CASES WHERE TC_NAME ='" + rs.getString(2) + "'";
	    	var pcall = param.connection.prepareStatement(selectCase);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for Catalog: " + rntVal);
	    	}else {
	    		$.trace.debug("Case: " + rs.getString(2) + " does not exists");
	    		throw"Case: " + rs.getString(2) + " does not exists";
	    	}

    	
    	$.trace.debug("Create test result: " + selectCycle);
    	$.trace.debug("Create test result: " + selectCase);
    	        
    	    	
        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_RESULTS"("TRES_ID", "TC_NAME", "TC_RESULT", "EXEC_USER", "CYC_NAME", "START_TIME", "END_TIME", "EXEC_TS", "EXEC_TIME", "BUG_ID", "PRO_NAME", "PRO_VER", "PRO_VER_STR", "PLAT_NAME","OS_NAME","HOST_NAME" ) values(EIMTRD.SEQ_TRES_ID.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?)');
 
        pStmt.setString(1, rs.getString(2));      
        pStmt.setString(2, rs.getString(3)); 
        pStmt.setString(3, rs.getString(4)); 
        pStmt.setString(4, rs.getString(5)); 
        pStmt.setString(5, rs.getString(6)); 
        pStmt.setString(6, rs.getString(7)); 
        pStmt.setTimestamp(7, rs.getTimestamp(8)); 
        pStmt.setString(8, rs.getString(9));
        pStmt.setString(9, rs.getString(10));
        //var bug_id = rs.getString(10);
        //if (bug_id == -1) {
        	//pStmt.setNull(9);
        //}
        //else {
        	//pStmt.setInteger(9, bug_id);
        //}
        
        pStmt.setString(10, rs.getString(11)); 
        pStmt.setString(11, rs.getString(12)); 
        pStmt.setString(12, rs.getString(13)); 
        pStmt.setString(13, rs.getString(14));
        pStmt.setString(14, rs.getString(15)); 
        pStmt.setString(15, rs.getString(16)); 
        
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}