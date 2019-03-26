function CreateTestSuiteCase(param) {
	$.trace.debug("*************Create test suite case");
    var after = param.afterTableName;
    var pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	var ts_name = rs.getString(4);
    	var tc_name = rs.getString(1);
    	if (isSuiteCaseExist(param, ts_name, tc_name) == false) {
	    	var selectTestSuite = "SELECT TOP 1 TS_ID FROM EIMTRD.ETRD_TEST_SUITES WHERE TS_NAME='" + ts_name + "'";
	    	var selectTestCase = "SELECT TOP 1 TC_ID FROM EIMTRD.ETRD_TEST_CASES WHERE TC_NAME='" + tc_name + "'";
	    	$.trace.debug("Create test suite case: " + selectTestSuite);
	    	$.trace.debug("Create test suite case: " + selectTestCase);
	    	
	    	pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_SUITES_CASES" ("TS_ID", "TC_ID") values((' + selectTestSuite + '), (' + selectTestCase + '))');
	    	pStmt.executeUpdate();
	        pStmt.close();
    	}
    }
 
    rs.close();
}

function isSuiteCaseExist(param, ts_name, tc_name) {
	var selectTestSuite = "SELECT TOP 1 TS_ID FROM EIMTRD.ETRD_TEST_SUITES WHERE TS_NAME='" + ts_name + "'";
	var selectTestCase = "SELECT TOP 1 TC_ID FROM EIMTRD.ETRD_TEST_CASES WHERE TC_NAME='" + tc_name + "'";
	var pStmt = param.connection.prepareStatement('select * from "EIMTRD"."ETRD_SUITES_CASES" where "TS_ID" = (' + selectTestSuite + ') and "TC_ID" = (' +  selectTestCase + ')');
    var rs = pStmt.executeQuery();
    var exist = rs.next();
    rs.close();
    pStmt.close();
    return exist;
}

function DeleteTestSuiteCase(param) {
	$.trace.debug("*************Delete test suite case");
    var after = param.afterTableName;
    var before = param.beforeTableName;
    $.trace.debug("Delete Test Plan: after table: " + after + " before table: " + before);
    var pStmt = param.connection.prepareStatement('select * from "'+before+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("Delete Test suite case: after table: " + after + " before table: " + before);
    	var ts_id = rs.getInteger(12);
    	var tc_id = rs.getBigInt(13);
    	pStmt = param.connection.prepareStatement('delete from "EIMTRD"."ETRD_SUITES_CASES" where "TS_ID" = ? and "TC_ID" = ?');
        pStmt.setInteger(1, ts_id);   
        pStmt.setBigInt(2, tc_id);
        pStmt.executeUpdate();
        pStmt.close();
    }
 
    rs.close();
}