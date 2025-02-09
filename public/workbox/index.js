
  
  // Add this at the VERY END of the generated sw.js file.
  // DO NOT put 'use strict' here.  It must be in the global scope.
  
  self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'TRACK_CHANGE') {
	  const { track, actions } = event.data;
  
	  const title = track.title;
	  const options = {
		body: track.artist,
		icon: track.cover, //  MAKE SURE THIS IS A FULL URL
		badge: track.cover, //  MAKE SURE THIS IS A FULL URL
		actions: actions, // Actions (buttons)
		tag: 'music-player-notification', // Add the tag here too
	  };
  
	  self.registration.showNotification(title, options);
	}
  });
  
  self.addEventListener('notificationclick', (event) => {
	event.notification.close();
  
	// Handle button clicks
	if (event.action === 'prev') {
	  clients.matchAll().then((clients) => {
		if (clients && clients.length) {
		  clients[0].postMessage({ type: 'NOTIFICATION_ACTION', action: 'prev' });
		}
	  });
	} else if (event.action === 'pause') {
	  clients.matchAll().then((clients) => {
		if (clients && clients.length) {
		  clients[0].postMessage({ type: 'NOTIFICATION_ACTION', action: 'pause' });
		}
	  });
	} else if (event.action === 'next') {
	  clients.matchAll().then((clients) => {
		if (clients && clients.length) {
		  clients[0].postMessage({ type: 'NOTIFICATION_ACTION', action: 'next' });
		}
	  });
	} else {
	  // Click on the notification body itself (not a button)
	  event.waitUntil(
		self.addEventListener('notificationclick',  (event) => {
			event?.notification.close()
			event?.waitUntil(
			  self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
				if (clientList.length > 0) {
				  let client = clientList[0]
				  for (let i = 0; i < clientList.length; i++) {
					if (clientList[i].focused) {
					  client = clientList[i]
					}
				  }
				  return client.focus()
				}
				return self.clients.openWindow('/')
			  })
			)
		  })
	  );
	}
  });
  
  // DO NOT ADD ANY CODE BELOW THIS LINE.
  // next-pwa's code will be injected ABOVE this.