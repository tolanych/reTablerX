<?php
/** @var xPDOTransport $transport */
/** @var array $options */
/** @var modX $modx */
if ($transport->xpdo) {
    $modx =& $transport->xpdo;

    $dev = MODX_BASE_PATH . 'Extras/reTablerX/';
    /** @var xPDOCacheManager $cache */
    $cache = $modx->getCacheManager();
    if (file_exists($dev) && $cache) {
        if (!is_link($dev . 'assets/components/retablerx')) {
            $cache->deleteTree(
                $dev . 'assets/components/retablerx/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_ASSETS_PATH . 'components/retablerx/', $dev . 'assets/components/retablerx');
        }
        if (!is_link($dev . 'core/components/retablerx')) {
            $cache->deleteTree(
                $dev . 'core/components/retablerx/',
                ['deleteTop' => true, 'skipDirs' => false, 'extensions' => []]
            );
            symlink(MODX_CORE_PATH . 'components/retablerx/', $dev . 'core/components/retablerx');
        }
    }
}

return true;