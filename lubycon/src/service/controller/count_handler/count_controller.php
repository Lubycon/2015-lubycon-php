<?php
require_once '../../../common/Class/session_class.php';
    //session_start();
    $session = new Session();

    if(($session->GetSessionId() == null) && $session->GetSessionName() == null){
        $LoginState = false;
    }else{
        if($session->SessionExist()){

            if(isset($_SESSION['lubycon_validation']))
            {
                $LoginState = true;
            }else{
                $session->DestroySession();
            }
            $Loginuser_name = isset($_SESSION['lubycon_nick']) ? $_SESSION['lubycon_nick'] : NULL;
            $Loginuser_code= isset($_SESSION['lubycon_userCode']) ? $_SESSION['lubycon_userCode'] : NULL;
            // login menu
        }else{
            $LoginState = false;
        }
    }
    require_once "../../../common/class/json_class.php";
    $json_control = new json_control;


if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $postData = json_decode(file_get_contents("php://input"));
}else
{
  $total_array = array(
    'status' => array(
      'code' => '1200',
      'msg' => "nothing receive post data"
      ),
    'result' => (object)array()
  );
  $data_json = json_encode($total_array);
  die($data_json);
}



if($LoginState)
{
    switch($postData->type)
    {
        case 0 : $countType = 'bookmark'; break;
        case 1 : $countType = 'like'; break;
        case 2 : $countType = 'view'; break;
        case 3 : $countType = 'comment'; break;
        case 4 : $countType = 'upload'; break;
        case 5 : $countType = 'download'; break;
        default : die(
                    $total_array = array(
                        'status' => array(
                            'code' => '1100',
                            'msg' => 'not allow contents type'
                        ),
                        'result' => (object)array()
                    )
                ); break;
    }
    $countTypeName = $countType.'Count'; //colume name

    switch($postData->contentKind)
    {case 0 : $contentsKind = 'contents'; break;
        case 1 : $contentsKind = 'community'; break;
        default : die(
                    $total_array = array(
                        'status' => array(
                            'code' => '1101',
                            'msg' => 'not allow contents kind'
                        ),
                        'result' => (object)array()
                    )
                );
                 break;
    }
    $contentKindName = $contentsKind.'Count'; //colume name

    $json_control->json_decode($contentsKind.'_top_category',"../../../../data/top_category.json");
    $topCateJson = $json_control->json_decode_code;
    $number = $postData->conno; // contents boradCode
    $topCate = $postData->topCate; // 0 1 2
    $topCateName = $topCateJson[$topCate]['name'];
    $giveUserCode = $Loginuser_code; // userCode
    $takeUserCode = $postData->takeUser; // userCode

    $activeDate = date("YmdHis");

    require_once '../../model/count_handler/count_model.php';

    $total_array = array(
        'status' => array(
            'code' => '0000',
            'msg' => 'done'
        ),
        'result' => (object)array()
    );
}else
{
    $total_array = array(
        'status' => array(
            'code' => '0101',
            'msg' => 'need login'
        ),
        'result' => (object)array()
    );
}
$data_json = json_encode($total_array);
echo $data_json;

?>
