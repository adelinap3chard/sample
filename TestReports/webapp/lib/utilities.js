function getRadioButtonGroup(id){
	
	var oRadioButtonGroup = new sap.ui.commons.RadioButtonGroup(id, {
		columns: 3
	});
	
	oItemDay = new sap.ui.core.Item({
	 key: "RadioButtonDay",
	 text: "daily"
    });

    oItemWeek = new sap.ui.core.Item({
	 key: "RadioButtonWeek",
	 text: "weekly"
    });

    oItemMonth = new sap.ui.core.Item({
	 key: "RadioButtonMonth",
	 text: "monthly" 
    });

    oRadioButtonGroup.addItem(oItemDay);
    oRadioButtonGroup.addItem(oItemWeek);
    oRadioButtonGroup.addItem(oItemMonth);

    return oRadioButtonGroup;
};

function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};

function getModelWithData(url){
	
	var oModel = new sap.ui.model.json.JSONModel();// url);
	oModel.setSizeLimit(100000);

	$.ajax({
		url : url, // for different servers cross-domain
					// restrictions need to be handled
		async : false,
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : function(data, textStatus, jqXHR) { // callback called when data is received

			oModel.setData(data); // fill the received data into the JSONModel
			
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert(jqXHR);
			alert(textStatus);
			alert(errorThrown);
		}
	});
	
	return oModel;
	
};

function getModelWithDataASYNC(url, dataCB, errorCB){
	$.ajax({
		url : url, // for different servers cross-domain
					// restrictions need to be handled
		contentType : "application/json; charset=utf-8",
		dataType : "json",
		success : dataCB,
		error : errorCB
	});
	
};

function getServiceUrl(sServiceUrl){
	
	sServiceUrl = "http://qadb.wdf.sap.corp:8000" + sServiceUrl; 
	
	var sOrigin = window.location.protocol
	+ "//"
	+ window.location.hostname
	+ (window.location.port ? ":"
			+ window.location.port : "");
    if (!jQuery.sap.startsWith(sServiceUrl, sOrigin)) {
     return "proxy/" + sServiceUrl.replace("://", "/");
    } else {
     return sServiceUrl.substring(sOrigin.length);
    }
    
};

function getTimeDimensionKey(timeDimensionText){
	
	var timeDimensionKey = 0;
	
	switch (timeDimensionText){
   	 case "daily":
   		timeDimensionKey = 100;
   	  break;
   	 case "weekly":
   		timeDimensionKey = 101;
   	  break;  
   	 case "monthly":
   		timeDimensionKey = 102;
   	  break;
   	 default:
   		alert("Error during getTimeDimensionKey(). Please send a mail to INFRA. Thanks."); 
   	    break;
	 }
	
	return timeDimensionKey;
	
};


function getPreviousDate(days){
	 var now = +(new Date); // current datetime as timestamp. (Date.now does not work in IE8)
	 var previousDate = new Date(now - ( days * 24 * 60 * 60 * 1000 ) );
	 
	 return previousDate;
};

Date.prototype.yyyymmdd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString();
    var dd  = this.getDate().toString();
    return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]);
};
Date.prototype.yyyymmddFormated = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth()+1).toString();
    var dd  = this.getDate().toString();
    return yyyy +"-"+ (mm[1]?mm:"0"+mm[0]) +"-"+ (dd[1]?dd:"0"+dd[0]);
};

function getNumberOfMakes(host,branch){
	var oLineChart = sap.ui.getCore().byId("momChart");
	var data = oLineChart.mAggregations.dataset.mBindingInfos.data.binding.oList;
	var numberOfMakes = 0;	
	
	for(var i = 0; i <= data.length; i++){
		if(data[i].HOST == host){
			if(data[i].BRANCH == branch){
				numberOfMakes = data[i].NUMBER_OF_MAKES;
				break;
			}
		}
	}
	return numberOfMakes;
};

