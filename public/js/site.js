$(function () {
	var showPopover = function () {
		$(this).popover('show');
	};

	var hidePopover = function () {
		$(this).popover('hide');
	};

	$("[rel=popover]").popover();
});