export const mailCounter = `var _tmr = window._tmr || (window._tmr = []);
 _tmr.push({id: "3517491", type: "pageView", start: (new Date()).getTime(), pid: "USER_ID"});
 (function (d, w, id) {
   if (d.getElementById(id)) return;
   var ts = d.createElement("script"); ts.type = "text/javascript"; ts.async = true; ts.id = id;
   ts.src = "https://top-fwz1.mail.ru/js/code.js";
   var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
   if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
 })(document, window, "tmr-code")`;
export const mailNoScript = `<div><img src="https://top-fwz1.mail.ru/counter?id=3517491;js=na" style="position:absolute;left:-9999px;" alt="Top.Mail.Ru" /></div>`;

export const mailRating = `var _tmr = _tmr || [];
 _tmr.push({
     type: 'itemView',
     productid: 'VALUE',
     pagetype: 'VALUE',
     list: 'VALUE',
     totalvalue: 'VALUE'
 });`;

export const yaCounter = ` (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
 m[i].l=1*new Date();
 for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
 k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
 (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

 ym(97392085, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
 })`;
export const yaNoScript = `<div><img src="https://mc.yandex.ru/watch/97392085" style="position:absolute; left:-9999px;" alt="" /></div>`;

export const googleCounter = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NSR4ZWLM');`;

export const googleNoScript = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NSR4ZWLM"
    height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
