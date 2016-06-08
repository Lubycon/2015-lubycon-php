<?php
class upload
{
    //basic set
    public $_upload_file_data; 
    public $_upload_post_data;
    
    // post setting valualbe
    public $editor_kind; // 2d or 3d

    public $post_thumb; //base64 data
    public $post_setting; // json decoded
    public $subject; // contents subject string
    public $top_category; // artwork , vector , threed
    public $mid_category; // array
    public $tag; // array
    public $cc; // stdClass Object
    public $desc; // string
    public $downable; // boolean
    // post setting valualbe

    //basic set
    
    // setting array
    public $file_array = []; //for upload attachfiles zip
    public $img_array = []; //for validate image files
    public $thumb_array = []; //upload thumbnail base64 file
    public $base64_array = []; //for validate base64 image
    public $json_array = []; //for json file upload
    public $merge_image_array = []; //for upload image file
    // setting array

    
    //2d val
    public $contentHTML; //htmlspecialchars data
    //2d val

    //3d val
        //~!@~@!~@~
    //3d val

    public function __construct( $FILES_data , $POST_data ) //basic set
    {
        //basic set
        $this->_upload_file_data = $FILES_data;
        $this->_upload_post_data = $POST_data;
        
        $this->post_thumb = $POST_data['thumbnail']; 
        $this->post_setting = json_decode($POST_data['setting']);
        $this->subject = $this->post_setting->name; // contents subject string
        $this->top_category = $this->post_setting->topCategory; // artwork , vector , threed
        $this->mid_category = $this->post_setting->category; // array
        $this->tag = $this->post_setting->tag; // array
        $this->cc = $this->post_setting->cc; // stdClass Object
        $this->desc = $this->post_setting->descript; // string
        $this->downable = $this->post_setting->download; // boolean
        //basic set

        if( $this->top_category == 'artwork' || $this->top_category == 'vector' ) //check board type
        {
            $this->editor_kind = '2d';
            $this->contentHTML = htmlspecialchars( $POST_data['contentHTML'] );
        }else if($this->top_category == 'threed')
        {
            $this->editor_kind = '3d';
        }

        $this->fill_array_data(); // fill array data for validate things
    }

    public function fill_array_data()
    {
        //attach file


        if( $this->downable ) //validate user checked
        {
            foreach( $this->_upload_file_data as $key => $value )
            {
                $key_explode = explode('_',$key); //devide array name for validate image or attach file
                if( $key_explode[0] == 'image' ) //if image files
                {
                    $this->img_array[$key] = $this->_upload_file_data[$key]; 
                }else if( $key_explode[0] == 'file' ) //if attached files
                {
                    array_push($this->file_array,$this->_upload_file_data[$key]);
                }
            }
            $i = 0; //grid name set count
            foreach( $this->_upload_post_data as $key => $value ) //2d editor grid file and thumbnail
            {
                $key_explode = explode('_',$key); //devide array name
                if( $key_explode[0] == 'image' ) //if image files
                {
                    $result = $this->base64_original_size_calculation($value);
                    $base64_array = array 
                    (
                        'name' => "grid_$i.jpg", //temp name need change name in last save function
                        'data' => $value,
                        'size' => $result
                    );
                    $this->base64_array[$key] = $base64_array; 
                    $i++; //grid name set count up
                }
            }
            
            $result = $this->base64_original_size_calculation($this->post_thumb);
            $this->thumb_array = array 
            (
                'name' => "thumb.jpg", //temp name need change name in last save function
                'data' => $this->post_thumb,
                'size' => $result
            );
            $this->merge_image_array = array_merge($this->img_array, $this->base64_array); //merge img array and base64 img array
            ksort($this->merge_image_array); //sory by key merged array

            //print_r($this->img_array);
            //print_r($this->thumb_array);
            //print_r($this->base64_array);
            //print_r($this->merge_image_array);
            //print_r($this->file_array);
        }

        //attach file
    }

    public function base64_original_size_calculation($value)
    {
        $org = $value;
        $enc = base64_encode($org);
        $enc_len = strlen($org);
        $org_add_len = substr_count($enc,'=');
        return $result = $enc_len/4*3-$org_add_len; // calculation file original size
    }
}
?>