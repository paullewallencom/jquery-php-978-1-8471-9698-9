<?php
$html=@$_REQUEST['body'];
if(strpos($html,'<h3')===false)$converted=$html;
else{ // tab found
 $panels=explode('<h3',$html);
 $converted=array_shift($panels).'<div class="tabs"><ul>';
 $menu=array();
 $tabs=0;
 $tab_c='';
 foreach($panels as $panel){
  $panel_bits=explode('</h3>',$panel);
  $menu[]=preg_replace('/^[^>]*>/','',$panel_bits[0]); // tab header
  $tab_c.='<div id="tab-'.($tabs++).'">'.$panel_bits[1].'</div>';
 }
 foreach($menu as $k=>$v)
  $converted.='<li><a href="#tab-'.$k.'">'.$v.'</a></li>';
 $converted.='</ul>'.$tab_c.'</div>';
}

?>
<html>
 <head>
  <script type="text/javascript" src="../jquery.min.js"></script>
  <script type="text/javascript" src="../jquery-ui.min.js"></script>
  <script type="text/javascript">
   $(document).ready(function() {
    $(".tabs").tabs({
     autoHeight:false
    });
   });
  </script>
  <link rel="stylesheet" type="text/css" href="../jquery-ui.css" />
 </head>
 <body>
<?php
echo $converted;
?>
 </body>
</html>
