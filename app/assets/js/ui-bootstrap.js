/*
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 0.14.3 - 2015-10-23
 * License: MIT
 */
angular.module("ui.bootstrap",["ui.bootstrap.typeahead","ui.bootstrap.position","ui.bootstrap.modal","ui.bootstrap.stackedMap"]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.position"]).factory("uibTypeaheadParser",["$parse",function(e){var t=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(a){var n=a.match(t);if(!n)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+a+'".');return{itemName:n[3],source:e(n[4]),viewMapper:e(n[2]||n[1]),modelMapper:e(n[1])}}}}]).controller("UibTypeaheadController",["$scope","$element","$attrs","$compile","$parse","$q","$timeout","$document","$window","$rootScope","$uibPosition","uibTypeaheadParser",function(e,t,a,n,o,i,r,s,l,d,c,u){function p(){F.moveInProgress||(F.moveInProgress=!0,F.$digest()),R&&r.cancel(R),R=r(function(){F.matches.length&&m(),F.moveInProgress=!1},$)}function m(){F.position=M?c.offset(t):c.position(t),F.position.top+=t.prop("offsetHeight")}var f,h,v=[9,13,27,38,40],$=200,g=e.$eval(a.typeaheadMinLength);g||0===g||(g=1);var y,b,w=e.$eval(a.typeaheadWaitMs)||0,C=e.$eval(a.typeaheadEditable)!==!1,k=o(a.typeaheadLoading).assign||angular.noop,I=o(a.typeaheadOnSelect),S=angular.isDefined(a.typeaheadSelectOnBlur)?e.$eval(a.typeaheadSelectOnBlur):!1,T=o(a.typeaheadNoResults).assign||angular.noop,x=a.typeaheadInputFormatter?o(a.typeaheadInputFormatter):void 0,M=a.typeaheadAppendToBody?e.$eval(a.typeaheadAppendToBody):!1,U=a.typeaheadAppendToElementId||!1,E=e.$eval(a.typeaheadFocusFirst)!==!1,P=a.typeaheadSelectOnExact?e.$eval(a.typeaheadSelectOnExact):!1,O=o(a.ngModel),N=o(a.ngModel+"($$$p)"),W=function(t,a){return angular.isFunction(O(e))&&h&&h.$options&&h.$options.getterSetter?N(t,{$$$p:a}):O.assign(t,a)},q=u.parse(a.uibTypeahead),F=e.$new(),A=e.$on("$destroy",function(){F.$destroy()});F.$on("$destroy",A);var D="typeahead-"+F.$id+"-"+Math.floor(1e4*Math.random());t.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":D});var L=angular.element("<div uib-typeahead-popup></div>");L.attr({id:D,matches:"matches",active:"activeIdx",select:"select(activeIdx)","move-in-progress":"moveInProgress",query:"query",position:"position"}),angular.isDefined(a.typeaheadTemplateUrl)&&L.attr("template-url",a.typeaheadTemplateUrl),angular.isDefined(a.typeaheadPopupTemplateUrl)&&L.attr("popup-template-url",a.typeaheadPopupTemplateUrl);var V=function(){F.matches=[],F.activeIdx=-1,t.attr("aria-expanded",!1)},_=function(e){return D+"-option-"+e};F.$watch("activeIdx",function(e){0>e?t.removeAttr("aria-activedescendant"):t.attr("aria-activedescendant",_(e))});var j=function(e,t){return F.matches.length>t&&e?e.toUpperCase()===F.matches[t].label.toUpperCase():!1},z=function(a){var n={$viewValue:a};k(e,!0),T(e,!1),i.when(q.source(e,n)).then(function(o){var i=a===f.$viewValue;if(i&&y)if(o&&o.length>0){F.activeIdx=E?0:-1,T(e,!1),F.matches.length=0;for(var r=0;r<o.length;r++)n[q.itemName]=o[r],F.matches.push({id:_(r),label:q.viewMapper(F,n),model:o[r]});F.query=a,m(),t.attr("aria-expanded",!0),P&&1===F.matches.length&&j(a,0)&&F.select(0)}else V(),T(e,!0);i&&k(e,!1)},function(){V(),k(e,!1),T(e,!0)})};M&&(angular.element(l).bind("resize",p),s.find("body").bind("scroll",p));var R;F.moveInProgress=!1,F.query=void 0;var B,H=function(e){B=r(function(){z(e)},w)},G=function(){B&&r.cancel(B)};V(),F.select=function(n){var o,i,s={};b=!0,s[q.itemName]=i=F.matches[n].model,o=q.modelMapper(e,s),W(e,o),f.$setValidity("editable",!0),f.$setValidity("parse",!0),I(e,{$item:i,$model:o,$label:q.viewMapper(e,s)}),V(),F.$eval(a.typeaheadFocusOnSelect)!==!1&&r(function(){t[0].focus()},0,!1)},t.bind("keydown",function(e){if(0!==F.matches.length&&-1!==v.indexOf(e.which)){if(-1===F.activeIdx&&(9===e.which||13===e.which))return V(),void F.$digest();e.preventDefault(),40===e.which?(F.activeIdx=(F.activeIdx+1)%F.matches.length,F.$digest()):38===e.which?(F.activeIdx=(F.activeIdx>0?F.activeIdx:F.matches.length)-1,F.$digest()):13===e.which||9===e.which?F.$apply(function(){F.select(F.activeIdx)}):27===e.which&&(e.stopPropagation(),V(),F.$digest())}}),t.bind("blur",function(){S&&F.matches.length&&-1!==F.activeIdx&&!b&&(b=!0,F.$apply(function(){F.select(F.activeIdx)})),y=!1,b=!1});var K=function(e){t[0]!==e.target&&3!==e.which&&0!==F.matches.length&&(V(),d.$$phase||F.$digest())};s.bind("click",K),e.$on("$destroy",function(){s.unbind("click",K),(M||U)&&X.remove(),M&&(angular.element(l).unbind("resize",p),s.find("body").unbind("scroll",p)),L.remove()});var X=n(L)(F);M?s.find("body").append(X):U!==!1?angular.element(s[0].getElementById(U)).append(X):t.after(X),this.init=function(t,a){f=t,h=a,f.$parsers.unshift(function(t){return y=!0,0===g||t&&t.length>=g?w>0?(G(),H(t)):z(t):(k(e,!1),G(),V()),C?t:t?void f.$setValidity("editable",!1):(f.$setValidity("editable",!0),null)}),f.$formatters.push(function(t){var a,n,o={};return C||f.$setValidity("editable",!0),x?(o.$model=t,x(e,o)):(o[q.itemName]=t,a=q.viewMapper(e,o),o[q.itemName]=void 0,n=q.viewMapper(e,o),a!==n?a:t)})}}]).directive("uibTypeahead",function(){return{controller:"UibTypeaheadController",require:["ngModel","^?ngModelOptions","uibTypeahead"],link:function(e,t,a,n){n[2].init(n[0],n[1])}}}).directive("uibTypeaheadPopup",function(){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&"},replace:!0,templateUrl:function(e,t){return t.popupTemplateUrl||"template/typeahead/typeahead-popup.html"},link:function(e,t,a){e.templateUrl=a.templateUrl,e.isOpen=function(){return e.matches.length>0},e.isActive=function(t){return e.active==t},e.selectActive=function(t){e.active=t},e.selectMatch=function(t){e.select({activeIdx:t})}}}}).directive("uibTypeaheadMatch",["$templateRequest","$compile","$parse",function(e,t,a){return{scope:{index:"=",match:"=",query:"="},link:function(n,o,i){var r=a(i.templateUrl)(n.$parent)||"template/typeahead/typeahead-match.html";e(r).then(function(e){t(e.trim())(n,function(e){o.replaceWith(e)})})}}}]).filter("uibTypeaheadHighlight",["$sce","$injector","$log",function(e,t,a){function n(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function o(e){return/<.*>/g.test(e)}var i;return i=t.has("$sanitize"),function(t,r){return!i&&o(t)&&a.warn("Unsafe use of typeahead please use ngSanitize"),t=r?(""+t).replace(new RegExp(n(r),"gi"),"<strong>$&</strong>"):t,i||(t=e.trustAsHtml(t)),t}}]),angular.module("ui.bootstrap.typeahead").value("$typeaheadSuppressWarning",!1).service("typeaheadParser",["$parse","uibTypeaheadParser","$log","$typeaheadSuppressWarning",function(e,t,a,n){return n||a.warn("typeaheadParser is now deprecated. Use uibTypeaheadParser instead."),t}]).directive("typeahead",["$compile","$parse","$q","$timeout","$document","$window","$rootScope","$uibPosition","typeaheadParser","$log","$typeaheadSuppressWarning",function(e,t,a,n,o,i,r,s,l,d,c){var u=[9,13,27,38,40],p=200;return{require:["ngModel","^?ngModelOptions"],link:function(m,f,h,v){function $(){L.moveInProgress||(L.moveInProgress=!0,L.$digest()),G&&n.cancel(G),G=n(function(){L.matches.length&&g(),L.moveInProgress=!1},p)}function g(){L.position=P?s.offset(f):s.position(f),L.position.top+=f.prop("offsetHeight")}c||d.warn("typeahead is now deprecated. Use uib-typeahead instead.");var y=v[0],b=v[1],w=m.$eval(h.typeaheadMinLength);w||0===w||(w=1);var C,k,I=m.$eval(h.typeaheadWaitMs)||0,S=m.$eval(h.typeaheadEditable)!==!1,T=t(h.typeaheadLoading).assign||angular.noop,x=t(h.typeaheadOnSelect),M=angular.isDefined(h.typeaheadSelectOnBlur)?m.$eval(h.typeaheadSelectOnBlur):!1,U=t(h.typeaheadNoResults).assign||angular.noop,E=h.typeaheadInputFormatter?t(h.typeaheadInputFormatter):void 0,P=h.typeaheadAppendToBody?m.$eval(h.typeaheadAppendToBody):!1,O=h.typeaheadAppendToElementId||!1,N=m.$eval(h.typeaheadFocusFirst)!==!1,W=h.typeaheadSelectOnExact?m.$eval(h.typeaheadSelectOnExact):!1,q=t(h.ngModel),F=t(h.ngModel+"($$$p)"),A=function(e,t){return angular.isFunction(q(m))&&b&&b.$options&&b.$options.getterSetter?F(e,{$$$p:t}):q.assign(e,t)},D=l.parse(h.typeahead),L=m.$new(),V=m.$on("$destroy",function(){L.$destroy()});L.$on("$destroy",V);var _="typeahead-"+L.$id+"-"+Math.floor(1e4*Math.random());f.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":_});var j=angular.element("<div typeahead-popup></div>");j.attr({id:_,matches:"matches",active:"activeIdx",select:"select(activeIdx)","move-in-progress":"moveInProgress",query:"query",position:"position"}),angular.isDefined(h.typeaheadTemplateUrl)&&j.attr("template-url",h.typeaheadTemplateUrl),angular.isDefined(h.typeaheadPopupTemplateUrl)&&j.attr("popup-template-url",h.typeaheadPopupTemplateUrl);var z=function(){L.matches=[],L.activeIdx=-1,f.attr("aria-expanded",!1)},R=function(e){return _+"-option-"+e};L.$watch("activeIdx",function(e){0>e?f.removeAttr("aria-activedescendant"):f.attr("aria-activedescendant",R(e))});var B=function(e,t){return L.matches.length>t&&e?e.toUpperCase()===L.matches[t].label.toUpperCase():!1},H=function(e){var t={$viewValue:e};T(m,!0),U(m,!1),a.when(D.source(m,t)).then(function(a){var n=e===y.$viewValue;if(n&&C)if(a&&a.length>0){L.activeIdx=N?0:-1,U(m,!1),L.matches.length=0;for(var o=0;o<a.length;o++)t[D.itemName]=a[o],L.matches.push({id:R(o),label:D.viewMapper(L,t),model:a[o]});L.query=e,g(),f.attr("aria-expanded",!0),W&&1===L.matches.length&&B(e,0)&&L.select(0)}else z(),U(m,!0);n&&T(m,!1)},function(){z(),T(m,!1),U(m,!0)})};P&&(angular.element(i).bind("resize",$),o.find("body").bind("scroll",$));var G;L.moveInProgress=!1,z(),L.query=void 0;var K,X=function(e){K=n(function(){H(e)},I)},Y=function(){K&&n.cancel(K)};y.$parsers.unshift(function(e){return C=!0,0===w||e&&e.length>=w?I>0?(Y(),X(e)):H(e):(T(m,!1),Y(),z()),S?e:e?void y.$setValidity("editable",!1):(y.$setValidity("editable",!0),null)}),y.$formatters.push(function(e){var t,a,n={};return S||y.$setValidity("editable",!0),E?(n.$model=e,E(m,n)):(n[D.itemName]=e,t=D.viewMapper(m,n),n[D.itemName]=void 0,a=D.viewMapper(m,n),t!==a?t:e)}),L.select=function(e){var t,a,o={};k=!0,o[D.itemName]=a=L.matches[e].model,t=D.modelMapper(m,o),A(m,t),y.$setValidity("editable",!0),y.$setValidity("parse",!0),x(m,{$item:a,$model:t,$label:D.viewMapper(m,o)}),z(),L.$eval(h.typeaheadFocusOnSelect)!==!1&&n(function(){f[0].focus()},0,!1)},f.bind("keydown",function(e){if(0!==L.matches.length&&-1!==u.indexOf(e.which)){if(-1===L.activeIdx&&(9===e.which||13===e.which))return z(),void L.$digest();e.preventDefault(),40===e.which?(L.activeIdx=(L.activeIdx+1)%L.matches.length,L.$digest()):38===e.which?(L.activeIdx=(L.activeIdx>0?L.activeIdx:L.matches.length)-1,L.$digest()):13===e.which||9===e.which?L.$apply(function(){L.select(L.activeIdx)}):27===e.which&&(e.stopPropagation(),z(),L.$digest())}}),f.bind("blur",function(){M&&L.matches.length&&-1!==L.activeIdx&&!k&&(k=!0,L.$apply(function(){L.select(L.activeIdx)})),C=!1,k=!1});var J=function(e){f[0]!==e.target&&3!==e.which&&0!==L.matches.length&&(z(),r.$$phase||L.$digest())};o.bind("click",J),m.$on("$destroy",function(){o.unbind("click",J),(P||O)&&Q.remove(),P&&(angular.element(i).unbind("resize",$),o.find("body").unbind("scroll",$)),j.remove()});var Q=e(j)(L);P?o.find("body").append(Q):O!==!1?angular.element(o[0].getElementById(O)).append(Q):f.after(Q)}}}]).directive("typeaheadPopup",["$typeaheadSuppressWarning","$log",function(e,t){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&"},replace:!0,templateUrl:function(e,t){return t.popupTemplateUrl||"template/typeahead/typeahead-popup.html"},link:function(a,n,o){e||t.warn("typeahead-popup is now deprecated. Use uib-typeahead-popup instead."),a.templateUrl=o.templateUrl,a.isOpen=function(){return a.matches.length>0},a.isActive=function(e){return a.active==e},a.selectActive=function(e){a.active=e},a.selectMatch=function(e){a.select({activeIdx:e})}}}}]).directive("typeaheadMatch",["$templateRequest","$compile","$parse","$typeaheadSuppressWarning","$log",function(e,t,a,n,o){return{restrict:"EA",scope:{index:"=",match:"=",query:"="},link:function(i,r,s){n||o.warn("typeahead-match is now deprecated. Use uib-typeahead-match instead.");var l=a(s.templateUrl)(i.$parent)||"template/typeahead/typeahead-match.html";e(l).then(function(e){t(e.trim())(i,function(e){r.replaceWith(e)})})}}}]).filter("typeaheadHighlight",["$sce","$injector","$log","$typeaheadSuppressWarning",function(e,t,a,n){function o(e){return e.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function i(e){return/<.*>/g.test(e)}var r;return r=t.has("$sanitize"),function(t,s){return n||a.warn("typeaheadHighlight is now deprecated. Use uibTypeaheadHighlight instead."),!r&&i(t)&&a.warn("Unsafe use of typeahead please use ngSanitize"),t=s?(""+t).replace(new RegExp(o(s),"gi"),"<strong>$&</strong>"):t,r||(t=e.trustAsHtml(t)),t}}]),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(e,t){function a(e,a){return e.currentStyle?e.currentStyle[a]:t.getComputedStyle?t.getComputedStyle(e)[a]:e.style[a]}function n(e){return"static"===(a(e,"position")||"static")}var o=function(t){for(var a=e[0],o=t.offsetParent||a;o&&o!==a&&n(o);)o=o.offsetParent;return o||a};return{position:function(t){var a=this.offset(t),n={top:0,left:0},i=o(t[0]);i!=e[0]&&(n=this.offset(angular.element(i)),n.top+=i.clientTop-i.scrollTop,n.left+=i.clientLeft-i.scrollLeft);var r=t[0].getBoundingClientRect();return{width:r.width||t.prop("offsetWidth"),height:r.height||t.prop("offsetHeight"),top:a.top-n.top,left:a.left-n.left}},offset:function(a){var n=a[0].getBoundingClientRect();return{width:n.width||a.prop("offsetWidth"),height:n.height||a.prop("offsetHeight"),top:n.top+(t.pageYOffset||e[0].documentElement.scrollTop),left:n.left+(t.pageXOffset||e[0].documentElement.scrollLeft)}},positionElements:function(e,t,a,n){var o,i,r,s,l=a.split("-"),d=l[0],c=l[1]||"center";o=n?this.offset(e):this.position(e),i=t.prop("offsetWidth"),r=t.prop("offsetHeight");var u={center:function(){return o.left+o.width/2-i/2},left:function(){return o.left},right:function(){return o.left+o.width}},p={center:function(){return o.top+o.height/2-r/2},top:function(){return o.top},bottom:function(){return o.top+o.height}};switch(d){case"right":s={top:p[c](),left:u[d]()};break;case"left":s={top:p[c](),left:o.left-i};break;case"bottom":s={top:p[d](),left:u[c]()};break;default:s={top:o.top-r,left:u[c]()}}return s}}}]),angular.module("ui.bootstrap.position").value("$positionSuppressWarning",!1).service("$position",["$log","$positionSuppressWarning","$uibPosition",function(e,t,a){t||e.warn("$position is now deprecated. Use $uibPosition instead."),angular.extend(this,a)}]),angular.module("ui.bootstrap.modal",["ui.bootstrap.stackedMap"]).factory("$$multiMap",function(){return{createNew:function(){var e={};return{entries:function(){return Object.keys(e).map(function(t){return{key:t,value:e[t]}})},get:function(t){return e[t]},hasKey:function(t){return!!e[t]},keys:function(){return Object.keys(e)},put:function(t,a){e[t]||(e[t]=[]),e[t].push(a)},remove:function(t,a){var n=e[t];if(n){var o=n.indexOf(a);-1!==o&&n.splice(o,1),n.length||delete e[t]}}}}}}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(e,t,a){function n(t,n,i){n.addClass("modal-backdrop"),i.modalInClass&&(o?o(n,{addClass:i.modalInClass}).start():e.addClass(n,i.modalInClass),t.$on(a.NOW_CLOSING_EVENT,function(t,a){var r=a();o?o(n,{removeClass:i.modalInClass}).start().then(r):e.removeClass(n,i.modalInClass).then(r)}))}var o=null;return t.has("$animateCss")&&(o=t.get("$animateCss")),{replace:!0,templateUrl:"template/modal/backdrop.html",compile:function(e,t){return e.addClass(t.backdropClass),n}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animate","$injector",function(e,t,a,n){var o=null;return n.has("$animateCss")&&(o=n.get("$animateCss")),{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(e,t){return t.templateUrl||"template/modal/window.html"},link:function(n,i,r){i.addClass(r.windowClass||""),i.addClass(r.windowTopClass||""),n.size=r.size,n.close=function(t){var a=e.getTop();a&&a.value.backdrop&&"static"!==a.value.backdrop&&t.target===t.currentTarget&&(t.preventDefault(),t.stopPropagation(),e.dismiss(a.key,"backdrop click"))},i.on("click",n.close),n.$isRendered=!0;var s=t.defer();r.$observe("modalRender",function(e){"true"==e&&s.resolve()}),s.promise.then(function(){var s=null;r.modalInClass&&(s=o?o(i,{addClass:r.modalInClass}).start():a.addClass(i,r.modalInClass),n.$on(e.NOW_CLOSING_EVENT,function(e,t){var n=t();o?o(i,{removeClass:r.modalInClass}).start().then(n):a.removeClass(i,r.modalInClass).then(n)})),t.when(s).then(function(){var e=i[0].querySelector("[autofocus]");e?e.focus():i[0].focus()});var l=e.getTop();l&&e.modalRendered(l.key)})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(e,t){t.modalAnimation&&e.addClass(t.uibModalAnimationClass)}}}).directive("uibModalTransclude",function(){return{link:function(e,t,a,n,o){o(e.$parent,function(e){t.empty(),t.append(e)})}}}).factory("$uibModalStack",["$animate","$timeout","$document","$compile","$rootScope","$q","$injector","$$multiMap","$$stackedMap",function(e,t,a,n,o,i,r,s,l){function d(){for(var e=-1,t=b.keys(),a=0;a<t.length;a++)b.get(t[a]).value.backdrop&&(e=a);return e}function c(e,t){var n=a.find("body").eq(0),o=b.get(e).value;b.remove(e),m(o.modalDomEl,o.modalScope,function(){var t=o.openedClass||y;w.remove(t,e),n.toggleClass(t,w.hasKey(t)),u(!0)}),p(),t&&t.focus?t.focus():n.focus()}function u(e){var t;b.length()>0&&(t=b.top().value,t.modalDomEl.toggleClass(t.windowTopClass||"",e))}function p(){if(v&&-1==d()){var e=$;m(v,$,function(){e=null}),v=void 0,$=void 0}}function m(t,a,n){function o(){o.done||(o.done=!0,h?h(t,{event:"leave"}).start().then(function(){t.remove()}):e.leave(t),a.$destroy(),n&&n())}var r,s=null,l=function(){return r||(r=i.defer(),s=r.promise),function(){r.resolve()}};return a.$broadcast(C.NOW_CLOSING_EVENT,l),i.when(s).then(o)}function f(e,t,a){return!e.value.modalScope.$broadcast("modal.closing",t,a).defaultPrevented}var h=null;r.has("$animateCss")&&(h=r.get("$animateCss"));var v,$,g,y="modal-open",b=l.createNew(),w=s.createNew(),C={NOW_CLOSING_EVENT:"modal.stack.now-closing"},k=0,I="a[href], area[href], input:not([disabled]), button:not([disabled]),select:not([disabled]), textarea:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable=true]";return o.$watch(d,function(e){$&&($.index=e)}),a.bind("keydown",function(e){if(e.isDefaultPrevented())return e;var t=b.top();if(t&&t.value.keyboard)switch(e.which){case 27:e.preventDefault(),o.$apply(function(){C.dismiss(t.key,"escape key press")});break;case 9:C.loadFocusElementList(t);var a=!1;e.shiftKey?C.isFocusInFirstItem(e)&&(a=C.focusLastFocusableElement()):C.isFocusInLastItem(e)&&(a=C.focusFirstFocusableElement()),a&&(e.preventDefault(),e.stopPropagation())}}),C.open=function(e,t){var i=a[0].activeElement,r=t.openedClass||y;u(!1),b.add(e,{deferred:t.deferred,renderDeferred:t.renderDeferred,modalScope:t.scope,backdrop:t.backdrop,keyboard:t.keyboard,openedClass:t.openedClass,windowTopClass:t.windowTopClass}),w.put(r,e);var s=a.find("body").eq(0),l=d();if(l>=0&&!v){$=o.$new(!0),$.index=l;var c=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>');c.attr("backdrop-class",t.backdropClass),t.animation&&c.attr("modal-animation","true"),v=n(c)($),s.append(v)}var p=angular.element('<div uib-modal-window="modal-window"></div>');p.attr({"template-url":t.windowTemplateUrl,"window-class":t.windowClass,"window-top-class":t.windowTopClass,size:t.size,index:b.length()-1,animate:"animate"}).html(t.content),t.animation&&p.attr("modal-animation","true");var m=n(p)(t.scope);b.top().value.modalDomEl=m,b.top().value.modalOpener=i,s.append(m),s.addClass(r),C.clearFocusListCache()},C.close=function(e,t){var a=b.get(e);return a&&f(a,t,!0)?(a.value.modalScope.$$uibDestructionScheduled=!0,a.value.deferred.resolve(t),c(e,a.value.modalOpener),!0):!a},C.dismiss=function(e,t){var a=b.get(e);return a&&f(a,t,!1)?(a.value.modalScope.$$uibDestructionScheduled=!0,a.value.deferred.reject(t),c(e,a.value.modalOpener),!0):!a},C.dismissAll=function(e){for(var t=this.getTop();t&&this.dismiss(t.key,e);)t=this.getTop()},C.getTop=function(){return b.top()},C.modalRendered=function(e){var t=b.get(e);t&&t.value.renderDeferred.resolve()},C.focusFirstFocusableElement=function(){return g.length>0?(g[0].focus(),!0):!1},C.focusLastFocusableElement=function(){return g.length>0?(g[g.length-1].focus(),!0):!1},C.isFocusInFirstItem=function(e){return g.length>0?(e.target||e.srcElement)==g[0]:!1},C.isFocusInLastItem=function(e){return g.length>0?(e.target||e.srcElement)==g[g.length-1]:!1},C.clearFocusListCache=function(){g=[],k=0},C.loadFocusElementList=function(e){if((void 0===g||!g.length)&&e){var t=e.value.modalDomEl;t&&t.length&&(g=t[0].querySelectorAll(I))}},C}]).provider("$uibModal",function(){var e={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$injector","$rootScope","$q","$templateRequest","$controller","$uibModalStack","$modalSuppressWarning","$log",function(t,a,n,o,i,r,s,l){function d(e){return e.template?n.when(e.template):o(angular.isFunction(e.templateUrl)?e.templateUrl():e.templateUrl)}function c(e){var a=[];return angular.forEach(e,function(e){a.push(angular.isFunction(e)||angular.isArray(e)?n.when(t.invoke(e)):angular.isString(e)?n.when(t.get(e)):n.when(e))}),a}var u={},p=null;return u.getPromiseChain=function(){return p},u.open=function(t){function o(){return $}var u=n.defer(),m=n.defer(),f=n.defer(),h={result:u.promise,opened:m.promise,rendered:f.promise,close:function(e){return r.close(h,e)},dismiss:function(e){return r.dismiss(h,e)}};if(t=angular.extend({},e.options,t),t.resolve=t.resolve||{},!t.template&&!t.templateUrl)throw new Error("One of template or templateUrl options is required.");var v,$=n.all([d(t)].concat(c(t.resolve)));return v=p=n.all([p]).then(o,o).then(function(e){var n=(t.scope||a).$new();n.$close=h.close,n.$dismiss=h.dismiss,n.$on("$destroy",function(){n.$$uibDestructionScheduled||n.$dismiss("$uibUnscheduledDestruction")});var o,d={},c=1;t.controller&&(d.$scope=n,d.$uibModalInstance=h,Object.defineProperty(d,"$modalInstance",{get:function(){return s||l.warn("$modalInstance is now deprecated. Use $uibModalInstance instead."),h}}),angular.forEach(t.resolve,function(t,a){d[a]=e[c++]}),o=i(t.controller,d),t.controllerAs&&(t.bindToController&&angular.extend(o,n),n[t.controllerAs]=o)),r.open(h,{scope:n,deferred:u,renderDeferred:f,content:e[0],animation:t.animation,backdrop:t.backdrop,keyboard:t.keyboard,backdropClass:t.backdropClass,windowTopClass:t.windowTopClass,windowClass:t.windowClass,windowTemplateUrl:t.windowTemplateUrl,size:t.size,openedClass:t.openedClass}),m.resolve(!0)},function(e){m.reject(e),u.reject(e)}).finally(function(){p===v&&(p=null)}),h},u}]};return e}),angular.module("ui.bootstrap.modal").value("$modalSuppressWarning",!1).directive("modalBackdrop",["$animate","$injector","$modalStack","$log","$modalSuppressWarning",function(e,t,a,n,o){function i(t,i,s){o||n.warn("modal-backdrop is now deprecated. Use uib-modal-backdrop instead."),i.addClass("modal-backdrop"),s.modalInClass&&(r?r(i,{addClass:s.modalInClass}).start():e.addClass(i,s.modalInClass),t.$on(a.NOW_CLOSING_EVENT,function(t,a){var n=a();r?r(i,{removeClass:s.modalInClass}).start().then(n):e.removeClass(i,s.modalInClass).then(n)}))}var r=null;return t.has("$animateCss")&&(r=t.get("$animateCss")),{replace:!0,templateUrl:"template/modal/backdrop.html",compile:function(e,t){return e.addClass(t.backdropClass),i}}}]).directive("modalWindow",["$modalStack","$q","$animate","$injector","$log","$modalSuppressWarning",function(e,t,a,n,o,i){var r=null;return n.has("$animateCss")&&(r=n.get("$animateCss")),{scope:{index:"@"},replace:!0,transclude:!0,templateUrl:function(e,t){return t.templateUrl||"template/modal/window.html"},link:function(n,s,l){i||o.warn("modal-window is now deprecated. Use uib-modal-window instead."),s.addClass(l.windowClass||""),s.addClass(l.windowTopClass||""),n.size=l.size,n.close=function(t){var a=e.getTop();a&&a.value.backdrop&&"static"!==a.value.backdrop&&t.target===t.currentTarget&&(t.preventDefault(),t.stopPropagation(),e.dismiss(a.key,"backdrop click"))},s.on("click",n.close),n.$isRendered=!0;var d=t.defer();l.$observe("modalRender",function(e){"true"==e&&d.resolve()}),d.promise.then(function(){var o=null;l.modalInClass&&(o=r?r(s,{addClass:l.modalInClass}).start():a.addClass(s,l.modalInClass),n.$on(e.NOW_CLOSING_EVENT,function(e,t){var n=t();r?r(s,{removeClass:l.modalInClass}).start().then(n):a.removeClass(s,l.modalInClass).then(n)})),t.when(o).then(function(){var e=s[0].querySelector("[autofocus]");e?e.focus():s[0].focus()});var i=e.getTop();i&&e.modalRendered(i.key)})}}}]).directive("modalAnimationClass",["$log","$modalSuppressWarning",function(e,t){return{compile:function(a,n){t||e.warn("modal-animation-class is now deprecated. Use uib-modal-animation-class instead."),n.modalAnimation&&a.addClass(n.modalAnimationClass)}}}]).directive("modalTransclude",["$log","$modalSuppressWarning",function(e,t){return{link:function(a,n,o,i,r){t||e.warn("modal-transclude is now deprecated. Use uib-modal-transclude instead."),r(a.$parent,function(e){n.empty(),n.append(e)})}}}]).service("$modalStack",["$animate","$timeout","$document","$compile","$rootScope","$q","$injector","$$multiMap","$$stackedMap","$uibModalStack","$log","$modalSuppressWarning",function(e,t,a,n,o,i,r,s,l,d,c,u){u||c.warn("$modalStack is now deprecated. Use $uibModalStack instead."),angular.extend(this,d)}]).provider("$modal",["$uibModalProvider",function(e){angular.extend(this,e),this.$get=["$injector","$log","$modalSuppressWarning",function(t,a,n){return n||a.warn("$modal is now deprecated. Use $uibModal instead."),t.invoke(e.$get)}]}]),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var e=[];return{add:function(t,a){e.push({key:t,value:a})},get:function(t){for(var a=0;a<e.length;a++)if(t==e[a].key)return e[a]},keys:function(){for(var t=[],a=0;a<e.length;a++)t.push(e[a].key);return t},top:function(){return e[e.length-1]},remove:function(t){for(var a=-1,n=0;n<e.length;n++)if(t==e[n].key){a=n;break}return e.splice(a,1)[0]},removeTop:function(){return e.splice(e.length-1,1)[0]},length:function(){return e.length}}}}});