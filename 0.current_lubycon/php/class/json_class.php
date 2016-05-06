<?php
class json_control
{
    public $json_decode_code;

    public function __construct()
    {
    }

    public function json_decode($filepath)
    {
        $this->json_decode_code = json_decode(file_get_contents($filepath),true);
    }
}
?>