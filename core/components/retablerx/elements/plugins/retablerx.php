<?php
switch ($modx->event->name) {
	case 'OnLoadWebDocument':
		$selector = $modx->getOption('retablerx_global_selector');
		$mincol = $modx->getOption('retablerx_global_mincol',null,4,true);
		if ($selector) {
			$modx->regClientScript(MODX_ASSETS_URL.'components/retablerx/js/retabler.min.js');
			$modx->regClientScript("<script type='text/javascript'>ReTabler.add('$selector',{mincol:'$mincol'});</script>",true);
		}
}