<?php
class upload
{
    //basic set
    public $_upload_file_data; 
    public $_upload_post_data;
    public $user_code;

    // post setting valualbe
    public $editor_kind; // 2d or 3d
    public $_zip; //for zip compress
    public $upload_date;

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
    public $attatch_file_list = [];
    public $img_array = []; //for validate image files
    public $thumb_array = []; //upload thumbnail base64 file
    public $base64_array = []; //for validate base64 image
    public $json_array = []; //for json file upload
    public $merge_image_array = []; //for upload image file
    // setting array

    // extension information
    public $white_list_media = ['jpg', 'jpeg', 'png', 'psd', 'pdf', 'gif', 'bmp', 'pdd', 'tif', 'raw', 'ai', 'esp', 'svg', 'svgz', 'iff', 'fpx', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst', 'alz', 'zip', 'rar', 'jar', '7z', 'hwp', 'txt', 'doc', 'xls', 'xlsx', 'docx', 'pptx', 'pdf', 'ppt', 'me'];
    public $white_list_image = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    public $white_list_base64 = ['data:image/jpeg;base64'];
    // media = image , text , compress file , 3d files -> 3d ext need add array
    // img = only web view use images
    // img = only base64 use images ex) croped profile , thumbnail , editor grid
    // extension information
    
    // limit size variable
    public $file_upload_limit = 31457280; // 30mb
    public $preview_image_upload_limit = 10485760; // 10mb
    public $thumbnail_image_upload_limit = 524288; // 0.5mb
    // limit size variable

    // save path

    public $Lubycon_Contents_folder = "../../../../Lubycon_Contents/";
    public $upload_path;

    private $_thumb_save_path = 'editor/thumb';
    private $_contents_save_path = 'editor/contents';
    private $_community_save_path = 'community';
    private $_profile_save_path = 'profile';


    // save path

    //2d val
    public $contentHTML; //htmlspecialchars data
    //2d val

    //3d val
    public $threed_json_array; // 3d json decode array
    //3d val


    public function __construct( $FILES_data , $POST_data ) //basic set
    {
        //basic set
        $this->_upload_file_data = $FILES_data;
        $this->_upload_post_data = $POST_data;
        $this->upload_date = date("YmdHis");
        $this->user_code = $_SESSION['lubycon_code'];
        
        $this->post_thumb = $POST_data['thumbnail'];
        if( count($POST_data['setting']) > 0 ) //only editor use
        {
            $this->post_setting = json_decode($POST_data['setting']);
            $this->subject = $this->post_setting->name; // contents subject string
            $this->top_category = $this->post_setting->topCategory; // artwork , vector , threed
            $this->mid_category = $this->post_setting->category; // array
            $this->tag = $this->post_setting->tag; // array
            $this->cc = $this->post_setting->cc; // stdClass Object
            $this->desc = $this->post_setting->descript; // string
            $this->downable = $this->post_setting->download; // boolean

            if( $this->top_category == 'artwork' || $this->top_category == 'vector' ) //check board type
            {
                $this->editor_kind = '2d';
                $this->contentHTML = htmlspecialchars( $POST_data['contentHTML'] );
            }else if($this->top_category == 'threed')
            {
                $this->editor_kind = '3d';
                $this->threed_json_array = array 
                (
                    ['map' , $POST_data['map']],
                    ['model' , $POST_data['model']],
                    ['lights' , count($POST_data['lights']) ? $POST_data['lights'] : '[]']
                );
                //$this->threed_json_array[0] = json_decode($POST_data['map']); // 3d map json file
                //$this->threed_json_array[1] = json_decode($POST_data['model']); // 3d model json file
                //$this->threed_json_array[2] = count(json_decode($POST_data['lights'])) ? json_decode($POST_data['lights']) : '[]'; // 3d light json file
            }
            $this->upload_path = $this->Lubycon_Contents_folder.'contents/'.$this->top_category.'/'.$this->upload_date.'_'.$this->user_code.'/'; //set upload path
            is_dir($this->upload_path) ? chmod($this->upload_path,0777) : mkdir($this->upload_path,0777); //make user folder
            // need devied path 1.editor 2.user profile 3.community
        }
        //basic set
    }

    public function fill_array_data()
    {
        if( count($this->_upload_file_data) > 0 ) //validate user uploaded
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
        }

        if( 1 )
        {
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
        }
        if( count($this->post_thumb) > 0 )
        {
            $result = $this->base64_original_size_calculation($this->post_thumb);
            $this->thumb_array[0] = array 
            (
                'name' => "thumb.jpg", //temp name need change name in last save function
                'data' => $this->post_thumb,
                'size' => $result
            );

            $this->merge_image_array = array_merge($this->img_array, $this->base64_array); //merge img array and base64 img array
            ksort($this->merge_image_array); //sory by key merged array
            
        }
        
        //print_r($this->img_array);
        //print_r($this->thumb_array);
        //print_r($this->base64_array);
        //print_r($this->merge_image_array);
        //print_r($this->file_array);
    }

