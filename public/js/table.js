$( document ).ready(function() {

	$("#hostsTable").jsonTable({
		head : ['IP Address', 'MAC', 'OUI'], // Goes on the <thead>
	json : ['ip_addr', 'mac', 'oui'] //json identities from the loaded json object
	});                    // NOTE : an '*' identity will generate an autoincremented column
	$("#infoTable").jsonTable({
		head : ['Interface', 'Datalink', 'Version', 'Hosts Scanned', 'Hosts Responding', 'Scan Rate', 'Scan Duration'], // Goes on the <thead>
		json : ['interface', 'datalink', 'version', 'range_size', 'reply_count','scan_rate', 'scan_time'] //json identities from the loaded json object
	});                    // NOTE : an '*' identity will generate an autoincremented column

	$.getJSON("/json/" + document.location.pathname.split("/")[2], callback);

	$.tablesorter.addParser({
		id: "ipAddress",
		is: function (s) {
			return /^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(s);
		},
		format: function (s) {
			var octs = s.split('.');
			var sum = 0;
			for (i in octs) {
				sum += octs[i] * Math.pow(256, (octs.length - 1) - i);
			}
			return sum;
		},
		type: "numeric"
	});	

	function callback(data)
	{
		var info=[];
		info.push(data);
		var hosts_options = {
			source: data.hosts,
			sortList: [[0,0]],
			headers: {
				0: {
					sorter: 'ipAddress'
				}
			},
			callback: function(){
				$("#hostsTable").tablesorter();
			}
		}
		var info_options = {
			source: info
		}
		$("#hostsTable").jsonTableUpdate(hosts_options);
		$("#infoTable").jsonTableUpdate(info_options);
	}
});

