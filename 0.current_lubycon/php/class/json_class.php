<?php
class json_control
{
    public $json_decode_code_array;
    public $json_decode_code;
    public $search_key;

    public function __construct()
    {
    }

    public function json_decode($json_name,$filepath)
    {
        $this->json_decode_code_array = json_decode(file_get_contents($filepath),true);
        $this->json_decode_code = $this->json_decode_code_array[$json_name];
    }

    public function json_search($search_word)
    {
        $this->search_key = array_search( $search_word , $this->json_decode_code );
    }
}
?>