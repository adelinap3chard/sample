ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'database', 'DD1') SET ('public_urls', 'http_url') = 'http://dd1.sjbl00541748a.amer.global.corp.sap:8000' WITH RECONFIGURE;
ALTER SYSTEM ALTER CONFIGURATION ('xsengine.ini', 'database', 'DD1') SET ('public_urls', 'https_url') = 'https://dd1.sjbl00541748a.amer.global.corp.sap:4300' WITH RECONFIGURE;
ALTER DATABASE DD1 ADD 'dpserver';
alter SYSTEM alter CONFIGURATION ('xsengine.ini','SYSTEM') set ('scheduler','enabled')='true' with reconfigure;
