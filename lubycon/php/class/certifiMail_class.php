<?php
include_once '../plugin/PHPMailer/PHPMailerAutoload.php';

Class Mail{
	
	private $mailer;
	private $fromaddress;
	private $toaddress;
	private $subject;
	private $password;

	public function __construct($fromaddress, $toaddress, $subject, $password){
		$this->fromaddress = $fromaddress;
		$this->toaddress = $toaddress;
		$this->subject = $subject;
		$this->password = $password;
	}

	public function sendMail(){
		try{
			date_default_timezone_set('Etc/UTC');
			$this->mailer = new PHPMailer;
			$this->mailer->isSMTP();
			$this->mailer->CharSet='UTF-8';
			$this->mailer->Host='smtp.gmail.com';
			$this->mailer->SMTPSecure='ssl';
			$this->mailer->Port=465;
			$this->mailer->SMTPAuth=true;
			$this->mailer->Username = $this->fromaddress;
			$this->mailer->password = $this->password;
			$this->mailer->setFrom($this->fromaddress, $this->fromaddress);
			$this->mailer->addAddress($this->toaddress, $this->toaddress);
			$this->mailer->Subject=$this->subject;
			$this->mailer->msgHTML(file_get_contents("mail.php"));
			$this->mailer->Altbody = 'This is a plain-texxt message body';

			if(!$this->mailer->send()){
				echo $this->mailer->ErrorInfo;
				throw new Exception($this->mailer->ErrorInfo);
				return false;
			}else{
				return true;
			}
		}catch(Exception $e){

		}
	}
}

# Certification Email Handler Class
Class CertifiMail{

	public $token;
	private $host;
	private $relativePath;
	private $mail;

	public function __construct($fromaddress = "Lubycon@gmail.com", $toaddress, $subject = "Confirmation Mail for Lubycon account", $password = "hmdwdgdhkr2015"){
		$this->mail = new Mail($fromaddress, $toaddress, $subject, $password);
		$this->host = $_SERVER['HTTP_HOST'];
		$this->relativePath = preg_replace("`\/[^/]*\.php$`i", "/", $_SERVER['PHP_SELF']);
	}

	public function sendMail(){
		return $this->mail->sendMail();

	}

	public function makeToken($size){
		static $feed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		$randStr = null;
		for($i=0; $i< $size; $i++){
			$randStr .= substr($feed, rand(0, strlen($feed)-1), 1);
		}
		$this->token = $randStr;
	}

	public function makeHtml(){
		
		$html = fopen("mail.php","w") or die("unable to make email");

		$contents = 
		"<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
		<html lang='en'>
		<head>
			<meta charset='UTF-8'>
			<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1'>
		</head>
		<body>
		<table align='center' width='620' height='270' bgcolor='#ffffff' border='0' cellpadding='0' cellspacing='0'>
		<tbody>
			<tr id='mail_lubycon_logo'>
				<td>
					<img src='../../CH/img/resist_mail/mail_header.png' class='mail_header' >
				</td>
			</tr>
        	<tr id='mail_hello'>
            	<td align='left' style='font-family:Arial, Helvetica, sans-serif; font-size: 40px; color:#444444;''>
                	<br />
                	 &nbsp;Hello. <font size='40px' color='#48cfad'>:)</font>
                    <br />
                    <br />
                </td>
            </tr>
            <tr id='mail_description'>
            	<td align='left' style='font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:25px;'>
           			&nbsp;&nbsp;&nbsp;
                    You or someone with your e-mail ID has singed up at LUBYCON.<br />
                    &nbsp;&nbsp;&nbsp;
					your new account is almost ready.<br />
                    &nbsp;&nbsp;&nbsp;
					but before you can login, you need to confirm your e-mail ID by clicking the button below.</font>
                    <br />
                    <br />
            	</td>
            </tr>
            <tr id='confirm_bt'>
                <td align='center'>
                	<a href='".$this->host.$this->relativePath."certificateEmail.php?Token=".$this->token."'>
                		<img src='../../CH/img/resist_mail/mail_bt.png'>
                    </a>
                </td>
            </tr>
            <tr>
                <td align='left' style='font-family:Arial, Helvetica, sans-serif; font-size: 15px; color:#444444; line-height:20px;''>
                	<br />
                    &nbsp;&nbsp;&nbsp;
                	If you have any problems or questions, please send e-mail to 
                    <a id='mailadress' href='mailto:contact@lubycon.com' style='text-decoration:none;'>
                    	<font color='#48cfad' size='+1'>contact@lubycon.com</font>
                    </a>
                </td>
            </tr>
        </tbody>
	</table>
	</body>
	";

	fwrite($html, $contents);
	fclose($html);
	}

}


?>