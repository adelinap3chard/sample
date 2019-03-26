function DeleteTestUser(param) {
	$.trace.debug("*************delete function");
    var after = param.afterTableName;
    var before = param.beforeTableName;
    $.trace.debug("Delete Test user: after table: " + after + " before table: " + before);
    var pStmt = param.connection.prepareStatement('select * from "'+before+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	pStmt = param.connection.prepareStatement('delete from "EIMTRD"."ETRD_USERS" where "U_ID" = ?');
        pStmt.setString(1, rs.getString(1));                 
        pStmt.executeUpdate();
        pStmt.close();
    }
 
    rs.close();
}