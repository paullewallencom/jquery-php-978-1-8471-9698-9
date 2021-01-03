﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){var a=/^(\d+(?:\.\d+)?)(px|%)$/,b=/^(\d+(?:\.\d+)?)px$/,c=function(g){var h=this.id;if(!g.info)g.info={};g.info[h]=this.getValue();};function d(g,h,i){var j=g.$.attributes;for(var k=0;k<j.length;k++){var l=j[k];if(l.specified){var m=l.nodeName;if(m in i)continue;var n=g.getAttribute(m);if(n==null)n=l.nodeValue;h.setAttribute(m,n);}}if(g.$.style.cssText!=='')h.$.style.cssText=g.$.style.cssText;};function e(g,h){if(g.type!=CKEDITOR.NODE_ELEMENT)return null;if(g.getName()==h)return g;var i=g.getDocument(),j=new CKEDITOR.dom.element(h,i);d(g,j,{});g.moveChildren(j);g.$.parentNode.replaceChild(j.$,g.$);return j;};function f(g,h){var i=function(j){return new CKEDITOR.dom.element(j,g.document);};return{title:g.lang.table.title,minWidth:480,minHeight:260,onShow:function(){var q=this;q.restoreSelection();var j=g.getSelection(),k=j.getRanges(),l=null,m=q.getContentElement('info','txtRows'),n=q.getContentElement('info','txtCols'),o=q.getContentElement('info','txtWidth');if(h=='tableProperties'){if(l=q.getSelectedElement())if(l.getName()!='table')l=null;else if(k.length>0){var p=k[0].getCommonAncestor(true);l=p.getAscendant('table',true);}q._.selectedElement=l;}if(l){q.setupContent(l);m&&m.disable();n&&n.disable();o&&o.select();}else{m&&m.enable();n&&n.enable();m&&m.select();}},onOk:function(){var B=this;var j=B._.selectedElement||i('table'),k=B,l={};B.commitContent(l,j);if(l.info){var m=l.info;if(!B._.selectedElement){var n=j.append(i('tbody')),o=parseInt(m.txtRows,10)||0;cols=parseInt(m.txtCols,10)||0;for(var p=0;p<o;p++){var q=n.append(i('tr'));for(var r=0;r<cols;r++){var s=q.append(i('td'));if(!CKEDITOR.env.ie)s.append(i('br'));}}}var t=m.selHeaders;if(j.$.tHead==null&&(t=='row'||t=='both')){var u=new CKEDITOR.dom.element(j.$.createTHead()),n=j.getElementsByTag('tbody').getItem(0),v=n.getElementsByTag('tr').getItem(0);for(var p=0;p<v.getChildCount();p++){var w=e(v.getChild(p),'th');if(w!=null)w.setAttribute('scope','col');}u.append(v.remove());}if(j.$.tHead!==null&&!(t=='row'||t=='both')){var u=new CKEDITOR.dom.element(j.$.tHead),n=j.getElementsByTag('tbody').getItem(0),x=n.getFirst();while(u.getChildCount()>0){var v=u.getFirst();for(var p=0;p<v.getChildCount();p++){var y=e(v.getChild(p),'td');if(y!=null)y.removeAttribute('scope');}v.insertBefore(x);}u.remove();}if(!B.hasColumnHeaders&&(t=='col'||t=='both'))for(var q=0;q<j.$.rows.length;q++){var y=e(new CKEDITOR.dom.element(j.$.rows[q].cells[0]),'th');if(y!=null)y.setAttribute('scope','col');}if(B.hasColumnHeaders&&!(t=='col'||t=='both'))for(var p=0;
p<j.$.rows.length;p++){var q=new CKEDITOR.dom.element(j.$.rows[p]);if(q.getParent().getName()=='tbody'){var y=e(new CKEDITOR.dom.element(q.$.cells[0]),'td');if(y!=null)y.removeAttribute('scope');}}var z=[];if(m.txtHeight)z.push('height:'+m.txtHeight+'px');if(m.txtWidth){var A=m.cmbWidthType||'pixels';z.push('width:'+m.txtWidth+(A=='pixels'?'px':'%'));}z=z.join(';');if(z!='')j.$.style.cssText=z;else j.removeAttribute('style');}if(!B._.selectedElement){B.restoreSelection();g.insertElement(j);B.clearSavedSelection();}return true;},contents:[{id:'info',label:g.lang.table.title,accessKey:'I',elements:[{type:'hbox',widths:['40%','10%','60%'],children:[{type:'vbox',padding:0,children:[{type:'text',id:'txtRows',labelLayout:'horizontal',widths:['60%','40%'],style:'width:105px','default':3,label:g.lang.table.rows,validate:function(){var j=true,k=this.getValue();j=j&&CKEDITOR.dialog.validate.integer()(k)&&k>0;if(!j){alert(g.lang.table.invalidRows);this.select();}return j;},setup:function(j){this.setValue(j.$.rows.length);},commit:c},{type:'text',id:'txtCols',labelLayout:'horizontal',widths:['60%','40%'],style:'width:105px','default':2,label:g.lang.table.columns,validate:function(){var j=true,k=this.getValue();j=j&&CKEDITOR.dialog.validate.integer()(k)&&k>0;if(!j){alert(g.lang.table.invalidCols);this.select();}return j;},setup:function(j){this.setValue(j.$.rows[0].cells.length);},commit:c},{type:'select',id:'selHeaders',labelLayout:'horizontal','default':'',widths:['40%','60%'],label:g.lang.table.headers,items:[[g.lang.table.headersNone,''],[g.lang.table.headersRow,'row'],[g.lang.table.headersColumn,'col'],[g.lang.table.headersBoth,'both']],setup:function(j){var k=this.getDialog();k.hasColumnHeaders=true;for(var l=0;l<j.$.rows.length;l++)if(j.$.rows[l].cells[0].nodeName.toLowerCase()!='th'){k.hasColumnHeaders=false;break;}if(j.$.tHead!==null)this.setValue(k.hasColumnHeaders?'both':'row');else this.setValue(k.hasColumnHeaders?'col':'');},commit:c},{type:'text',id:'txtBorder',labelLayout:'horizontal',widths:['60%','40%'],style:'width:105px','default':1,label:g.lang.table.border,validate:CKEDITOR.dialog.validate.number(g.lang.table.invalidBorder),setup:function(j){this.setValue(j.getAttribute('border')||'');},commit:function(j,k){if(this.getValue())k.setAttribute('border',this.getValue());else k.removeAttribute('border');}},{id:'cmbAlign',type:'select',labelLayout:'horizontal','default':'',widths:['40%','60%'],label:g.lang.table.align,items:[[g.lang.table.alignNotSet,''],[g.lang.table.alignLeft,'left'],[g.lang.table.alignCenter,'center'],[g.lang.table.alignRight,'right']],setup:function(j){this.setValue(j.getAttribute('align')||'');
},commit:function(j,k){if(this.getValue())k.setAttribute('align',this.getValue());else k.removeAttribute('align');}}]},{type:'html',align:'right',html:''},{type:'vbox',align:'right',padding:0,children:[{type:'hbox',align:'center',widths:['70%','30%'],children:[{type:'text',id:'txtWidth',labelLayout:'horizontal',widths:['50%','50%'],label:g.lang.table.width,'default':200,validate:CKEDITOR.dialog.validate.number(g.lang.table.invalidWidth),setup:function(j){var k=a.exec(j.$.style.width);if(k)this.setValue(k[1]);},commit:c},{id:'cmbWidthType',type:'select',labelLayout:'horizontal',widths:['0%','100%'],label:'','default':'pixels',items:[[g.lang.table.widthPx,'pixels'],[g.lang.table.widthPc,'percents']],setup:function(j){var k=a.exec(j.$.style.width);if(k)this.setValue(k[2]=='px'?'pixels':'percents');},commit:c}]},{type:'hbox',widths:['70%','30%'],children:[{type:'text',id:'txtHeight',labelLayout:'horizontal',widths:['50%','50%'],label:g.lang.table.height,'default':'',validate:CKEDITOR.dialog.validate.number(g.lang.table.invalidHeight),setup:function(j){var k=b.exec(j.$.style.height);if(k)this.setValue(k[1]);},commit:c},{type:'html',html:g.lang.table.widthPx}]},{type:'html',html:'&nbsp;'},{type:'text',id:'txtCellSpace',labelLayout:'horizontal',widths:['50%','50%'],style:'width:140px',label:g.lang.table.cellSpace,'default':1,validate:CKEDITOR.dialog.validate.number(g.lang.table.invalidCellSpacing),setup:function(j){this.setValue(j.getAttribute('cellSpacing')||'');},commit:function(j,k){if(this.getValue())k.setAttribute('cellSpacing',this.getValue());else setAttribute.removeAttribute('cellSpacing');}},{type:'text',id:'txtCellPad',labelLayout:'horizontal',widths:['50%','50%'],style:'width:140px',label:g.lang.table.cellPad,'default':1,validate:CKEDITOR.dialog.validate.number(g.lang.table.invalidCellPadding),setup:function(j){this.setValue(j.getAttribute('cellPadding')||'');},commit:function(j,k){if(this.getValue())k.setAttribute('cellPadding',this.getValue());else k.removeAttribute('cellPadding');}}]}]},{type:'html',align:'right',html:''},{type:'vbox',padding:0,children:[{id:'txtCaption',type:'text',label:g.lang.table.caption,widths:['30%','70%'],labelLayout:'horizontal','default':'',style:'width:400px',setup:function(j){var k=j.getElementsByTag('caption');if(k.count()>0){var l=k.getItem(0);l=l.getChild(0)&&l.getChild(0).getText()||'';l=CKEDITOR.tools.trim(l);this.setValue(l);}},commit:function(j,k){var l=this.getValue(),m=k.getElementsByTag('caption');if(l!=''){if(m.count()>0){m=m.getItem(0);
m.setHtml('');}else{m=new CKEDITOR.dom.element('caption',g.document);if(k.getChildCount())m.insertBefore(k.getFirst());else m.appendTo(k);}m.append(new CKEDITOR.dom.text(l,g.document));}else if(m.count()>0)for(var n=m.count()-1;n>=0;n--)m.getItem(n).remove();}},{id:'txtSummary',type:'text',labelLayout:'horizontal',label:g.lang.table.summary,'default':'',widths:['30%','70%'],accessKey:'A',style:'width:400px',setup:function(j){this.setValue(j.getAttribute('summary')||'');},commit:function(j,k){if(this.getValue())k.setAttribute('summary',this.getValue());}}]}]}]};};CKEDITOR.dialog.add('table',function(g){return f(g,'table');});CKEDITOR.dialog.add('tableProperties',function(g){return f(g,'tableProperties');});})();