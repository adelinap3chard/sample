function CreateTestFeature(param) {
	$.trace.debug("******************CREATE function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("=================== CREATE test feature============");
		$.trace.debug("F2 -  " + rs.getString(2)); //feature name
		$.trace.debug("");

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_TEST_FEATURES"("TSF_ID", "TSF_NAME") values(EIMTRD.SEQ_FEAT_ID.NEXTVAL, ?)');
        
        pStmt.setString(1, rs.getString(2));               
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}


