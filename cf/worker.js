addEventListener('fetch', event => {
  event.passThroughOnException()

  event.respondWith(handleRequest(event))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(event) {
  const { request } = event;

  // Request headers and response object
  let reqHeaders = new Headers(request.headers),
    outBody, outStatus = 200, outStatusText = 'OK', outCt = null, outHeaders = new Headers({
      "Access-Control-Allow-Origin": reqHeaders.get('Origin'),
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": reqHeaders.get('Access-Control-Allow-Headers') || "Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token, Notion-Version"
    });

  try {
    // Get the URL to be fetched from the path in the URL
    let url = request.url.substr(8);
    url = decodeURIComponent(url.substr(url.indexOf('/') + 1));

    // Ignore proxy
    if (request.method == "OPTIONS" && reqHeaders.has('access-control-request-headers')) {
      return new Response(null, PREFLIGHT_INIT)
    }
    else if(url.length < 3 || url.indexOf('.') == -1 || url == "favicon.ico" || url == "robots.txt") {
      return Response.redirect('https://baidu.com', 301)
    }
    // Blocker
    else if (blocker.check(url)) {
      return Response.redirect('https://baidu.com', 301)
    }
    else {
      // Add http://
      url = url.replace(/https:(\/)*/,'https://').replace(/http:(\/)*/, 'http://')
      if (url.indexOf("://") == -1) {
        url = "http://" + url;
      }
      // Build fetch parameters
      let fp = {
        method: request.method,
        headers: {}
      }

      // Keep the other headers
      let he = reqHeaders.entries();
      for (let h of he) {
        if (!['content-length'].includes(h[0])) {
          fp.headers[h[0]] = h[1];
        }
      }
      // Check if the request has a body
      if (["POST", "PUT", "PATCH", "DELETE"].indexOf(request.method) >= 0) {
        const ct = (reqHeaders.get('content-type') || "").toLowerCase();
        if (ct.includes('application/json')) {
          let requestJSON = await request.json()
          console.log(typeof requestJSON)
          fp.body = JSON.stringify(requestJSON);
        } else if (ct.includes('application/text') || ct.includes('text/html')) {
          fp.body = await request.text();
        } else if (ct.includes('form')) {
          fp.body = await request.formData();
        } else {
          fp.body = await request.blob();
        }
      }
      // Request the URL
      let fr = (await fetch(url, fp));
      outCt = fr.headers.get('content-type');
      if(outCt && (outCt.includes('application/text') || outCt.includes('text/html'))) {
        try {
          // Add base
          let newFr = new HTMLRewriter()
            .on("head", {
              element(element) {
                element.prepend(`<base href="${url}" />`, {
                  html: true
                })
              },
            })
            .transform(fr)
          fr = newFr
        } catch(e) {
        }
      }
      for (const [key, value] of fr.headers.entries()) {
        outHeaders.set(key, value);
      }
      outStatus = fr.status;
      outStatusText = fr.statusText;
      outBody = fr.body;
    }
  } catch (err) {
    outCt = "application/json";
    outBody = JSON.stringify({
      code: -1,
      msg: JSON.stringify(err.stack) || err
    });
  }

  // Set the content type
  if (outCt && outCt != "") {
    outHeaders.set("content-type", outCt);
  }

  let response = new Response(outBody, {
    status: outStatus,
    statusText: outStatusText,
    headers: outHeaders
  })

  return response;

  // return new Response('OK', { status: 200 })
}

/**
 * Blocker
 */
const blocker = {
  keys: [".m3u8", ".ts", ".acc", ".m4s", "photocall.tv", "googlevideo.com"],
  check: function (url) {
    url = url.toLowerCase();
    let len = blocker.keys.filter(x => url.includes(x)).length;
    return len != 0;
  }
}
