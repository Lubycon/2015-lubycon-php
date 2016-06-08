<?php
class upload
{
    public $_upload_file_data;
    public $_upload_post_data;

    public $_upload_post_base64;
    public $_upload_post_thumbnail;
    
    public $file_array = []; //for upload attachfiles
    public $img_array = []; //for upload images
    public $img_name_array = []; //for html src set
    public $down_able = true;

    public function __construct( $files , $post )
    {
        $this->_upload_file_data = $files;
        $this->_upload_post_data = $post;

        foreach( $this->_upload_file_data as $key => $value )
        {
            $key_explode = explode('_',$key); //devide array name
            if( $key_explode[0] == 'image' ) //if image files
            {
                array_push($this->img_array,$this->_upload_file_data[$key]);
                $this->img_name_array[$key_explode[1]] = $this->_upload_file_data[$key]['name']; //for src fill names
            }else if( $key_explode[0] == 'file' && $this->down_able ) //if attached files
            {
                array_push($this->file_array,$this->_upload_file_data[$key]);
            }
        }
        $i = 0;
        foreach( $this->_upload_post_data as $key => $value ) 
        {
            $key_explode = explode('_',$key); //devide array name
            if( $key_explode[0] == 'image' ) //if image files
            {
                $base64_array = array 
                (
                    'name' => "grid_$i.jpg",
                    'data' => $value
                );
                array_push($this->_upload_post_base64,$base64_array);
                array_push($this->img_array,$base64_array);
                $this->img_name_array[$key_explode[1]] = 'grid_'.$i.'.jpg'; //for src fill names
                $i++;
            }
        }
        $this->_upload_post_thumbnail = array 
        (
            'name' => "thumbnail.jpg",
            'data' => $this->_upload_post_data['thumbnail']
        );
    }
}
?>