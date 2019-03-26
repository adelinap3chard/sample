function CreateTestSuite(param) {
	$.trace.debug("entered function");
    var after = param.afterTableName;
    var pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	var suiteName = rs.getString(2);
    	var selectSuite = 'select TOP 1 TS_ID from "EIMTRD"."ETRD_TEST_SUITES" where "TS_NAME" = \'' + suiteName + '\'';
    	pStmt = param.connection.prepareStatement(selectSuite);
        var rs2 = pStmt.executeQuery();
        if (rs2.next()) {
        	// throw error back
        	$.trace.info("suite name: " + suiteName + " already exists");
        	return { HTTP_STATUS_CODE: 409, ERROR_MESSAGE: "suite name: " + suiteName + " already exists" };
        }
        else {
	    	$.trace.debug("Insert TS_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));
	
	        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_SUITES"("TS_ID", "TS_NAME", "TS_DESC") values(EIMTRD.SEQ_TS_ID.NEXTVAL, ?, ?)');
	 
	        pStmt.setString(1, rs.getString(2));          
	        pStmt.setString(2, rs.getString(3));            
	
	        pStmt.executeUpdate();
	        pStmt.close();
	        
	        //var selectProduct = 'select TOP 1 PRO_ID from "EIMTRD"."ETRD_PRODUCTS" where "PRO_NAME" = \'' + rs.getString(4) + '\'';
	        //pStmt = param.connection.prepareStatement('insert into EIMTRD.ETRD_SUITES_PRODUCTS (PRO_ID, TS_ID) values((' + selectProduct + '), (' + selectSuite + '))');
	        //pStmt.executeUpdate();
	        //pStmt.close();
	        
        }
        rs2.close();
    }
 
    rs.close();
}

function UpdateTestSuite(param) {
	$.trace.debug("entered update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
      	$.trace.debug("=================== Update suite============");
		$.trace.debug("F2 -  " + rs.getString(2)); //suite name 
		$.trace.debug("F3 -  " + rs.getString(3)); //discription

    	$.trace.debug("Update TS_ID " + rs.getInteger(1) + " TS_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));
    	var TS_NAME = rs.getString(2);
    	var NEW_TS_NAME = rs.getString(5);
    	if (NEW_TS_NAME != null && NEW_TS_NAME != "") {
    		TS_NAME = NEW_TS_NAME;
    	}

        pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_SUITES" set "TS_NAME" = ?, "TS_DESC" = ? where "TS_ID" = ?');
 
        pStmt.setString(1, TS_NAME);          
        pStmt.setString(2, rs.getString(3));            
        pStmt.setInteger(3, rs.getInteger(1));    

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}

function DeleteTestSuite(param) {
	$.trace.debug("*************Delete test suite");
    var after = param.afterTableName;
    var before = param.beforeTableName;
    $.trace.debug("Delete Test suite: after table: " + after + " before table: " + before);
    var pStmt = param.connection.prepareStatement('select * from "'+before+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	var ts_name = rs.getString(2);
    	pStmt = param.connection.prepareStatement('delete from "EIMTRD"."ETRD_TEST_SUITES" where "TS_NAME" = ?');
        pStmt.setString(1, ts_name);   
        pStmt.executeUpdate();
        pStmt.close();
    }
 
    rs.close();
}
