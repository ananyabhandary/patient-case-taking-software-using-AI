(function(){
  var sels=[document.getElementById('lang'),document.getElementById('alang')].filter(Boolean);
  var saved=null;try{saved=localStorage.getItem('voicelang')}catch(e){}
  function note(v){var n=document.getElementById('tulunote');if(n)n.hidden=v!=='tcy'}
  sels.forEach(function(s){
    if(saved)s.value=saved;
    s.addEventListener('change',function(){
      try{localStorage.setItem('voicelang',s.value)}catch(e){}
      sels.forEach(function(o){o.value=s.value});note(s.value)});
  });
  if(sels[0])note(sels[0].value);
  document.querySelectorAll('[data-mic]').forEach(function(b){
    var R=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!R){b.hidden=true;return}
    b.addEventListener('click',function(){
      var r=new R();var v=sels.length?sels[0].value:'en-IN';
      r.lang=v==='tcy'?'kn-IN':v;
      r.onresult=function(e){var t=document.getElementById(b.dataset.mic);t.value+=(t.value?' ':'')+e.results[0][0].transcript};
      r.start();
    });
  });
  document.querySelectorAll('[data-eye]').forEach(function(b){b.addEventListener('click',function(){var i=document.getElementById(b.dataset.eye),s=i.type==='password';i.type=s?'text':'password';b.setAttribute('aria-label',s?'Hide password':'Show password')})});
  document.querySelectorAll('[data-fill]').forEach(function(b){b.addEventListener('click',function(){
    var e=document.getElementById('email'),p=document.getElementById('password');
    if(e)e.value=b.dataset.fill;if(p)p.value=b.dataset.pw;
    document.querySelectorAll('[data-fill]').forEach(function(x){x.classList.remove('sel')});b.classList.add('sel');
    if(e)e.scrollIntoView({behavior:'smooth',block:'center'})})});
  var of=document.getElementById('onlyfree');
  if(of){var f=function(){document.querySelectorAll('.dcard.off').forEach(function(c){c.hidden=of.checked})};of.addEventListener('change',f);f()}
})();
