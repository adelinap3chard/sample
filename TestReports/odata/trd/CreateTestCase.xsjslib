function CreateTestCase(param) {
	$.trace.debug("************* create_test_case_function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	var caseName = rs.getString(4);
    	let pStmt = param.connection.prepareStatement('select * from "EIMTRD"."ETRD_TEST_CASES" where "TC_NAME" = \'' + caseName + '\'');
        var rs2 = pStmt.executeQuery();
        if (rs2.next()) {
        	// if duplicate - do update
        	
        	
        	
        	$.trace.info("found case : " + caseName + " already exists");
        	$.trace.info("******************Will update exiting Case***********************");
        	
        	let pStmt = param.connection.prepareStatement('select top 1 TC_ID from "EIMTRD"."ETRD_TEST_CASES" where "TC_NAME" = \'' + caseName + '\'');
        	var rs3 = pStmt.executeQuery();
        	if (rs3.next()){
        		var id = rs3.getInteger(1);
        	}
   
    		$.trace.debug("F2 - path - " + rs.getString(2)); //path
    		$.trace.debug("F3 - case num - " + rs.getString(3)); //test number
    		$.trace.debug("F4 - testname - " + rs.getString(4)); //test name
    		$.trace.debug("F5 - mode - " + rs.getInteger(5)); //mode
    		$.trace.debug("F6 - owner - " + rs.getString(6)); //owner
    		$.trace.debug("F7 - comment - " + rs.getString(7)); //comment
    		$.trace.debug("F8 - type - " + rs.getString(8));//type
    		$.trace.debug("F9 - branch - " + rs.getString(9)); //branch
    		$.trace.debug("F10 - details - " + rs.getString(10)); // test details
    		$.trace.debug("F11 - results - " + rs.getString(11)); // test results
    		$.trace.debug("F12 - project - " + rs.getString(12)); // test results
    		
    		$.trace.debug('upsert "EIMTRD"."ETRD_TEST_CASES"("TC_ID", "TFILE_NAME", "TFILE_CASE_NAME", "TC_NAME", "TC_ACTIVE","TC_DETAILS", "TC_EXPECTED_RESULT, "TC_OWNER","TC_COMMENT","TP_NAME","B_NAME","PROJECT") values(' + id +', ?, ?, ?, ?, ?, ?, ?, ?,?,?,?) where "TC_NAME" = \'' + caseName +'\'');
    		
        	//return { HTTP_STATUS_CODE: 409, ERROR_MESSAGE: "case name: " + caseName + " already exists" };
    		pStmt = param.connection.prepareStatement('')
    		pStmt = param.connection.prepareStatement('upsert "EIMTRD"."ETRD_TEST_CASES"("TC_ID", "TFILE_NAME", "TFILE_CASE_NAME", "TC_NAME", "TC_ACTIVE", "TC_DETAILS", "TC_EXPECTED_RESULT","TC_OWNER","TC_COMMENT","TP_NAME","B_NAME", "PROJECT" ) values(' + id +', ?, ?, ?, ?, ?, ?, ?, ?,?,?,?) where "TC_NAME" = \'' + caseName +'\'');
    		
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
	        pStmt.setString(11, rs.getString(12)); 
	        
	        pStmt.executeUpdate();
	        pStmt.close();
	        rs3.close();
        }
        else { // no update - do insert
        	$.trace.info("******************Will create New Case***********************");
    		$.trace.debug("F2 - path - " + rs.getString(2)); //path
    		$.trace.debug("F3 - case num - " + rs.getString(3)); //test number
    		$.trace.debug("F4 - testname - " + rs.getString(4)); //test name
    		$.trace.debug("F5 - mode - " + rs.getInteger(5)); //mode
    		$.trace.debug("F6 - owner - " + rs.getString(6)); //owner
    		$.trace.debug("F7 - comment - " + rs.getString(7)); //comment
    		$.trace.debug("F8 - type - " + rs.getString(8));//type
    		$.trace.debug("F9 - branch - " + rs.getString(9)); //branch
    		$.trace.debug("F10 - details - " + rs.getString(10)); // test details
    		$.trace.debug("F11 - results - " + rs.getString(11)); // test results
    		$.trace.debug("F12 - project - " + rs.getString(12)); // test results
    		
	    	//$.trace.debug("Insert TFILE_NAME " + rs.getString(2) + " TFILE_CASE_NAME " + rs.getString(3) + " TC_NAME " + rs.getString(4));
	
	    	pStmt = param.connection.prepareStatement('')
	        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_CASES"("TC_ID", "TFILE_NAME", "TFILE_CASE_NAME", "TC_NAME", "TC_ACTIVE", "TC_DETAILS","TC_EXPECTED_RESULT","TC_OWNER","TC_COMMENT","TP_NAME","B_NAME","PROJECT") values(EIMTRD.SEQ_TC_ID.NEXTVAL, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)');
	    	
	    	
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
	        pStmt.setString(11, rs.getString(12)); 
	        
	        pStmt.executeUpdate();
	        pStmt.close();
        }
        rs2.close();
    }
 
    rs.close();
}