function getCalendarWeek(year,month,date) {
  var oDate = new Date();
  if (!date) {
    year = oDate.getYear(); if (1900 > year) year +=1900;
    month = oDate.getMonth(); date = oDate.getDate();
  }
  else month--;
  oDate = new Date(year,month,date,0,0,1);
  var day = oDate.getDay(); if (day == 0) day = 7;
  var date2 = new Date(2004,0,1).getTimezoneOffset();
  var summerTime = (Date.UTC(year,month,date,0,date2,1) - Number(oDate)) /3600000;
  oDate.setTime(Number(oDate) + summerTime*3600000 - (day-1)*86400000);
  var year2 = oDate.getYear(); if (1900 > year2) year2 +=1900;
  var cw = 1;
  if (new Date(year2,11,29) > oDate) {
    var start = new Date(year2,0,1);
    start = new Date(Number(start) + 86400000*(8-start.getDay()));
    if(start.getDate() > 4) start.setTime(Number(start) - 604800000);
    cw = Math.ceil((oDate.getTime() - start) /604800000);
  }
  return cw;
};

function addZeroToNumbersSmallerThanTen(number){
	
	if(number<10){
		number = "0"+number;
	}
	return number;
	
};

function getODataModel(name, url, filters) {
	var oDataModel = sap.ui.getCore().getModel(name);
	if (oDataModel == null) {
		oDataModel = new sap.ui.model.odata.ODataModel(url, false);
		if (filters != null) {
			oDataModel.attachRequestCompleted(function() {
			     var data = oDataModel.oData;
			     var uniques = _.map(_.groupBy(data, function(item){
			    	  return item.TS_NAME;
			    	}),function(grouped){
			    	  return grouped[0];
			    	});
			     oDataModel.oData = uniques;
			});
		}
		oDataModel.setSizeLimit(100000);
		sap.ui.getCore().setModel(oDataModel, name);
	}
	return oDataModel
};

function clearODataModel() {
	sap.ui.getCore().setModel(null, "/TestResultDetail");
	sap.ui.getCore().setModel(null, "/TestSuiteCase");
	sap.ui.getCore().setModel(null, "/TestStatus");
}

function getDropdownWithModel(id, keyDD, oModel, additionalTextDD) {
	oDropdownBox = new sap.ui.commons.DropdownBox(id);
	var oItemTemplateBranch = new sap.ui.core.ListItem();
	oItemTemplateBranch.bindProperty("text", keyDD);
	if (additionalTextDD != undefined) {
		oItemTemplateBranch.bindProperty("additionalText", additionalTextDD);
		oDropdownBox.bindProperty("displaySecondaryValues", "true");
	}

	oDropdownBox.bindItems("/LIST", oItemTemplateBranch, new sap.ui.model.Sorter(keyDD, false, true));
	
	oDropdownBox.setModel(oModel);
	
	oDropdownBox.__proto__._getFilteredItems = function(aItems, rValFilter) {
		return [];
	};
	
	oDropdownBox.__proto__.checkValueInItems = function() {
		//var sValue = "Select...";
		return '';
	};
	
	return oDropdownBox;
}

function getDropdownWithModel2(id, keyDD, oModel, additionalTextDD) {
	oDropdownBox = new sap.ui.commons.DropdownBox(id);
	var oItemTemplateBranch = new sap.ui.core.ListItem();
	oItemTemplateBranch.bindProperty("text", keyDD);
	if (additionalTextDD != undefined) {
		oItemTemplateBranch.bindProperty("additionalText", additionalTextDD);
		oDropdownBox.bindProperty("displaySecondaryValues", "true");
	}

	oDropdownBox.bindItems("/", oItemTemplateBranch, new sap.ui.model.Sorter(keyDD, false, true));
	
	oDropdownBox.setModel(oModel);
	
	oDropdownBox.__proto__._getFilteredItems = function(aItems, rValFilter) {
		return [];
	};
	
	oDropdownBox.__proto__.checkValueInItems = function() {
		//var sValue = "Select...";
		return '';
	};
	
	return oDropdownBox;
}

