<?php
// app/router.php
$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
$file = __DIR__ . '/public' . $path;

if (php_sapi_name() === 'cli-server' && is_file($file)) {
    return false;
}

require_once __DIR__ . '/public/index.php';
