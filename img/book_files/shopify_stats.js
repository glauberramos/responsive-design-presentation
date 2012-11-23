(function() {
  var engines = [
    ['Google', 'q', /\.google\./ ],
    ['Yahoo!', 'p', /search\.yahoo\./ ],
    ['MSN', 'q', /\.msn\./ ],
    ['Live', 'q', /\.live\./ ],
    ['AlltheWeb', 'q', /\.alltheweb\./ ],
    ['AOL', 'query', /\.aol\./ ],
    ['Ask', 'q', /\.ask\./ ],
    ['AltaVista', 'q', /\.altavista\./ ],
    ['BBC', 'q', /\.bbc\./ ],
    ['HotBot', 'query', /\.hotbot\./ ],
    ['Lycos', 'query', /\.lycos\./],
    ['Bing', 'q', /bing\./],
    ['Daum', 'q', /\.daum\./],
    ['Eniro', 'search_word', /\.eniro\./],
    ['Naver', 'query', /\.naver\./],
    ['About', 'terms', /\.about\./],
    ['Mamma', 'query', /\.mamma\./],
    ['Alltheweb', 'q', /\.alltheweb\./],
    ['Voila', 'rdata', /\.voila\./],
    ['Baidu', 'wd', /\.baidu\./],
    ['Alice', 'qs', /\.alice\./],
    ['Yandex', 'text', /\.yandex\./],
    ['Search', 'q', /\.search\./],
    ['PCHome', 'q', /\.pchome\./],
    ['Ozu', 'q', /\.ozu\./],
    ['Terra', 'query', /\.terra\./],
    ['Mynet', 'q', /\.mynet\./],
    ['Ekolay', 'q', /\.ekolay\./],
    ['Rambler', 'words', /\.rambler\./]
  ];

  var ref = '';
  var query  = '';
  var engine = '';
  var referrer = (window.decodeURI)?window.decodeURI(document.referrer):document.referrer;
  var resource = (window.decodeURI)?window.decodeURI(document.URL):document.URL;

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') { c = c.substring(1,c.length); } 
      if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length,c.length); }
    }
    return null;
  }

  function setCookie(cookieName, cookieValue, msec_in_utc) {
    var expire = new Date(msec_in_utc);
    document.cookie = cookieName + "=" + escape(cookieValue) + ";path=/" +";expires=" + expire.toUTCString();
  }

  if (referrer && referrer !== '') {
    if(referrer.match('\:\/\/'+window.location.host + '[^\w]')) {
      referrer = '';
    }
    else {
      ref = 'r';
      for(var i = 0; i<engines.length;i++) {
        if (referrer.match(engines[i][2])) {
          var match = referrer.match(engines[i][1] + '=([^&$]{2,})');
          if (match) {
            query = match[1];
          }          
          engine = engines[i][0];
          ref = 's';
        }
      }
    }
  }
  else {
    referrer = '';
  }

  var today = new Date();
  var visit = '';
  var uniq  = '';

  if ( !window.__st['offsite'] ) {
    if (readCookie('_shopify_visit')) { visit = 1; }
    if (readCookie('_shopify_uniq')) { uniq = 1; }

    // set return visit cookie
    var expire_time_in_msec = today.getTime() + (30*60*1000); // expire 30 minutes from now 
    setCookie('_shopify_visit', 't', expire_time_in_msec);

    // set unique visitor cookie - expires tomorrow midnight of the shop's TZ.
    // Today @ midnight + 24hrs (in msec) - shop offset (in msec) (all in UTC)
    var expire_time = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),0,0,0,0) + 86400*1000 - window.__st.offset*1000;
    setCookie('_shopify_uniq', 'x', expire_time);
  }

  setTimeout(function() {

    var params = "";
    for(var name in window.__st) {
      if (window.__st.hasOwnProperty(name)) {
        params+= "&" + name + "=" + encodeURIComponent(window.__st[name]);
      }
    }
    var req = '/visit/record.gif?'+
              '&v=' +ref+
              '&e=' +encodeURIComponent(engine)+
              '&q=' +query+
              '&r=' +encodeURIComponent(referrer)+
              '&vi='+visit+
              '&uq='+uniq+
              params;

    new Image().src = '//s.shopify.com' + req;
    new Image().src = '//stats.shopify.com' + req;
  }, 50);
}());
