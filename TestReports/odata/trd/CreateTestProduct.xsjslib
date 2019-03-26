function CreateTestProduct(param) {
	$.trace.debug("******************CREATE function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Insert TS_NAME " + rs.getString(2) + " TS_DESC " + rs.getString(3));

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_PRODUCTS"("PRO_ID", "PRO_NAME", "PRO_VER") values(EIMTRD.SEQ_PROD_ID.NEXTVAL, ?, ?)');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(3));
       
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}