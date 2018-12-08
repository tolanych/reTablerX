<?php
switch ($modx->event->name) {
	case 'OnLoadWebDocument':
		$selector = $modx->getOption('retablerx_global_selector');
		if ($selector) {
			$modx->regClientScript(MODX_ASSETS_URL.'components/retablerx/js/retabler.min.js');
			$modx->regClientScript("<script type='text/javascript'>ReTabler.add('$selector');</script>",true);
		}
}