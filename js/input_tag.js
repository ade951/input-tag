$.fn.extend({inputtag: function(){

	var self = this;
	var input_text = self.children('.input-text');
	var input_field = self.children('.input-field');
	var isDelSelectedTagsEventSet = false;

	self.click(function(e){
		var target = getEventTarget(e);
		if(!$(target).hasClass('tag')){
			resetSelectedTags();
			input_text.focus();
		}
	}).delegate('.tag', 'click', function(){
		resetSelectedTags();
		selectTag($(this));
	});

	input_text.focus(function(){
		self.addClass('focus');
	}).blur(function(){
		self.removeClass('focus');
	});

	$(document).click(function(e){
		var target = getEventTarget(e);
		var selefElements = self.find('*').add(self);
		if($.inArray(target, selefElements) == -1){
			resetSelectedTags();
			detachDelSelectedTagsEvent();
		}
		else{
			attachDelSelectedTagsEvent();
		}
	});

	input_text.keydown(function(e){
		//enter key or comma: to finish a tag
		if(e.keyCode == 13 || e.keyCode == 188){
			
			preventDefault(e);

			var tag_content = $(this).val();
			if(!tag_content){
				return;
			}

			var tag = $('<div class="tag">').text( tag_content );
			tag.addClass('tag-primary');
			$(this).before(tag);
			$(this).val('');
		}

		if(e.keyCode == 8){//delete key: to remove a tag

			if($(this).val().length == 0){
				$(this).siblings('.tag').last().remove();
			}
		}

		var arr = [];
		self.children('.tag').each(function(){
			arr.push($(this).text())
		});
		input_field.val( arr.join(',') );


	});

	//fit width of the input field
	input_text.keyup(function(){
		var width_helper = $('.width-helper');
		width_helper.text( $(this).val() );
		$(this).width( width_helper.width()+40 );
	});

	function attachDelSelectedTagsEvent(){
		if(isDelSelectedTagsEventSet){
			return;
		}
		$(document).bind('keydown.delSelectedTags', function(e){
			if(e.keyCode == 8){
				if(!self.hasClass("focus")){
					preventDefault();
					$('.tag-warning', self).remove();
				}
			}
		});
		isDelSelectedTagsEventSet = true;
	}

	function detachDelSelectedTagsEvent(){
		$(document).unbind('keydown.delSelectedTags');
		isDelSelectedTagsEventSet = false;
	}

	function resetSelectedTags(){
		$('.tag-warning', self).removeClass('tag-warning').addClass('tag-primary');
	}

	function selectTag($tag){
		$tag.addClass('tag-warning').removeClass('tag-primary');
	}

	function getEventTarget(e){
		var evt = e || window.event;
		return evt.target || evt.srcElement; 
	}

	function preventDefault(e){
		var evt = e || window.event;
		if(evt.preventDefault){
			evt.preventDefault();
		}
		else{
			evt.returnValue = false;
		}
	}

}});