function getComboBoxWithModel(id, keyDD, oModel) {
	oDropdownBox = new sap.ui.commons.ComboBox(id);
	
	var oItemTemplateBranch = new sap.ui.core.ListItem();
	oItemTemplateBranch.bindProperty("text", keyDD);

	oDropdownBox.bindItems("/LIST", oItemTemplateBranch, new sap.ui.model.Sorter(keyDD, false, true));
	
	oDropdownBox.setModel(oModel);
	
	oDropdownBox.__proto__._getFilteredItems = function(aItems, rValFilter) {
		return [];
	};
	
	return oDropdownBox;
}

function checkUser(callback) {
	var user = sap.ui.getCore().getModel("/ChangeUserProfile");
	if (user == null) {
		var loginView = sap.ui.getCore().byId("loginView");
        var oDialog = sap.ui.getCore().byId("loginDialog");
		oDialog.addButton(new sap.ui.commons.Button({text: "OK", press:function() {
			var userName = sap.ui.getCore().byId("UserName");
			var user = userName.getValue();
			var model = getModelWithData("/TestReports/getPrivilege.xsjs?user=" + user);
			var data = model.getData();
			user = {}
			user.isAdmin = data != undefined && data.PRIVILEGE == 'DELETE' ;
			sap.ui.getCore().setModel(user, "/ChangeUserProfile");
			sap.ui.getCore().setModel(user, "/UserProfile");
			oDialog.close();
			callback(user.isAdmin);
		}}));
		oDialog.addContent(loginView);
        oDialog.open();
	}
	else {
		callback(user.isAdmin);
	}
}
	
function getUser() {
	var user = sap.ui.getCore().getModel("/UserProfile");
	if (user == null) {
		user = {}
		user.isAdmin = true ;
		sap.ui.getCore().setModel(user, "/UserProfile");
	}
	return user;
}

function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}

function gen_xls_header(ws, row_id, keys) {
	var length = keys.length - 1;
	for(var C = 0; C < length; ++C) {
		var header = {v: keys[C + 1] };
		header.t = 's';
		ws[XLSX.utils.encode_cell({c:C,r:row_id})] = header;
	}
}

function gen_xls_cell(ws, row_id, keys, oEntry) {
	var length = keys.length - 1;
	for(var C = 0; C < length; ++C) {
		var cell = {v: oEntry[keys[C + 1]] };
		if (cell.v == null) {
			cell.v = "";
		}
	
		if(typeof cell.v === 'number') cell.t = 'n';
		else if(typeof cell.v === 'boolean') cell.t = 'b';
		else if(cell.v instanceof Date) {
			cell.t = 's';
			cell.v = datestring(cell.v);
			//cell.t = 'n'; cell.z = XLSX.SSF._table[14];
			//cell.v = datenum(cell.v);
		}
		else cell.t = 's';

		ws[XLSX.utils.encode_cell({c:C,r:row_id})] = cell;
	}
}

function gen_xls_sheet(oEntry) {
	var ws = {};
	var keys = Object.keys(oEntry);
	gen_xls_header(ws, 0, keys);
	gen_xls_cell(ws, 1, keys, oEntry);
	var range = {s: {c:0, r:0}, e: {c:keys.length, r:2 }};
	ws['!ref'] = XLSX.utils.encode_range(range);
	
	return ws;
}

function gen_xls_sheet_for_entries(oEntries) {
	var ws = {};
	var keys = Object.keys(oEntries[0]);
	gen_xls_header(ws, 0, keys);
	for(var i = 0; i < oEntries.length; ++i) {
		gen_xls_cell(ws, i + 1, keys, oEntries[i]);
	}
	var range = {s: {c:0, r:0}, e: {c:keys.length, r:i + 2 }};
	ws['!ref'] = XLSX.utils.encode_range(range);
	
	return ws;
}

function save_xlsx(filename, wsName, oEntry) {
	/* add worksheet to workbook */
    var wb = new Workbook();
    var ws = gen_xls_sheet(oEntry);
    wb.SheetNames.push(wsName);
    wb.Sheets[wsName] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    var blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
    saveAs(blob, filename);
}