    public function html_image_path()
    {
        if( $this->editor_kind == '2d' )
        {
            foreach( $this->merge_image_array as $key => $value )
            {$this->contentHTML=preg_replace("/lubycon_path/", $this->upload_path."preview/".$key.'.'.$this->merge_image_array[$key]['ext'], $this->contentHTML,1);}
        }
    }

    public function validate_extension_and_size()
    {
        // extension check
        if( count($this->file_array) > 0 ) //validate user uploaded
        {$this->validate_extension_file($this->file_array,$this->white_list_media);}

        if( count($this->img_array) > 0 ) //validate image ext
        {$this->validate_extension_file($this->img_array,$this->white_list_image);}

        if( count($this->base64_array) > 0 ) //validate base64 upload ext
        {$this->validate_extension_base64($this->base64_array,$this->white_list_base64);}

        if( count($this->post_thumb) > 0 ) //validate thumbnail ext
        {$this->validate_extension_base64($this->thumb_array,$this->white_list_base64);}
        // extension check


        
        //$file_upload_limit = 100000;
        //$preview_image_upload_limit = 100000;
        //$thumbnail_image_upload_limit = 10000;
        // file size check
        if( count($this->file_array) > 0 ) //validate user uploaded
        {$this->validate_size_calculation($this->file_array,$this->file_upload_limit);}

        if( count($this->img_array) > 0 ) //validate image ext
        {$this->validate_size_calculation($this->img_array,$this->preview_image_upload_limit);}

        if( count($this->base64_array) > 0 ) //validate base64 upload ext
        {$this->validate_size_calculation($this->base64_array,$this->preview_image_upload_limit);}

        if( count($this->post_thumb) > 0 ) //validate thumbnail ext
        {$this->validate_size_calculation($this->thumb_array,$this->thumbnail_image_upload_limit);}
        // file size check
    }

    public function validate_size_calculation($array,$limit_size)
    {
        if( count($array) > 0 ) //validate user uploaded
        {
            foreach( $array as $key => $value )
            {
                $filesize = $array[$key]['size']; // original file name
                if ( $filesize > $limit_size )  // file array validate media extension
                {
                    echo 'file size bigger than limit size';
                    die($filesize.' > '.$limit_size); //error meseage
                }
            }
        }
    }

    public function validate_extension_file($array,$white_list)
    {
        if( count($array) > 0 ) //validate user uploaded
        {
            foreach( $array as $key => $value )
            {
                $filename = $array[$key]['name']; // original file name
                $image_file_info = getimagesize($array[$key]['tmp_name']);
                $ext = substr(strrchr($filename, '.'), 1); // extraction file extension
                if ( !in_array($ext, $white_list) )  // file array validate media extension
                {
                    echo 'file upload class validate_extension error';
                    die($filename.' not allow extension // banded extension is '.$ext); //error meseage
                }
                if( $white_list == $this->white_list_image && !count($image_file_info) > 0 ) //check normal image file form getimagesize
                {
                    echo 'file upload class validate_extension error';
                    echo('it is not normal file!!!!!!!!'); //error meseage
                }
                if( $white_list == $this->white_list_image){$this->img_array[$key]['ext'] = $ext;$this->merge_image_array[$key]['ext'] = $ext;} //add array ext cut from file
            }
        }
    }
    public function validate_extension_base64($array,$white_list)
    {
        foreach( $array as $key => $value )
        {
            $ext_devide = explode(',', $array[$key]['data']);
            $image_file_info = getimagesize($array[$key]['data']);
            if ( !in_array($ext_devide[0], $white_list) ) // file array validate media extension
            {
                echo 'file upload class validate_extension error';
                die('it is not allow extension // banded extension is '.$ext_devide[0]); //error meseage
            }
            if( !count($image_file_info) > 0 ) //check normal image file form getimagesize
            {
                echo 'file upload class validate_extension error';
                die('it is not normal file'); //error meseage
            }

            if( key($array) != '0' )
            {$this->merge_image_array[$key]['ext'] = 'jpg';}
        }
    }

