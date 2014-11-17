/**
 * @author Marcel Liebgott <marcel@mliebgott.de>
 * @version 1.00
 *
 * this jquery plugin validate form inputs
 *
 * @require jquery
 */
(function($){
	$.FormValidation = {
		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * check if the value is less than max
		 *
		 * @param {Array} arguments
        	 * @param {Int} value
		 * @return {Boolean} boolean
		 */
		maxValue: function(args, value){
			value = parseFloat(value);

			if($.type(args.value) === "number" && $.type(args.max) === "number" && 
				args.value !== null && args.max !== null && args.value <= max){
				return true;
			}

			return false;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * check if the value is greater than max
		 *
		 * @param {Array} arguments
	         * @param {Int} value
		 * @return {Boolean} boolean
		 */
		minValue: function(args, value){
			value = parseFloat(value);

			if($.type(args.value) === "number" && $.type(args.min) === "number" && 
				args.value !== null && args.min !== null && args.value >= min){
				return true;
			}

			return false;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * check if the value is in range between min and max
		 *
		 * @param {Array} arguments
        	 * @param {Int} value
		 * @return {Boolean} boolean
		 */
		range: function(args, value){
			value = parseFloat(value);

			if($.type(args.min) === "number" && $.type(args.max) === "number" && 
				$.type(value) === "number" && args.min <= value &&
	        	        value !== null && value !== "" && value <= args.max){
				return true;
			}

			return false;
		},

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
	         *
        	 * check if value is a number
        	 *
	         * @param {String, Number, Boolean} value
        	 * @return {Boolean} boolean
	         */
        	isInterger: function(value){
			if($.type(value) === "number"){
       				return true;
            		}

	            return false;
        	},

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
        	 *
	         * check if value is a string
        	 *
	         * @param {String, Number, Boolean} value
        	 * @returns {Boolean} boolean
	         */
        	isString: function(value){
			if($.type(value) === "string"){
				return true;
			}

			return false;
		},

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
        	 *
	         * check if value is an boolean
        	 *
	         * @param {String, Number, Boolean} value
        	 * @returns {Boolean} boolean
	         */
        	isBoolean: function(value){
			if($.type(value) === "boolean"){
				return true;
			}

			return false;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * check if the value is a valid date
		 *
		 * @param {String} value
		 * @return {Boolean} boolean
		 */
		isDate: function(value){
			if(typeof value !== "undefined" && value !== null && value !== null){
				// TODO: local anhand browser auslesen
				return value.test(/^([0-2][0-9]|3[0-1])\.(0?[1-9]|1[0-2])\.([0-9]{4})$/g);
			}

			return false;
		},

        	/**
	         * @author Marcel Liebgott <marcel@mliebgott.de>
        	 * @since 1.00
	         *
        	 * check if the length of a string is less than max
	         *
        	 * @param {Array} arguments
	         * @param {Int} value
        	 * @return {Boolean} boolean
	         */
        	maxLength: function(args, value){
            		if(this.isString(value) && value.length <= args.max){
		                return true;
			}

			return false;
	        },

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
        	 *
	         * check if the length of a string is greater than max
        	 *
	         * @param {Array} arguments
        	 * @param {Int} value
	         * @return {Boolean} boolean
        	 */
	        minLength: function(args, value){
        		if(this.isString(value) && value.length >= args.min){
				return true;
			}

			return false;
	        },

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
        	 *
	         * check if the length of a string is between min and max
        	 *
	         * @param {Array} arguments
        	 * @param {Int} value
	         * @return {Boolean} boolean
        	 */
	        rangeLength: function(args, value){
        		if(this.isString(value) && value.length <= args.max && value.length >= args.min){
				return true;
			}

			return false;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * check the input value with a defined function which is defined as attribute
		 *
		 * @param {Object} input element
		 * @param {Array} options
		 * @return {Boolean} true if input is valid, else false
		 */
		validateInput: function(input, form, options){
			var name = $(input).attr("name");
			var id = $(input).attr("id");
			var validate = $(input).data("validate");
			var value = input.value.length > 0 ? input.value : null;
			var args = $.FormValidation.prepareArguments(input);

			var res = false;

			if(args !== null && args !== "" && typeof args !== "undefined"){
				switch(validate.toLowerCase()){
					case "range":
						res = $.FormValidation.range(args.range, value);
						break;
					case "max":
						res = $.FormValidation.maxValue(args.maxValue, value);
						break;
					case "min":
						res = $.FormValidation.minValue(args.minValue, value);
						break;
					case "isboolean":
						res = $.FormValidation.isBoolean(value);
						break;
					case "isstring":
						res = $.FormValidation.isString(value);
						break;
					case "isinteger":
						res = $.FormValidation.isInterger(value);
						break;
					case "maxlength":
						res = $.FormValidation.maxLength(args.maxLength, value);
						break;
					case "minlength":
						res = $.FormValidation.minLength(args.minLength, value);
						break;
					case "rangelength":
						res = $.FormValidation.rangeLength(args.rangeLength, value);
						break;
					case "isdate":
						res = $.FormValidation.isDate(value);
						break;
				}

				options.output = (options.output).replace(/\s+/, '');
				var outputMethods = options.output.split(",");
	
				if(!res){
					$.each(outputMethods, function(key, value){
						switch(value.toLowerCase()){
							case "border":
								$(input, form).css({
									'border-color': 'red'
								});
								break;
							case "alert":
								alert("Input with name " + name + " isn't valid");
								break;
							case "desc":
								var id = "m_" + name;
								if($('#' + id).length == 0){
									$(':input[name="' + name + '"]').after("<p id='" + id + "' class='error-msg'>Input isn\'t valid</p>");
								}
								break;
						}
					});
				}else{
					$.each(outputMethods, function(key, value){
						switch(value.toLowerCase()){
							case "desc":
								$(':input[name="' + name + '"]').next("p").remove();
								break;
							case "border":
								$(input, form).css({
									'border-color': 'gray'
								});
								break;
						}
					});
				}
	                	
				return res;
			}
			return true;
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * make sure that the input of this form is checked on lost focus
		 *
		 * @param {Object} formular
		 * @param {Array} input elements
		 * @param {Array} options
		 */
		validateOnBlur: function(form, inputs,options){
			$.each(inputs, function(key){
				$(this).focusout(function(){
					$.FormValidation.validateInput(this, form, options);
				});
			});
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * make sure that the input of this form is checked on submit
		 *
		 * @param {Object} formular
		 * @param {Array} input elements
		 * @param {Array} options
		 */
		validateOnSubmit: function(form, inputs, options){
			$(form).submit(function(e){
               			e.preventDefault();
				var check = false;

				$.each(inputs, function(key, value){
					check = $.FormValidation.validateInput(this, form, options);
				});

				return check;
			});
		},

		/**
		 * @author Marcel Liebgott <marcel@mliebgott.de>
		 * @since 1.00
		 *
		 * this function prepare the provided arguments for the supported methods
		 *
		 * @param {Object} inputs
		 * @return {Array} prepared arguments
		 */
		prepareArguments: function(inputs){
			var min = $(inputs).data("min");
			var max = $(inputs).data("max");

			var settings = {
				minValue: {
					min: min
				},
				maxValue: {
					max: max
				},
				range: {
					min: min,
					max: max
				},
	        	        maxLength: {
               			    	max: max
	               		},
        	       		minValue: {
					min: min
	               		},
        	       		rangeLength: {
              				min: min,
              				max: max
	               		}
			};

			console.log(settings);
	
		return settings;
		},

	        /**
        	 * @author Marcel Liebgott <marcel@mliebgott.de>
	         * @since 1.00
        	 *
	         * this function handle your validation on forms
		 *
		 * @param {Array} options
        	 */
		validate: function(options){
			// search form
			var form = $('form');

			if(form.length > 0){
				$.each(form, function(){
					var mode = $(this).data("validation");

					var inputs = $('input[type != "submit"],select,textarea', this);

					if(mode.toLowerCase() === "blur"){
						$.FormValidation.validateOnBlur(this, inputs, options);
					}

					if(mode.toLowerCase() === "onsubmit"){
						$.FormValidation.validateOnSubmit(this, inputs, options);
					}
				});
			}
		}
	};
})(jQuery);