function save_xlsx_for_entries(filename, wsName, oEntries) {
	/* add worksheet to workbook */
    var wb = new Workbook();
    var ws = gen_xls_sheet_for_entries(oEntries);
    wb.SheetNames.push(wsName);
    wb.Sheets[wsName] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
    var blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
    saveAs(blob, filename);
}

function save_workbook(filename, workbook) {
	var wbout = XLSX.write(workbook, {bookType:'xlsx', bookSST:true, type: 'binary'});
    var blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
    saveAs(blob, filename);
}

function read_xlsx(event, import_function) {
	var input = event.target
	if (input.files.length == 1) {
		var reader = new FileReader();
		var workbook;
	    reader.onload = function(){
	      var arrayBuffer = reader.result;
	      var data = new Uint8Array(arrayBuffer);
	      var arr = new Array();
	      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
	      var bstr = arr.join("");
	
	      /* Call XLSX */
	      var workbook = XLSX.read(bstr, {type:"binary"});
	      import_function(workbook);
	    };
	    reader.readAsArrayBuffer(input.files[0]);
	}
}
 
function import_testcases(workbook) {
	sap.ui.core.BusyIndicator.show(0);
	setTimeout(function(){
		var worksheet = workbook.Sheets["TestCases"];
		if (worksheet != null) {
			var json = XLSX.utils.sheet_to_json(worksheet);
			var oModel = getODataModel("/TestCase", "/TestReports/odata/getTestCaseList.xsodata");
			for(var i = 0; i != json.length; ++i) {
				var oEntry = json[i];
				oEntry.TC_ID = 0;
				if (oEntry.TFILE_NAME == undefined	) {
					oEntry.TFILE_NAME = "";
				}
				if (oEntry.TC_DETAILS == undefined	) {
					oEntry.TC_DETAILS = "";
				}
				if (oEntry.TC_EXPECTED_RESULT == undefined	) {
					oEntry.TC_EXPECTED_RESULT = "";
				}
				if (oEntry.TC_COMMENT == undefined	) {
					oEntry.TC_COMMENT = "";
				}
				if (oEntry.TC_ACTIVE == undefined	) {
					oEntry.TC_ACTIVE = 1;
				}
				oModel.create('/LIST', oEntry, null, function(){
						oModel.refresh();
						sap.ui.core.BusyIndicator.hide();
						sap.ui.commons.MessageBox.alert("Test Case file successfully imported!",'',"Success");
					},function(){
			            //alert("Create failed");
						sap.ui.core.BusyIndicator.hide();
			            sap.ui.commons.MessageBox.alert("Import failed! Please contact admin",'',"Failure");
			        }
				);
			}
		}
		
		document.getElementById('testCaseSelectedFile').value = "";
	},20);
}

function import_testplans(workbook) {
	sap.ui.core.BusyIndicator.show(0);
	setTimeout(function(){
		var worksheet = workbook.Sheets["TestPlans"];
		if (worksheet != null) {
			var json = XLSX.utils.sheet_to_json(worksheet);
			var oModel = getODataModel("/TestPlan", "/TestReports/odata/getTestPlanList.xsodata");
			var batchChanges = [];
			//linenum = 0;
			for(var i = 0; i != json.length; ++i) {
				var oEntry = json[i];
				oEntry.TSP_ID = 0;
				if (oEntry.FEATURE == undefined	) {
					oEntry.FEATURE = "";
				}
				if (oEntry.CATALOG == undefined	) {
					oEntry.CATALOG = "";
				}
				if (oEntry.PLAT_NAME == undefined ) { 
					oEntry.PLAT_NAME = "";
				}
				if (oEntry.OS_NAME == undefined	) {
					oEntry.OS_NAME = "";
				}
				if (oEntry.ASSGINEE == undefined ) {
					oEntry.ASSGINEE = "";
				}
				if (oEntry.PRO_NAME == undefined ) {
					oEntry.PRO_NAME = "";
				}
				oEntry.CYC_TAG = oEntry.CYC_TAG.trim()
				batchChanges.push(oModel.createBatchOperation("/LIST", "POST", oEntry, null));
			}
			
			if (batchChanges.length > 0) {
				oModel.addBatchChangeOperations(batchChanges); 
				oModel.setUseBatch(true);
				oModel.submitBatch(function(res) {
					if (res.__batchResponses[0].response != undefined && res.__batchResponses[0].response.body != undefined) {
						message = getMessage(res.__batchResponses[0].response.body);
						sap.ui.core.BusyIndicator.hide();
						sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
					}
					else {
						sap.ui.core.BusyIndicator.hide();
						oModel.refresh();
						sap.ui.commons.MessageBox.alert("Test plan file successfully imported!",'',"Success");
					}
				},function(err){
					sap.ui.core.BusyIndicator.hide();
					message = getMessage(err.response.body);
					sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
				});
			}
		}else {
			sap.ui.core.BusyIndicator.hide();
			sap.ui.commons.MessageBox.alert("Unable to find 'TestPlans' tab. Please check your excel file",'',"failure");
		}
		document.getElementById('testPlanSelectedFile').value = "";
	},20);
}

