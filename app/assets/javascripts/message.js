$(function(){ 
    function buildHTML(message){
        image = ( message.image ) ? ` <img class="lower-message__image" src=${message.image} >` : "";
          var html =
           `<div class="message" data-message-id=${message.id}>
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                  ${message.date}
                </div>
              </div>
              <div class="lower-message">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
              ${image} 
            </div>`
          return html;
    }

    $('#new_message').on('submit', function(e){
        console.log(2)
        e.preventDefault(); //実行したメソッドがキャンセルできる場合、キャンセルするメソッド
        var formData = new FormData(this);
        var url = $(this).attr('action')  //attrはHTML要素のactionを取得し設定している
        $.ajax({
            url: url,//読み込むHTMLページ￥URLの取得
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
          })
           .done(function(data){
             var html = buildHTML(data);
             $('.messages').append(html);
             $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
             $('form')[0].reset();
             $('input').prop('disabled',false)
           })
            .fail(function(){
              alert('error');
            });
          });
      });
      