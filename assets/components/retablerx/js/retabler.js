/**
 * ReTabler
 * @author tolanych <https://github.com/tolanych>
 * @example
 *	ReTabler.add('#sometable');
 *	ReTabler.add('section.content table');
 *	ReTabler.add('body table');
*/

// polyfill closest
(function(e){ 
 e.closest = e.closest || function(css){ 
   var node = this;
  
   while (node) { 
      if (node.matches(css)) return node; 
      else node = node.parentElement; 
   } 
   return null; 
 } 
})(Element.prototype);

var ReTabler = (function () {
    var ReTabler = function () {}

    ReTabler.add = function (selector, prefix, pad) {
		$prefix = prefix ? prefix:'retabler-';
		$pad = pad ? pad: '35%';
		i = 1;
		[].forEach.call(document.querySelectorAll(selector), function(el) {
			if (el.getAttribute('retabler') != $pad) { //redeclare width pad
				el.classList.add($prefix+i);
				ReTabler.generateCss(el, $prefix+i, $pad);
				el.setAttribute('retabler', $pad);
				i++;
			}
		})
    }

	ReTabler.generateCss = function (obj, cl, pad) {
		var colCount = 0;
		var thead = false;
		var theadel = 'td';
		var inlineStyle = '';
		cl = '.'+cl;

		// Check table with thead
		is_head = obj.querySelectorAll('thead');
		if (is_head.length) {
			theadel='th';
			wrapper_head = is_head[0];
		}
		else {
			// create thead
			firsttr = obj.querySelectorAll('tr')[0];
			if (firsttr.querySelectorAll('th')[0]) {theadel='th'}
			wrapper_head = document.createElement('thead');
			targetNode = firsttr.closest('table');
			targetNode.insertBefore(wrapper_head,targetNode.firstChild);
			wrapper_head.appendChild(firsttr);
		}

		[].forEach.call(obj.querySelectorAll('thead tr:nth-child(1) '+theadel), function(column) {
			if (column.getAttribute('colspan')) {
				console.log(cl+': dont reorganize table with colspan');
				return false;
			}
			colCount++;
		})

		if (colCount < 4) {
			console.log(cl+': dont reorganize table with column less 4');
			return false;
		}

		inlineStyle = "@media  only screen and (max-width: 768px), (min-device-width: 768px) and (max-device-width: 1024px) {";

		var cssrule = [
			' { display:block; }',
			'thead { display:none; }',
			'tbody { display:block; }',
			'th { display:block; }',
			'tr { display:block; border: 1px solid #ccc;}',
			'td { display:block; border: none; border-bottom: 1px solid #eee; position: relative; padding-left: '+pad+'!important; }',
			'td:before { position: absolute;left: 6px; width: '+pad+'; padding-right: 10px!important; }'
		];

		[].forEach.call(cssrule, function (rule) {
			inlineStyle += cl+" "+rule;
		});
		i = 1;
		[].forEach.call(wrapper_head.querySelectorAll(theadel), function (thtitle) {
			inlineStyle += cl+" "+'td:nth-of-type('+(i++)+'):before { content:"' + thtitle.textContent.trim()  + '"; }';
		});

		inlineStyle += '}';

		var style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'st-'+cl;
		style.innerHTML = inlineStyle;
		(document.querySelectorAll('head')[0]).appendChild(style);
		ReTabler.calculateHeight(obj);
		window.addEventListener("resize", function() {
			ReTabler.calculateHeight(obj);
		}, false);
	}

	// calculate min-height row
	ReTabler.calculateHeight = function (obj) {
		[].forEach.call(obj.querySelectorAll('tbody td'), function (td) {
			_hht = window.getComputedStyle(td,null).getPropertyValue('height');
			_hhc = window.getComputedStyle(td,':before').getPropertyValue('height');

			_hhc = Number(_hhc.slice(0,-2));
			_hht = Number(_hht.slice(0,-2));

			if (_hhc > _hht) {
				td.style['min-height'] = _hhc+'px';
			}
		});
	}
	return ReTabler;
})();