function import_testsuites(workbook) {
	sap.ui.core.BusyIndicator.show(0);
	setTimeout(function(){
		var worksheet = workbook.Sheets["TestSuites"];
		if (worksheet != null) {
			var json = XLSX.utils.sheet_to_json(worksheet);
			var oModel = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
			suiteError = 0; 
			caseError = 0;
			message = "";
			
			for(var i = 0; i != json.length; ++i) {
				//var error = false;
				var oEntry = json[i];
				oEntry.TS_ID = 0;
				if (oEntry.TS_DESC == undefined	) {
					oEntry.TS_DESC = "";
				}
				if (oEntry.PRO_NAME == undefined	) {
					oEntry.PRO_NAME = "";
				}
				
				var TS_NAME = oEntry.TS_NAME;
				
				
				oModel.create('/LIST', oEntry, null, function(){
						oModel.refresh();
					},function(err){
						sap.ui.core.BusyIndicator.hide();
						//sap.ui.commons.MessageBox.alert("Test suite: " + TS_NAME + " already exists. Will not create new suite!",'',"INFO");
						//alert("Test suite: " + TS_NAME + " already exists. Will not create new suite!");
						//sap.ui.commons.MessageBox.alert("there is an empty string in " (i+2) ,'',"INFO");
						message = getMessage(err.response.body);
						sap.ui.commons.MessageBox.alert("Error: "+message,'',"INFO");
			            return;
			        }
				);
				
				var ws = workbook.Sheets[oEntry.TS_NAME];
				if (ws != null) {
					var jsonSuiteCase = XLSX.utils.sheet_to_json(ws);
					var oModelTestCase = getODataModel("/TestCase", "/TestReports/odata/getTestCaseList.xsodata");
					var oModelSuiteCase = getODataModel("/TestSuiteCase", "/TestReports/odata/getTestSuiteCaseList.xsodata");
					for(var j = 0; j != jsonSuiteCase.length; ++j) {
						var oEntry = jsonSuiteCase[j];
						oEntry.TC_ID = 0;
						if (oEntry.TFILE_NAME == undefined	) {
							oEntry.TFILE_NAME = "";
							message = (message + "")
						}
						if (oEntry.TC_DETAILS == undefined	) {
							oEntry.TC_DETAILS = "";
						}
						if (oEntry.TC_EXPECTED_RESULT == undefined	) {
							oEntry.TC_EXPECTED_RESULT = "";
						}
						if (oEntry.TC_COMMENT == undefined	) {
							oEntry.TC_COMMENT = "";
						}
						if (oEntry.TC_ACTIVE == undefined	) {
							oEntry.TC_ACTIVE = 1;
						}
						if (oEntry.TFILE_CASE_NAME == undefined	) {
							oEntry.TFILE_CASE_NAME = "";
						}
						if (oEntry.PROJECT == undefined	) {
							oEntry.PROJECT = "";
						}
						if (oEntry.B_NAME == undefined	) {
							oEntry.B_NAME = "";
						}
						if (oEntry.TP_NAME == undefined){
							sap.ui.core.BusyIndicator.hide();
							sap.ui.commons.MessageBox.alert("Import fail at suite:  "+ TS_NAME +" and row #: "+ (j+2) +" - ERROR: column 'TP_NAME' is missing.Please update and retry",'',"Failure");
							//sap.ui.commons.MessageBox.alert("Import failed, column TP_NAME requires but empty. Please update and re-import",'',"Failure");
							return; 
						}
						if (oEntry.TC_OWNER == undefined ){
							sap.ui.core.BusyIndicator.hide();
							sap.ui.commons.MessageBox.alert("Import fail at suite:  "+ TS_NAME +" and row #: "+ (j+2) +" - ERROR: column 'TC_OWNER' is missing .Please update and retry",'',"Failure");
							//sap.ui.commons.MessageBox.alert("Import failed, column TC_OWNER requires but empty. Please update and re-import",'',"Failure");
							return;
						}
						if (oEntry.TC_NAME == undefined ){
							sap.ui.core.BusyIndicator.hide();
							sap.ui.commons.MessageBox.alert("Import fail at suite:  "+ TS_NAME +" and row #: "+ (j+2) +" - ERROR: column 'TC_NAME' is missing .Please update and retry",'',"Failure");
							//sap.ui.commons.MessageBox.alert("Import failed, column TC_NAME requires but empty. Please update and re-import",'',"Failure");
							return;
						}

						oModelTestCase.create('/LIST', oEntry, null, function(){
							},function(err){
								//import case failure
								caseErrorMessage = getMessage(err.response.body);
								caseError = (caseError + 1); 
					        }
						);
						oEntry.TS_ID = 0;
						oEntry.TC_ID = "0"; // strange this need to be string?
						//use TC_OWNER to store TS_NAME, used in TestSuiteCase.xsjslib::CreateTestSuiteCase
						oEntry.TC_OWNER = TS_NAME;
						oModelSuiteCase.create('/LIST', oEntry, null, function(){
							//pass
							},function(err){
								suiteErrorMessage = getMessage(err.response.body);
								suiteError = (suiteError + 1); 
							}
						);
					}
					oModelSuiteCase.refresh();
					oModelSuiteCase.refresh();
				}
			}
			sap.ui.core.BusyIndicator.hide();
			if (suiteError != 0){
				sap.ui.commons.MessageBox.alert("Error: "+suiteErrorMessage,'',"Failure");
			}else {
				if (caseError !=0 ){
					sap.ui.commons.MessageBox.alert("Error: "+caseErrorMessage,'',"Failure");
				}else {
					var oTestResult = sap.ui.getCore().byId("testSuiteTableID");
					oTestResult.setModel(refreshTestsuites());
					sap.ui.commons.MessageBox.alert("All File successfully imported!",'',"Success");}
				}
		}else {
			sap.ui.core.BusyIndicator.hide();
			sap.ui.commons.MessageBox.alert("Unable to find 'TestSuites' tab. Please check your excel file",'',"failure");
		}
		document.getElementById('testSuiteSelectFile').value = "";
	},20);
}

