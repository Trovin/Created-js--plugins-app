<?
if( (isset($_POST['name'])&&$_POST['name']!="")&&(isset($_POST['surname'])&&$_POST['surname']!="")&&(isset($_POST['email'])&&$_POST['email']!="")&&(isset($_POST['message'])&&$_POST['message']!="") ){ //Проверка отправилось ли наше поля name и не пустые ли они
        $to = 'ruslan_trovin@mail.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
        $subject = 'Message'; //Загаловок сообщения
        $message = '
                <html>
                    <head>
                        <title>'.$subject.'</title>
                    </head>
                    <body>
                        <p>Имя: '.$_POST['name'].'</p>
                        <p>Фамилия: '.$_POST['surname'].'</p>   
                        <p>Уmail: '.$_POST['email'].'</p>   
                        <p>Сообщение: '.$_POST['message'].'</p>                        
                    </body>
                </html>'; //Текст нащего сообщения можно использовать HTML теги
        $headers  = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
        $headers .= "From: Отправитель <trovin.com>\r\n"; //Наименование и почта отправителя
        mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail
}
?>