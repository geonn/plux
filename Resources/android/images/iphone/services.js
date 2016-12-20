var count = Ti.App.Properties.getInt("bg-svc2-count", 0);

count >= 4 && (count = 0);

count++;

Ti.App.Properties.setInt("bg-svc2-count", count);

Ti.API.info("bg-service2 has been run " + count + " times");

Ti.App.fireEvent("countStep");

if (count >= 4) {
    Ti.App.currentService.unregister();
    Ti.App.iOS.registerBackgroundService({
        url: "services.js"
    });
}