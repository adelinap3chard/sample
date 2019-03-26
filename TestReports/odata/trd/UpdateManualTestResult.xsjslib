function UpdateManualTestResult(param) {
	$.trace.debug("entered update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("Update ID " + rs.getInteger(1) + " TOTAL_TESTS " + rs.getInteger(6) + " PASS " + rs.getInteger(7) + " FAIL " + rs.getInteger(8) + " BUG_LIST " + rs.getString(9) + " TEST_CASE_NAME " + rs.getString(11));

        pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_MANUAL_TESTRESULTS" set "TEST_PLAN" = ?, "TEST_CYCLE" = ?, "CASE_NAME" = ?, "USER_NAME" = ?, "TOTAL_TESTS" = ?, "PASS" = ?, "FAIL" = ?, "BUG_LIST" = ?, "TEST_CASE_NAME" = ?, "SKIP_TESTS" = ? where "ID" = ?');
 
        pStmt.setString(1, rs.getString(2).toUpperCase());          
        pStmt.setString(2, rs.getString(3).toUpperCase());            
        pStmt.setString(3, rs.getString(4));     
        pStmt.setString(4, rs.getString(5));
        pStmt.setInteger(5, rs.getInteger(6));          
        pStmt.setInteger(6, rs.getInteger(7));            
        pStmt.setInteger(7, rs.getInteger(8));     
        pStmt.setString(8, rs.getString(9));    
        pStmt.setString(9, rs.getString(11)); 
        pStmt.setString(10, rs.getString(12));
        pStmt.setInteger(11, rs.getInteger(1));    

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}