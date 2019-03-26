function CreateTestExApp(param) {
	$.trace.debug("*************Create function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Insert TFILE_NAME " + rs.getString(2) + " TFILE_CASE_NAME " + rs.getString(3) + " TC_NAME " + rs.getString(4));

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_EXTERNAL_APPS"("APP_ID", "APP_NAME", "APP_VER", "APP_VER_STR", "APP_PLATFORM","APP_OS","APP_HOST") values(EIMTRD.SEQ_APP_ID.NEXTVAL,?, ?, ?, ?, ?, ?)');
 
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(3));            
        pStmt.setString(3, rs.getString(4)); 
        pStmt.setString(4, rs.getString(5)); 
        pStmt.setString(5, rs.getString(6)); 
        pStmt.setString(6, rs.getString(7));   
        
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}