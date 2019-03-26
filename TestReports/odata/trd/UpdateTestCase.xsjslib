function UpdateTestCase(param) {
	$.trace.debug("*************update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
		$.trace.debug("F2 -  " + rs.getString(2)); //path
		$.trace.debug("F3 -  " + rs.getString(3)); //test number
		$.trace.debug("F4 -  " + rs.getString(4)); //test name
		$.trace.debug("F5 -  " + rs.getInteger(5)); //mode
		$.trace.debug("F6 -  " + rs.getString(6)); //owner
		$.trace.debug("F7 -  " + rs.getString(7)); //comment
		$.trace.debug("F8 -  " + rs.getString(8));//type
		$.trace.debug("F9 -  " + rs.getString(9)); //branch
		$.trace.debug("F10 -  " + rs.getString(10)); // test details
		$.trace.debug("F11 -  " + rs.getString(11)); // test results
    	//$.trace.debug("Update TC_ID " + rs.getInteger(1) + " TC_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

       pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_CASES" set "TFILE_NAME" = ?, "TFILE_CASE_NAME" = ?, "TC_NAME" = ?, "TC_ACTIVE" = ?, "TC_DETAILS" = ?, "TC_EXPECTED_RESULT = ?, "TC_OWNER" = ?, "TC_COMMENT" = ?, "TP_NAME" = ?, "B_NAME" = ? where "TC_ID" = ?');
 
       pStmt.setString(1, rs.getString(2));          
       pStmt.setString(2, rs.getString(3));            
       pStmt.setString(3, rs.getString(4)); 
       pStmt.setInteger(4, rs.getInteger(5)); 
       pStmt.setString(5, rs.getString(10)); 
       pStmt.setString(6, rs.getString(11));
       pStmt.setString(7, rs.getString(6)); 
       pStmt.setString(8, rs.getString(7)); 
       pStmt.setString(9, rs.getString(8)); 
       pStmt.setString(10, rs.getString(9)); 
       
       pStmt.setInteger(9, rs.getInteger(1));    

       pStmt.executeUpdate();
       pStmt.close();

       }
 
    rs.close();
}