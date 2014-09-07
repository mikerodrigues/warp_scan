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

	$.tablesorter.addParser({
		id: 'ip',
		is: function(s) {
			return false;
		},
		format: function(s) {
			s = $.trim(s);
			s = s.replace(/\s+/gm, ',');
			var arrIp = s.split(',');
			for (var count = 0; count < arrIp.length; count++) {
				if (-1 != arrIp[count].search('-')) {
					var arrIpRange = arrIp[count].split('-');
					arrIpRange[0] = padIp(arrIpRange[0]);
					arrIpRange[1] = padIp(arrIpRange[1]);
					arrIp[count] = arrIpRange[0] + '-' + arrIpRange[1];
				} else if (-1 != arrIp[count].search('/')) {
					var arrIpMasked = arrIp[count].split('/');
					arrIpMasked[0] = padIp(arrIpMasked[0]);
					arrIpMasked[1] = padIp(arrIpMasked[1]);
					arrIp[count] = arrIpMasked[0] + '/' + arrIpMasked[1];
				} else {
					arrIp[count] = padIp(arrIp[count]);
				}
			}
			s = arrIp.join(',');
			return s;
		},
		type: 'text'
	});

	function callback(data)
	{
		var info=[];
		info.push(data);
		var hosts_options = {
			source: data.hosts,
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

