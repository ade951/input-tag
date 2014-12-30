$.fn.extend({
	inputtag: function(){

		var self = this;
		if( self.attr('initialized') === 'true' ){
			console.warn('warning: the input-tag already initialized!');
			return false;
		}

		self.input_text = self.children('.input-text');
		self.input_field = self.children('.input-field');

		//add a single tag
		self.tag_add = function(tag_content){
				var tag = $('<div class="tag">').text( tag_content );
				var tag_types = ['primary', 'success', 'info', 'warning'];
				var tag_type_index = Math.floor( Math.random()*(tag_types.length-1) );
				var tag_type = tag_types[tag_type_index];
				tag.addClass('tag-'+tag_type);
				self.input_text.before(tag);
		}

		//init tags from the input fields value
		self.tag_init = function(){
			var tags = self.input_field.val().trim();
			if( !tags ){
				return;
			}
			tags = tags.split(',');
			for(var k in tags){
				self.tag_add( tags[k] );
			}
		}

		self.click(function(){
			self.input_text.focus();
		});

		self.input_text.focus(function(){
			self.addClass('focus');
		}).blur(function(){
			self.removeClass('focus');
		});

		self.input_text.keydown(function(e){

			//enter key or comma: to finish a tag
			if(e.keyCode == 13 || e.keyCode == 188){
				
				e.preventDefault();

				var tag_content = $(this).val();
				if(!tag_content){
					return;
				}

				self.tag_add(tag_content);

				$(this).val('');
			}

			if(e.keyCode == 8){//delete key: to remove a tag
				if($(this).val().length == 0){
					$(this).siblings('.tag').last().remove();
				}
			}

			self.input_field.val();

			var arr = [];
			self.children('.tag').each(function(){
				arr.push($(this).text())
			});
			self.input_field.val( arr.join(',') );


		});

		//fit width of the input field
		self.input_text.keyup(function(){
			var width_helper = $('.width-helper');
			width_helper.text( $(this).val() );
			$(this).width( width_helper.width()+40 );
		});


		self.tag_init();
		self.attr('initialized', true);
		return self;
	}
});