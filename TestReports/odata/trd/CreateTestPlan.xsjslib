function CreateTestPlan(param) {
	$.trace.debug("*************Create Test Plan function***************");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug(rs.getString(2));
    	$.trace.debug(rs.getString(3));
    	$.trace.debug(rs.getString(4));
    	$.trace.debug(rs.getString(5));
    	$.trace.debug(rs.getString(6));
    	$.trace.debug(rs.getString(7));
    	$.trace.debug(rs.getString(8));
    	$.trace.debug(rs.getString(9));
    	$.trace.debug(rs.getString(10));
    	
    	var selectSuite = "SELECT TOP 1 TS_ID FROM EIMTRD.ETRD_TEST_SUITES WHERE TS_NAME='" + rs.getString(2) + "'";
		var pcall = param.connection.prepareStatement(selectSuite);
    	var resultSet = pcall.executeQuery();
    	if (resultSet.next()){
    		var rntVal = resultSet.getString(1) 
    		$.trace.debug("return val for Cycle: " + rntVal);
    	}else {
    		$.trace.debug("Suite: " + rs.getString(2) + " does not exists");
    		throw "Suite: " + rs.getString(2) + " does not exists";
    	}
    	
    	var selectCycle = "SELECT TOP 1 CYC_ID FROM EIMTRD.ETRD_TEST_CYCLES WHERE CYC_TAG='" + rs.getString(7) + "'";
		var pcall = param.connection.prepareStatement(selectCycle);
    	var resultSet = pcall.executeQuery();
    	if (resultSet.next()){
    		var rntVal = resultSet.getString(1) 
    		$.trace.debug("return val for Cycle: " + rntVal);
    	}else {
    		$.trace.debug("Cycle: " + rs.getString(7) + " does not exists");
    		throw "Cycle: " + rs.getString(7) + " does not exists";
    	}
    	
    	var selectProduct = "SELECT TOP 1 PRO_ID FROM EIMTRD.ETRD_PRODUCTS WHERE PRO_NAME='" + rs.getString(3) + "' AND PRO_VER='" + rs.getString(4) + "'";
    	var pcall = param.connection.prepareStatement(selectProduct);
    	var resultSet = pcall.executeQuery();
    	if (resultSet.next()){
    		var rntVal = resultSet.getString(1) 
    		$.trace.debug("return val for product: " + rntVal);
    	}else {
    		$.trace.debug("Product: " + rs.getString(3) + " does not exists");
    		throw "Product: " + rs.getString(3) + "  does not exists";
    	}
    	   	
    	var selectPlatform = "SELECT TOP 1 PLAT_ID FROM EIMTRD.ETRD_PLATFORM WHERE PLAT_NAME='" + rs.getString(5) + "'";
    		var pcall = param.connection.prepareStatement(selectPlatform);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for platform: " + rntVal);
	    	}else {
	    		$.trace.debug("Platform: " + rs.getString(5) + " does not exists");
	    		throw "Platform: " + rs.getString(5) + " does not exists";
	    	}
    	
    	var selectOS = "SELECT TOP 1 OS_ID FROM EIMTRD.ETRD_OS WHERE OS_NAME='" + rs.getString(6) + "'";
    		var pcall = param.connection.prepareStatement(selectOS);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for OS: " + rntVal);
	    	}else {
	    		$.trace.debug("OS: " + rs.getString(6) + " does not exists");
	    		throw "OS: " + rs.getString(6) + " does not exists";
	
	    	}
	    	
    	var selectAssignee = "SELECT TOP 1 U_ID FROM EIMTRD.ETRD_USERS WHERE U_NAME='" + rs.getString(8) + "'";
	    	var pcall = param.connection.prepareStatement(selectAssignee);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for assignee: " + rntVal);
	    	}else {
	    		$.trace.debug("Test User: " + rs.getString(8) + " does not exists");
	    		throw"Test User: " + rs.getString(8) + "  does not exists";
	
	    	}
	    /*	
    	var selectFeature = "SELECT TOP 1 TSF_ID FROM EIMTRD.ETRD_TEST_FEATURES WHERE TSF_NAME ='" + rs.getString(9) + "'";
	    	var pcall = param.connection.prepareStatement(selectFeature);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		resultSet.getString(1) 
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for feature: " + rntVal);
	    	}else {
	    		$.trace.debug("Feature does not exists");
	    		throw "Feature does not exists";
	
	    	} */
	    	
    	var selectCatalog = "SELECT TOP 1 TSC_ID FROM EIMTRD.ETRD_TEST_CATALOGS WHERE TSC_NAME ='" + rs.getString(10) + "'";
	    	var pcall = param.connection.prepareStatement(selectCatalog);
	    	var resultSet = pcall.executeQuery();
	    	if (resultSet.next()){
	    		var rntVal = resultSet.getString(1) 
	    		$.trace.debug("return val for Catalog: " + rntVal);
	    	}else {
	    		$.trace.debug("Catalog: " + rs.getString(10) + " does not exists");
	    		throw"Catalog: " + rs.getString(10) + " does not exists";
	    	}

    	
    	$.trace.debug("Create Test Plan: " + selectProduct);
    	$.trace.debug("Create Test Plan: " + selectCycle);
    	$.trace.debug("Insert TS_NAME " + rs.getString(2) + " PLAT_NAME " + rs.getString(5) + " OS_NAME " + rs.getString(6) + " ASSIGNEE " + rs.getString(8));
        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_PLAN"("TSP_ID", "TS_NAME", "PRO_ID", "CYC_ID", "PLAT_NAME","OS_NAME", "ASSGINEE","FEATURE","CATALOG") values(EIMTRD.SEQ_TP_ID.NEXTVAL, ?,(' + selectProduct + '), (' + selectCycle + '), ?, ?, ?,?,?)');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(5));            
        pStmt.setString(3, rs.getString(6)); 
        pStmt.setString(4, rs.getString(8));
        pStmt.setString(5, rs.getString(9));  
        pStmt.setString(6, rs.getString(10));  
        pStmt.executeUpdate();
        pStmt.close();
    }
 
    rs.close();
}