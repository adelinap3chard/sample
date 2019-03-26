function CreateTestSuite(param) {
	$.trace.debug("entered function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("Insert TS_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_SUITES"("TS_ID", "TS_NAME", "TS_DESC") values(EIMTRD.SEQ_TS_ID.NEXTVAL, ?, ?)');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(3));            

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}