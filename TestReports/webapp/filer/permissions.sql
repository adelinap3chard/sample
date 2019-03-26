alter SYSTEM alter CONFIGURATION ('xsengine.ini','SYSTEM') set ('scheduler','enabled')='true' with reconfigure;
alter SYSTEM alter CONFIGURATION ('daemon.ini','SYSTEM') SET ('scriptserver','instances')='1' with reconfigure;
alter SYSTEM alter CONFIGURATION ('daemon.ini', 'SYSTEM') SET ('dpserver', 'instances')='1' with reconfigure;
call GRANT_ACTIVATED_ROLE('sap.hana.ide.roles::Developer', 'SYSTEM');
call GRANT_ACTIVATED_ROLE('sap.hana.xs.ide.roles::Developer', 'SYSTEM');
call GRANT_ACTIVATED_ROLE('sap.hana.xs.lm.roles::Developer', 'SYSTEM');



