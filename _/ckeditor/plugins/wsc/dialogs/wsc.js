﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.dialog.add('checkspell',function(a){var b=CKEDITOR.tools.getNextNumber(),c='cke_frame_'+b,d='cke_data_'+b,e='cke_error_'+b,f,g=document.location.protocol||'http:',h=a.lang.spellCheck.notAvailable,i='<textarea style="display: none" id="'+d+'"'+' rows="10"'+' cols="40">'+' </textarea><div'+' id="'+e+'"'+' style="display:none;color:red;font-size:16px;font-weight:bold;padding-top:160px;text-align:center;z-index:11;">'+'</div><iframe'+' src=""'+' style="width:485px;background-color:#f1f1e3;height:380px"'+' frameborder="0"'+' name="'+c+'"'+' id="'+c+'"'+' allowtransparency="1">'+'</iframe>',j=a.config.wsc_customLoaderScript||g+'//loader.spellchecker.net/sproxy_fck/sproxy.php'+'?plugin=fck2'+'&customerid='+a.config.wsc_customerId+'&cmd=script&doc=wsc&schema=22';if(a.config.wsc_customLoaderScript)h+='<p style="color:#000;font-size:11px;font-weight: normal;text-align:center;padding-top:10px">'+a.lang.spellCheck.errorLoading.replace(/%s/g,a.config.wsc_customLoaderScript)+'</p>';function k(n,o){var p=0;return function(){if(typeof doSpell=='function')m(n);else if(p++==180)l(o);};};function l(n){if(typeof WSC_Error=='undefined'){CKEDITOR.document.getById(c).setStyle('display','none');var o=CKEDITOR.document.getById(e);o.setStyle('display','block');o.setHtml(n||a.lang.spellCheck.notAvailable);}};function m(n){if(typeof f=='undefined')return null;window.clearInterval(f);gFCKPluginName='wsc';var o=a.getData(),p=new _SP_FCK_LangCompare(),q=CKEDITOR.getUrl(a.plugins.wsc.path+'dialogs/'),r=q+'tmpFrameset.html';p.setDefaulLangCode(a.config.defaultLanguage);CKEDITOR.document.getById(d).setValue(o);CKEDITOR.document.getById(e).setStyle('display','none');CKEDITOR.document.getById(c).setStyle('display','block');doSpell({ctrl:d,lang:p.getSPLangCode(a.langCode),winType:c,onCancel:function(){n.hide();},onFinish:function(s){n.restoreSelection();n.clearSavedSelection();n.getParentEditor().setData(s.value);n.hide();},staticFrame:r,framesetPath:r,iframePath:q+'ciframe.html',schemaURI:q+'wsc.css'});};return{title:a.lang.spellCheck.title,minWidth:540,minHeight:480,buttons:[CKEDITOR.dialog.cancelButton],onShow:function(){contentArea=this.getContentElement('general','content').getElement();contentArea.setHtml(i);if(typeof doSpell!='function')CKEDITOR.document.getHead().append(CKEDITOR.document.createElement('script',{attributes:{type:'text/javascript',src:j}}));f=window.setInterval(k(this,h),250);},contents:[{id:'general',label:a.lang.spellCheck.title,elements:[{type:'html',id:'content',style:'width:500px;height:400px',html:'<div></div>'}]}]};
});