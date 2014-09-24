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

	// Setup highlighting for selected cell
	//
	$("table.hostsTable tr").not(':first').hover(
			function () {
				$(this).css("background","yellow");
			}, 
			function () {
				$(this).css("background","");
			}
			);


});

