function UpdateTestPlan(param) {
	$.trace.debug("*************update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	var selectProduct = "SELECT TOP 1 PRO_ID FROM EIMTRD.ETRD_PRODUCTS WHERE PRO_NAME='" + rs.getString(3) + "' AND PRO_VER='" + rs.getString(4) + "'";
    	var selectCycle = "SELECT TOP 1 CYC_ID FROM EIMTRD.ETRD_TEST_CYCLES WHERE CYC_TAG='" + rs.getString(7) + "'";
    	$.trace.debug("Update Test Plan: " + selectProduct);
    	$.trace.debug("Update Test Plan: " + selectCycle);
    	$.trace.debug("Update TS_NAME " + rs.getString(2) + " PLAT_NAME " + rs.getString(5) + " OS_NAME " + rs.getString(6) + " ASSIGNEE " + rs.getString(8));
    	pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_PLAN" set "TS_NAME" = ?, "PRO_ID" = (' + selectProduct + '), "CYC_ID" = (' + selectCycle + '), "PLAT_NAME" = ?, "OS_NAME" = ?, "ASSGINEE" = ?, "FEATURE" = ?, "CATALOG" = ? where "TSP_ID" = ?');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(5));            
        pStmt.setString(3, rs.getString(6)); 
        pStmt.setString(4, rs.getString(8));
        pStmt.setString(5, rs.getString(9)); 
        pStmt.setString(6, rs.getString(10)); 
        pStmt.setInteger(7, rs.getInteger(1));    

        pStmt.executeUpdate();
        pStmt.close();
    }
 
    rs.close();
}