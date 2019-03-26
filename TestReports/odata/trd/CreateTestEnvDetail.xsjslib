function CreateTestExApp(param) {
	$.trace.debug("*************Create function");
    let after = param.afterTableName;
    let pStmt = param.connection.prepareStatement('select * from "'+after+'"');
    pStmt.executeQuery();
    var rs = pStmt.executeQuery();
    if (rs.next()) {
    	//$.trace.debug("Insert TFILE_NAME " + rs.getString(2) + " TFILE_CASE_NAME " + rs.getString(3) + " TC_NAME " + rs.getString(4));

        pStmt = param.connection.prepareStatement('insert into "EIMTRD"."ETRD_DETAILS"("DETAIL_ID", "DETAIL_PROD", "DETAIL_NAME", "DETAIL_VALUE") values(EIMTRD.SEQ_DETAIL_ID.NEXTVAL,?, ?, ?)');
       
        pStmt.setString(1, rs.getString(2));          
        pStmt.setString(2, rs.getString(3));            
        pStmt.setString(3, rs.getString(4));    
        pStmt.executeUpdate();
        pStmt.close();

        }
 
    rs.close();
}