# SafetyProxy
***Keeping the internet safe and free from hackers.***

A simple Chrome extension to install on Chromebooks and set up. This extension is useful for network management and activity. This is also useful for **schools and enterprise companies who want to step up their gang.**

## `Setup` the extension
Download the Extension by getting the ZIP file from GitHub.

To install the extension making it ready for preparation, turn on Developer Mode at __chrome://extensions__ and click "Load unpacked" in the top menu. Select the unzipped folder that you got from this GitHub. The extension should now be loaded in for **testing**.

Go to your File Explorer and seek the unzipped folder. Open the unzipped folder and make sure it has a file called `"background.js"` and `"manifest.json"`. If you want to change extension generic properties, `manifest.json` is the place to go. If you want to manage proxy server settings, we will need to go to `background.js`.

## Editing Proxy server Settings
If you have not already, open `background.js` inside the unzipped folder. Here you can immediately see some configuration in the variable called `config`.

The `config["mode"]` parameter is automatically set to handle a PAC script. If you have a PAC script, paste yours in the `config["pacScript"]["data"]` parameter.

The `config["pacScript"]` parameter is optional and is changed accordingly depending on the `config["mode"]` parameter.

## Using a fixed proxy server
To use a fixed proxy server, replace the `config` variable with the code below:
```js
var config = {
  mode: "fixed_servers",
  rules: {
    //proxy server info can go here
    proxyForHttp: {
      scheme: "socks5", //your proxy server scheme (http, https, socks4, socks5)
      host: "1.1.1.14", // your proxy server ip or url (host)
      port: 80 // your proxy server port
    },
    bypassList: [
    // a list of urls with the scheme like "*.youtube.com" (ones you want to filter from the proxy and make a direct connection to them)
    ]
  }
};
```

## Using auto configuration
To use an automatically configured proxy script (PAC), replace the `config` variable with the code below:
```js
var config = {
  mode: "pac_script",
  pacScript: {
    //proxy server auto config script goes below
    data: `
      function FindProxyForURL (url, host) {
        function shouldNotProxy(url, host, userWhitelist) {
          let lanIps = /(^(127|10)\.\d{1,3}\.\d{1,3}\.\d{1,3}$)|(^192\.168\.\d{1,3}\.\d{1,3}$)|(^172\.1[6-9]\.\d{1,3}\.\d{1,3}$)|(^172\.2[0-9]\.\d{1,3}.\d{1,3}$)|(^172\.3[0-1]\.\d{1,3}\.\d{1,3}$)/

          let whitelist = [
            //urls can go here you want to whitelist
          ].concat(userWhitelist)

          return [
            isPlainHostName(host),
            // if it is NOT an allowed protocol then go direct
            // TODO: how to test local protocols?
            ['http', 'ftp', 'ws'].every(protocol => !url.startsWith(protocol)),
            lanIps.test(host),
            whitelist.some(pattern => shExpMatch(url, pattern)),
          ].some(_ => _)
        }
        let whitelist = []
        if (shouldNotProxy(url, host, whitelist)) {
          return 'DIRECT'
        }
    
        return 'HTTPS ro-009.totallyacdn.com:443;HTTPS ro-011.totallyacdn.com:443;HTTPS ro-004.totallyacdn.com:443;HTTPS ro-007.totallyacdn.com:443;HTTPS ro-014.totallyacdn.com:443;HTTPS ro-013.totallyacdn.com:443;'
      }
    `
  }
};
```

## Updating the extension
To update easily, use our `update(f)` javascript function in the Developer Tools Console window.

## Removing the extension
To remove our extension completely, click the 'Remove' button on our extension at chrome://extensions

## Support us
Support us to make the world and internet a better space and place by contributing!
