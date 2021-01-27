<?php 
// Include config file 
require_once 'config.php'; 
 
// Include Subscriber class 
require_once 'Subscriber.class.php'; 
$subscriber = new Subscriber(); 
 
if(isset($_POST['subscribe'])){ 
    $errorMsg = ''; 
    // Default response 
    $response = array( 
        'status' => 'err', 
        'msg' => 'Something went wrong, please try after some time.' 
    ); 
     
    // Input fields validation 
    if(empty($_POST['name'])){ 
        $pre = !empty($msg)?'<br/>':''; 
        $errorMsg .= $pre.'Please enter your full name.'; 
    } 
    if(empty($_POST['email']) && !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){ 
        $pre = !empty($msg)?'<br/>':''; 
        $errorMsg .= $pre.'Please enter a valid email.'; 
    } 
     
    // If validation successful 
    if(empty($errorMsg)){ 
        $name = $_POST['name']; 
        $email = $_POST['email']; 
        $verify_code = md5(uniqid(mt_rand())); 
         
        // Check whether the given email already exists 
        $con = array( 
            'where' => array( 
                'email' => $email 
            ), 
            'return_type' => 'count' 
        ); 
        $prevRow = $subscriber->getRows($con); 
         
        if($prevRow > 0){ 
            $response['msg'] = 'Your email already exists in our subscribers list.'; 
        }else{ 
            // Insert subscriber info 
            $data = array( 
                'name' => $name, 
                'email' => $email, 
                'verify_code' => $verify_code 
            ); 
            $insert = $subscriber->insert($data); 
             
            if($insert){ 
                // Verification email configuration 
                $verifyLink = $siteURL.'subscription.php?email_verify='.$verify_code; 
                $subject = 'Confirm Subscription'; 
     
                $message = '<h1 style="font-size:22px;margin:18px 0 0;padding:0;text-align:left;color:#3c7bb6">Email Confirmation</h1> 
                <p style="color:#616471;text-align:left;padding-top:15px;padding-right:40px;padding-bottom:30px;padding-left:40px;font-size:15px">Thank you for signing up with '.$siteName.'! Please confirm your email address by clicking the link below.</p> 
                <p style="text-align:center;"> 
                    <a href="'.$verifyLink.'" style="border-radius:.25em;background-color:#4582e8;font-weight:400;min-width:180px;font-size:16px;line-height:100%;padding-top:18px;padding-right:30px;padding-bottom:18px;padding-left:30px;color:#fffffftext-decoration:none">Confirm Email</a> 
                </p> 
                <br><p><strong>'.$siteName.' Team</strong></p>'; 
                 
                $headers = "MIME-Version: 1.0" . "\r\n";  
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";  
                $headers .= "From: $siteName"." <".$siteEmail.">"; 
                 
                // Send verification email 
                $mail = mail($email, $subject, $message, $headers); 
                 
                if($mail){ 
                    $response = array( 
                        'status' => 'ok', 
                        'msg' => 'A verification link has been sent to your email address, please check your email and verify.' 
                    ); 
                } 
            } 
        } 
    }else{ 
        $response['msg'] = $errorMsg; 
    } 
     
    // Return response 
    echo json_encode($response); 
} 
?>


<?php 
// Include config file 
require_once 'config.php'; 
 
// Include Subscriber class 
require_once 'Subscriber.class.php'; 
$subscriber = new Subscriber(); 
 
if(!empty($_GET['email_verify'])){ 
    $verify_code = $_GET['email_verify']; 
    $con = array( 
        'where' => array( 
            'verify_code' => $verify_code 
        ), 
        'return_type' => 'count' 
    ); 
    $rowNum = $subscriber->getRows($con); 
    if($rowNum > 0){ 
        $data = array( 
            'is_verified' => 1 
        ); 
        $con = array( 
            'verify_code' => $verify_code 
        ); 
        $update = $subscriber->update($data, $con); 
        if($update){ 
            $statusMsg = '<p class="success">Your email address has been verified successfully.</p>'; 
        }else{ 
            $statusMsg = '<p class="error">Some problem occurred on verifying your email, please try again.</p>'; 
        } 
    }else{ 
        $statusMsg = '<p class="error">You have clicked on the wrong link, please check your email and try again.</p>'; 
    } 
?>  

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Email Verification by CodexWorld</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        
        <!-- Stylesheet -->
        <link rel="stylesheet" type="text/css" href="css/footerstyles.css" />

    </head>
    <body class="subs">
        <div class="container">
            <div class="subscribe box-sizing">
                <div class="sloc-wrap box-sizing">
                    <div class="sloc-content">
                        <div class="sloc-text">
                            <div class="sloc-header"><?php echo $statusMsg; ?></div>
                        </div>
                        <a href="<?php echo $siteURL; ?>" class="cwlink">Go to Site</a>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

<?php 
} 
?>