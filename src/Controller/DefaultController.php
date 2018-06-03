<?php
/**
 * Created by PhpStorm.
 * User: ean
 * Date: 04.10.2017
 * Time: 16:50
 */

namespace Controller;


class DefaultController
{
    public function indexAction()
    {
        $path = str_replace(['Controller', '\\'], '', __CLASS__);
        ob_start();
        require VIEW_DIR . $path . DS . 'index.html';
        return ob_get_clean();
    }

    public function aboutAction()
    {
        return 2;
    }

    public function blogAction()
    {
        return 3;
    }

    public function worksAction()
    {
        return 4;
    }

    public function feedbackAction()
    {
        $path = str_replace(['Controller', '\\'], '', __CLASS__);
        ob_start();
        require VIEW_DIR . $path . DS . 'feedback.html';
        return ob_get_clean();
    }
}