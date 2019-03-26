  sap.ui.jsview("TestReports.FAQ", {  
   
   getControllerName: function() {
      return "TestReports.FAQ";    
   },

   createContent: function(oController) {
	   var layout = new sap.ui.commons.layout.MatrixLayout({
		   id : 'FAQLayout',
		   layoutFixed : false,
		   width : "100%",
	   });

	   /*
		 //Create a panel instance
		var oPanel = new sap.ui.commons.Panel({width: "100%", collapsed: true });

		//Set the title of the panel
		oPanel.setTitle(new sap.ui.core.Title({
			text: "What is test reporting life cycle?", 
			//icon: "images/SAPLogo.gif"
			icon: "sap-icon://message-information"
		}));
		oPanel.addContent(new sap.ui.core.HTML({content: "<p>All tests must be registered with the database before running test. That can be done using UI or API tool to register. Below is the life cycle of the test reporting and it must be done in this order. Not all steps are require every time there is a new cycle or test plan:</p>" +
	   		"<li>Register new Case(s) and Suite(s) – This step require only if your Test cycle require new test to be added</li>" +
	   		"<li>Register new product if not exist already in database (optional)</li>" +
	   		"<li>Register new external app if not exist already (optional)</li>" +
	   		"<li>Register new group and test user if not exist already (optional)</li>" +
	   		"<li>Create a new Cycle</li>" +
	   		"<li>Create a new test plan </li>" +
	   		"<li>User will be running test at this time </li>" +
	   		"<li>Log result using UI or API tool</li>"
	   		}));
		
		*/
		   
		
	   var oPanel1 = new sap.m.Panel({expandable: true, expanded: false, headerText: "What is test reporting life cycle?"});
	   //oPanel1.addContent(new sap.ui.commons.TextView({text: "Here comes the content ..."}));
	   oPanel1.addContent(new sap.ui.core.HTML({content: "<p>All tests must be registered with the database before running test. That can be done using UI or API tool to register. Below is the life cycle of the test reporting and it must be done in this order. Not all steps are require every time there is a new cycle or test plan:</p>" +
	   		"<li>Register new Case(s) and Suite(s) – This step require only if your Test cycle require new test to be added</li>" +
	   		"<li>Register new product if not exist already in database (optional)</li>" +
	   		"<li>Register new external app if not exist already (optional)</li>" +
	   		"<li>Register new group and test user if not exist already (optional)</li>" +
	   		"<li>Create a new Cycle</li>" +
	   		"<li>Create a new test plan </li>" +
	   		"<li>User will be running test at this time </li>" +
	   		"<li>Log result using UI or API tool</li>"
	   		}));
   
	   var oPanel2 = new sap.m.Panel({expandable: true, expanded: false, headerText: "How to register Test Suite and Test Case:"});
	   oPanel2.addContent(new sap.ui.core.HTML({content: "<ul><li>Compile a list of Suite and cases in an excel sheet and call it <b>TestSuites.xlsx</b> . For a sample, please <a href = '/TestReports/downloads/TestSuites.xlsx'>click here</a> to download test suite sample.</li>" +
		   "<li>From UI, go to <b>Registration</b> tab and select <b>Suite</b>" +
		   "<ul><li>From here click on <b>Import</b> button, pops up will ask for location of your excel sheets. </li> " +
		   "<li>Please select your <b>TestSuites.xlsx</b> file. Please make sure you have the exact file name. Then click <b>okay</b>.</li></ul></li></ul> " 
		   }));
	   
	   var oPanel3 = new sap.m.Panel({expandable: true, expanded: false, headerText: "Test Plan - How To:"});
	   oPanel3.addContent(new sap.ui.core.HTML({content: "" +
		   "<ol><li>Import new testplan </li>" +
		   "<ul>" +
		   "<li>Compile a list of plan with cycle name in an excel sheet and call it <b>TestPlans.xlsx</b> . For a sample, please <a href = '/TestReports/downloads/TestPlans.xlsx'>click here</a> to download test suite sample.</li>" +
		   "<li>From UI, go to <b>Registration</b> tab and select <b>Test Plan</b>" +
		   "<ul><li>From here click on <b>Import</b> button, pops up will ask for location of your excel sheets. </li> " +
		   "<li>Please select your <b>TestPlans.xlsx</b> file. Please make sure you have the exact file name. Then click <b>okay</b>.</li></ul></li><br></ul> " +
		   "<ul><img src=images/testPlan.JPG hspace=10></ul><br>"+
		   "</ul>" +
		   "</li>" +
		   "<li>Add more test to existing testplan</li><br>" +
		   "<ul><img src=images/testPlanUpdate.JPG hspace=10></ul>"+
		   "</ol>"

		   }));
	   
	        
	   var oPanel4 = new sap.m.Panel({expandable: true, expanded: false, headerText: "How to log test results: "});
	   oPanel4.addContent(new sap.ui.core.HTML({content: 
		   "<ol><li>Using Import</li>" +
		   "<ul>" +
		   "<li>Compile a list of test cases with pass or fail info in an excel sheet and call it <b>LogTestResults.xlsx</b>. For a sample, please <a href = '/TestReports/downloads/LogTestResults.xlsx'>click here</a> to download test suite sample.</li>" +
		   "<li>From UI, go to <b>Log Result</b> tab" +
		   "<ul>" +
		   "<li>From here click on <b>Import</b> button, pops up will ask for location of your excel sheets. </li> " +
		   "<li>Please select your <b>LogTestResults.xlsx</b> file. Please make sure you have the exact file name. Then click <b>okay</b>.<br></li></ul>" +
		   "</ul>" +
		   "</li> " +
		   "<li>Using Multilog</li><br>" +
		   "<ul><img src=images/testLogResult.JPG hspace=10></ul>"+
		   "</ol>"
		   
		   }));
	   
	   var oPanel5 = new sap.m.Panel({expandable: true, expanded: false, headerText: "Fields mapping: "});
	   oPanel5.addContent(new sap.ui.core.HTML({content:
		   "<p class=MsoNormal><b style='mso-bidi-font-weight:normal'>Test Suite table:<o:p></o:p></b></p>"+
		   "<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=804 style='width:603.0pt;margin-left:-.25pt;border-collapse:collapse;border:none; mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt: 0in 5.4pt 0in 5.4pt'>"+
		    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>"+
		     "<td width=73 valign=top style='width:54.95pt;border:solid windowtext 1.0pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Field<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=185 valign=top style='width:138.55pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>requirement<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=312 valign=top style='width:3.25in;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Sample value<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=234 valign=top style='width:175.5pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Mapping to UI<o:p></o:p></b></p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:1;height:16.6pt'>"+
		     "<td width=73 valign=top style='width:54.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt;height:16.6pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TS_ID</p>"+
		     "</td>"+
		     "<td width=185 valign=top style='width:138.55pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:16.6pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=312 valign=top style='width:3.25in;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:16.6pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Can be blank id will be incremented </p>"+
		     "</td>"+
		     "<td width=234 valign=top style='width:175.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt;height:16.6pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not visible on UI</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:2'>"+
		     "<td width=73 valign=top style='width:54.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TS_NAME</p>"+
		     "</td>"+
		     "<td width=185 valign=top style='width:138.55pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes must be unique</p>"+
		     "</td>"+
		     "<td width=312 valign=top style='width:3.25in;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><span class=SpellE>Suite_ADP_NewTaskFunction</span></p>"+
		     "</td>"+
		     "<td width=234 valign=top style='width:175.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Showing a list of suits without title</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:3;mso-yfti-lastrow:yes'>"+
		     "<td width=73 valign=top style='width:54.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TS_DESC</p>"+
		     "</td>"+
		     "<td width=185 valign=top style='width:138.55pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=312 valign=top style='width:3.25in;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Description of suite for FYI or can be blank </p>"+
		     "</td>"+
		     "<td width=234 valign=top style='width:175.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not <span class=SpellE>visable</span> on UI</p>"+
		     "</td>"+
		    "</tr>"+
		   "</table>"+
		   "<p class=MsoNormal><b style='mso-bidi-font-weight:normal'>Test Case table:<o:p></o:p></b></p>"+

		   "<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=848 style='width:636.15pt;margin-left:-.25pt;border-collapse:collapse;border:none; mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt: 0in 5.4pt 0in 5.4pt'>"+
		    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Field<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Requirement<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Sample value<o:p></o:p></b></p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Mapping to UI<o:p></o:p></b></p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:1'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_ID</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Can be blank id will be incremented </p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not visible on UI</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:2'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TFILE_NAME</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>location of test file: example for python can be like <b  style='mso-bidi-font-weight:normal'>dpadapter/logreader/oracle/testDPAdapterOraBarrier.py</b></p>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><o:p>&nbsp;</o:p></p>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>or it can be a link to a document location</p>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><a  href='https://sapjira.wdf.sap.corp/browse/IMDSOD14IT'>https://sapjira.wdf.sap.corp/browse/IMDSOD14IT</a>"+
		     "</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>File Path</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:3'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TFILE_CASE_NAME</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Case name or Case number. Example for python tests, test59</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Case Number</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:4'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_NAME</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes must be unique</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><span style='font-size:9.0pt;font-family:'Arial',sans-serif;  color:black;background:white'>Python test: DPAdapterAAOraBarrier.test59<o:p></o:p></span></p>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><span style='font-size:9.0pt;font-family:'Arial',sans-serif;  color:black;background:white'>UI Test: </span><span style='font-size:9.0pt;  font-family:'Arial',sans-serif;mso-fareast-font-family:'Times New Roman';  color:black'><o:p></o:p></span></p>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><span class=SpellE><span style='font-size:9.0pt;font-family:'Arial',sans-serif;  mso-fareast-font-family:'Times New Roman';color:black'>Functional_Dependency_number_number_random</span></span><span  style='font-size:9.0pt;font-family:'Times New Roman',serif;mso-fareast-font-family:  'Times New Roman';color:black'><o:p></o:p></span></p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Case Name</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:5'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_ACTIVE</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No </p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Default is 1 for active 0 for inactive test</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not visible on UI</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:6'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_OWNER</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Require</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test user name must exist in User table like Jenkins, <span		     class=SpellE>MikeBr</span></p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Owner</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:7'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_COMMENT</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Comment about test</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not visible on UI</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:8'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TP_NAME</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Type of test like Jenkins, <span class=SpellE>pyunit</span>, selenium</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test type</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:9'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>B_NAME</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Branch name: MATS, SP12, SP11</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Branch</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:10'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_DETAILS</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Info or steps to perform test for manual</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test details</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:11'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TC_EXPECTED_RESULT</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Output of test if any or can be blank</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Expected result</p>"+
		     "</td>"+
		    "</tr>"+
		    "<tr style='mso-yfti-irow:12;mso-yfti-lastrow:yes'>"+
		     "<td width=149 valign=top style='width:111.95pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>PROJECT</p>"+
		     "</td>"+
		     "<td width=94 valign=top style='width:70.7pt;border-top:none;border-left:none;  border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		     "</td>"+
		     "<td width=458 valign=top style='width:343.85pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Link to <span class=SpellE>jira</span> project</p>"+
		     "</td>"+
		     "<td width=146 valign=top style='width:109.65pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		     "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Jira link</p>"+
		     "</td>"+
		    "</tr>"+
		   "</table>"+
		    "<p class=MsoNormal><b style='mso-bidi-font-weight:normal'>Test plan:<o:p></o:p></b></p>"+

		    "<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 width=852 style='width:639.0pt;margin-left:-.25pt;border-collapse:collapse;border:none; mso-border-alt:solid windowtext .5pt;mso-yfti-tbllook:1184;mso-padding-alt: 0in 5.4pt 0in 5.4pt'>"+
		     "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'> "+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Field<o:p></o:p></b></p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Requirement<o:p></o:p></b></p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Sample value<o:p></o:p></b></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border:solid windowtext 1.0pt;  border-left:none;mso-border-left-alt:solid windowtext .5pt;mso-border-alt:  solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><b style='mso-bidi-font-weight:normal'>Mapping to UI<o:p></o:p></b></p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:1'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TSP_ID</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>No</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Can be blank id will be incremented</p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Not visible on UI</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:2'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>TS_NAME</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test suite name must exist in the database. Ex: <span class=SpellE>Suite_ADP_NewTaskFunction</span></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test Suite</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:3'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>PRO_NAME</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Production name must already exist in the database. Ex: <span class=SpellE>dpagent</span></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Product Name</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:4'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>PRO_VER</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Product version must exist in the database along with production name ex: 1.3.5</p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Product Version</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:5'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>PLAT_NAME</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Platform name must exist in the database ex: NT64, UNIX </p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Platform </p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:6'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>OS_NAME</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Operating system must exist in the database first. Ex: WINDOWS</p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'><span class=SpellE>os</span></p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:7'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>CYC_TAG</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Cycle name must exist in the database ex: <span style='mso-bidi-font-family:Arial;color:black;background:white'>TC2_ADP_1_13_1</span></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Cycle</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:8'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>ASSGINEE</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test user must exist in the database ex: <span class=SpellE>MikeBr</span>,  <span class=SpellE>Carrym</span></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Assignee</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:9'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>FEATURE</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Test feature must exist in the database ex: <span class=SpellE>XMLImport</span>,<span class=SpellE>DataQuality</span></p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Feature</p>"+
		      "</td>"+
		     "</tr>"+
		     "<tr style='mso-yfti-irow:10;mso-yfti-lastrow:yes'>"+
		      "<td width=114 valign=top style='width:85.5pt;border:solid windowtext 1.0pt;  border-top:none;mso-border-top-alt:solid windowtext .5pt;mso-border-alt:solid windowtext .5pt;  padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>CATALOG</p>"+
		      "</td>"+
		      "<td width=102 valign=top style='width:76.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Yes</p>"+
		      "</td>"+
		      "<td width=438 valign=top style='width:328.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Cycle type must exist in the database ex: Regression, New feature</p>"+
		      "</td>"+
		      "<td width=198 valign=top style='width:148.5pt;border-top:none;border-left:  none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;  mso-border-top-alt:solid windowtext .5pt;mso-border-left-alt:solid windowtext .5pt;  mso-border-alt:solid windowtext .5pt;padding:0in 5.4pt 0in 5.4pt'>"+
		      "<p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:  normal'>Catalog</p>"+
		      "</td>"+
		     "</tr>"+
		    "</table>"



		    
	   }));

   

	   //layout.createRow(oPanel);
	   //layout.createRow(oPanelWelcome);
	   layout.createRow(oPanel1);
	   layout.createRow(oPanel2);
	   layout.createRow(oPanel3);
	   layout.createRow(oPanel4);
	   layout.createRow(oPanel5);
	   this.addContent(layout);
      
      
      
   }
   
   

});


	
	
