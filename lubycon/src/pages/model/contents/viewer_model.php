<?php
require_once '../../../common/Class/database_class.php';
$db = new Database();
$db->changedb('lubyconboard');

/*
if( isset($_COOKIE["contents_hit-$cate-$number"]) ) //cookie check later view count
{
    parse_str($_COOKIE["contents_hit-$cate-$number"] , $cookie_parse );
    
    if( $cookie_parse['userip'] != $_SERVER['REMOTE_ADDR']  )
    {
        $db->query = 
                    "UPDATE `$cate_name` 
                     SET `viewCount` = `viewCount`+1 
                     WHERE `$cate_name`.`boardCode` = $number
                    ";
        
        // viewcount up
        $db->askQuery(); 
    }
}
else
{
    $db->query = 
                "UPDATE `$cate_name` 
                 SET `viewCount` = `viewCount`+1 
                 WHERE `$cate_name`.`boardCode` = $number
                ";

    // viewcount up
    $db->askQuery(); 
}*/

$db->query =
            "SELECT *
             FROM lubyconboard.`$cate_name` AS a
             LEFT JOIN lubyconuser.`userbasic` ON a.`userCode` = `userbasic`.`userCode` 
             LEFT JOIN lubyconuser.`userinfo` ON `userbasic`.`userCode` = `userinfo`.`userCode` 
             LEFT JOIN lubyconboard.`".$cate_name."midcategory` ON a.`boardCode` = `".$cate_name."midcategory`.`boardCode`
             LEFT JOIN lubyconboard.`".$cate_name."tag` ON a.`boardCode` = `".$cate_name."tag`.`boardCode`
            ";

if($LoginState)
{
    $db->query .= 
                "LEFT JOIN lubyconboard.`contentsbookmark` ON a.`boardCode` = `contentsbookmark`.`boardCode`
                AND `contentsbookmark`.`bookmarkGiveUserCode` = $Loginuser_code
                LEFT JOIN lubyconboard.`contentslike` ON a.`boardCode` = `contentslike`.`boardCode` AND `contentslike`.`likeGiveUserCode` = $Loginuser_code";
}

$db->query .=  " WHERE a.`boardCode` = $number";


//echo $db->query;

//get db data
$db->askQuery(); 

$row = mysqli_fetch_assoc($db->result);

$db->query = 
            "SELECT * 
             FROM lubyconboard.`contentscomment` as a
             RIGHT JOIN lubyconuser.`userbasic` as b ON a.`commentGiveUserCode` = b.`userCode`
             LEFT JOIN lubyconuser.`userinfo` as c ON b.`userCode` = c.`userCode`
             WHERE a.`boardCode` = '$number' AND a.`topCategoryCode` = '$cate' AND a.`commentStatus` = 'normal';
            ";
$db->askQuery();
$comment_result = $db->result;
?>