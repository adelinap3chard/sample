function UpdateTestExApp(param) {
	$.trace.debug("*************update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Update TC_ID " + rs.getInteger(1) + " TC_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

       pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_EXTERNAL_APPS" set "APP_NAME" = ?, "APP_VER" = ?, "APP_VER_STR" = ?, "APP_PLATFORM" = ?, "APP_OS" = ?, "APP_HOST" = ? where "APP_ID" = ?');
 
       pStmt.setString(1, rs.getString(2));          
       pStmt.setString(2, rs.getString(3));            
       pStmt.setString(3, rs.getString(4)); 
       pStmt.setString(4, rs.getString(5)); 
       pStmt.setString(5, rs.getString(6)); 
       pStmt.setString(6, rs.getString(7));       
       pStmt.setInteger(7, rs.getInteger(1));    

       pStmt.executeUpdate();
       pStmt.close();

       }
 
    rs.close();
}