angular.module('jwt-auth').factory('noteService', function(webNotification){

	var api = {
		notify: notify,
		ICONS: {
		ALERT1: '../bower_components/HTML5-Desktop-Notifications/alert.ico'

		}
	};

	return api;

	function notify(data){

		var title = data.title || 'New Notification';
		var body = data.body || 'Notification Body';
		var icon = data.icon || api.ICONS.ALERT1;


		webNotification.showNotification(title, {
            body: body,
            icon: icon,
            autoClose: 6000 //auto close the notification after 2 seconds (you manually close it via hide function)
        }, function onShow(error, hide) {
            if (error) {
                window.alert('Unable to show notification: ' + error.message);
            } else {
                console.log('Notification Shown.');

                setTimeout(function hideNotification() {
                    console.log('Hiding notification....');
                    hide(); //manually close the notification (or let the autoClose close it)
                }, 5000);
            }
        });
	}
});