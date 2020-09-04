var count = Ti.App.Properties.getInt('bg-svc2-count', 0);

if (count >= 4) {
  // reset count after 4 invocations
  count = 0;
}

count++;

Ti.App.Properties.setInt('bg-svc2-count', count);

Ti.App.fireEvent('countStep');
if (count >= 4) {
  Ti.App.currentService.unregister();
  // var finalNotif = Ti.App.iOS.scheduleLocalNotification({
  // alertBody:'bg-service2: As service has been invoked more than 4 times, it has been unregistered and will NOT run again. Relaunch the app to re-register it',
  // date:new Date(new Date().getTime() + 1000) // 1 second after unregister
  // });   
  Ti.App.iOS.registerBackgroundService({ url: 'services.js' });
} else {
  // var curNotif = Ti.App.iOS.scheduleLocalNotification({
  // alertBody:'bg-service2: has been invoked ' + count + ' times. It is still registered and will run again when the app is transitioned to the background',
  // date:new Date(new Date().getTime() + 1000) // 1 second after pause
  // });   
}