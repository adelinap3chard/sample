function UpdateTestFeature(param) {
	$.trace.debug("**************xsjslib update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Update TS_ID " + rs.getInteger(1) + " TS_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

        pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_TEST_FEATURES" set "TSF_NAME" = ? where "TSF_ID" = ?');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setInteger(2, rs.getInteger(1));    

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}
