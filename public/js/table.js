$( document ).ready(function() {
	$('.hostsTable').DataTable( {
		columnDefs: [
	{ type: 'ip-address', targets: 0}
	],
	"bPaginate": false
	});

	$(document).tooltip({
		items:'table.hostsTable tr td.mac',
		tooltipClass:'mac-tip',
		position: { my: "left+10 top", at: "left center" },
		content:function(callback) {
		    console.log(this)
			var elem = $(this);
			var mac = $(this).text();
			$.get('/mac/' + mac, {}, function(data) {
				elem.tooltip({
					content: data,
				});
			});
		},
	});

	$("tr").not(':first').hover(
			function () {
				$(this).css("background","yellow");
			}, 
			function () {
				$(this).css("background","");
			}
			);

	//	function callAjax(elem, ip) {
	//	        $.getJSON('/ip/' + ip, {}, function(data) {
	//			elem.tooltip('option', 'content', data.hostname);
	//	        });
	//	}

	//
	//	$('table.hostsTable tr td.ip_addr').tooltip({
	//	    //tooltipClass:'ip-tip',
	//	    position: { my: "left+15 top", at: "right center" },
	//	    content: '...waiting on ajax...',
	//	    open: function(evt, ui) {
	//		var elem = $(this);
	//	        var ip = $(this).text();
	//		callAjax(elem, ip);
	//	    },
	//	});


});

