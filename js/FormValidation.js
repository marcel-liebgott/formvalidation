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
		 * check the input value with a defined function which is defined as attribute
		 *
		 * @param {Object} input element
		 * @return {Boolean} true if input is valid, else false
		 */
		validateInput: function(input, form){
			var name = $(input).attr("name");
			var id = $(input).attr("id");
			var validate = $(input).data("validate");
            console.log("value: " + input.value);
            var value = input.value.length > 0 ? input.value : null;

			var args = $.FormValidation.prepareArguments(input);

			var res = false;

			if(args !== null && args !== "" && typeof args !== "undefined"){
                console.log($.type(validate));
				switch(validate.toLowerCase()){
					case "range":
							res = $.FormValidation.range(args.range, value);
						break;
				}

                console.log("Result: " + res);

				// make input field colorful :D
				if(!res){
					$(input, form).css({
						'border-color': 'red',
						 color: 'black'
					});
				}else{
					$(input, form).css({
						'border-color': 'gray'
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
		 */
		validateOnBlur: function(form, inputs){
			$.each(inputs, function(key){
				$(this).focusout(function(){
					$.FormValidation.validateInput(this, form);
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
		 */
		validateOnSubmit: function(form, inputs){
			$(form).submit(function(e){
                e.preventDefault();

				var check = false;
				$.each(inputs, function(key, value){
					check = $.FormValidation.validateInput(this, form);
					console.log("Result on Submit: " + check);
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
         */
		validate: function(){
			// search form
			var form = $('form');

			if(form.length > 0){
				$.each(form, function(){
					var mode = $(this).data("validation");

					var inputs = $('input[type != "submit"],select,textarea', this);

					if(mode.toLowerCase() === "blur"){
						$.FormValidation.validateOnBlur(this, inputs);
					}

					if(mode.toLowerCase() === "onsubmit"){
						$.FormValidation.validateOnSubmit(this, inputs);
					}
				});
			}
		}
	};
})(jQuery);