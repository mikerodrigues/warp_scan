$( document ).ready(function() {

	// Setup the DataTable for sorting and searching
	//
	$('.hostsTable').DataTable( {
		columnDefs: [
	{ type: 'ip-address', targets: 0}
	],
	"bPaginate": false
	});

	// Create the tooltip listeners on MAC address cells
	//
	$('table.hostsTable tr td.mac').each(function() {
		var tipContent = $(this).text();
		$(this).qtip({
		content: {
			text: 'Loading...',
			ajax: {
				url: '/mac/' + $(this).text(),
				type: 'GET',
				data: {},
			}
		},
		style: {
			width: 600
		}
	});
	});
	
	// Create the tooltip listeners on IP address cells
	//
	$('table.hostsTable tr td.ip_addr').each(function() {
		var tipContent = $(this).text();
		$(this).qtip({
		content: {
			text: 'Loading...',
			ajax: {
				url: '/ip/' + $(this).text(),
				type: 'GET',
				data: {},
			}
		},
		style: {
			width: 600
		}
	});
	});

	// Setup highlighting for selected cell
	//
	$("table.hostsTable tr").not(':first').hover(
			function () {
				$(this).css("background","#ffff66");
			}, 
			function () {
				$(this).css("background","");
			}
			);


});

