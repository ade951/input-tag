$.fn.extend({inputtag: function(){

	var self = this;

	this.children('.input-text').keydown(function(e){
	if(e.keyCode == 13){//enter
		var tag = $('<div class="tag">').text( $(this).val() );
		var tag_types = ['primary', 'success', 'info', 'warning'];
		var tag_type_index = Math.floor( Math.random()*(tag_types.length-1) );
		var tag_type = tag_types[tag_type_index];
		tag.addClass('tag-'+tag_type);
		$(this).before(tag);
		$(this).val('');
	}
	if(e.keyCode == 8){//delete
		if($(this).val().length == 0){
			$(this).siblings().last().remove();
		}
	}
	});

	this.click(function(){
		$(this).children('.input-text').focus();
	});

	this.children('.input-text').focus(function(){
		self.addClass('focus');
	}).blur(function(){
		self.removeClass('focus');
	});
}});