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
				data: {}
			}
		},
		position: {
			my: 'top left', // top-left of tool-tip
			at: 'bottom left', // at bottom-left of element
		},
		style: {
			width: 900
		},
		show: {
			delay: 600,
			effect: function() {
				$(this).fadeIn(500);
			}
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
		position: {
			my: 'top left', // top-left of tool-tip
			at: 'bottom left', // at bottom-left of element
		},
		style: {
			width: 900
		}
	});
	});

	// Setup highlighting for selected cell
	//
	$("table.hostsTable tr").not(':first').hover(
			function () {
				//$(this).css("background","#ffffa3");
				$(this).toggleClass('selected');
			}, 
			function () {
				//$(this).css("background","");
				$(this).toggleClass('selected');
			}
			);


});

