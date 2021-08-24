# weather-widget

This application uses APIs from https://www.metaweather.com/.
While calling this APIs in the code, it gets "...blocked by CORS policy" error. To make the APIs working in the code, run chrome using the following command in Run :
   "chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security".
This application detects the current location of the user, for that it needs HTTPS protocol. so we run the application in HTTPS protocol.
