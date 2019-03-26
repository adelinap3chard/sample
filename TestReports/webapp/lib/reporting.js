var HOSTNAME = window.location.hostname.split('.')[0]; 

var reporting = {};

reporting.ready = function(fCallback){
	var aScripts = ["plugin.js",
	                "utils.js",
	                "pluginCollection.js",
	                "reportingApplication.js"];
	var aXMLHttpRequests = [];
	
	aScripts.forEach(function(sScript){
		aXMLHttpRequests.push(
			jQuery.ajax({
				type: "GET",
				url: "/reporting/lib/js/" + sScript,
				dataType: "script",
				cache: true
			}).fail(function(jqxhr, settings, exception){
				console.log("Error while trying to load " + this.url);
				console.log(exception);
			})
		);
	});
	
	jQuery.when.apply(jQuery, aXMLHttpRequests).then(function(){
		fCallback();
	});
};

// Helper function that loads a plugin and places it at the html element "content"
reporting.test = function(sPluginUri){

	reporting.ready(function(){
		jQuery.ajax({
			type: "GET",
			url: sPluginUri,
			dataType: "script",
			cache: false
		}).done(function(sPlugin){
			var oPlugin = (function(){
				var evalCommand = sPlugin;
				var f = eval;
				return f(evalCommand);
			})(); // indirect evaluation
			
			oPlugin.setActive();
			var oPluginContent = oPlugin.getContent();
			oPlugin.update();
			
			oPluginContent.placeAt("content");
		}).fail(function(jqxhr, settings, exception){
			console.log("Error while trying to load " + this.url);
			console.log(exception);
		});
	});
};

//Helper function that loads a plugin and places it at the html element "content"
reporting.testWithParameter = function(sPluginUri){
	
	function getUrlParameter()
	{
	    var params = {};
	    var found = 0;
	    var idx = window.location.hash.indexOf("?")
	    if (idx != -1) {
			var sPageURL = decodeURIComponent(window.location.hash.substr(idx+1));
			if (sPageURL.length > 0){
				var sURLVariables = sPageURL.split('&');
			    for (var i = 0; i < sURLVariables.length; i++) 
			    {
			    	var sParameterPair = sURLVariables[i].split('=');
			        params[sParameterPair[0]] = sParameterPair[1].split(',');
			        found += 1;
			    }
			}
	    }
	    
	    return [found,params];
	} 

	var urlSettings = getUrlParameter();
	
	reporting.ready(function(){
		jQuery.ajax({
			type: "GET",
			url: sPluginUri,
			dataType: "script",
			cache: false
		}).done(function(sPlugin){
			var oPlugin = (function(){
				var evalCommand = sPlugin;
				var f = eval;
				return f(evalCommand);
			})(); // indirect evaluation
			
			if ( urlSettings[0] > 0){
				oPlugin.setSettings(urlSettings[1]);
			}
			oPlugin.setActive();
			var oPluginContent = oPlugin.getContent();
			oPlugin.update();
			
			oPluginContent.placeAt("content");
		}).fail(function(jqxhr, settings, exception){
			console.log("Error while trying to load " + this.url);
			console.log(exception);
		});
	});
};