function UpdateTestProduct(param) {
	$.trace.debug("**************xsjslib update function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	$.trace.debug("first string " + rs.getString(2));
    	$.trace.debug("second string " + rs.getString(3));
    	$.trace.debug("id " + rs.getInteger(1));
    	
        pStmt = param.connection.prepareStatement('update "EIMTRD"."ETRD_PRODUCTS" set "PRO_NAME" = ?, "PRO_VER" = ? where "PRO_ID" = ?');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(3));  
        pStmt.setInteger(3, rs.getInteger(1));    

        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}