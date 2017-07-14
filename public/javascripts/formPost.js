function sendPost()
{
            console.log($('#firstname').val())
            console.log($('#lastname').val())
            $.ajax({
                url: "/send_post",
                type: "POST",
                data: {
                    firstname: $('#firstname').val(),
                    lastname: $('#lastname').val()
                },
                cache: true,
                complete: function() {
                  console.log('process complete');
                },

                success: function(data) {
                  console.log(data);
                  console.log('process sucess');
		document.getElementById("post_data").innerHTML=data;
               },

                error: function() {
                  console.log('process error');
                },
              });
}

function findName()
{
            $.ajax({
                url: "/viewdata3",
                type: "POST",
                data: {
                    firstname: $('#firstname').val()
                },
                cache: true,
                complete: function() {
                  console.log('process complete');
                },

                success: function(data) {
                  console.log(data);
                  console.log('process sucess');
		document.getElementById("post_data").innerHTML=data;
               },

                error: function() {
                  console.log('process error');
                },
              });
}