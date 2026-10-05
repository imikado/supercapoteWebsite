<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class PageHeaderComponent extends ComponentAbstract implements ComponentInterface
{
    protected $title;
    protected $intro;

    public function __construct($title, $intro)
    {
        $this->title = $title;
        $this->intro = $intro;
    }

    public function render(): string
    {
        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/pageHeader.php',
            [
                'title' => $this->title,
                'intro' => $this->intro
            ]
        );
    }
}
