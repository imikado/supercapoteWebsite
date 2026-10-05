<?php

namespace MyWebsite\Components;

use Dupot\StaticGenerationFramework\Component\ComponentAbstract;
use Dupot\StaticGenerationFramework\Component\ComponentInterface;

class DocumentListComponent extends ComponentAbstract implements ComponentInterface
{
    public function render(): string
    {
        $documentList = [
            new Document('Questions d\'ados', 'Brochure sur l\'amour et la sexualité', 'data/dl/question_ados.pdf'),
            new Document('Préservatifs : petit manuel', 'Le mode d\'emploi en 4 pages', 'data/dl/notice.pdf'),
        ];

        return $this->renderViewWithParamList(
            __DIR__ . '/Shared/documentList.php',
            [
                'itemList' => $documentList
            ]
        );
    }
}




class Document
{

    public $name;
    public $description;
    public $href;

    public function __construct($name, $description, $href)
    {
        $this->name = $name;
        $this->description = $description;
        $this->href = $href;
    }
}
