$(function(){
    $.ajax({
        'async': false,
        'global': false,
        type:'GET',
        dataType:'json',
        url:'board.json',
        success:function(data){
          map = data;
          loadBoard();
        },
        error:function(error, msg){
          console.log(msg);
        }
    });
    $('.unanswered').click(function(){
      var clicked = $(this);
      var category = clicked.parent().data('category');
      var topic = clicked.data('topic');
      var value = map[category].topics[topic].value;
      var modalHeader = map[category].name + ' - ' + map[category].topics[topic].value;
      $('.modal-title').empty().text(modalHeader);
      //keep the footer empty
      var topicContent = $('#topic');
      topicContent.empty();
      $.each(map[category].topics[topic].notes, function(i, note){
          topicContent.append('<ul><li>' + note + '</li></ul>')
      });
      $('#topic-modal').modal('show');
      $('#topic-modal').on('hidden.bs.modal', function () {
        // clicked.unbind();
        clicked.addClass("disabled");
      });
      updateScore(clicked);
    });
});
var score = 0;
var map;
function loadBoard(){
    var board = $('#main-board');
    var numColumns = map.length;
    var column_width = parseInt(12/numColumns);
    $.each(map, function(i,category){
        //load category name
        var header_class = 'text-center col-md-' + column_width;
        if (i === 0 && numColumns % 2 != 0){
            header_class += ' col-md-offset-1';
        }
        $('.panel-heading').append(
            '<div class="'+header_class+'"><h4>'+category.name+'</h4></div>'
        );
        //add column
        var div_class = 'category col-md-' + column_width;
        if (i === 0 && numColumns % 2 != 0){
            div_class += ' col-md-offset-1';
        }
        board.append('<div class="'+div_class+'" id="cat-'+i+'" data-category="'+i+'"></div>');
        var column = $('#cat-'+i);
        $.each(category.topics, function(n,topic){
          //add questions
          column.append('<div class="well topic unanswered" data-topic="'+n+'">'+topic.value+'</div>')
        });
    });
    $('.panel-heading').append('<div class="clearfix"></div>')

}
function updateScore(clicked){
  if (!clicked.hasClass('disabled')) {
    score += 1;
    $('#score').empty().text(score);
  }
}
