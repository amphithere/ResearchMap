$(function(){$("#geocomplete").geocomplete().bind("geocode:result",function(t,e){$.log("Result: "+e.formatted_address)}).bind("geocode:error",function(t,e){$.log("ERROR: "+e)}).bind("geocode:multiple",function(t,e){$.log("Multiple: "+e.length+" results found")}),$("#find").click(function(){$("#geocomplete").trigger("geocode")}),$("#examples a").click(function(){return $("#geocomplete").val($(this).text()).trigger("geocode"),!1})});