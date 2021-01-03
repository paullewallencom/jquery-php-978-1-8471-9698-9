<?php
session_start();
if(!isset($_SESSION['contacts']))$_SESSION['contacts']=array();
if(isset($_POST['contacts']))$_SESSION['contacts']=$_POST['contacts'];
/*
pretend your email-sending routine is here
*/
?>
<html>
  <head>
    <script src="../jquery.min.js"></script>
    <script src="../jquery-ui.min.js"></script>
    <script src="connecting-lists.js"></script>
    <style type="text/css">
      @import '../jquery-ui.css';
      ul{ min-height:50px; height:auto !important; height:50px; border:1px solid #000; margin:0; }
      td{ vertical-align:top; }
      form{padding:0}
    </style>
  </head>
  <body>
    <table>
      <tr><th>Contacts</th><th>People to Email</th></tr>
      <tr>
        <td><ul id="contacts" class="email_contacts">
<?php
$contacts=array( '1'=>'Albertus Ackleton', '2'=>'Bob Burry', '3'=>'Cora Cuddlesby', '4'=>'Derren Drufus');
foreach($contacts as $key=>$val){
  if(!isset($_SESSION['contacts'][$key])){
    echo '<li><input type="hidden" name="contacts[',$key,']" />',htmlspecialchars($val),'</li>';
  }
}
?>
        </ul></td>
        <td><form method="post"><ul id="to_email" class="email_contacts">
<?php
foreach($contacts as $key=>$val){
  if(isset($_SESSION['contacts'][$key])){
    echo '<li><input type="hidden" name="contacts[',$key,']" />',htmlspecialchars($val),'</li>';
  }
}
?>
        </ul>
        <strong>Message</strong><br />
        <textarea name="message"></textarea><br />
        <input type="submit" name="action" value="send email" />
        </form></td>
      </tr>
    </table>
  </body>
</html>
