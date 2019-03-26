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
			oDataModel.read('/LIST', null, filters)
		}
		sap.ui.getCore().setModel(oDataModel, name);
	}
	return oDataModel
};

function getDropdownWithModel(id, keyDD, oModel) {
	oDropdownBox = new sap.ui.commons.DropdownBox(id);
	
	var oItemTemplateBranch = new sap.ui.core.ListItem();
	oItemTemplateBranch.bindProperty("text", keyDD);

	oDropdownBox.bindItems("/LIST", oItemTemplateBranch);
	
	oDropdownBox.setModel(oModel);
	
	oDropdownBox.__proto__._getFilteredItems = function(aItems, rValFilter) {
		return [];
	};

	return oDropdownBox;
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
				},function(){
		            alert("Create failed");
		        }
			);
		}
	}
	document.getElementById('selectedFile').value = "";
}

function import_testplans(workbook) {
	var worksheet = workbook.Sheets["TestPlans"];
	if (worksheet != null) {
		var json = XLSX.utils.sheet_to_json(worksheet);
		var oModel = getODataModel("/TestPlan", "/TestReports/odata/getTestPlanList.xsodata");
		for(var i = 0; i != json.length; ++i) {
			var oEntry = json[i];
			oEntry.TSP_ID = 0;
			if (oEntry.FEATURE == undefined	) {
				oEntry.FEATURE = "";
			}
			if (oEntry.CATALOG == undefined	) {
				oEntry.CATALOG = "";
			}
			oModel.create('/LIST', oEntry, null, function(){
					oModel.refresh();
				},function(){
		            alert("Create failed");
		        }
			);
		}
	}
	document.getElementById('selectedFile').value = "";
}

function import_testsuites(workbook) {
	var worksheet = workbook.Sheets["TestSuites"];
	if (worksheet != null) {
		var json = XLSX.utils.sheet_to_json(worksheet);
		var oModel = getODataModel("/TestSuite", "/TestReports/odata/getTestSuiteList.xsodata");
		for(var i = 0; i != json.length; ++i) {
			//var error = false;
			var oEntry = json[i];
			oEntry.TS_ID = 0;
			if (oEntry.TS_DESC == undefined	) {
				oEntry.TS_DESC = "";
			}
			var TS_NAME = oEntry.TS_NAME;
			oModel.create('/LIST', oEntry, null, function(){
					oModel.refresh();
				},function(err){
		            alert("Test suite: " + TS_NAME + " already exists. Will not create new suite!");
		            //error = true;
		            return;
		        }
			);
			//if (error == true) {
				//continue;
			//}
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
					oModelTestCase.create('/LIST', oEntry, null, function(){
						},function(){
				            //alert("Test case: " + oEntry.TC_NAME + " already exists. Will not create new case!");
				        }
					);
					oEntry.TS_ID = 0;
					oEntry.TC_ID = "0"; // strange this need to be string?
					//use TC_OWNER to store TS_NAME, used in TestSuiteCase.xsjslib::CreateTestSuiteCase
					oEntry.TC_OWNER = TS_NAME;
					oModelSuiteCase.create('/LIST', oEntry, null, function(){
					},function(){
			            alert("Create failed");
			        }
				);
				}
				oModelSuiteCase.refresh();
				oModelSuiteCase.refresh();
			}
		}
	}
	document.getElementById('testSuiteSelectFile').value = "";
}

function import_log_test_results(workbook) {
	var worksheet = workbook.Sheets["LogTestResults"];
	if (worksheet != null) {
		var json = XLSX.utils.sheet_to_json(worksheet);
		var oModel = getODataModel("/TestResultDetail", "/TestReports/odata/getTestResultList.xsodata");
		for(var i = 0; i != json.length; ++i) {
			var oEntry = json[i];
			if (oEntry.START_TIME == undefined	) {
				oEntry.START_TIME = "";
			}
			if (oEntry.END_TIME == undefined	) {
				oEntry.END_TIME = "";
			}
			if (oEntry.BUG_ID == "" || oEntry.BUG_ID == undefined	) {
				//BUG_ID is an integer and odata is expecting a valid integer, fake it so that it will not generate error
				oEntry.BUG_ID = -1;
			}
			oEntry.EXEC_TS = datestring(oEntry.EXEC_TS);
			oModel.create('/LIST', oEntry, null, function(){
					oModel.refresh();
				},function(){
		            alert("Create failed");
		        }
			);
		}
	}
	document.getElementById('d_manualSelectFile').value = "";
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