function import_log_test_results(workbook) {
	sap.ui.core.BusyIndicator.show(0);
	setTimeout(function(){
		var worksheet = workbook.Sheets["LogTestResults"];
		if (worksheet != null) {
			var json = XLSX.utils.sheet_to_json(worksheet);
			var oModel = getODataModel("/TestResultDetail", "/TestReports/odata/getTestResultList.xsodata");
			var errorcounter = 0;
			var batchChanges = [];
			for(var i = 0; i != json.length; ++i) {
				var oEntry = json[i];
				if (oEntry.START_TIME == undefined	) {
					oEntry.START_TIME = "";
				}
				if (oEntry.BUG_ID == undefined	) {
					oEntry.BUG_ID = "";
				}
				if (oEntry.END_TIME == undefined	) {
					oEntry.END_TIME = "";
				}
				if (oEntry.EXEC_TIME == undefined	) {
					oEntry.EXEC_TIME = "";
				}
				if (oEntry.PRO_NAME == undefined	) {
					//oEntry.PRO_NAME = "";
					//sap.ui.commons.MessageBox.alert("Import fail at suite:  "+ TC_NAME +" and row: "+ (j+2) +" .Please contact admin to reset and retry",'',"Failure");
					sap.ui.core.BusyIndicator.hide();
					sap.ui.commons.MessageBox.alert("Import failed, column PRO_NAME requires but empty on row: " +(i+2)+". Please update and re-import",'',"Failure");
					return; 
				}
				if (oEntry.PRO_VER_STR == undefined	) {
					oEntry.PRO_VER_STR = "";
				}
				if (oEntry.PLAT_NAME == undefined	) {
					//oEntry.PLAT_NAME = "";
					sap.ui.core.BusyIndicator.hide();
					sap.ui.commons.MessageBox.alert("Import failed, column PLAT_NAME requires but empty on row: " +(i+2)+". Please update and re-import",'',"Failure");
					return;
				}
				if (oEntry.OS_NAME == undefined	) {
					//oEntry.OS_NAME = "";
					sap.ui.core.BusyIndicator.hide();
					sap.ui.commons.MessageBox.alert("Import failed, column OS_NAME requires but empty on row: " +(i+2)+". Please update and re-import",'',"Failure");
					return;
				}
				if (oEntry.HOST_NAME == undefined	) {
					oEntry.HOST_NAME = "";
				}
				oEntry.EXEC_TS = datestring(oEntry.EXEC_TS);
				oEntry.TRES_ID = "0";
				
				batchChanges.push(oModel.createBatchOperation("/LIST", "POST", oEntry, null));
			}
			sap.ui.core.BusyIndicator.hide();
			if (batchChanges.length > 0) {
				oModel.addBatchChangeOperations(batchChanges); 
				oModel.setUseBatch(true);
				oModel.submitBatch(function(res) {
					if (res.__batchResponses[0].response != undefined && res.__batchResponses[0].response.body != undefined) {
						message = getMessage(res.__batchResponses[0].response.body);
						sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
					}
					else {
						oModel.refresh();
						sap.ui.commons.MessageBox.alert("Test results file successfully imported!",'',"Success");
					}
				},function(err){
					message = getMessage(err.response.body);
					sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
				});
			}
		}else {
			sap.ui.core.BusyIndicator.hide();
			sap.ui.commons.MessageBox.alert("Unable to find 'LogTestResults' tab. Please check your excel file",'',"failure");
		}
		document.getElementById('d_manualSelectFile').value = "";
	},20);
				
				/*
				oModel.create('/LIST', oEntry, null, function(){
					oModel.refresh();
					},function(err){
						message = getMessage(err.response.body);
						errorcounter = (errorcounter + 1); 
			        }
				); 
			}
			sap.ui.core.BusyIndicator.hide();
			if (errorcounter != 0){
				sap.ui.commons.MessageBox.alert("Error: "+message,'',"Failure");
			}else {
				sap.ui.commons.MessageBox.alert("File successfully imported!",'',"Success");
			}
		}
		
		document.getElementById('d_manualSelectFile').value = "";
	},20); */
}


