<?php
function config($key) {
    $config = require "config.php";
    return $config[$key];
}
?>