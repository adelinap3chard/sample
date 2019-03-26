function UpdateTestUser(param) {
	$.trace.debug("************************Update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	
    	var selectGroup = "SELECT TOP 1 G_ID FROM EIMTRD.ETRD_GROUPS WHERE G_VAL='" + rs.getString(3) + "'";
    	$.trace.debug("update Test USER: " + selectGroup);
    	$.trace.debug("update U_NAME " + rs.getString(2));
    	
    	pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_USERS" set "U_NAME" = ?, "G_ID" = (' + selectGroup +') where "U_ID" = ?');
        pStmt.setString(1, rs.getString(2));          
        pStmt.setInteger(2, rs.getInteger(1));    
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}