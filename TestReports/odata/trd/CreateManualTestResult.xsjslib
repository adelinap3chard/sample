function CreateManualTestResult(param) {
	$.trace.debug("entered function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_MANUAL_TESTRESULTS"("TEST_PLAN", "TEST_CYCLE", "CASE_NAME", "USER_NAME", "TOTAL_TESTS", "PASS", "FAIL", "BUG_LIST", "TEST_CASE_NAME", "SKIP_TESTS") values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
 
        pStmt.setString(1, rs.getString(2).toUpperCase());          
        pStmt.setString(2, rs.getString(3).toUpperCase());            
        pStmt.setString(3, rs.getString(4));     
        pStmt.setString(4, rs.getString(5));    
        pStmt.setInteger(5, rs.getInteger(6));    
        pStmt.setInteger(6, rs.getInteger(7));    
        pStmt.setInteger(7, rs.getInteger(8));    
        pStmt.setString(8, rs.getString(9));     
        pStmt.setString(9, rs.getString(11)); 
        pStmt.setString(10, rs.getString(12))

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}