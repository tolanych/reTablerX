<?php
/** @var modX $modx */
/** @var array $scriptProperties */
$selector = $modx->getOption('selector',$scriptProperties,'table',true);
$prefix = $modx->getOption('prefix',$scriptProperties,'retabler-',true);
$pad = $modx->getOption('pad',$scriptProperties,'35%',true);

$modx->regClientScript(MODX_ASSETS_URL.'components/retablerx/js/retabler.min.js');
$modx->regClientScript("<script type='text/javascript'>ReTabler.add('$selector','$prefix','$pad');</script>",true);
return '';