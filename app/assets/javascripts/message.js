$(function(){ 

    function buildHTML(message){
        image = ( message.image ) ? ` <img class="lower-message__image" src="${message.image}" >` : "";
          var html =
           `<div class="message" data-id="${message.id}">
              <div class="upper-message">
                <div class="upper-message__user-name">
                  ${message.user_name}
                </div>
                <div class="upper-message__date">
                  ${message.created_at}
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
      e.preventDefault(); //実行したメソッドがキャンセルできる場合、キャンセルするメソッド
        var formData = new FormData(this);
        var url = $(this).attr('action');  //attrはHTML要素のactionを取得し設定している
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
              var reloadMessages = function () {
                if (window.location.href.match(/\/groups\/\d+\/messages/)){
                  var last_message_id = $('.message:last').data("id");
                  $.ajax({
                    url: "api/messages",
                    type: 'GET',
                    dataType: 'json',
                    data: {id: last_message_id}
                  })
                  .done(function(messages) {
                    if (Object.keys(messages).length !== 0){
                    var insertHTML = '';
                    messages.forEach(function (message) {
                      insertHTML = buildHTML(message);
                      $('.messages').append(insertHTML);
                    })
                    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
                    }
                  })
                  .fail(function () {
                    alert('自動更新に失敗しました');
                  });
              }
            }
            
            setInterval(reloadMessages, 7000);
        });
        