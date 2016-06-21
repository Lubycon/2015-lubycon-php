<?php
class json_control
{
    public $json_decode_code_array;
    public $json_decode_code;
    public $search_key;
    public $search_key_origin;
    public $json_spread_wrap;

    public function __construct()
    {
    }
    public function json_decode($json_name,$filepath)
    {
        $this->json_decode_code_array = json_decode(file_get_contents($filepath),true);
        $this->json_decode_code = $this->json_decode_code_array[$json_name];
    }
    public function json_search_original($decode_code,$row_number,$search_value)
    {
        $this->search_key_origin = $decode_code[$row_number][$search_value];
    }

    public function json_spread_option($decode_code)
    {
        foreach ($decode_code AS $index=>$value)
        {
            $value_name = $value['name'];
            $this->json_spread_wrap = $this->json_spread_wrap."<option value='$value_name' data-value='$index'>$value_name</option>";
        }
    }
    public function json_find_option_original($selector_name,$original_key)
    {
        echo "<script>$('$selector_name').lubySelector('setValueByString','$original_key')</script>";
    }
    public function json_search($decode_code,$search_value,$search_word)
    {
        //print_r($this->json_decode_code);
        //$this->search_key = array_search($search_word, $this->json_decode_code['name']);
        foreach ($decode_code as $key => $value) 
        {
            if ($value['name'] === $search_word) 
            {
                $this->search_key = $value["$search_value"];
            }
        }
    }
}
?>