function s2ab(s) {
	var buf = new ArrayBuffer(s.length);
	var view = new Uint8Array(buf);
	for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
	return buf;
}

function datestring(v, date1904) {
	var epoch = Date.parse(v);
	return dateFormat(epoch, "yyyy-mm-dd HH:MM:ss", true);
}

function datenum(v, date1904) {
	if(date1904) v+=1462;
	var epoch = Date.parse(v);
	return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function getMessage(oError) {
	var messageText = "An unknown error occurred";
	try {
	      // Try to parse as a JSON string
	      var oMessage = JSON.parse(oError);
	      messageText = oMessage.message;
	    } catch (err) {
	      try {
	        // Whoops - not JSON, check if this is XML
	        switch (typeof oError) {
	          case "string": // XML or simple text
	            if (oError.indexOf("<?xml") == 0) {
	              var oXML = jQuery.parseXML(oError);
	              var oXMLMsg = oXML.querySelector("message");
	              if (oXMLMsg) {
	                messageText = oXMLMsg.textContent;
	              }
	            } else {
	              // Nope just return the string
	              messageText = oError;
	            }
	            break;
	          case "object": // Exception
	            messageText = oError.toString();
	            break;
	        }
	      } catch (err) {
	      }
	    }
	return messageText;
}

function setProductFilter() {
	var oDropdown = sap.ui.getCore().byId("ProductFilter");
	var filter = oStorage.get("ProductFilter");
	if (filter != null && filter != '') {
		oDropdown.setValue(filter);
	}
}

function getProductFilter() {
	var filters = null;
	var oDropdown = sap.ui.getCore().byId("ProductFilter");
	var productFilter = oDropdown.getValue();
	if (productFilter != null && productFilter != '') {
		filters = new Array();  
        var filter = new sap.ui.model.Filter("PRO_NAME", sap.ui.model.FilterOperator.EQ, productFilter);  
        filters.push(filter);  
	}
	return filters;
}

function getAllCycles() {
	var oModel = sap.ui.getCore().getModel("/TestCycle2");
	if (oModel == null) {
		var url = "/TestReports/odata/getTestCycleList.xsodata/LIST/?";
		url += "$format=json&$orderby=STARTDATE desc";
		oModel = getModelWithData(url);
		sap.ui.getCore().setModel(oModel, "/TestCycle2");
	}
	return oModel;
}

function getCycles() {
	var now = new Date();
	var last60days = new Date(now - ( 60 * 24 * 60 * 60 * 1000 ));
	var oModel = getAllCycles();
	var stateModel = new sap.ui.model.json.JSONModel();
	var data = oModel.getData()['d']['results'];
	var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
	if (productFilter != null && productFilter != '') {
		var filteredData = _.filter(data, function(item) {
			//return item.PRO_NAME === productFilter && Date.parse(item.STARTDATE) >= last60days ;
			return item.PRO_NAME === productFilter && Date.parse(item.ENDDATE) >= last60days;
			
		});
		stateModel.setData(filteredData);
	}
	else {
	     var uniques = _.map(_.groupBy(data, function(item){
	    	  return item.CYC_TAG;
	    	}),function(grouped){
	    	  return grouped[0];
	    	});
	     var filteredData = _.filter(uniques, function(item) {
				//return Date.parse(item.STARTDATE) >= last60days ;
				return Date.parse(item.ENDDATE) >= last60days;
	     });
	     stateModel.setData(filteredData);
	     
	}
	stateModel.setSizeLimit(100000);
	return stateModel;
}

function refreshCycles() {
	sap.ui.getCore().setModel(null, "/TestCycle2");
	var model = this.getCycles();
	return model;
}

function getAllTestsuites() {
	var oModel = sap.ui.getCore().getModel("/TestSuite2");
	if (oModel == null) {
		var url = "/TestReports/odata/getTestSuiteList.xsodata/LIST/?";
		url += "$format=json&$orderby=TS_NAME asc";
		oModel = getModelWithData(url);
		sap.ui.getCore().setModel(oModel, "/TestSuite2");
	}
	return oModel;
}

function getTestsuites() {
	var oModel = getAllTestsuites();
	var stateModel = new sap.ui.model.json.JSONModel();
	var data = oModel.getData()['d']['results'];
	var productFilter = sap.ui.getCore().byId("ProductFilter").getValue();
	if (productFilter != null && productFilter != '') {
		var filteredData = _.filter(data, function(item) {
			return item.PRO_NAME === productFilter;
		});
		stateModel.setData(filteredData);
	}
	else {
	     var uniques = _.map(_.groupBy(data, function(item){
	    	  return item.TS_NAME;
	    	}),function(grouped){
	    	  return grouped[0];
	    	});
	     stateModel.setData(uniques);
	}
	stateModel.setSizeLimit(100000);
	return stateModel;
}

function refreshTestsuites() {
	sap.ui.getCore().setModel(null, "/TestSuite2");
	var model = this.getTestsuites();
	return model;
}
