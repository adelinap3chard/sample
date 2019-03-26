function CreateTestGroup(param) {
	$.trace.debug("******************CREATE function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("=================== CREATE test group============");
		$.trace.debug("F2 -  " + rs.getString(2)); //group name
		$.trace.debug("");

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_GROUPS"("G_ID", "G_VAL") values(EIMTRD.SEQ_G_ID.NEXTVAL, ?)');
        
        pStmt.setString(1, rs.getString(2));               
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}