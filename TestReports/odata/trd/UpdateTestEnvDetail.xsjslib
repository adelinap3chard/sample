function UpdateTestExApp(param) {
	$.trace.debug("*************update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Update TC_ID " + rs.getInteger(1) + " TC_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

       pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_DETAILS" set "DETAIL_PROD" = ?, "DETAIL_NAME" = ?, "DETAIL_VALUE" = ? where "DETAIL_ID" = ?');
       pStmt.setString(1, rs.getString(2));          
       pStmt.setString(2, rs.getString(3));            
       pStmt.setString(3, rs.getString(4));      
       pStmt.setInteger(4, rs.getInteger(1));    

       pStmt.executeUpdate();
       pStmt.close();

       }
 
    rs.close();
}