    public function base64_original_size_calculation($value) //don't trust this value, it is Approximation
    {
        $org = $value;
        $enc = base64_encode($org);
        $enc_len = strlen($org);
        $org_add_len = substr_count($enc,'=');
        return $result = $enc_len/4*3-$org_add_len; // calculation file original size
    }

    public function file_upload_control()
    {
        if( count($this->file_array) > 0 ) //validate user uploaded
        {$this->files_upload($this->file_array,'attach');}

        if( count($this->img_array) > 0 ) //validate image ext
        {$this->files_upload($this->img_array,'preview');}

        if( count($this->base64_array) > 0 ) //validate base64 upload ext
        {$this->base64_upload($this->base64_array,'preview');}

        if( count($this->post_thumb) > 0 ) //validate thumbnail ext
        {$this->base64_upload($this->thumb_array,'thumbnail');}

        if( count($this->threed_json_array) > 0 ) //validate thumbnail ext
        {$this->json_upload($this->threed_json_array);}
    }

    public function files_upload($array,$kind)
    {
        if( count($array) > 0 )
        {
            $final_save_path = $this->upload_path."$kind/"; //final save path set
            is_dir($final_save_path) ? chmod($final_save_path,0777) : mkdir($final_save_path,0777);
            if( $kind == 'attach' )
            {
                foreach( $array as $key => $value )
                {
                    $tmp_name = $array[$key]["tmp_name"];
                    $name = $array[$key]["name"];
                    if( file_exists($tmp_name) && $array[$key]['error'] == UPLOAD_ERR_OK )
                    {
                        move_uploaded_file($tmp_name, "$final_save_path/$name");
                        //echo 'upload succes';
                    }else
                    {
                        echo 'last upload error attach file';
                        die('loss the file, or file upload error try! again file name : '.$name);
                    }
                }
            }else if($kind == 'preview')
            {
                foreach( $array as $key => $value )
                {
                    $tmp_name = $array[$key]["tmp_name"];
                    $name = $array[$key]["name"];
                    $ext = $array[$key]["ext"];
                    if( file_exists($tmp_name) && $array[$key]['error'] == UPLOAD_ERR_OK )
                    {
                        move_uploaded_file($tmp_name, "$final_save_path/$key.$ext");
                        //echo 'upload succes';
                    }else
                    {
                        echo 'last upload error previewfiles';
                        die('loss the file, or file upload error try! again file name : '.$name);
                    }
                }
            }
        }
    }
    public function base64_upload($array,$kind)
    {
        if( count($array) > 0 )
        {
            $final_save_path = $this->upload_path."$kind/"; //final save path set
            is_dir($final_save_path) ? chmod($final_save_path,0777) : mkdir($final_save_path,0777);
            foreach( $array as $key => $value )
            {
                $ext_devide = explode(',', $array[$key]['data']);
                $imageData = base64_decode($ext_devide[1]); // <-- **Change is here for variable name only**
                $photo = imagecreatefromstring($imageData); // <-- **Change is here**
                if($kind=='preview')
                {$filename = $key;}else 
                if($kind=='thumbnail')
                {$filename = 'thumbnail';}else 
                if($kind=='profile')
                {$filename = 'profile';}
                imagejpeg($photo,"$final_save_path/$filename.jpg",100); // <-- **Change is here**
            }
        }
    }
    public function json_upload($array)
    {
        if( count($array) > 0 )
        {
            $final_save_path = $this->upload_path."json/"; //final save path set
            is_dir($final_save_path) ? chmod($final_save_path,0777) : mkdir($final_save_path,0777);
            foreach( $array as $key => $value )
            {
                file_put_contents($final_save_path.$value[0].'.json',$value[1]);
            }
        }
    }

    public function zip_attach($kind)
    {
        $dir = $this->upload_path.$kind;
        $handle  = opendir($dir);
        while (false !== ($filename = readdir($handle))) 
        {
            if(is_file($dir . "/" . $filename)){
                $this->attatch_file_list[] = [$dir.'/'.$filename,$filename];
            }
        }
        closedir($handle);

        $this->_zip = new ZipArchive;
        $upload_zip = $dir.'/attatch.zip';
        $this->_zip->open( $upload_zip , file_exists($upload_zip) ? ZipArchive::OVERWRITE : ZipArchive::CREATE ); 
        foreach( $this->attatch_file_list as $index => $file )
        {
            $this->_zip->addFile($file[0],$file[1]);
        }
        $this->_zip->close();
        foreach( $this->attatch_file_list as $index => $file )
        {
            unlink( $file[0] ); //delete original file
        }
    }
}
?>