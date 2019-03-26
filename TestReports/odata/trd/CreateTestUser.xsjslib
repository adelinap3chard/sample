function CreateTestUser(param) {
	$.trace.debug("************************Create function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	
    	var selectGroup = "SELECT TOP 1 G_ID FROM EIMTRD.ETRD_GROUPS WHERE G_VAL='" + rs.getString(3) + "'";
    	$.trace.debug("Create Test USER: " + selectGroup);
    	$.trace.debug("Insert U_NAME " + rs.getString(2));
    	
        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_USERS"("U_ID", "U_NAME", "G_ID") values(EIMTRD.SEQ_U_ID.NEXTVAL, ?, (' + selectGroup +'))');
        pStmt.setString(1, rs.getString(2));          

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}