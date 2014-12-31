$.fn.extend({
	inputtag: function(options){

		var self = this;

		var data_init = options && options['data_init'];
		var max_tag_count = options && options['max_tag_count'] || 0;//0 means unlimited
		var on_max_tag_count = options && options['on_max_tag_count'] || $.noop;

		if( self.attr('initialized') === 'true' ){
			console.warn('warning: the input-tag already initialized!');
			return false;
		}

		self.input_text = self.children('.input-text');
		self.input_field = self.children('.input-field');
		self.tag_count = 0;

		//add a single tag
		self.tag_add = function(tag_content){
				var tag = $('<div class="tag">').text( tag_content );
				var tag_types = ['primary', 'success', 'info', 'warning'];
				var tag_type_index = Math.floor( Math.random()*(tag_types.length-1) );
				var tag_type = tag_types[tag_type_index];
				tag.addClass('tag-'+tag_type);
				self.input_text.before(tag);
				self.tag_sync();
		}

		/**
		* remove a single tag
		* @param $tag  a jQuery selector object
		*/
		self.tag_remove = function($tag){
			$tag.remove();
			self.tag_sync();
		}

		/**
		* init tags width some values
		* @param tags [optional]
		*/
		self.tag_init = function(tags){
			if( tags === undefined ){
				tags = self.attr('data-init');
			}
			if( !tags ){
				return;
			}
			tags = tags.trim().split(',');
			for(var k in tags){
				self.tag_add( tags[k] );
			}
		}

		//synchronize the tag values to the hidden input field
		self.tag_sync = function(){

			var arr = [];
			self.children('.tag').each(function(){
				arr.push($(this).text())
			});
			self.tag_count = arr.length;
			self.input_field.val( arr.join(',') );
		}

		self.click(function(){
			self.input_text.focus();
		});

		self.input_text.focus(function(){
			self.addClass('focus');
		}).blur(function(){
			self.removeClass('focus');
		});

		//click a tag to remove it
		self.delegate('.tag', 'click', function(){
			if( confirm('Are you sure to remove this tag?') ){
				self.tag_remove( $(this) );
			}
		});

		self.input_text.keydown(function(e){

			//delete key: to remove a tag
			if(e.keyCode == 8){
				if($(this).val().length == 0){
					self.tag_remove( $(this).siblings('.tag').last() );
				}
			}
			else{//test if reach the limitation
				if(max_tag_count != 0 && self.tag_count >= max_tag_count){
					$(this).val('');
					on_max_tag_count();
				}
			}

			//enter key or comma or space: to finish a tag
			if(e.keyCode == 13 || e.keyCode == 188 || e.keyCode == 32){
				
				e.preventDefault();

				var tag_content = $(this).val();
				if(!tag_content){
					return;
				}

				self.tag_add(tag_content);

				$(this).val('');
			}

		});

		//fit width of the input field
		self.input_text.keyup(function(){
			var width_helper = $('.width-helper');
			width_helper.text( $(this).val() );
			$(this).width( width_helper.width()+40 );
		});



		self.tag_init(data_init);
		self.attr('initialized', true);
		return self;
	}
});