<?php
/**
 * Created by PhpStorm.
 * User: ean
 * Date: 29.09.2017
 * Time: 14:07
 */

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', __DIR__ . DS . '..' . DS);
define('VIEW_DIR', ROOT . 'View' . DS);

spl_autoload_register(function($className){
    $module = ROOT . str_replace('\\', DS, $className) . '.php';

    if (!file_exists($module)){
        throw new \Exception("{$module} not found.");
    }

    require $module;
});

try{
    $request = new \Framework\Request($_GET, $_POST);

    $controller = $request->get('controller', 'default');
    $action = $request->get('action', 'index');

    $controller = '\\Controller\\' . ucfirst($controller) . 'Controller';
    $controller = new $controller();
    $action = $action . 'Action';

    if(!method_exists($controller, $action)){
        throw new \Exception("{$action} does not exist.");
    }

    $content = $controller->$action();


} catch (\Exception $e){
    $content = $e->getMessage();
}

require '.' . DS . 'layout.html';

