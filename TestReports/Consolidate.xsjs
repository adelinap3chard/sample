function Call_SP_Consolidate()
{
var query = "{CALL EIMTRD.consolidate_all_cycle_result}";
$.trace.debug(query);
var conn = $.db.getConnection();
var pcall = conn.prepareCall(query);
pcall.execute();
pcall.close();
conn.commit();
conn.close();
}