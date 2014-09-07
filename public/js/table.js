$( document ).ready(function() {

	$("#hostsTable").jsonTable({
		head : ['IP Address', 'MAC', 'OUI'], // Goes on the <thead>
	json : ['ip_addr', 'mac', 'oui'] //json identities from the loaded json object
	});                    // NOTE : an '*' identity will generate an autoincremented column
	$("#infoTable").jsonTable({
		head : ['Interface', 'Datalink', 'Version', 'Hosts Scanned', 'Hosts Responding', 'Scan Rate', 'Scan Duration'], // Goes on the <thead>
		json : ['interface', 'datalink', 'version', 'range_size', 'reply_count','scan_rate', 'scan_time'] //json identities from the loaded json object
	});                    // NOTE : an '*' identity will generate an autoincremented column

	$.getJSON("/scan/" + document.location.pathname.split("/")[2], callback);

	function callback(data)
	{
		var info=[];
		info.push(data);
		var hosts_options = {
			source: data.hosts,
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

