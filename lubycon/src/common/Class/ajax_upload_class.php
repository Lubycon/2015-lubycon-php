<?php
// check where used this file (daniel, 160731) 
class ajax_upload
{
    public $_img;
    public $_img_data;
    public $_data;
    public $_string_length;
    public $_jpg_ext = 'data:image/jpeg;base64,';

    public function base64_convert_image($base64_string, $limit_size , $upload_path , $file_name)
    {
	    $this->_img = str_replace($this->_jpg_ext, '', $base64_string);
	    $this->_img = str_replace(' ', '+', $this->_img);
	    $this->_img_data = base64_decode($this->_img);
        $this->_data = explode(',', $base64_string);
        $this->_string_length = strlen($base64_string);


        if( $this->_data[0] !== 'data:image/jpeg;base64')
        {
            die( 'it is not image file');
        }else if ( $this->_string_length  >= $limit_size )
        {
            die( 'file size over limit');
        }else if ( is_dir($upload_path) ? chmod($upload_path,0777) : mkdir($upload_path,0777) )
        {
            file_put_contents($upload_path.$file_name, $this->_img_data);
        }
    }
}

?>