<?php
class upload
{
    private $_files = array();
    private $_temp_path = './temp/';
    private $_files_ext;
    private $_filesize_array = array();
    private $_filepath_array = array();
    private $_filename_array = array();
    private $_zip;

    private $_white_list_media = ['jpg', 'jpeg', 'png', 'psd', 'pdf', 'gif', 'bmp', 'pdd', 'tif', 'raw', 'ai', 'esp', 'svg', 'svgz', 'iff', 'fpx', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst', 'alz', 'zip', 'rar', 'jar', '7z', 'hwp', 'txt', 'doc', 'xls', 'xlsx', 'docx', 'pptx', 'pdf', 'ppt', 'me'];
    private $_white_list_img = ['jpg', 'jpeg', 'png', 'psd', 'gif', 'bmp', 'pdd', 'tif', 'raw', 'ai', 'esp', 'svg', 'svgz', 'iff', 'fpx', 'frm', 'pcx', 'pct', 'pic', 'pxr', 'sct', 'tga', 'vda', 'icb', 'vst'];
    private $_white_list_zip = ['alz', 'zip', 'rar', 'jar', '7z'];
    private $_white_list_txt = ['hwp', 'txt', 'doc', 'xls', 'xlsx', 'docx', 'pptx', 'pdf', 'ppt', 'me'];
    private $_white_list_all = ['all'];


    public function __construct()
    {
        $this->_zip = new ZipArchive;
    }

    public function validate_size($files,$limit_size)
    {
        //print_r($files);
        if(is_array($files))
        {
            for($i=0; $i<count($files['name']); $i++) 
            {
                $_filesize_array[$i] = $files['size'][$i]; // 각 파일사이즈 크기 배열에 푸시
            }
            if( intval(array_sum($_filesize_array)) <= intval($limit_size)) // 파일크기 검사
            {
                echo array_sum($_filesize_array) . ' file size validate done <br/>';
                echo 'file size check done<hr/>';
            }else
            {
                die('over limit size');
            }
        }else
        {
            die('nothing submit');
        }
    }

    public function validate_ext($files,$white_list)
    {
        if(is_array($files))
        {
            switch ($white_list) 
            {
                case 'media': $white_list = $this->_white_list_media; break;
                case 'img': $white_list = $this->_white_list_img; break;
                case 'zip': $white_list = $this->_white_list_zip; break;
                case 'txt': $white_list = $this->_white_list_txt; break;
                case 'all': $white_list = $this->_white_list_all; break;
                default: $white_list = $this->_white_list_all; break;
            }
            for($i=0; $i<count($files['name']); $i++) 
            {
                $filename = $files['name'][$i]; // 오리지날 파일이름
                $ext = substr(strrchr($filename, '.'), 1); // 확장자 추출
                if ( !in_array($ext, $white_list) && $white_list != ['all'] )  // 확장자 검사
                {
                    die($filename.' not allow<br/>');
                }
                echo $filename . ' is in white list<br/>';
            }
            echo 'file ext check done<hr/>';
        }else
        {
            die('nothing submit');
        }
    }

    public function file_move($files,$zip_compress,$upload_path)
    {
        if( is_dir( $this->_temp_path ) ? chmod($this->_temp_path,0777) : mkdir($this->_temp_path,0777) ) // 디렉토리 생성
        {
           mkdir($upload_path,0777); // 저장할 폴더 생성
           foreach ($files["error"] as $key => $error)  // 파일 갯수만큼 foreach 하며 에러 상태메세지 
           {
                if ( $error == UPLOAD_ERR_OK && $zip_compress ) // 압축 하려면 임시폴더
                {
                    $tmp_name = $files["tmp_name"][$key];
                    $name = iconv("UTF-8","EUC-KR",$files['name'][$key]);
                    move_uploaded_file($tmp_name, $this->_temp_path.$name); // 파일 이동
                    $this->_filepath_array[$key] = $this->_temp_path.$name; // 임시 업로드된 경로
                    $this->_filename_array[$key] = $name; // 파일 이름 배열
                    
                    echo "move to uploaded file temp folder<br/>";

                }else if( $error == UPLOAD_ERR_OK && !$zip_compress ) // 아니면 바로 전송
                {
                    $tmp_name = $files["tmp_name"][$key];
                    $name = iconv("UTF-8","EUC-KR",$files['name'][$key]);
                    move_uploaded_file($tmp_name, $upload_path.$name); // 파일 이동
                    $filepath_array[$key] = $upload_path.$name; // 최종 업로드된 경로
                    
                    echo "succece upload<br/>";
                }
            }
            echo "<hr/>";
        }
    }

    public function zipfile($files,$zip_compress, $upload_path = null , $upload_zip)
    {
        if($zip_compress) // zip
        {
            if( count($this->_filepath_array) && $upload_zip )
            {
                foreach( $this->_filepath_array as $index => $file )
                {
                    if( !file_exists($file) )
                    {
                        unset( $this->_filepath_array[$index] );
                    }
                }

                if( $this->_zip-> open( $upload_zip , file_exists($upload_zip) ? ZipArchive::OVERWRITE : ZipArchive::CREATE ))
                {
                    foreach( $this->_filepath_array as $index => $file )
                    {
                        $this->_zip->addFile($file,$this->_filename_array[$index]);
                    }
                    $this->_zip->close();

                    foreach ($files["error"] as $key => $error)  // 파일 갯수만큼 foreach 하며 에러 상태메세지 
                    {
                        unlink( $this->_filepath_array[$key] ); //임시파일 제거
                    }
                    echo "succece zip<br/>";
                }
            }
        }else // not zip
        {
            echo 'do not zip just save';
        }
    }
}
?>


<!-- if(1) //서브밋한거라면
    {
        for($i=0; $i<count($_FILES['upload_file']['name']); $i++) 
        {
            $filename = $_FILES['upload_file']['name'][$i]; // 오리지날 파일이름
            $ext = substr(strrchr($filename, '.'), 1); // 확장자 추출
            if ( !in_array($ext, $whitelist) )  // 확장자 검사
            {
                echo $filename.' not allow<br/>';
                return false;
            }
            $filesize_array[$i] = $_FILES['upload_file']['size'][$i]; // 각 파일사이즈 크기 배열에 푸시
        }
        if( !array_sum($filesize_array) >= $limit_size ) // 파일크기 검사
        {
            echo array_sum($filesize_array) . 'beyond limite size';
            return false;
        }
        else
        {
            if( mkdir( $upload_dir , 0777) ) // 디렉토리 생성
            {
                foreach ($_FILES["upload_file"]["error"] as $key => $error)  // 파일 갯수만큼 foreach 하며 에러 상태메세지 
                {
                    if ($error == UPLOAD_ERR_OK) //이상없다면
                    {
                        $tmp_name = $_FILES["upload_file"]["tmp_name"][$key];
                        $name = $_FILES["upload_file"]["name"][$key];
                        move_uploaded_file($tmp_name, "temp/$name"); // 파일 이동
                        $filepath_array[$key] = "temp/$name"; // 최종 업로드된 경로
                    }
                }
            }
        }
    } -->