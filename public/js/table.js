$( document ).ready(function() {
	$('.hostsTable').DataTable( {
		columnDefs: [
			{ type: 'ip-address', targets: 0}
		]
	});
});

