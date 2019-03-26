function CreateTestCycle(param) {
	$.trace.debug("*************Create function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Insert TFILE_NAME " + rs.getString(2) + " TFILE_CASE_NAME " + rs.getString(3) + " TC_NAME " + rs.getString(4));
    	$.trace.debug(" this is cycle tag: " +rs.getString(2).trim()+"blah");
        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_CYCLES"("CYC_ID", "CYC_TAG", "CYC_DESC", "PROJECT_NAME", "CONTRACTOR","STARTDATE","ENDDATE") values(EIMTRD.SEQ_CYCLE_ID.NEXTVAL, ?, ?, ?, ?, ?, ?)');
 
        pStmt.setString(1, rs.getString(2).trim());          
        pStmt.setString(2, rs.getString(3));            
        pStmt.setString(3, rs.getString(4)); 
        pStmt.setString(4, rs.getString(5)); 
        pStmt.setString(5, rs.getString(6));
        pStmt.setString(6, rs.getString(7));  
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}