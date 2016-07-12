<?php
class regex_validate
{
    private $_email_vali = '/^[0-9a-zA-Z]([\-.\w]*[0-9a-zA-Z\-_+])*@([0-9a-zA-Z][\-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9}$/';	// email validation check
    private $_alpha = '/[a-zA-Z]/';
    private $_alnum = '/[^a-zA-Z0-9]/';
    private $_space = '/\s/';
    private $_repeat_word = '/(.)\1\1/'; // repeat 3
    private $_abuse_array = ['bitch','fuck'];

    public function email_check($value)
    {
        if( preg_match($this->_email_vali, $value) )
        {
            return true;
        }else
        {
            die( 'email / wrong email<br/> '.$value.'' );
        };
    }

    public function pass_check($value)
    {
        if( !preg_match($this->_alpha,$value))
        {
            die( 'password / wrong! you need one of alphabet or number<br/>' );
        }else if( preg_match($this->_alnum,$value))
        {
            die( 'password / you can only alphabet and number' );
        }else if( strlen($value) < 7 || strlen($value) > 21)
        {
            die( 'password / you must write 8~20 strlen password<br/>') ;
        }else if( preg_match($this->_space,$value))
        {
            die( 'password / you can not use space<br/>');
        }else if( preg_match($this->_repeat_word,$value) )
        {
            die( 'password / you can not use 3 of repeat words<br/>');
        }else if( strpos($value,'null') !== false )
        {
            die( 'password / you can not null word<br/>');
        }else
        {
            return true;
        };

    }

    public function sametext_check($value1,$value2)
    {
        if($value1 !== $value2)
        {
            die('sametext / not same values<br/>');
        }else
        {
            return true;
        };
    }

    public function nickname_check($value)
    {
        if( preg_match("/".implode("|",$this->_abuse_array)."/si", $value) > 0 )
        {
            die ( 'nickname / sorry.. abuse name<br/>' );
        }else if( preg_match($this->_alnum,$value))
        {
            die( 'nickname / you can only alphabet and number<br/>' );
        }else if( strlen($value) < 3 || strlen($value) > 15)
        {
            die( 'nickname / you must write 3~15 strlen nickname<br/>') ;
        }else if( strpos($value,'null') !== false )
        {
            die( 'nickname / you can not null word<br/>');
        }else if( preg_match($this->_space,$value))
        {
            die( 'nickname / you can not use space<br/>');
        }else
        {
            return true;
        };
    }
}
?>