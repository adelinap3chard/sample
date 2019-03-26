 function UpdateDetailTestResult(param) {
	$.trace.debug("*************update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("===================Update TRES_ID " + rs.getInteger(1));

		$.trace.debug("F2 -  " + rs.getString(2)); //case name
		$.trace.debug("F3 -  " + rs.getString(3)); //result
		$.trace.debug("F4 -  " + rs.getString(4)); //user
		$.trace.debug("F5 -  " + rs.getString(5)); //cycle
		$.trace.debug("F6 -  " + rs.getString(6)); // start time
		$.trace.debug("F7 -  " + rs.getString(7)); // end time
		$.trace.debug("F8 -  " + rs.getTimestamp(8));// exec_TS
		$.trace.debug("F9 -  " + rs.getString(9)); // exec_time
		$.trace.debug("F10 -  " + rs.getString(10)); // bug #
		$.trace.debug("F11-  " + rs.getString(11)); // product
		$.trace.debug("F12 -  " + rs.getString(12)); // version 
		$.trace.debug("F13 -  " + rs.getString(13)); // full version
		$.trace.debug("F14 -  " + rs.getString(14)); // platform
		$.trace.debug("F15 -  " + rs.getString(15)); // os
		$.trace.debug("F16 -  " + rs.getString(16)); // host

		//"START_TIME" = ?, "END_TIME" = ?, "EXEC_TS" = ?
       //pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_RESULTS" set "TC_NAME" = ?, "TC_RESULT" = ?, "EXEC_USER" = ?, "CYC_NAME" = ?, "EXEC_TIME" = ? , "BUG_ID" = ?, "PRO_NAME" = ?, "PRO_VER" = ?, "PRO_VER_STR" = ?, "PLAT_NAME" = ?,"OS_NAME" = ?,"HOST_NAME" =? where "TRES_ID" = ?');
		pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_RESULTS" set "TC_RESULT" = ?, "BUG_ID" = ?, "EXEC_TIME" = ?, "HOST_NAME" =? where "TRES_ID" = ?');
		
       pStmt.setString(1, rs.getString(3));      
       pStmt.setString(2, rs.getString(10)); 
       pStmt.setString(3, rs.getString(9)); 
       pStmt.setString(4, rs.getString(16)); 
       //pStmt.setString(5, rs.getString(6));
       //pStmt.setString(6, rs.getString(7)); 
       //pStmt.setString(7, rs.getString(8)); 
       //pStmt.setString(8, rs.getString(9)); 
       //pStmt.setString(9, rs.getString(10)); 
       //pStmt.setString(10, rs.getString(11));
       //pStmt.setString(11, rs.getString(12)); 
       //pStmt.setString(12, rs.getString(13));  
       pStmt.setInteger(5, rs.getInteger(1));    
       
      
       pStmt.executeUpdate();
       pStmt.close();

       }
 
    rs.close();
}
