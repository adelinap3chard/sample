(function main(){
	
	var oConnection = $.db.getConnection({"sqlcc": "TestReports::AnonConn"});
	var userName = $.request.parameters.get("user");
	
	var query = 'select PRIVILEGE from EFFECTIVE_PRIVILEGES where USER_NAME = ? and SCHEMA_NAME = \'EIMTRD\' and OBJECT_TYPE = \'SCHEMA\' and PRIVILEGE = \'DELETE\'';
	
	var oStatement = oConnection.prepareStatement(query);
	oStatement.setString(1, userName);	
	
    oStatement.execute();
    var rs = oStatement.getResultSet();
    var vals = {};
    if (rs.next()) {
    	vals.PRIVILEGE = rs.getString(1);
    }
   
	//oResultSet.close();
	oStatement.close();
	oConnection.close();

	$.response.contentType = "application/json; charset=UTF-8";   
	$.response.setBody(JSON.stringify(vals));   
	$.response.status = $.net.http.OK;   

})();