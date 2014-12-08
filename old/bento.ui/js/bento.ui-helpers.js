/**
 * Bento.UI Helpers
 *
 * @version 0.7.9
 * @date 2013-12-17
 */

/* HTML5 Placeholder attribute support
 * http://mths.be/placeholder v2.0.7 by @mathias
 * slightly tweaked for Bento.UI */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
		isTextareaSupported = 'placeholder' in document.createElement('textarea'),
		prototype = $.fn,
		valHooks = $.valHooks,
		hooks,
		placeholder;

	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value === '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can't use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don't get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
			rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
			$input = $(input);
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
				input == document.activeElement && input.select();
			}
		}
	}

	function setPlaceholder() {
		var $replacement,
			input = this,
			$input = $(input),
			$origInput = $input,
			id = this.id;
		if (input.value === '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));
/**
 * Extend Bootstrap 2 Dropdown into Hover State
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>, Aaron Mendez <aaron.mendez@thomsonreuters.com>
 * @version 0.2
 * @date 08/06/2013
 *
 *
 */

(function($){
  $(document).ready(function(e) {

    // Dropdowns will work on mouseover
    $('.dropdown-hover').hover(function() {
      $(this).find('.dropdown-menu').stop(true, true).show();
      $(this).addClass('open');
    }, function() {
      $(this).find('.dropdown-menu').stop(true, true).hide();
      $(this).removeClass('open');
    });
  });

})(jQuery);
/**
 * Bento Checkbox Group
 * Format and extend multiple Checkbox group items
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 08/12/2013
 *
 *
 */
(function($){
  
  $(document).ready(function(e) {
    //Init all "bento-checkbox-group"
    $('.bento-checkbox-group').each(function(index,element){
      $(element).bentoCheckboxGroup();
    });
  });
  
  //Extend jQuery
  $.fn.extend({bentoCheckboxGroup: function(options){
    var opt    = (typeof options == 'undefined') ? {} : options;
    var search = (typeof $(this).data('search') == 'undefined') ? false : $(this).data('search');
    var fitToParent = (typeof $(this).data('fit-to-parent') == 'undefined') ? false : $(this).data('fit-to-parent');
    var $children = $(this).children();
    var $parent = $(this).parent();
    var $searchClearButton
    
    //Format Text DOM
    $(this).children().each(function(index, element) {
      var str = $(element).html();
      
      str = str.replace('> ', '> <span class="text-label">');
      str += '</span>'
      $(element).html(str);
    }); 
    
    $(this).wrapInner('<div class="bento-checkbox-group-container" />');
    

    //Add Search function
    if(search){
      $(this).prepend('<div class="bento-checkbox-group-search"><div id="bento-checkbox-group-search-textfied-'+(Math.round(Math.random() * 100))+'" class="bento-search"><input type="text"><button class="clear-search"></button></div></div>');
      
      //Align seach container width
      var searchContainer = $(this).find('.bento-checkbox-group-search');   
            
      //Simulate Bento Search Plugin
      var searchTextField = $(this).find('.bento-checkbox-group-search input[type=text]');
      $searchClearButton = $(this).find('.bento-checkbox-group-search .clear-search');

      $(searchTextField).keyup(function(e) {
        var str = $(this).val();
        
        if(str.length > 0){
          $searchClearButton.css('display','inline-block');
          searchChildren(str,$children);
        }else{
          $searchClearButton.css('display','none');
          clearSearch($children);
        }
      });
      
      $searchClearButton.click(function(e){
        $(this).removeAttr('style');
        $(searchTextField).val('');
        clearSearch($children);
      });
      
    }
    
    //Resize this to fit to parent
    if(fitToParent){
      var $mainContainer = $parent.find('.bento-checkbox-group-container');
      var $mainObject = this;
      
      //Adjust select group height on side-toggle size changes
      //This is ONLY compatible with 'bento-side-toggle' plugin
      $parent.on('heightChange',function(e, height){
        
        var newHeight = height;
        
        //Check if there is any siblings
        $mainObject.siblings().each(function(e){
          
          //IE Fix for the sibling heights
          if(navigator.appName.toLowerCase().search('internet explorer') > -1){
            newHeight -= $(this).outerHeight();
          }else{
            newHeight -= $(this).outerHeight();
            if(search){
              newHeight -= ($(this).height()+$(this).outerHeight()) * 0.5;
            }
          }
        });

        if(search){
          $mainContainer.outerHeight(newHeight - searchContainer.outerHeight());
          $searchClearButton.click();
        }else{
          $mainContainer.outerHeight(newHeight);
        }
        
        $mainContainer.css('overflow-y','auto');
        $mainContainer.css('overflow-x','hidden');
        
        
        $mainContainer.scrollTop(0);
        
      });
    }
  }});  
  
  /**
   * Clear all filtered results
   *
   * @param children (jQuery Array)
   */
  function clearSearch(children){
    children.each(function(index, element) {
      $(element).show();
      $(element).find('.text-label').html($(element).text());
    });
  }
  
  /**
   * Search and highlight select children, hide if there is no match
   *
   * @param text (String)
   * @param children (jQuery Array)
   */
  function searchChildren(text, children){
    var re = new RegExp('('+text+')','gi');
    var searchText = text.toLowerCase();
    if($.trim(text) == ''){
      clearSearch(children);
    }else{
      children.each(function(index, element) {
        var label = $(element).find('.text-label');
        var str = label.text();
        if(str.toLowerCase().search(searchText) > -1){
          $(this).show();
        }else{
          $(this).hide();
        }
        label.html(str.replace(re,"<strong>$1</strong>"));
      }); 
    }
  }
  
  
})(jQuery);/**
 * Bento Combobox
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 08/27/2013
 *
 * Adapted from `Fuel UX Combobox`
 * https://github.com/ExactTarget/fuelux
 *
 */

!function ($) {

	"use strict"; // jshint ;_;


	// COMBOBOX CONSTRUCTOR AND PROTOTYPE

	var Combobox = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.combobox.defaults, options);
		this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
		this.$input = this.$element.find('input');
	};

	Combobox.prototype = {

		constructor: Combobox,

		select: function (val) {
			this.$input.val(val).change();
			return this;
		},

		itemclicked: function (e) {
			this.select($(e.target).text());
			$('body').click();
			e.preventDefault();
		}

	};


	// COMBOBOX PLUGIN DEFINITION

	$.fn.combobox = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bento-combobox');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('bento-combobox', (data = new Combobox(this, options)));
			if (typeof option === 'string') data[option]();
		});
	};

	$.fn.combobox.defaults = {};

	$.fn.combobox.Constructor = Combobox;


	// COMBOBOX DATA-API

	$(function () {
    //Still need to include fuelux-combobox for the old users
		$('body').on('mousedown.combobox.data-api', '.bento-combobox, fuelux-combobox', function (e) {
			var $this = $(this);
			if ($this.data('bento-combobox')) return;
			$this.combobox($this.data());
		});
	});

}(window.jQuery);
/**
 * Extends jQuery with new bentoPaginate() method
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 2.0
 * @date 12/11/2013
 *
 * OLD Bento Paginate Example:
 *
 * Format existing paginaton objects:
 *  $('ul.bento-paginate').bentoPaginate()
 *    
 * Create a new pagination instance:
 *  $('#newPaginationID').bentoPaginate(__total_page_count__);
 *
 * Adding event listeners
 *  $('#newPaginationID').on('onpageclick',function(e){
 *    console.log('Page number '+e.pageNumber+' is clicked');
 *  });
 *
 */
 
(function($){ 
  $(document).ready(function(e) {
    
    /**
     * Bento Paginate 1.0 initialization
     */
    //Initialize paginations to classes under ul.bento-paginate  
    $('ul.bento-paginate').bentoPaginate();
  }); 
  
  //Extend jQuery with Bento Paginate
  $.fn.extend({bentoPaginate: function(options){
    $(this).each(function(index, element) {
      if($(element).data('bentoPaginate')){
        return;
      }
      $(element).data('bentoPaginate',{});
      
      //Check the syntax version to device which Paginate to be used
      
      
      if(typeof options == 'object' && this.nodeName.toLowerCase() != 'ul' ){
        //New Bento Paginate funciton calls here
        $(element)._bentoPaginateV2(options);
      }else if(typeof options == 'integer' || this.nodeName.toLowerCase() == 'ul'){
        //Version 1 Bento Paginate function call here
        $(element)._bentoPaginateV1(options);
      }else{
        console.log('Warning: Your syntax is not supported by Bento Paginate.');
      }
    });
  }});
  
  //Extend jQuery with Private Bento Paginate Verision 2
  //EVENT CONSTANT
  var ROWS_PER_PAGE_CHANGE = 'onrowslistchange';
  var PAGE_CHANGE = 'onpagechange';
  
  $.fn.extend({_bentoPaginateV2: function(options){
    var $this = $(this);
    var numPages = (typeof options.numPages == 'undefined') ? -1 : parseInt(options.numPages);
    var numEntries = (typeof options.numEntries == 'undefined') ? -1 : parseInt(options.numEntries);
    var rowsPerPage = (typeof options.rowsPerPage == 'undefined') ? 10 : parseInt(options.rowsPerPage);
    var pageSelected = (typeof options.pageSelected == 'undefined') ? 0 : parseInt(options.pageSelected);
    var rowLabel = (typeof options.rowLabel == 'undefined') ? 'entries' : options.rowLabel;
    var readyFunc = options.ready;
    
    if(numPages == -1 && numEntries == -1){
      console.log('ERROR (Bento Paginate): Missing parameters, please refer to the documentation.');
      return;
    }
    
    
    //create main element
    var mainContainer = document.createElement('div');
    var leftContainer = document.createElement('div');
    var rightContainer = document.createElement('div');
    var clearBoth = document.createElement('div');
    clearBoth.className = 'clear-both';
    mainContainer.className = 'bento-paginate';
    leftContainer.className = 'pull-left';
    rightContainer.className = 'pull-right';
    
    //Construct the main DOM object
    mainContainer.appendChild(leftContainer);
    mainContainer.appendChild(rightContainer);
    
    //Build left container contents
    leftContainer.innerHTML = '<div class="btn-group paginate-button-group"><span class="paginate-button previous btn"><div class="arrow-left-large-gray"></div></span><span class="paginate-button next btn"><div class="arrow-right-large-gray"></div></span></div><span class="paginate-left-info"> <span class="paginate-page">Page</span> <span class="paginate-of">1 of 3</span><span class="paginate-jumpto">Jump to</span> <span class="btn-group paginate-input-group"><input type="text" name="page-input"><div class="btn">Go</div></span></span>';
    
    //Get left container components for locolization and internations
    var $prevButton = $('.previous.btn',leftContainer);
    var $nextButton = $('.next.btn',leftContainer);
    var $page = $('.paginate-page',leftContainer);
    var $pageOf = $('.paginate-of',leftContainer);
    var $jumpTo = $('.paginate-jumpto',leftContainer);
    var $jumpToInput = $('input[type=text]',leftContainer);
    var $buttonGo = $('.paginate-input-group .btn',leftContainer);
    
    
    //Localization for future releases
    $page.html('Page');
    $jumpTo.html('Jump to');
    $buttonGo.html('Go');
    
    
    //Right Container initialization
    var $labelShow;
    var $paginateInfo;
    var $labelEntries;
    var $paginateSelect;
    
    if(numEntries > -1){
      if(numEntries <= rowsPerPage){
        //There is no need to display pagination
        return this;
      }
      
      //Selection rows per page
      var rowsPerPageSelection;
      if(rowsPerPage < 11){
        rowsPerPageSelection = 0;
      }else if(rowsPerPage < 26){
        rowsPerPageSelection = 1;
      }else if(rowsPerPage < 51){
        rowsPerPageSelection = 2;
      }else{
        rowsPerPageSelection = 3;
      }
      
      //Build right container components
      rightContainer.innerHTML = '<div class="paginate-info">1 to 10 of 24 entries</div><div class="paginate-length"><label><span class="paginate-show">Show</span> <select size="1" name="grid_length" aria-controls="grid"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select></label></div>';
      
      $labelShow = $('.paginate-show', rightContainer);
      $paginateInfo = $('.paginate-info', rightContainer);
      $labelEntries = $('.paginate-entries', rightContainer);
      $paginateSelect = $('select', rightContainer);
      $label = $('label', rightContainer);
      
      //select the rows per page
      selectOptions = $paginateSelect.find('option');
      
      rowsPerPage = selectOptions [rowsPerPageSelection].value;
      $paginateSelect.val(rowsPerPage);
      
      numPages = Math.ceil(numEntries / rowsPerPage);
      
      mainContainer.appendChild(rightContainer);
      
      //Hide Rows Per Page combobox when the enties are less than 25
      if(numEntries < 25){
        $label.hide();
      }
      
      //Listener for the combobox.
      $paginateSelect.on('change', function(e) {
        
        var event = jQuery.Event(ROWS_PER_PAGE_CHANGE);
        
        currentEntry = rowsPerPage * pageSelected;
        rowsPerPage = parseInt($paginateSelect.find('option:selected').val());
        numPages = Math.ceil(numEntries / rowsPerPage);
        pageSelected = Math.floor(currentEntry / rowsPerPage);
        
        event.currentPage = pageSelected;
        event.entryFrom = rowsPerPage * pageSelected;
        event.entryTo = event.entryFrom + rowsPerPage - 1;
        event.numEntries = numEntries;
        event.numPages = numPages;
        
        //Update DOM
        $paginateInfo.html((event.entryFrom+1)+' to '+(event.entryTo+1)+' of '+numEntries);        
        $pageOf.html((pageSelected+1) + ' of ' + numPages);
        $jumpToInput.val('');
        
        $this.trigger(event);
        checkPreviewNextButtons();
      });
    }
    
    //Make sure if pageSelected is within the range of 0 and numPages - 1
    pageSelected = (pageSelected >= numPages) ? numPages - 1 : pageSelected;
    pageSelected = (pageSelected < 0) ? 1 : pageSelected;
    
    
    $('.previous.btn,.next.btn', leftContainer).on('click touchend',function(e){
      if($(e.currentTarget).hasClass('next')){
        pageSelected++;
        pageSelected = (pageSelected == parseInt(numPages)) ? pageSelected-1 : pageSelected;
      }else if($(e.currentTarget).hasClass('previous')){
        pageSelected--;
        pageSelected = (pageSelected < 0) ? 0 : pageSelected;
      }
      
      handlePageChange();
      
    });
    
    $jumpToInput.keyup(function(e) {
      
      
      //Enter Key
      if(e.which == 13){
        handleJumpToValue();
      }else if(e.which == 38){
        //Up Key
        pageSelected++;
        pageSelected = (pageSelected == parseInt(numPages)) ? pageSelected-1 : pageSelected;
        handlePageChange();
      }else if(e.which == 40){        
        //Down key
        pageSelected--;
        pageSelected = (pageSelected < 0) ? 0 : pageSelected;
        handlePageChange();
      }
    });
    
    $buttonGo.on('click touchend',function(e) {
      handleJumpToValue()
    });
    
    handlePageChange();
    mainContainer.appendChild(clearBoth);
    $(this).append(mainContainer);

    //Future Versions: Implement onReady Code here

    /**
     * Private: Check previous and next buttons
     */
    function checkPreviewNextButtons(){
      $leftInfo = $('.paginate-left-info', leftContainer);
      
      if(numPages == 1){
        $prevButton.addClass('disabled');
        $nextButton.addClass('disabled');
        $leftInfo.remove();
      }else if(pageSelected == 0){
        $prevButton.addClass('disabled');
      }else if(pageSelected >= numPages -1){
        $nextButton.addClass('disabled');
      }else{
        $prevButton.removeClass('disabled');
        $nextButton.removeClass('disabled');
      }
      
      if(numPages < 6){
        $leftInfo.hide();
      }else{
        $leftInfo.show();
      }
    }
    
    /**
     * Private: Get value from Jump To input field and update the pages
     */
    function handleJumpToValue(){
      var pageNumber = parseInt($jumpToInput.val());
      
      if(isNaN(pageNumber) || pageNumber < 1){
        pageSelected = 0;
      }else if(pageNumber >= numPages){
        pageSelected = numPages - 1;
      }else{
        pageSelected = pageNumber - 1;
      }
      
      handlePageChange();
    }
    
    /**
     * Private: Update DOM and fire events on PAGE_CHANGE
     */
    function handlePageChange(){
      
      $pageOf.html((pageSelected+1) + ' of ' + numPages);
      $jumpToInput.val('');
      
      var event = jQuery.Event(PAGE_CHANGE);
      event.currentPage = pageSelected;
      event.entryFrom = rowsPerPage * pageSelected;
      event.entryTo = parseInt(event.entryFrom) + parseInt(rowsPerPage) - 1;
      
      //Will not update when there is no total number of entries given
      if(numEntries > -1){
        event.numEntries = numEntries;
        event.numPages = numPages;
        //Update DOM
        $paginateInfo.html((event.entryFrom+1)+' to '+(event.entryTo+1)+' of '+numEntries); 
      }
      
      //Update DOM
      $pageOf.html((pageSelected+1) + ' of ' + numPages);
      //Remove JumpTo number
      //$jumpToInput.val((pageSelected+1));
      $jumpToInput.val('');
      
      $this.trigger(event);
      checkPreviewNextButtons();
    }
    
  }});
  
  
  //Extend jQuery with Private Bento Paginate Verision 1 
  $.fn.extend({_bentoPaginateV1: function(totalPages){
    
    if(typeof this == 'undefined' || $(this).length < 1){
     return;
    }
     
    /**
    * Bento Pagination Initializations
    */
        
    var NUM_PAGER_BUTTONS = 7;
    var ON_PAGE_CLICK = 'onpageclick'
    var target;
    
    //Check if we are creating a new DOM or using  the 
    //existing DOM
    if($(this).hasClass('bento-paginate')){
     
     target = this;
    }else{
     //Check if variable exists totalPages 
     if(typeof totalPages == 'undefined'){
       //No Parameter is provided
       alert('Please specify the total number of pages in BentoPaginate');
       return;
     }
     //Create new DOM object within the object passed in
     var newPaginator = '<ul class="bento-paginate">';
     var numPages = parseInt(totalPages, 10); // Make sure the variable is a number
     for(var i=1; i<=numPages; i++){
       newPaginator += '<li>'+i+'</li>';
     }
     
     newPaginator += '</ul>';
     $(this).html(newPaginator);
     
     target = $(this).find('ul.bento-paginate');
    }
       
    $(target).each(function(index, element) {
     var paginationContainer = this;
     var buttons = [];
     var selectedPageObject;
     
     $(this).children().each(function(index, element) {
       
       buttons.push(this);
       
       //Strip the Anchor Tag for the Children
       if($(this).children().length > 0){
        var node = $(this).children('a')[0];
        $(this).data('anchor',node);
        $(this).html($(node).text());
        $(node).hide();
        //Firefox and IE fix, the anchor needs to be in main DOM
        $(paginationContainer).after(node);
       }
       
       if($(this).hasClass('selected')){
        //Mark the first selected item in the list
        $(this).addClass('bento-paginate-btn');
        if(typeof selectedPageObject == 'undefined'){
          selectedPageObject = this;
        }else{
          // Anything is selected after the first selected object
          // will be ignored
          $(this).addClass('active').removeClass('selected'); 
        }
       }else{
        $(this).addClass('bento-paginate-btn active');
       }
       
       $(this).data('pageNumber',parseInt($(this).text(), 10));
       $(this).data('index',index);
       
       //Add Trigger to each pager when a page is selected
       $(this).on('click touchend',function(e) {
        
        //Check if the clicked item is the current pageObject
        if(this == selectedPageObject){
          return;
        }
        
        var event = jQuery.Event(ON_PAGE_CLICK);
        event.pageNumber = $(this).data('pageNumber');
        
        if(selectedPageObject){
          $(selectedPageObject).removeClass('selected').addClass('active');
        }
        
        selectedPageObject = this;
        $(this).removeClass('active').addClass('selected');
        
        // In case the li has an Anchor, it's event needs to be triggered
        if($(this).data('anchor')){
          $(this).data('anchor').click();
        }
        
        $(paginationContainer).trigger(event);
        
        renderBentoPager();
        
       }); 
     });
     
     // Default to the first Selected Pager when there is none;
     
     if(typeof selectedPageObject == 'undefined'){
       selectedPageObject = buttons[0];
       $(selectedPageObject).removeClass('active').addClass('selected'); 
     }
     
     // Add left/right arrows and ellipsis 
     $(this).prepend('<li class="bento-paginate-btn left active"><div class="arrow-left"></div></li>');
     $(buttons[0]).after('<li class="bento-paginate-btn active ellipsis-left">...</li>');
     
     $(this).append('<li class="bento-paginate-btn right active"><div class="arrow-right"></div></li>');
     $(buttons[buttons.length-1]).before('<div class="bento-paginate-btn active ellipsis-right">...</div>');
     
     // Add Listeners to left & right ellipsis
     $(this).find('.ellipsis-left').on('click touchend',function(e) {
       var newIndexNumber =  $(selectedPageObject).data('index') - NUM_PAGER_BUTTONS;
       if(newIndexNumber < 0){
        newIndexNumber = 0;
       }
       
       $(buttons[newIndexNumber]).click();    
     });
     
     $(this).find('.ellipsis-right').on('click touchend',function(e) {
       var newIndexNumber =  $(selectedPageObject).data('index') + NUM_PAGER_BUTTONS;
       if(newIndexNumber >= buttons.length ){
        newIndexNumber = buttons.length - 1;
       }
       
       $(buttons[newIndexNumber]).click(); 
     });
     
     // Add Listeners to left & right arrows
     $(this).find('.left').on('click touchend',function(e) {
       var newIndexNumber =  $(selectedPageObject).data('index') - 1;
       $(buttons[newIndexNumber]).click();  
     });
     
     $(this).find('.right').on('click touchend',function(e) {
        var newIndexNumber =  $(selectedPageObject).data('index') + 1;
       $(buttons[newIndexNumber]).click();  
     });
     
     //Render the pager for the first time
     renderBentoPager();
     
     /**
      * Bento Pagination Private Functions
      */
     function renderBentoPager(){
       //Arrange and display the pager
       //Need a odd number in the begging
       var isEven = (NUM_PAGER_BUTTONS % 2 != 1);
       var dPageNumber = Math.floor(NUM_PAGER_BUTTONS / 2 );
       var currentPage = $(selectedPageObject).data('pageNumber');
       var totalPages = buttons.length;
       var pFirst = currentPage - dPageNumber + ((isEven)? 1 : 0) ;
       var pLast = currentPage + dPageNumber;
            
       if(pFirst < 1) {
        pFirst = 1;
        pLast = NUM_PAGER_BUTTONS;
       }
       
       if(pLast > totalPages) {
        pLast = totalPages;
        
        if((pLast - pFirst) < NUM_PAGER_BUTTONS && pFirst > 1){
          pFirst = pLast - NUM_PAGER_BUTTONS + 1;
          pFirst = (pFirst < 1) ? 1 : pFirst;
        }
       }
       
       // Show & hide ellipsis & arrows
       // Left
       if(pFirst ==  1){
        $(paginationContainer).find('.ellipsis-left').hide();
       }else{
        $(paginationContainer).find('.ellipsis-left').show();
       }
       
       if(currentPage == 1){
        $(paginationContainer).find('.left').removeClass('active');
       }else{
        $(paginationContainer).find('.left').addClass('active');
       }
       
       // Right
       if(pLast == totalPages ){
        $(paginationContainer).find('.ellipsis-right').hide();
       }else{
        $(paginationContainer).find('.ellipsis-right').show();
       }
       
       if(currentPage == totalPages){
        $(paginationContainer).find('.right').removeClass('active');
       }else{
        $(paginationContainer).find('.right').addClass('active');
       }
       
       for(var i=1; i<totalPages-1; i++){
        var button = buttons[i];
        var pageNumber = $(button).data('pageNumber');
        
        if(pageNumber >= pFirst && pageNumber <= pLast){
          $(button).show();
        }else{
          $(button).hide();
        }
       }
     }
    });
  }});
})(jQuery);/**
 * Bento Spinner
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 08/27/2013
 *
 * Adapted from `Fuel UX Spinner`
 * https://github.com/ExactTarget/bento
 *
 * This still needs to be compatible with the FuelUX Spinner Plugin
 *
 */

!function ($) {

	"use strict"; // jshint ;_;
  
  //FuelUX Spinner Classes
  //Will need to retire them in future
  var fuelUXSpinner      = ', .fuelux-spinner';
  var fuelUXSpinnerInput = ', .fuelux-spinner-input';
  var fuelUXSpinnerUp    = ', .fuelux-spinner-up';
  var fuelUXSpinnerDown    = ', .fuelux-spinner-down';



	// SPINNER CONSTRUCTOR AND PROTOTYPE

	var Spinner = function (element, options) {
        
		this.$element = $(element);
		this.options = $.extend({}, $.fn.spinner.defaults, options);
		this.$input = this.$element.find('.bento-spinner-input' + fuelUXSpinnerInput);
		this.$element.on('keyup', this.$input, $.proxy(this.change, this));

		if (this.options.hold) {
			this.$element.on('mousedown', '.bento-spinner-up' + fuelUXSpinnerUp, $.proxy(function() { this.startSpin(true); } , this));
			this.$element.on('mouseup', '.bento-spinner-up, .bento-spinner-down' + fuelUXSpinnerUp + fuelUXSpinnerDown, $.proxy(this.stopSpin, this));
			this.$element.on('mouseout', '.bento-spinner-up, .bento-spinner-down' + fuelUXSpinnerUp + fuelUXSpinnerDown, $.proxy(this.stopSpin, this));
			this.$element.on('mousedown', '.bento-spinner-down' + fuelUXSpinnerDown, $.proxy(function() {this.startSpin(false);} , this));
		} else {
			this.$element.on('click', '.bento-spinner-up' + fuelUXSpinnerUp, $.proxy(function() { this.step(true); } , this));
			this.$element.on('click', '.bento-spinner-down' + fuelUXSpinnerDown, $.proxy(function() { this.step(false); }, this));
		}

		this.switches = {
			count: 1,
			enabled: true
		};

		if (this.options.speed === 'medium') {
			this.switches.speed = 300;
		} else if (this.options.speed === 'fast') {
			this.switches.speed = 100;
		} else {
			this.switches.speed = 500;
		}

		this.render();

		if (this.options.disabled) {
			this.disable();
		}
	};

	Spinner.prototype = {
		constructor: Spinner,

		render: function () {
			this.$input.val(this.options.value);
			this.$input.attr('maxlength',(this.options.max + '').split('').length);
		},

		change: function () {
			var newVal = this.$input.val();

			if(newVal/1){
				this.options.value = newVal/1;
			}else{
				newVal = newVal.replace(/[^0-9]/g,'');
				this.$input.val(newVal);
				this.options.value = newVal/1;
			}

			this.$element.trigger('change');
		},

		stopSpin: function () {
			clearTimeout(this.switches.timeout);
			this.switches.count = 1;
			this.$element.trigger('change');
		},

		startSpin: function (type) {

			if (!this.options.disabled) {
				var divisor = this.switches.count;

				if (divisor === 1) {
					this.step(type);
					divisor = 1;
				} else if (divisor < 3){
					divisor = 1.5;
				} else if (divisor < 8){
					divisor = 2.5;
				} else {
					divisor = 4;
				}

				this.switches.timeout = setTimeout($.proxy(function() {this.iterator(type);} ,this),this.switches.speed/divisor);
				this.switches.count++;
			}
		},

		iterator: function (type) {
			this.step(type);
			this.startSpin(type);
		},

		step: function (dir) {
			var curValue = this.options.value;
			var limValue = dir ? this.options.max : this.options.min;

			if ((dir ? curValue < limValue : curValue > limValue)) {
				var newVal = curValue + (dir ? 1 : -1) * this.options.step;

				if (dir ? newVal > limValue : newVal < limValue) {
					this.value(limValue);
				} else {
					this.value(newVal);
				}
			}
		},

		value: function (value) {
			if (typeof value !== 'undefined') {
				this.options.value = value;
				this.$input.val(value);
				return this;
			} else {
				return this.options.value;
			}
		},

		disable: function () {
			this.options.disabled = true;
			this.$input.attr('disabled','');
			this.$element.find('button').addClass('disabled');
		},

		enable: function () {
			this.options.disabled = false;
			this.$input.removeAttr("disabled");
			this.$element.find('button').removeClass('disabled');
		}
	};


	// SPINNER PLUGIN DEFINITION

	$.fn.spinner = function (option,value) {
		var methodReturn;

		var $set = this.each(function () {
			var $this = $(this);
			var data = $this.data('bento-spinner');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('bento-spinner', (data = new Spinner(this, options)));
			if (typeof option === 'string') methodReturn = data[option](value);
		});

		return (methodReturn === undefined) ? $set : methodReturn;
	};

	$.fn.spinner.defaults = {
		value: 1,
		min: 1,
		max: 999,
		step: 1,
		hold: true,
		speed: 'medium',
		disabled: false
	};

	$.fn.spinner.Constructor = Spinner;


	// SPINNER DATA-API

	$(function () {
		$('body').on('mousedown.spinner.data-api', '.bento-spinner' + fuelUXSpinner, function (e) {
			var $this = $(this);
			if ($this.data('.bento-spinner')) return;
			$this.spinner($this.data());
		});
    
    // Initialize Static Spinner Instances
    $('.bento-spinner' + fuelUXSpinner).spinner();
	});

}(window.jQuery);/**
 * Splitter Group
 * -------------------------------------------------------------
 * Pixels-to-pixels or percents-to-percents render more smoothly, thus the conversion of pixels to percents
 * This is why window.resize is used: to keep updating the converted percentage
 * -------------------------------------------------------------
 *
 * @author Aaron Mendez <aaron.mendez@thomsonreuters.com>, Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 08/21/2013
 *
 * TODO:
 * - make splitter-bars a bit wider when collapsed, easier to click
 * - add more comments
 */
(function($){
    //Contstant Event Names
    var LEFT_EXPAND    = 'leftExpand';
    var RIGHT_EXPAND   = 'rightExpand';
    var LEFT_COLLAPSE  = 'leftCollapse';
    var RIGHT_COLLAPSE = 'rightCollapse';

    $(document).ready(function(e) {
      $('.splitter-group').splitterGroup();
    });

    //Make jQuery Extendtion
    $.fn.extend({splitterGroup: function(){
      $(this).each(function(index, element) {
        if($(element).data('bentoSplitterGroup')){
          return;
        }

        $(element).data('bentoSplitterGroup', {});
        $(element)._splitterGroup();
      });
    }});

    //Make Private jQuery Extendtion
    $.fn.extend({_splitterGroup: function(){
      var splitGroup       = $(this);
      var splitMain        = splitGroup.children('.splitter-main');
      var splitLeft        = splitGroup.children('.splitter-left');
      var splitRight       = splitGroup.children('.splitter-right');
      var splitData        = splitGroup.data('splitter');
      var onleftExpand     = $(this).attr('onleftexpand');
      var onleftCollapse   = $(this).attr('onleftcollapse');
      var onRightxpand     = $(this).attr('onrightexpand');
      var onRightCollapse  = $(this).attr('onrightcollapse');
      var listener         = $(this).attr('onchange');  // Get listener function to fire when the sliptter is pressed
      var widthGroup       = splitGroup.width();
      var widthLeft        = typeof splitData.left !== 'undefined'
                            ? splitData.left.unit === '%'
                               ? splitData.left.width + '%'
                               : (splitData.left.width / widthGroup) * 100 + '%' // px conversion to %
                            : '';
      var widthRight       = typeof splitData.right !== 'undefined'
                            ? splitData.right.unit === '%'
                                ? splitData.right.width + '%'
                                : (splitData.right.width / widthGroup) * 100 + '%'
                            : '';
      var widthBarAbs      = 8;
      var widthBarRel      = (widthBarAbs / widthGroup) * 100 + '%';
      var initialLeft      = typeof splitData.left !== 'undefined'
                            ? splitData.left.initial : '';
      var initialRight     = typeof splitData.right !== 'undefined'
                            ? splitData.right.initial : '';
      var paddingMain      = typeof splitData.main !== 'undefined'
                            ? splitData.main.padding : '';
      var paddingLeft      = typeof splitData.left !== 'undefined'
                            ? splitData.left.padding : '';
      var paddingRight     = typeof splitData.right !== 'undefined'
                            ? splitData.right.padding : '';
      var paddingUnit      = 'px';
      var padDefTop        = '15px';
      var padDefLeft       = '20px';

      if (splitData) {

        if (paddingMain) {
              var padMainTop   = typeof paddingMain.top !== 'undefined'
                                      ? paddingMain.top + paddingUnit : '0';
              var padMainRight = typeof paddingMain.right !== 'undefined'
                                      ? paddingMain.right + paddingUnit : '0';
              var padMainBot   = typeof paddingMain.bottom !== 'undefined'
                                      ? paddingMain.bottom + paddingUnit : '0';
              var padMainLeft  = typeof paddingMain.left !== 'undefined'
                                      ? paddingMain.left + paddingUnit : '0';

          splitMain.css('padding',padMainTop + " " + padMainRight + " " + padMainBot + " " + padMainLeft);
        }

        if (widthLeft) {

          if (paddingLeft) {
              var padLeftTop   = paddingLeft.top !== 'undefined'
                                      ? paddingLeft.top + paddingUnit : padDefTop;
              var padLeftRight = paddingLeft.right !== 'undefined'
                                      ? paddingLeft.right + paddingUnit : '0';
              var padLeftBot   = paddingLeft.bottom !== 'undefined'
                                      ? paddingLeft.bottom + paddingUnit : '0';
              var padLeftLeft  = paddingLeft.left !== 'undefined'
                                      ? paddingLeft.left + paddingUnit : padDefLeft;
              var padLeftAll   = padLeftTop + " " + padLeftRight + " " + padLeftBot + " " + padLeftLeft;

            splitLeft.children('.splitter-content').css('padding', padLeftAll);
          }

          if (!initialLeft || initialLeft === 'open') {
            splitLeft.css({'width':widthLeft,'min-width': widthBarAbs + 'px'});
            splitMain.css('left', widthLeft);
          }

          if (initialLeft === 'closed') {
            splitGroup.addClass('shut-left');
            splitLeft.css({'width':widthBarRel,'min-width': widthBarAbs + 'px'});
            splitMain.css('left', widthBarRel);
          }

          splitGroup.on('click', '.splitter-left .splitter-bar', function(e) {

            if (splitGroup.hasClass('shut-left')) {
              splitGroup.removeClass('shut-left');
              splitLeft.animate({"width": widthLeft}, "fast");
              splitMain.animate({"left": widthLeft}, "fast");
              $(this).trigger(LEFT_EXPAND,[this]);
            } else {
              splitGroup.addClass('shut-left');
              splitLeft.animate({"width": widthBarRel}, "fast");
              splitMain.animate({"left": widthBarRel}, "fast");
              $(this).trigger(LEFT_COLLAPSE,[this]);
            }
          })
        }

        if (widthRight) {

          if (paddingRight) {
              var padRightTop   = paddingRight.top !== 'undefined'
                                      ? paddingRight.top + paddingUnit : padDefTop;
              var padRightRight = paddingRight.right !== 'undefined'
                                      ? paddingRight.right + paddingUnit : '0';
              var padRightBot   = paddingRight.bottom !== 'undefined'
                                      ? paddingRight.bottom + paddingUnit : '0';
              var padRightLeft  = paddingRight.left !== 'undefined'
                                      ? paddingRight.left + paddingUnit : padDefLeft;
              var padRightAll   = padRightTop + " " + padRightRight + " " + padRightBot + " " + padRightLeft;

              splitRight.children('.splitter-content').css('padding', padRightAll);
          }

          if (!initialRight || initialRight === 'open') {
            splitRight.css({'width':widthRight,'min-width': widthBarAbs + 'px'});
            splitMain.css('right', widthRight);
          }

          if (initialRight === 'closed') {
            splitGroup.addClass('shut-right')
            splitRight.css({'width':widthBarRel,'min-width': widthBarAbs + 'px'});
            splitMain.css('right', widthBarRel);
          }

          splitGroup.on('click', '.splitter-right .splitter-bar', function(e) {

            if (splitGroup.hasClass('shut-right')) {
              splitGroup.removeClass('shut-right');
              splitRight.animate({"width": widthRight}, "fast");
              splitMain.animate({"right": widthRight}, "fast");
              $(this).trigger(RIGHT_EXPAND,[this]);
            } else {
              splitGroup.addClass('shut-right');
              splitRight.animate({"width": widthBarRel}, "fast");
              splitMain.animate({"right": widthBarRel}, "fast");
              $(this).trigger(RIGHT_COLLAPSE,[this]);
            }
          });
        }

        // .width() seems to take a snapshot and not auto-update when window is resized
        $(window).resize(function() {
          widthGroup  = splitGroup.width();

          widthLeft   = typeof splitData.left !== 'undefined'
                          ? splitData.left.unit === '%'
                              ? splitData.left.width + '%'
                              : (splitData.left.width / widthGroup) * 100 + '%'
                          : '';

          widthRight  = typeof splitData.right !== 'undefined'
                          ? splitData.right.unit === '%'
                              ? splitData.right.width + '%'
                              : (splitData.right.width / widthGroup) * 100 + '%'
                          : '';

          widthBarRel = (widthBarAbs / widthGroup) * 100 + '%';

          if (splitGroup.hasClass('shut-left')) {
            splitLeft.css('width', widthBarRel);
            splitMain.css('left', widthBarRel);
          } else {
            splitLeft.css('width', widthLeft);
            splitMain.css('left', widthLeft);
          }

          if (splitGroup.hasClass('shut-right')) {
            splitRight.css('width', widthBarRel);
            splitMain.css('right', widthBarRel);
          } else {
            splitRight.css('width', widthRight);
            splitMain.css('right', widthRight);
          }
        });
      }
    }});
})(jQuery);
/**
 * Bento Side Toggle
 * Extend Bootstrp 2 Dropdown Menu with Select, sEarch and TextField
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 08/09/2013
 *
 *
 */

(function($){
  
  var debug = false;
  
  $(document).ready(function(e) {
    $('body').on('mousedown.bento-side-toggle.data-api','.bento-side-toggle',function(e){
      $(this).each(function(index,element){
        console.log(index);
        if($(element).data('bento-side-toggle')){
          return;
        }else{
          $(element).bentoSideToggle();
        }
      });
    });
  });
  
  /**
   * Declare bentoDropdownSelect jQuery Extension
   */
  $.fn.extend({bentoSideToggle: function(options){
    var toggleButton   = this;
    //Need a unique click id for this object
    var clickUID       = "bentoSideToggle_" + Math.round(Math.random()* 100000000);
    var container      = $(this).next();
    var button         = {offset:$(this).offset(), width:$(this).outerWidth(), height:$(this).outerHeight()};
    var isLeft         = $(this).hasClass('bento-side-toggle-left');
    var parentDiv      = $(this).data('parent');
    var hasDoneButton  = (typeof $(this).data('done-button') == 'undefined') ? false : $(this).data('done-button');
    var needToPosition = true;
    
    //Declare toggle 
    $(this).data('bento-side-toggle',{});
    
    //Init container location
    $(container).offset({top:0, left: 0});
        
    //Prepend the arrow
    //Left arrow for now
    $(container).before('<div class="bento-side-toggle-'+((isLeft)? 'right' : 'left')+'-arrow"></div>');    
        
        
    //Check and put done button
    if(hasDoneButton){
      container.append('<div class="bento-side-container-footer"><button class="btn btn-small pull-left done">Done</div></div>');
    }
    
    
    $(this).click(function(e){
      var parent = $(this).parent();
            
      if($(parent).hasClass('open')){
        $(parent).removeClass('open');
        $(document).off('click.'+clickUID);
      }else{
        $(parent).addClass('open');
        
        //Only position the overlay once
        if(needToPosition){
          positionContainerToButton(container, button, parentDiv);
          needToPosition = false;
        }
        
        $(document).on('click.'+clickUID,function(e) {
          
          //Bypass documnent.click on container and toggle button
          if((toggleButton.is(e.target) || 
             container.has(e.target).length > 0 || 
             //$.contains(container,e.target ) || 
             container.is(e.target)) 
             &&
             !(hasDoneButton && $(e.target).hasClass('done') && $(e.target).prop('tagName') == 'BUTTON')
             ){
            return;
          }
          
          if(hasDoneButton && $(e.target).hasClass('done') && $(e.target).tagName == 'BUTTON'){
            
          }
          
          $(parent).removeClass('open');
          $(document).off('click.'+clickUID);
        });
        
      }
    });
  }});
  
  /**
   * Private Functions used by Bento Side Toggle
   */
   
  function positionContainerToButton(container, button, parentDiv){
    var padding         = 30;
    var buttonOffset    = button.offset;
    var buttonWidth     = button.width;
    var buttonHeight    = button.height;
    var arrow           = $(container).prev();
    var isLeft          = $(arrow).hasClass('bento-side-toggle-right-arrow');
    var $containerInner = container.find('.bento-side-container-inner');
    var offsetLeft;
    var offsetRight;
    var offsetTop;
    
    //set arrow left and top
    var arrow = $(container).prev();
    var arrowOffset = $(arrow).offset();
    if(isLeft){
      $(arrow).offset({left : button.offset.left - $(arrow).outerWidth() + 10 ,
                       top  : button.offset.top +  (button.height - $(arrow).outerHeight()) * 0.5
                      });
    }else{
      $(arrow).offset({left : button.offset.left + button.width - 10,
                       top  : button.offset.top +  (button.height - $(arrow).outerHeight()) * 0.5
                      });
    }
    
    //Calculate left by finding the button width and its offset.left
    //Width to the container will change based on the height of the container 
       
    if(isLeft){      
      container.css('left', 'auto');
      container.css('right',container.parent().width()-1);
    }else{
      offsetLeft = arrowOffset.left + $(arrow).outerWidth();
      container.css('left', container.parent().width()-1);
    }
                
    //Calculate top
    var hasParentDiv      = (typeof parentDiv != 'undefined');
    var topContainer      = (hasParentDiv)? $('#'+parentDiv): $('html');
    var tOffset           = $(topContainer).offset();
    var tWidth            = $(topContainer).outerWidth();
    var tHeight           = $(topContainer).outerHeight();
    var cHeight           = $(container).height();
    var aHeight           = $(arrow).outerHeight();
    var maxHeight         = (tHeight - padding*2);
    var $footer           = $(container).find('.bento-side-container-footer'); 
    var hasFixedTopNav    = ($('.navbar-fixed-top').length > 0);
    var fixedTopNavHeight = (hasFixedTopNav) ? $('.navbar-fixed-top').height() : 0;
    

    //We need to cut off the height if there is a fixed top nav bar
    if(hasFixedTopNav && !hasParentDiv){
      maxHeight -= fixedTopNavHeight;
    }
    
    //Requested by Bianka McGovern to lock the max height to 582px (12 rows with search)
    //August 20, 2013
    maxHeight = (maxHeight > 582) ? 582 : maxHeight;
    
    $(container).css('max-height', maxHeight + 'px');
    
    //Set height with footer
    if($footer.length > 0 && (cHeight + $footer.outerHeight()) <= maxHeight){
      $(container).height(cHeight + $footer.outerHeight()); 
    }else{
      $(container).height($(container).height());
    }

    $containerInner.height(function(index,height){
      var newHeight = $(container).height()
      
      
      //The new height will change if there is a done button
      if($footer.length > 0){
        newHeight -= $footer.outerHeight();
      }
      
      $(this).trigger('heightChange',newHeight);
      return newHeight;
    });
    
    cHeight = $(container).outerHeight();
    
    //Calculate Offset Top
    //create default;
    offsetTop = buttonOffset.top - ($(container).height() - buttonHeight) * 0.5;
    
    if(hasFixedTopNav && !hasParentDiv && offsetTop < tOffset.top - fixedTopNavHeight){
      //Change the top when there is a fixed top nav
      //and the top is above the top nav on static Y
      offsetTop = tOffset.top + padding + fixedTopNavHeight;
      
    }else if(offsetTop < tOffset.top){
      //Move the container down to fit in the container if it's too high
      offsetTop = tOffset.top + padding;
      if(offsetTop > arrowOffset.top){
        offsetTop = arrowOffset.top;
      } 
    }else if((offsetTop + cHeight) > tOffset.top + tHeight){
      //Move the container up to fit in the container if it sits too low
      offsetTop = tOffset.top + tHeight - padding - cHeight;
      if(offsetTop + cHeight < arrowOffset.top + aHeight){ 
        offsetTop = arrowOffset.top + aHeight - cHeight + 20;
      }
    }

    $(container).offset({top : offsetTop});
  }
   
  function log(str){
    if(debug){
      console.log(str);
    }
  }
  
})(jQuery);/**
 * Bento Search
 *
 * @author Aaron Mendez <aaron.mendez@thomsonreuters.com>
 * @version 0.1
 * @date 07/31/2013
 *
 * Adapted from `Fuel UX Search`
 * https://github.com/ExactTarget/fuelux
 */

!function ($) {

	"use strict"; // jshint ;_;


	// SEARCH CONSTRUCTOR AND PROTOTYPE

	var Search = function (element, options) {
		this.$element = $(element);
		this.options = $.extend({}, $.fn.search.defaults, options);

		this.$button = this.$element.find('button')
		.on('click', $.proxy(this.clear, this));

		this.$input = this.$element.find('input')
			.on('keydown', $.proxy(this.keypress, this))
			.on('keyup', $.proxy(this.keypressed, this));

		this.activeSearch = '';
	};

	Search.prototype = {

		constructor: Search,

		search: function (searchText) {
			this.activeSearch = searchText;
			this.$element.trigger('searched', searchText);
		},

		toggleClear: function () {
			if (this.$input.val()) {
				$(this.$button).show();
			} else {
				$(this.$button).hide();
			}
		},

		clear: function () {
			this.activeSearch = '';
			this.$input.val('').focus();
			this.$button.hide();
			this.$element.trigger('cleared');
		},

		action: function () {
			var val = this.$input.val();

			if (val === '') {
				this.$input.focus();
        //A 'cleared' event is fired when there is nothing in the box
        //to help coder to refresh displays
        this.$button.hide();
        this.$element.trigger('cleared');
			} else if (val) {
				this.search(val);
			}
		},

		buttonclicked: function (e) {
			e.preventDefault();
			if ($(e.currentTarget).is('.disabled, :disabled')) return;
			this.action();
		},

		keypress: function (e) {
			if (e.which === 13) {
				e.preventDefault();
			}
		},

		keypressed: function (e) {
			var val, inputPresentAndUnchanged;

			this.toggleClear();

			if (e.which === 13) {
				e.preventDefault();
				this.action();
			} else {
				val = this.$input.val();
				inputPresentAndUnchanged = val && (val === this.activeSearch);
			}
		},

		disable: function () {
			this.$input.attr('disabled', 'disabled');
			this.$button.attr('disabled', 'disabled');
		},

		enable: function () {
			this.$input.removeAttr('disabled');
			this.$button.removeAttr('disabled');
		}

	};


	// SEARCH PLUGIN DEFINITION

	$.fn.search = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('bento-search');
			var options = typeof option === 'object' && option;

			if (!data) $this.data('bento-search', (data = new Search(this, options)));
			if (typeof option === 'string') data[option]();
		});
	};

	$.fn.search.defaults = {};

	$.fn.search.Constructor = Search;

	// SEARCH DATA-API

	$(function () {
		$('body').on('mousedown.search.data-api', '.bento-search', function () {
			var $this = $(this);
			if ($this.data('search')) return;
			$this.search($this.data());
		});
	});

}(window.jQuery);
/**
 * Bento Tree jQuery Extention and Helpers
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 08/14/2013
 *
 * Example:
 *
 * Initialize from static html (for Helper Class)
 *  $('.bento-tree').bentoTree();
 *
 * Javascript Creation
 *  $('.bento-tree').bentoTree(data, options);
 *
 * Data Format
 *
 * [{     'name': 'Folder 1',
 *        'type': 'folder',
 *    'isClosed': false,
 *        'data': __array_or_object__,
 *    'children': [{     'name': 'Folder 2',
 *                       'type': 'folder',
 *                   'isClosed': true,
 *                       'data': [1,2,3],
 *                   'children': [{  'name': 'Item 3',
 *                                   'type': 'item',
 *                                   'data': __array_or_object__
 *                               }]
 *                },
 *                { 'name': 'Item 2',
 *                  'type': 'item',
 *                  'data': __array_or_object__
 *                }]
 *  },
 *  {  'name': 'Item 1',
 *     'type': 'item',
 *     'data': __array_or_object__
 *  }]; 
 */
 
(function($){  
/**
 * Format the pre-defined DIV with Bento Tree Structors
 */
  $(document).ready(function(e) {
    //Find the update the trees
    $('.bento-tree').bentoTree();
  });
  
  
/**
 * Extend jQuery with new Bento Tree Public Plugin
 */  
 $.fn.extend({bentoTree: function(data, options){
   $(this).each(function(index,element){
      if($(element).data('bento-tree')){
        return;
      }else{
        $(element)._bentoTree();
      }
    });
 }});
 
  
/**
 * Extend jQuery with new Bento Tree Private Plugin
 */
 
  $.fn.extend({_bentoTree: function(data, options){
    //Debug
    var debug = false;
    
    //Default Constants
    var CLASS                     = 'bento-tree';
    var ITEM_CLASS                = 'bento-tree-item';
    var FOLDER_CLASS              = 'bento-tree-folder';
    var FOLDER_HEADER_CLASS       = 'bento-tree-folder-header';
    var FOLDER_HEADER_NAME_CLASS  = 'bento-tree-folder-name';
    var FOLDER_CONTENT_CLASS      = 'bento-tree-folder-content';
    var FOLDER_CLOSED_CLASS       = 'bento-tree-closed';
    var LEFT_INDETATION           = 20;
    var PADDING_LEFT              = 10;
    
    //Events
    var ON_SELECT                 = 'selected';
    var ON_FOLDER_OPEN            = 'opened';
    var ON_FOLDER_CLOSE           = 'closed';
   
    //Option Default Variables
    var _multiSelect  = true;
    var _isExpanded   = true; 
    var _alwaysSelect = false; 
    
    //Private Variables
    var _opt                     = (typeof options != 'undefined')? options : {};
    var _target                  = this;
    var _selectedItemsAndFolders = [];
    var _allItemsAndFolders      = [];
    var _lastSelectedIndex         = 0;
    var _selectedItem            = null;
    var _dataArray               = []; // This will be used for reference
    var _index                   = 0;
    
    // Add keyboard listeners for future support
    var _shiftKeyPressed         = false;
    var _ctrlKeyPressed          = false;
    var _altKeyPressed           = false;
    
    //Option variable overrides
    _multiSelect  = (typeof _opt.multiSelect != 'undefined')? _opt.multiSelect:_multiSelect;
    _isExpanded   = (typeof _opt.expanded != 'undefined')? _opt.expanded:_isExpanded;
    _alwaysSelect = (typeof _opt.alwaysSelect != 'undefined')? _opt.alwaysSelect:_alwaysSelect;
      
    if(typeof data != 'undefined'){
      //Draw and create the tree structure with object data dynamically
      createTreeHTMLWithData(this, data);
    }
    
    // Mark as Initiated
    $(this).data('bento-tree',{});
    
    // Draw the DOM object if there is a DATA
    if(data){
      // Check if the parent DOM has 'bento-tree' class
      if(!$(this).hasClass('bento-tree')){
        $(this).addClass('bento-tree');
      }
      
      $(this).html(createTreeHTMLWithData(data)); 
    }
   
    // Disable text selections
    $(this).attr('unselectable','on');
    $(this).attr('onselectstart','return false;');
   
    // Format the whole DOM object
    $(this).children().each(function(index, element) {
      
      //Step 1: Found out if this dom is a folder or an item
      if(isFolder(element)){
        //This is a folder
        formatFolderHeader(element);
        indentChildren(element, 1);
        //Pre-select for _opt.alwaysSelect 
        if(_alwaysSelect && index == 0){
          $(element).children('.'+FOLDER_HEADER_CLASS).click();
        }
        
      }else{
        //This is an item
        formatItemHeader(element);
        //Pre-select for _opt.alwaysSelect 
        if(_alwaysSelect && index == 0){
          $(element).click();
        }
      }
      
      //Step 2: Add left padding
      indent(element, 0);
      
      
      
    });

    // Check if all folder need to initially be expanded or not
    if(!_isExpanded){
      $('.'+FOLDER_CONTENT_CLASS).hide();
    }else{
      // Manually close the folders with '.bento-tree-closed' class
      $('.'+FOLDER_CLASS+'.'+FOLDER_CLOSED_CLASS).removeClass(FOLDER_CLOSED_CLASS).children('.'+FOLDER_CONTENT_CLASS).hide();      
    }
    
    $(document).keydown(function(e) {
      _altKeyPressed = e.altKey;
      _ctrlKeyPressed = e.ctrlKey;
      _shiftKeyPressed = e.shiftKey;
      
      if(isMac()){
        _ctrlKeyPressed = e.metaKey;
      }
    });
    
    $(document).keyup(function(e) {
      _altKeyPressed = e.altKey;
      _ctrlKeyPressed = e.ctrlKey;
      _shiftKeyPressed = e.shiftKey;
      
      if(isMac()){
        _ctrlKeyPressed = e.metaKey;
      }
    });
    
   
   /**
    * Private functions used by Bento Tree
    */
    
    
    // An arrow and folder icon will be added
    // Click listener will also be added to the arrow and the label
    function formatFolderHeader(bentoFolder){
      var bentoHeader     = $(bentoFolder).children('.'+FOLDER_HEADER_CLASS);
      var bentoHeaderArea = $(bentoHeader).find('.'+FOLDER_HEADER_NAME_CLASS);
      
      // Append data values 
      $(bentoFolder).data('index', _index++);
      $(bentoFolder).data('name', $(bentoHeaderArea).text());
      $(bentoFolder).data('type', 'folder');
      
      _allItemsAndFolders.push(bentoFolder);
      
      // Get user defined data from either static OR programmed jSON
      if(typeof $(bentoFolder).data('bento-tree') != 'undefined'){
        $(bentoFolder).data('data', $(bentoFolder).data('bento-tree'));
        //Remove 'bento-tree' data variable
        $(bentoFolder).removeAttr('data-bento-tree');
        $(bentoFolder).removeData('bento-tree');
        $(bentoFolder).removeData('bentoTree');
      }else if(typeof $(bentoFolder).data('tree-index') != 'undefined'){
        var bentoIndex = parseInt($(bentoFolder).data('tree-index'));
        $(bentoFolder).data('data', _dataArray[bentoIndex]);
        $(bentoFolder).removeAttr('data-tree-index');
        $(bentoFolder).removeData('tree-index');
      }
      
      if(debug){
          $(bentoHeaderArea).prepend(_index-1);
      }
      
      // Insert icons
      if(_isExpanded && !$(bentoFolder).hasClass(FOLDER_CLOSED_CLASS)){
        $(bentoHeaderArea).prepend('<i class="icon-folder-open"></i>&nbsp;');
        $(bentoHeaderArea).wrapInner('<div class="folder-select-area" />');
        $(bentoHeaderArea).prepend('<div class="bento-tree-folder-arrow open"></div>');
      }else{
        $(bentoHeaderArea).prepend('<i class="icon-folder-close"></i>&nbsp;');
        $(bentoHeaderArea).wrapInner('<div class="folder-select-area" />');
        $(bentoHeaderArea).prepend('<div class="bento-tree-folder-arrow close"></div>');
      }
      
      //Listen to folder expend click
      $(bentoHeaderArea).children('.bento-tree-folder-arrow').click(function(e) {
        var icon = $(this).next().children(':first-child');
        var content = $(this).parent().parent().parent().children('.'+FOLDER_CONTENT_CLASS);
       
        if($(icon).hasClass('icon-folder-close')){
          $(this).removeClass('close').addClass('open');
          $(icon).removeClass('icon-folder-close').addClass('icon-folder-open');
          $(content).show(60);
          
          //Dispatch folder opening event
          $(_target).trigger(getEvent(bentoFolder, ON_FOLDER_OPEN));
         
        }else{
          $(this).addClass('close').removeClass('open');
          $(icon).addClass('icon-folder-close').removeClass('icon-folder-open');
          $(content).hide(60);
          
          //Dispatch folder opening event
          $(_target).trigger(getEvent(bentoFolder, ON_FOLDER_CLOSE));
        }
      });
      
      // Listen to folder select click
      $(bentoHeader).click(function(e) {
        // Will need to ignore arrow clicks from selecting
        if($(e.target).hasClass('bento-tree-folder-arrow')){
          return;
        }      
         
        // Unselected the last item if _multiSelect == false
        if(_selectedItem && !_multiSelect && _selectedItem != this){
          $(_selectedItem).removeClass('selected');
        }
        
        _selectedItem = null;
        
        if($(this).hasClass('selected')){
          //$(this).removeClass('selected');
          
          // Remove this from the selection Array
          if(_multiSelect && (_ctrlKeyPressed || _selectedItemsAndFolders.length == 1)){
            //Case 1:
            //With Control Key pressed, and this is the only element selected
            if(_alwaysSelect){
              //Unselect the last item is not alowed
              return;
            }
            removeFromArray(bentoFolder);
            $(this).removeClass('selected');
            updateLastSelectedIndex(0);
          }else if(_multiSelect && !_ctrlKeyPressed && !_shiftKeyPressed){
            //Case 2:
            //Clear all other selections except for this one
            $(_target).find('.selected').removeClass('selected');
            $(this).addClass('selected');
          
            updateLastSelectedIndex($(bentoFolder).data('index'));
            
            // Trigger selection Event
            $(_target).trigger(getEvent(bentoFolder,ON_SELECT));
          }else if(_multiSelect && _shiftKeyPressed){
            selectItemsAndFoldersInRange(_lastSelectedIndex, $(bentoFolder).data('index'));
          }else{
            //Case 3: Single Selection
            if(_alwaysSelect){
              //Unselect the last item is not alowed
              return;
            }
            $(this).removeClass('selected');
          }    
          
        }else{
          var indexToUpdate = $(bentoFolder).data('index');
          $(this).addClass('selected');
          _selectedItem = this; 
          
          //Need to clear out all other selected items
          if(_multiSelect && !_ctrlKeyPressed && !_shiftKeyPressed){
            $(_target).find('.selected').removeClass('selected');
            $(this).addClass('selected');
            updateLastSelectedIndex(indexToUpdate);
          }else if(_multiSelect && _ctrlKeyPressed && !_shiftKeyPressed){
            updateLastSelectedIndex(indexToUpdate);
          }else if(_multiSelect && _shiftKeyPressed){
            selectItemsAndFoldersInRange(_lastSelectedIndex, indexToUpdate);
          }

          // Trigger the selection Event
          $(_target).trigger(getEvent(bentoFolder,ON_SELECT));
        }    
      });
    }
    
    // This will put an icon to a tree item, not folder
    function formatItemHeader(bentoItem){
      
      // Append data values 
      $(bentoItem).data('index', _index++);
      $(bentoItem).data('name', $(bentoItem).text());
      $(bentoItem).data('type', 'item');
      
      _allItemsAndFolders.push(bentoItem);
      
      // Get user defined data from either static OR programmed jSON
      if(typeof $(bentoItem).data('bento-tree') != 'undefined'){
        $(bentoItem).data('data', $(bentoItem).data('bento-tree'));
      }else if(typeof $(bentoItem).data('tree-index') != 'undefined'){
        var bentoIndex = parseInt($(bentoItem).data('tree-index'));
        $(bentoItem).data('data', _dataArray[bentoIndex]);
        $(bentoItem).removeAttr('data-tree-index');
        $(bentoItem).removeData('tree-index');
      }
      
      if(debug){
          $(bentoItem).prepend(_index-1);
      }
      // Insert Icon
      $(bentoItem).prepend('<i class="icon-list-alt"></i>&nbsp;');
      
      // Listen to select command
      $(bentoItem).click(function(e) {
        
        // Unselected the last item if _multiSelect == false
        if(_selectedItem && !_multiSelect && _selectedItem != this){
          $(_selectedItem).removeClass('selected');
        }
        
        _selectedItem = null;
         
        if($(this).hasClass('selected')){
          
          // Remove this from the selection Array
          if(_multiSelect && (_ctrlKeyPressed || _selectedItemsAndFolders.length == 1)){
            //Case 1:
            //With Control Key pressed, and this is the only element selected
            if(_alwaysSelect){
              //Unselect the last item is not alowed
              return;
            }
            removeFromArray(bentoItem);
            $(this).removeClass('selected');
            updateLastSelectedIndex(0);
          }else if(_multiSelect && !_ctrlKeyPressed && !_shiftKeyPressed){
            //Case 2:
            //Clear all other selections except for this one
            $(_target).find('.selected').removeClass('selected');
            $(this).addClass('selected');
            
            updateLastSelectedIndex($(bentoItem).data('index'));
            
            // Trigger selection Event
            $(_target).trigger(getEvent(bentoItem,ON_SELECT));
          }else if(_multiSelect && _shiftKeyPressed){
            selectItemsAndFoldersInRange(_lastSelectedIndex, $(bentoItem).data('index'));
          }else{
            //Case 3: Single Selection
            if(_alwaysSelect){
              //Unselect the last item is not alowed
              return;
            }
            $(this).removeClass('selected');
          }
          
        }else{
          var indexToUpdate = $(bentoItem).data('index');
          $(this).addClass('selected');
          _selectedItem = this;

          //Need to clear out all other selected items
          if(_multiSelect && !_ctrlKeyPressed && !_shiftKeyPressed){
            $(_target).find('.selected').removeClass('selected');
            $(this).addClass('selected');
            updateLastSelectedIndex(indexToUpdate);
          }else if(_multiSelect && _ctrlKeyPressed && !_shiftKeyPressed){
            updateLastSelectedIndex(indexToUpdate);
          }else if(_multiSelect && _shiftKeyPressed){
            selectItemsAndFoldersInRange(_lastSelectedIndex, indexToUpdate);
          }
          
          // Trigger selection Event
          $(_target).trigger(getEvent(bentoItem,ON_SELECT));
          
        }
      });
    }
    
    // Indent all the children and grand children recursively
    function indentChildren(bentoFolder, level){
      
      $(bentoFolder).children('.'+FOLDER_CONTENT_CLASS).children().each(function(index, element) {
        
        //Indent the current item by level * LEFT_INDETATION
        indent(element,level*LEFT_INDETATION);
        
        //Will recursively indent all the items and folders
        if(isFolder(element)){
          formatFolderHeader(element);
          indentChildren(element, level+1);
        }else{
          formatItemHeader(element);
        }
        
      });
    }
    
    // Add and element to selection array
    function addToArray(element){
      _selectedItemsAndFolders.push($(element).data());
      return _selectedItemsAndFolders;
    }
    
    // Remove and element from selection array
    function removeFromArray(element){
      var arrayIndex = -1;
      var dataIndex = $(element).data().index;
      for(var i=0; i<_selectedItemsAndFolders.length; i++){
        if(_selectedItemsAndFolders[i].index == dataIndex){
          arrayIndex = i;
          break;
        } 
      }
      
      // Only remove it when the arrayIndex is found
      if(arrayIndex > -1){
        _selectedItemsAndFolders.splice(arrayIndex, 1);
      }
      
      return _selectedItemsAndFolders;
    }
    
    // Clear array 
    function clearArray(){
      _selectedItemsAndFolders = [];
    }
    
    // Get the parents of the current item
    function getParents(element){
      var parents = $(element).parents('.bento-tree-folder');
      
      if(parents.length > 0){
        var arr = [];
        
        for(var i=0; i<parents.length; i++){
          arr.unshift($(parents[i]).data());
        }
        
        arr.push($(element).data());
        
        return arr;
      }else{
        return [$(element).data()];
      }
      
    }
    
    // Indent the current Label or Item
    function indent(element, value){
      var bentoItem = element;
      var leftIndexAdjustMent;
      
      if(isFolder(bentoItem)){
        bentoItem = $(element).children('.'+FOLDER_HEADER_CLASS).find('.'+FOLDER_HEADER_NAME_CLASS);
        leftIndexAdjustMent = -4;
      }else{
        leftIndexAdjustMent = 11;
      }
      
      // Add PADDING_LEFT and Value together
      $(bentoItem).css('padding-left',(PADDING_LEFT+value+leftIndexAdjustMent) + 'px');
    }
    
    // Check if this item is a folder or not
    function isFolder(object){
      return $(object).hasClass(FOLDER_CLASS);
    }
    
    // Render HTML code from Tree Data recursively
    // Data must be Array
    //
    function createTreeHTMLWithData(data){
      var htmlString = '';
            
      for(var i=0; i<data.length; i++){
        var treeItem = data[i];
        
        if(treeItem.type == 'folder'){
          //Folder opening tag
          htmlString += '<div class="'+FOLDER_CLASS;
          
          //Close the folder
          if(treeItem.isClosed){
            htmlString += ' ' + FOLDER_CLOSED_CLASS;
          }
          
          htmlString += '" data-tree-index="'+pushToDataArray(treeItem)+'">';
          
          //Header
          htmlString += '<div class="'+FOLDER_HEADER_CLASS+'">';
          htmlString += '<div class="'+FOLDER_HEADER_NAME_CLASS+'">'+treeItem.name+'</div>';
          htmlString += '</div>';//End of Folder Header
          
          //Conetnt
          htmlString += '<div class="'+FOLDER_CONTENT_CLASS+'">'+createTreeHTMLWithData(treeItem.children)+'</div>';
          
          //End of Folder
          htmlString += '</div>';
        }else if(treeItem.type == 'item'){
          htmlString += '<div class="'+ITEM_CLASS+'" data-tree-index="'+pushToDataArray(treeItem)+'">'+treeItem.name+'</div>';  
        }
      }
      
      return htmlString;
    }
    
    
    // Create a jQeury Event based on it's event type
    // This will also alter _selectedItemsAndFolders items
    function getEvent(object, eventType){
      var currentEvent = jQuery.Event(eventType);
                    
      if(_multiSelect){
        
        //With Control key pressed
        if(eventType == ON_SELECT && _ctrlKeyPressed){
          addToArray(object);
        }else if(!_shiftKeyPressed){
          //Only select on at a time
          clearArray();
          addToArray(object);
        }
        
        currentEvent.selectedItems = _selectedItemsAndFolders;
        
      }else{
        
        if(eventType == ON_SELECT){
          currentEvent.selectedItems = [$(object).data()];
        }else{
          currentEvent.selectedItems = [$(_selectedItem).data()];
        }
        
      }
      
      if(isFolder(object)){
        currentEvent.folderData = $(object).data();
      }
      
      currentEvent.hierarchy = getParents(object);
      
      return currentEvent;
    }
    
    //Select a range of items and folder by the given range
    function selectItemsAndFoldersInRange(r1, r2){
      var start;
      var end;
      
      //Make sure start < end
      if(r1>r2){
        start = r2;
        end = r1;
      }else{
        start = r1;
        end = r2;
      }
      
      log('Select range ['+start+'...'+end+']');
      
      //Clear all selected items and folders from Array
      clearArray();
      //Clear all .selecetd Classes
      $(_target).find('.selected').removeClass('selected');
      
      //Add and select every item or fold in range
      for(var i=start; i<=end; i++){
        var item = _allItemsAndFolders[i]
        var data = $(item).data();
        //Append this to the _selectedItemsAndFolders;
        addToArray(item);
        
        //Mark this item or folder as selected
        var itemToSelect;
        if(data.type == "folder"){
          itemToSelect = $(item).children('.'+FOLDER_HEADER_CLASS);
        }else{
          itemToSelect = item;
        }
        $(itemToSelect).addClass('selected');  
      }
    }
    
    
    //Update _lastSelectedIndex to current when the shift key is not pressed
    function updateLastSelectedIndex(index){
      if(!_shiftKeyPressed){
        _lastSelectedIndex = index;
        log('_lastSelectedIndex is upadted to '+ _lastSelectedIndex);
      }
    }
    
    // This function is used to prepare JS tree creation
    function pushToDataArray(obj){
      var index = _dataArray.length;
      _dataArray.push(obj.data);
      
      return index;
    }
    
    function log(str){
      if(debug){
        console.log(str);
      }
    }
    
    function isMac(){
      return navigator.userAgent.indexOf("Mac OS X") != -1;
    }
    
    return this;
   
 }}); // end of Bento Tree Plugin
})(jQuery);
/**
 * Bento Wizard jQuery Extention and Helpers
 *
 * @author Aaron Medez <aaron.mendez@thomsonreuters.com>, Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 09/05/2013
 *
 *
 */

(function($){
  $(document).ready(function(e) {
    $('.nav-wizard').bentoNavWizard();
    $('.wizard').bentoWizard();

  });

  $.fn.extend({
    /* WIZARD - Tab header items width fallback
      Useful for x cases:
      - `data-steps` was neglected to be set on `.nav-wizard`
      - `data-steps` was set incorrectly on `.nav-wizard`
      - the `data-steps` value, though perhaps correct, exceeds the current 10-step maximum provided for by CSS classes. */
    bentoNavWizard:function(options){
      var opt = (typeof options == 'undefined') ? {} : options;

      $(this).each(function() {

        if($(this).data('bentoNavWizard')){
          return;
        }

        $(this).data('bentoNavWizard',{});

        var $wizSteps = $(this).children();
        if ($wizSteps.length === $(this).data('steps') && $wizSteps.length <= 10) return ;
        var wizStepWidth = 100 / $wizSteps.length - 0.1;
        $wizSteps.css('width', wizStepWidth + '%');
      })


    },

    bentoWizard:function(options){
      var opt = (typeof options == 'undefined') ? {} : options;

      $(this).each(function(){
        if ($(this).children('.nav-wizard').children('li:first-child').hasClass('active')) {
          $(this).children('.pager').children('.previous').hide();
        } else {
          $(this).children('.pager').children('.previous').show();
        }
        if ($(this).children('.nav-wizard').children('li:last-child').hasClass('active')) {
          $(this).children('.pager').children('.next').hide();
          $(this).children('.pager').children('.done').show();
        } else {
          $(this).children('.pager').children('.next').show();
          $(this).children('.pager').children('.done').hide();
        }
      });

      /* WIZARD - Tab/Pager coordination
      We want Tab to update when Pager is clicked,
      and Pager to hide/show buttons approriately when header is clicked,
      Use the $().tab `shown` event to set Pager (see Tabs documentation)*/
      $('a[data-toggle="tab"]').each(function(index,element){

        if($(this).data('bentoWizardTab')){
          return;
        }

        $(this).data('bentoWizardTab', {});

        $(this).on('shown', function(e) {
          $('.wizard').bentoWizard();
        });
      });

      // When a mouseclick occurs on a Pager, execute `.click()` on the appropriate Tab.
      $('.wizard .pager a').each(function(index,element){

        console.log('bento wizard clicked :' + element.innerHTML);

        if($(element).data('bentoWizardClick')){
          return;
        }
        $(element).data('bentoWizardClick', {});

        $(element).click(function(e) {

          e.preventDefault();
          // do nothing if there is no nav-wizard to coordinate with...
          if ($(element).closest('.wizard').children('.nav-wizard').length === 0) return;
          var theParent   = $(element).parent('li');
          var currentStep = $(element).closest('.wizard').children('.nav-wizard').children('.active');
          // limit to `next` and `prev`...
          if (!theParent.hasClass('next') && !theParent.hasClass('previous')) return;
          theParent.hasClass('next') ? currentStep.next('li').children('a').click() : currentStep.prev('li').children('a').click();
        });
      });
    }
  });

})(jQuery);
/**
 * Bento Mega Menu
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 09/05/2013
 *
 */
(function($){
  
  $(document).ready(function(e) {
    $('.menu-mega').bentoMegamenu();
  });
  
  $.fn.extend({bentoMegamenu:function(options){
    var opt = (typeof options == 'undefined')? {} : options;
    
    $(this).find('.dropdown-menu').each(function(index,element){
         
         //Need to display it in the DOM to get the width of the columns 
         var originalLeft =  $(this).css('left');
         
         $(this).css('left', '-3000px');
         $(this).show();
         
         //Find the width of the dropdown by the number of columns each row has
         $(this).find('.menu-row').each(function(index, element) {
             var rowWidth   = 0;
             var numColumns = $(this).find('.column').length;
             
             $(this).find('.menu-column').each(function(index, element) {
                 
                rowWidth += $(this).width() + 20; //20px padding right
              
             });
             
             //Set the current row's width
             if(rowWidth > 0){
               $(this).width(rowWidth);
             }else{
               $(this).css('width','100%');
             }
     
         });
         
         $(this).removeAttr('style');         
     });    
  }});
})(jQuery);
/**
 * Bento Datatable Toolbar Helper Class
 *
 * This helper method will move the contents from class="datatable-toolbar" into the Datatable DOMs
 *
 * @date 11/26/2013
 * @version 0.1
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 *
 */

(function($){
  
  
  /**
   * Find the toolbar and its children and moved them into "navbar" under datatable
   * We will need to make sure that the datatable has already initialized with the following or equivalent:
   *
   * $('.datatable').dataTable({
   *     "sDom":'<"navbar navbar-toolbar"<"navbar-inner"f><"clear">>rtpil',
   *     "sPaginationType": "full_numbers"
   * });
   *
   */
   
  $.fn.extend({moveToDatatableToolbar: function(dataTableID){
    var $toolbar = $(dataTableID + '_wrapper').find('.navbar-inner');
        
    //Datatable is NOT properly initialized
    if($toolbar.length == 0){
      if(console && console.log){
        console.log('ERROR: Datatable is not properly initialized.');
      }
      return;
    }
    
    //Continue
    $toolbar.prepend($(this).children());
    
    $(this).remove();
        
  }});
})(jQuery);
/**
 * Bento Datatables Pagination Help
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1
 * @date 12/03/2013
 *
 * To customize pagination and paging input field
 */

(function($){
  
  
  //Datatables is not used
  if(typeof $.fn.dataTableExt == 'undefined'){
     return;
  }
  
  $.fn.dataTableExt.oPagination.input = {
    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
    { 
      var nFirst = document.createElement( 'span' );
      var nPrevious = document.createElement( 'span' );
      var nNext = document.createElement( 'span' );
      var nLast = document.createElement( 'span' );
      var nJumpTo = document.createElement( 'span' );
      var nInput = document.createElement( 'input' );
      var nInputWrapper = document.createElement( 'span' );
      var nInputGoButton = document.createElement( 'div' );
      var nPage = document.createElement( 'span' );
      var nOf = document.createElement( 'span' );
      var nButtonWrapper = document.createElement( 'div' );
      
      nFirst.innerHTML = oSettings.oLanguage.oPaginate.sFirst;
      //nPrevious.innerHTML = oSettings.oLanguage.oPaginate.sPrevious;
      //nNext.innerHTML = oSettings.oLanguage.oPaginate.sNext;
      nPrevious.innerHTML = '<div class="arrow-left-large-gray"></div>';
      nNext.innerHTML = '<div class="arrow-right-large-gray"></div>';
      nLast.innerHTML = oSettings.oLanguage.oPaginate.sLast;
      nJumpTo.innerHTML = "Jump to ";
      nInputGoButton.innerHTML = "Go";
      
      nFirst.className = "paginate-button first btn";
      nPrevious.className = "paginate-button previous btn";
      nNext.className="paginate-button next btn";
      nLast.className = "paginate-button last btn";
      nOf.className = "paginate-of";
      nPage.className = "paginate-page";
      nJumpTo.className = "paginate-jumpto";
      nInputWrapper.className = "btn-group paginate-input-group"
      nInputGoButton.className = "btn";
      nButtonWrapper.className = "btn-group paginate-button-group";
      
      if ( oSettings.sTableId !== '' )
      {
        nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
        nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
        nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
        nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
        nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
      }
      
      nInput.type = "text";
      nInput.style.width = "50px";
      nInput.style.display = "inline";
      nInput.style.textAlign = "center";
      nPage.innerHTML = "Page ";
      
      
      nButtonWrapper.appendChild( nPrevious );
      nButtonWrapper.appendChild( nNext );
      
      nPaging.appendChild( nButtonWrapper );
      //nPaging.appendChild( nFirst );
      //nPaging.appendChild( nPrevious );
      //nPaging.appendChild( nNext );
      nPaging.appendChild( nPage );
      nPaging.appendChild( nOf );
      nPaging.appendChild( nJumpTo );
      
      //Add input button group
      nInputWrapper.appendChild( nInput );
      nInputWrapper.appendChild( nInputGoButton );
      nPaging.appendChild( nInputWrapper );
      //nPaging.appendChild( nLast );
      
      $(nFirst).on('click touchend', function () {
        oSettings.oApi._fnPageChange( oSettings, "first" );
        fnCallbackDraw( oSettings );
      } );
      
      $(nPrevious).on('click touchend', function() {
        oSettings.oApi._fnPageChange( oSettings, "previous" );
        oSettings.paginateButtonClicked = 'previous';
        fnCallbackDraw( oSettings );
      } );
      
      $(nNext).on('click touchend', function() {
        oSettings.oApi._fnPageChange( oSettings, "next" );
        oSettings.paginateButtonClicked = 'next';
        fnCallbackDraw( oSettings );
      } );
      
      $(nLast).on('click touchend', function() {
        oSettings.oApi._fnPageChange( oSettings, "last" );
        fnCallbackDraw( oSettings );
      } );
      
      $(nInput).keyup( function (e) {
        /*
        if ( this.value == "" || this.value.match(/[^0-9]/) ){
          // Nothing entered or non-numeric character 
          return;
        }else if ( e.which == 38 || e.which == 39 ){
          this.value++;
          updateTableWith(this.value);
        }
        else if ( (e.which == 37 || e.which == 40) && this.value > 1 ){
          this.value--;
          updateTableWith(this.value);
        } else */if ( ( e.which == 13 ) && this.value > 0 ){
          updateTableWith(this.value);
        }
        
      } );
      
      $(nInputGoButton).on('click touchend',function(e) {
        updateTableWith($(nInput).val());
      });
      
      /**
       * Function to update the current table with a given page number from the text input field
       */
      function updateTableWith(value){
        var iNewStart = oSettings._iDisplayLength * (value - 1);
        if ( iNewStart > oSettings.fnRecordsDisplay() )
        {
          /* Display overrun */
          oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay()-1) /
            oSettings._iDisplayLength)-1) * oSettings._iDisplayLength;
          
          fnCallbackDraw( oSettings );
          return;
        }
        oSettings.paginateButtonClicked = 'go';
        oSettings._iDisplayStart = iNewStart;
        fnCallbackDraw( oSettings );
      }
      
      /* Take the brutal approach to cancelling text selection */
      $('span', nPaging).bind( 'selectstart', function () { return false; } );
    },
     
     
    "fnUpdate": function ( oSettings, fnCallbackDraw )
    {
      if ( !oSettings.aanFeatures.p )
      {
        return;
      }
      var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
      var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
      
      /* Loop over each instance of the pager */
      var an = oSettings.aanFeatures.p;
      for ( var i=0, iLen=an.length ; i<iLen ; i++ )
      {
        var spans = an[i].getElementsByTagName('span');
        var inputs = an[i].getElementsByTagName('input');
        spans[3].innerHTML = iCurrentPage+" of "+iPages;
        if(oSettings.paginateButtonClicked == 'go'){
          inputs[0].value = iCurrentPage;
        }else{
          inputs[0].value = '';
        }
      }
    }
  };
})(jQuery);
/*
* File:        jquery.dataTables.grouping.js
* Version:     1.2.9.
* Author:      Jovan Popovic 
* 
* Copyright 2013 Jovan Popovic, all rights reserved.
*
* This source file is free software, under either the GPL v2 license or a
* BSD style license, as supplied with this software.
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. 
* Parameters:
* @iGroupingColumnIndex                                 Integer             Index of the column that will be used for grouping - default 0
* @sGroupingColumnSortDirection                         Enumeration         Sort direction of the group
* @iGroupingOrderByColumnIndex                          Integer             Index of the column that will be used for ordering groups
* @sGroupingClass                                       String              Class that will be associated to the group row. Default - "group"
* @sGroupItemClass                                      String              Class that will be associated to the group row of group items. Default - "group-item"
* @bSetGroupingClassOnTR                                Boolean             If set class will be set to the TR instead of the TD withing the grouping TR
* @bHideGroupingColumn                                  Boolean             Hide column used for grouping once results are grouped. Default - true
* @bHideGroupingOrderByColumn                           Boolean             Hide column used for ordering groups once results are grouped. Default - true
* @sGroupBy                                             Enumeration         Type of grouping that should be applied. Values "name"(default), "letter", "year"
* @sGroupLabelPrefix                                    String              Prefix that will be added to each group cell
* @bExpandableGrouping                                  Boolean             Attach expand/collapse handlers to the grouping rows
* @bExpandSingleGroup                                   Boolean             Use accordon grouping
* @iExpandGroupOffset                                   Integer             Number of pixels to set scroll position above the currently selected group. If -1 scroll will be alligned to the table
* General settings
* @sDateFormat: "dd/MM/yyyy"                            String              Date format used for grouping
* @sEmptyGroupLabel                                     String              Lable that will be placed as group if grouping cells are empty. Default "-"

* Parameters used in the second level grouping
* @iGroupingColumnIndex2                                Integer             Index of the secondary column that will be used for grouping - default 0
* @sGroupingColumnSortDirection2                        Enumeration         Sort direction of the secondary group
* @iGroupingOrderByColumnIndex2                         Integer             Index of the column that will be used for ordering secondary groups
* @sGroupingClass2                                      String              Class that will be associated to the secondary group row. Default "subgroup"
* @sGroupItemClass2                                     String              Class that will be associated to the secondary group row of group items. Default "subgroup-item"
* @bHideGroupingColumn2                                 Boolean             Hide column used for secondary grouping once results are grouped. Default - true,
* @bHideGroupingOrderByColumn2                          Boolean             Hide column used for ordering secondary groups once results are grouped. Default - true,
* @sGroupBy2                                            Enumeration         Type of grouping that should be applied to secondary column. Values "name"(default), "letter", "year",
* @sGroupLabelPrefix2                                   String              Prefix that will be added to each secondary group cell
* @fnOnGrouped                                          Function            Function that is called when grouping is finished. Function has no parameters.
*/
(function ($) {

	"use strict";

    $.fn.rowGrouping = function (options) {

        function _fnOnGrouped() {

        }

        function _fnOnGroupCreated(oGroup, sGroup, iLevel) {
            ///<summary>
            ///Function called when a new grouping row is created(it should be overriden in properties)
            ///</summary>
        }
		
		function _fnOnGroupCompleted(oGroup, sGroup, iLevel) {
            ///<summary>
            ///Function called when a new grouping row is created(it should be overriden in properties)
            ///</summary>
        }

        function _getMonthName(iMonth) {
            var asMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return asMonths[iMonth - 1];
        }

        var defaults = {

            iGroupingColumnIndex: 0,
            sGroupingColumnSortDirection: "",
            iGroupingOrderByColumnIndex: -1,
            sGroupingClass: "group",
			sGroupItemClass: "group-item",
            bHideGroupingColumn: true,
            bHideGroupingOrderByColumn: true,
            sGroupBy: "name",
            sGroupLabelPrefix: "",
            fnGroupLabelFormat: function (label) { return label; },
            bExpandableGrouping: false,
            bExpandSingleGroup: false,
            iExpandGroupOffset: 100,
            asExpandedGroups: null,

            sDateFormat: "dd/MM/yyyy",
            sEmptyGroupLabel: "-",
            bSetGroupingClassOnTR: false,

            iGroupingColumnIndex2: -1,
            sGroupingColumnSortDirection2: "",
            iGroupingOrderByColumnIndex2: -1,
            sGroupingClass2: "subgroup",
            sGroupItemClass2: "subgroup-item",
            bHideGroupingColumn2: true,
            bHideGroupingOrderByColumn2: true,
            sGroupBy2: "name",
            sGroupLabelPrefix2: "",
            fnGroupLabelFormat2: function (label) { return label; },
            bExpandableGrouping2: false,

            fnOnGrouped: _fnOnGrouped,

            fnOnGroupCreated: _fnOnGroupCreated,
            fnOnGroupCompleted: _fnOnGroupCompleted,

            oHideEffect: null, // { method: "hide", duration: "fast", easing: "linear" },
            oShowEffect: null,//{ method: "show", duration: "slow", easing: "linear" }
			
			bUseFilteringForGrouping: false // This is still work in progress option
        };
        return this.each(function (index, elem) {

            var oTable = $(elem).dataTable();

            var aoGroups = new Array();
            $(this).dataTableExt.aoGroups = aoGroups;

            function fnCreateGroupRow(sGroupCleaned, sGroup, iColspan) {
                var nGroup = document.createElement('tr');
                var nCell = document.createElement('td');
                nGroup.id = "group-id-" + oTable.attr("id") + "_" + sGroupCleaned;

                var oGroup = { id: nGroup.id, key: sGroupCleaned, text: sGroup, level: 0, groupItemClass: ".group-item-" + sGroupCleaned, dataGroup: sGroupCleaned, aoSubgroups: new Array() };



                if (properties.bSetGroupingClassOnTR) {
                    nGroup.className = properties.sGroupingClass + " " + sGroupCleaned;
                } else {
                    nCell.className = properties.sGroupingClass + " " + sGroupCleaned;
                }

                nCell.colSpan = iColspan;
                nCell.innerHTML = properties.sGroupLabelPrefix + properties.fnGroupLabelFormat(sGroup == "" ? properties.sEmptyGroupLabel : sGroup, oGroup );
                if (properties.bExpandableGrouping) {

                    if (!_fnIsGroupCollapsed(sGroupCleaned)) {
                        nCell.className += " expanded-group";
                        oGroup.state = "expanded";
                    } else {
                        nCell.className += " collapsed-group";
                        oGroup.state = "collapsed";
                    }
                    nCell.className += " group-item-expander";
                    $(nCell).attr('data-group', oGroup.dataGroup); //Fix provided by mssskhalsa (Issue 5)
                    $(nCell).attr("data-group-level", oGroup.level);
                    $(nCell).click(_fnOnGroupClick);
                }
                nGroup.appendChild(nCell);
                aoGroups[sGroupCleaned] = oGroup;
                oGroup.nGroup = nGroup;
                properties.fnOnGroupCreated(oGroup, sGroupCleaned, 1);
                return oGroup;
            }

            function _fnCreateGroup2Row(sGroup2, sGroupLabel, iColspan, oParentGroup) {

                var nGroup2 = document.createElement('tr');
                nGroup2.id = oParentGroup.id + "_" + sGroup2;
                var nCell2 = document.createElement('td');
                var dataGroup = oParentGroup.dataGroup + '_' + sGroup2;

                var oGroup = { id: nGroup2.id, key: sGroup2, text: sGroupLabel, level: oParentGroup.level + 1, groupItemClass: ".group-item-" + dataGroup,
                    dataGroup: dataGroup, aoSubgroups: new Array()
                };

                if (properties.bSetGroupingClassOnTR) {
                    nGroup2.className = properties.sGroupingClass2 + " " + sGroup2;
                } else {
                    nCell2.className = properties.sGroupingClass2 + " " + sGroup2;
                }

                nCell2.colSpan = iColspan;
                nCell2.innerHTML = properties.sGroupLabelPrefix2 + properties.fnGroupLabelFormat2(sGroupLabel == "" ? properties.sEmptyGroupLabel : sGroupLabel, oGroup);

                if (properties.bExpandableGrouping) {

                    nGroup2.className += " group-item-" + oParentGroup.dataGroup;
                }


                if (properties.bExpandableGrouping && properties.bExpandableGrouping2) {

                    if (!_fnIsGroupCollapsed(oGroup.dataGroup)) {
                        nCell2.className += " expanded-group";
                        oGroup.state = "expanded";
                    } else {
                        nCell2.className += " collapsed-group";
                        oGroup.state = "collapsed";
                    }
                    nCell2.className += " group-item-expander";
                    $(nCell2).attr('data-group', oGroup.dataGroup);
                    $(nCell2).attr("data-group-level", oGroup.level);
                    $(nCell2).click(_fnOnGroupClick);
                }

                nGroup2.appendChild(nCell2);

                oParentGroup.aoSubgroups[oGroup.dataGroup] = oGroup;
                aoGroups[oGroup.dataGroup] = oGroup;
                oGroup.nGroup = nGroup2;
                properties.fnOnGroupCreated(oGroup, sGroup2, 2);
                return oGroup;
            }

            function _fnIsGroupCollapsed(sGroup) {
                if (aoGroups[sGroup] != null)
                    return (aoGroups[sGroup].state == "collapsed");
                else
                    if (sGroup.indexOf("_") > -1)
                        true;
                    else
						if(bInitialGrouping && (asExpandedGroups==null || asExpandedGroups.length == 0))
							return false;// initially if asExpandedGroups is empty - no one is collapsed
						else
							return ($.inArray(sGroup, asExpandedGroups) == -1); //the last chance check asExpandedGroups
            }			
			
            function _fnGetYear(x) {
				if(x.length< (iYearIndex+iYearLength) )
					return x;
				else
					return x.substr(iYearIndex, iYearLength);
            }
            function _fnGetGroupByName(x) {
                return x;
            }

            function _fnGetGroupByLetter(x) {
                return x.substr(0, 1);
            }

            function _fnGetGroupByYear(x) {
                return _fnGetYear(x);
                //return Date.parseExact(x, properties.sDateFormat).getFullYear();//slooooow
            }

            function _fnGetGroupByYearMonth(x) {
                //var date = Date.parseExact(x, "dd/MM/yyyy");
                //return date.getFullYear() + " / " + date.getMonthName();
                //return x.substr(iYearIndex, iYearLength) + '/' + x.substr(iMonthIndex, iMonthLength);
                return x.substr(iYearIndex, iYearLength) + ' ' + _getMonthName(x.substr(iMonthIndex, iMonthLength));
            }

            function _fnGetCleanedGroup(sGroup) {

                if (sGroup === "") return "-";
                return sGroup.toLowerCase().replace(/[^a-zA-Z0-9\u0080-\uFFFF]+/g, "-"); //fix for unicode characters (Issue 23)
                //return sGroup.toLowerCase().replace(/\W+/g, "-"); //Fix provided by bmathews (Issue 7)
            }
			
			function _rowGroupingRowFilter(oSettings, aData, iDataIndex) {
			    ///<summary>Used to expand/collapse groups with DataTables filtering</summary>
                if (oSettings.nTable.id !== oTable[0].id) return true;
                var sColData = aData[properties.iGroupingColumnIndex];
                if (typeof sColData === "undefined")
                    sColData = aData[oSettings.aoColumns[properties.iGroupingColumnIndex].mDataProp];
                if (_fnIsGroupCollapsed(_fnGetCleanedGroup(sColData))) {
                    if (oTable.fnIsOpen(oTable.fnGetNodes(iDataIndex)))
					{
						if (properties.fnOnRowClosed != null) {
                            properties.fnOnRowClosed(this); //    $(this.cells[0].children[0]).attr('src', '../../Images/details.png');
                        }
                        oTable.fnClose(oTable.fnGetNodes(iDataIndex));
                    }
                    return false;
                };
				return true;
            } //end of function _rowGroupingRowFilter


            function fnExpandGroup(sGroup) {
                ///<summary>Expand group if expanadable grouping is used</summary>
				
			    aoGroups[sGroup].state = "expanded";	
				
				$("td[data-group^='" + sGroup + "']").removeClass("collapsed-group");
                $("td[data-group^='" + sGroup + "']").addClass("expanded-group");
						
						
				if(properties.bUseFilteringForGrouping)
				{
					oTable.fnDraw();
					return;//Because rows are expanded with _rowGroupingRowFilter function
				}
				
				if (jQuery.inArray(sGroup, asExpandedGroups)==-1)
                    asExpandedGroups.push(sGroup);
				
                if (properties.oHideEffect != null)
                    $(".group-item-" + sGroup, oTable)
					[properties.oShowEffect.method](properties.oShowEffect.duration,
									properties.oShowEffect.easing,
									function () { });
                else
                    $(".group-item-" + sGroup, oTable).show();


            } //end of function fnExpandGroup

            function fnCollapseGroup(sGroup) {
                ///<summary>Collapse group if expanadable grouping is used</summary>

				aoGroups[sGroup].state = "collapsed";
				$("td[data-group^='" + sGroup + "']").removeClass("expanded-group");
                $("td[data-group^='" + sGroup + "']").addClass("collapsed-group");
				
				if(properties.bUseFilteringForGrouping)
				{
					oTable.fnDraw();
					return;//Because rows are expanded with _rowGroupingRowFilter function
				}
				//var index = $.inArray(sGroup, asExpandedGroups);
                //asExpandedGroups.splice(index, 1);
				
                $('.group-item-' + sGroup).each(function () {
                    //Issue 24 - Patch provided by Bob Graham
                    if (oTable.fnIsOpen(this)) {
                        if (properties.fnOnRowClosed != null) {
                            properties.fnOnRowClosed(this); //    $(this.cells[0].children[0]).attr('src', '../../Images/details.png');
                        }
                        oTable.fnClose(this);
                    }
                });

                if (properties.oHideEffect != null)
                    $(".group-item-" + sGroup, oTable)
					[properties.oHideEffect.method](properties.oHideEffect.duration,
									properties.oHideEffect.easing,
									function () { });
                else
                    $(".group-item-" + sGroup, oTable).hide();

            } //end of function fnCollapseGroup

            function _fnOnGroupClick(e) {
                ///<summary>
                ///Function that is called when user click on the group cell in order to
                ///expand of collapse group
                ///</summary>

                //var sGroup = $(this).attr("rel");
                var sGroup = $(this).attr("data-group");
                var iGroupLevel = $(this).attr("data-group-level");

                var bIsExpanded = !_fnIsGroupCollapsed(sGroup);
                if (properties.bExpandSingleGroup) {
                    if (!bIsExpanded) {
                        var sCurrentGroup = $("td.expanded-group").attr("data-group");
                        fnCollapseGroup(sCurrentGroup);
                        fnExpandGroup(sGroup);

                        if (properties.iExpandGroupOffset != -1) {
                            var position = $("#group-id-" + oTable.attr("id") + "_" + sGroup).offset().top - properties.iExpandGroupOffset;
                            window.scroll(0, position);
                        } else {
                            var position = oTable.offset().top;
                            window.scroll(0, position);
                        }
                    }
                } else {
                    if (bIsExpanded) {
                        fnCollapseGroup(sGroup);
                    } else {
                        fnExpandGroup(sGroup);
                    }
                }
                e.preventDefault();

            }; //end function _fnOnGroupClick
			
			
			function _fnDrawCallBackWithGrouping (oSettings) {

                if (oTable.fnSettings().oFeatures.bServerSide)
                    bInitialGrouping = true;
                var bUseSecondaryGrouping = false;

                if (properties.iGroupingColumnIndex2 != -1)
                    bUseSecondaryGrouping = true;

                //-----Start grouping

                if (oSettings.aiDisplayMaster.length == 0) { //aiDisplay
                    return;
                }

                var nTrs = $('tbody tr', oTable);
                var iColspan = 0; //nTrs[0].getElementsByTagName('td').length;
                for (var iColIndex = 0; iColIndex < oSettings.aoColumns.length; iColIndex++) {
                    if (oSettings.aoColumns[iColIndex].bVisible)
                        iColspan += 1;
                }
                var sLastGroup = null;
                var sLastGroup2 = null;
                if (oSettings.aiDisplay.length > 0) {
                    for (var i = 0; i < nTrs.length; i++) {


                        var iDisplayIndex = oSettings._iDisplayStart + i;
                        if (oTable.fnSettings().oFeatures.bServerSide)
                            iDisplayIndex = i;
                        var sGroupData = "";
                        var sGroup = null;
                        var sGroupData2 = "";
                        var sGroup2 = null;

                        //Issue 31 - Start fix provided by Fabien Taysse 
//                      sGroupData = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[properties.iGroupingColumnIndex];
//                      if (sGroupData == undefined)
//                          sGroupData = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[oSettings.aoColumns[properties.iGroupingColumnIndex].mDataProp];
                        sGroupData = this.fnGetData(nTrs[i], properties.iGroupingColumnIndex);
                        //Issue 31 - End fix provided by Fabien Taysse 

                        var sGroup = sGroupData;
                        if (properties.sGroupBy != "year")
                            sGroup = fnGetGroup(sGroupData);

                        if (bUseSecondaryGrouping) {
                            sGroupData2 = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[properties.iGroupingColumnIndex2];
                            if (sGroupData2 == undefined)
                                sGroupData2 = oSettings.aoData[oSettings.aiDisplay[iDisplayIndex]]._aData[oSettings.aoColumns[properties.iGroupingColumnIndex2].mDataProp];
                            if (properties.sGroupBy2 != "year")
                                sGroup2 = fnGetGroup(sGroupData2);
                        }


                        if (sLastGroup == null || _fnGetCleanedGroup(sGroup) != _fnGetCleanedGroup(sLastGroup)) { // new group encountered (or first of group)
                            var sGroupCleaned = _fnGetCleanedGroup(sGroup);
				
                            if(sLastGroup != null)
                            {
                            	properties.fnOnGroupCompleted(aoGroups[_fnGetCleanedGroup(sLastGroup)]);
                            }
							/*
                            if (properties.bExpandableGrouping && bInitialGrouping) {
                                if (properties.bExpandSingleGroup) {
                                    if (asExpandedGroups.length == 0)
                                        asExpandedGroups.push(sGroupCleaned);
                                } else {
                                    asExpandedGroups.push(sGroupCleaned);
                                }
                            }
							*/
							if(properties.bAddAllGroupsAsExpanded && jQuery.inArray(sGroupCleaned,asExpandedGroups) == -1)
								asExpandedGroups.push(sGroupCleaned);

                            var oGroup = fnCreateGroupRow(sGroupCleaned, sGroup, iColspan);
                            var nGroup = oGroup.nGroup;

							if(nTrs[i].parentNode!=null)
								nTrs[i].parentNode.insertBefore(nGroup, nTrs[i]);
							else
								$(nTrs[i]).before(nGroup);

                            sLastGroup = sGroup;
                            sLastGroup2 = null; //to reset second level grouping





                        } // end if (sLastGroup == null || sGroup != sLastGroup)
						
						$(nTrs[i]).attr("data-group", aoGroups[sGroupCleaned].dataGroup);

                        $(nTrs[i]).addClass(properties.sGroupItemClass);
                        $(nTrs[i]).addClass("group-item-" + sGroupCleaned);
                        if (properties.bExpandableGrouping) {
                            if (_fnIsGroupCollapsed(sGroupCleaned) && !properties.bUseFilteringForGrouping) {
                                $(nTrs[i]).hide();
                            }
                        }


                        if (bUseSecondaryGrouping) {

                            if (sLastGroup2 == null || _fnGetCleanedGroup(sGroup2) != _fnGetCleanedGroup(sLastGroup2)) {
                                var sGroup2Id = _fnGetCleanedGroup(sGroup) + '-' + _fnGetCleanedGroup(sGroup2);
                                var oGroup2 = _fnCreateGroup2Row(sGroup2Id, sGroup2, iColspan, aoGroups[sGroupCleaned])
                                var nGroup2 = oGroup2.nGroup;
                                nTrs[i].parentNode.insertBefore(nGroup2, nTrs[i]);

                                sLastGroup2 = sGroup2;
                            }

                            $(nTrs[i]).attr("data-group", oGroup2.dataGroup)
										.addClass(properties.sGroupItemClass2)
                                        .addClass("group-item-" + oGroup2.dataGroup);
                        } //end if (bUseSecondaryGrouping)



                    } // end for (var i = 0; i < nTrs.length; i++)
                }; // if (oSettings.aiDisplay.length > 0)

				if(sLastGroup != null)
			    {
			    	properties.fnOnGroupCompleted(aoGroups[_fnGetCleanedGroup(sLastGroup)]);
			    }


                //-----End grouping
                properties.fnOnGrouped(aoGroups);

                bInitialGrouping = false;
				
            }; // end of _fnDrawCallBackWithGrouping = function (oSettings)


            //var oTable = this;
            var iYearIndex = 6;
            var iYearLength = 4;
            var asExpandedGroups = new Array();
            var bInitialGrouping = true;

            var properties = $.extend(defaults, options);

            if (properties.iGroupingOrderByColumnIndex == -1) {
                properties.bCustomColumnOrdering = false;
                properties.iGroupingOrderByColumnIndex = properties.iGroupingColumnIndex;
            } else {
                properties.bCustomColumnOrdering = true;
            }

            if (properties.sGroupingColumnSortDirection == "") {
                if (properties.sGroupBy == "year")
                    properties.sGroupingColumnSortDirection = "desc";
                else
                    properties.sGroupingColumnSortDirection = "asc";
            }


            if (properties.iGroupingOrderByColumnIndex2 == -1) {
                properties.bCustomColumnOrdering2 = false;
                properties.iGroupingOrderByColumnIndex2 = properties.iGroupingColumnIndex2;
            } else {
                properties.bCustomColumnOrdering2 = true;
            }

            if (properties.sGroupingColumnSortDirection2 == "") {
                if (properties.sGroupBy2 == "year")
                    properties.sGroupingColumnSortDirection2 = "desc";
                else
                    properties.sGroupingColumnSortDirection2 = "asc";
            }

			
			
            iYearIndex = properties.sDateFormat.toLowerCase().indexOf('yy');
            iYearLength = properties.sDateFormat.toLowerCase().lastIndexOf('y') - properties.sDateFormat.toLowerCase().indexOf('y') + 1;

            var iMonthIndex = properties.sDateFormat.toLowerCase().indexOf('mm');
            var iMonthLength = properties.sDateFormat.toLowerCase().lastIndexOf('m') - properties.sDateFormat.toLowerCase().indexOf('m') + 1;

            var fnGetGroup = _fnGetGroupByName;
            switch (properties.sGroupBy) {
                case "letter": fnGetGroup = _fnGetGroupByLetter;
                    break;
                case "year": fnGetGroup = _fnGetGroupByYear;
                    break;
                case "month": fnGetGroup = _fnGetGroupByYearMonth;
                    break;
                default: fnGetGroup = _fnGetGroupByName;
                    break;
            }
			
			
            if (properties.asExpandedGroups != null) {
                if (properties.asExpandedGroups == "NONE") {
                    properties.asExpandedGroups = [];
                    asExpandedGroups = properties.asExpandedGroups;
                    bInitialGrouping = false;
                } else if (properties.asExpandedGroups == "ALL") {
					properties.bAddAllGroupsAsExpanded = true;
                } else if (properties.asExpandedGroups.constructor == String) {
                    var currentGroup = properties.asExpandedGroups;
                    properties.asExpandedGroups = new Array();
                    properties.asExpandedGroups.push(_fnGetCleanedGroup(currentGroup));
                    asExpandedGroups = properties.asExpandedGroups;
                    bInitialGrouping = false;
                } else if (properties.asExpandedGroups.constructor == Array) {
                    for (var i = 0; i < properties.asExpandedGroups.length; i++) {
                        asExpandedGroups.push(_fnGetCleanedGroup(properties.asExpandedGroups[i]));
                        if (properties.bExpandSingleGroup)
                            break;
                    }
                    bInitialGrouping = false;
                }
            }else{
				properties.asExpandedGroups = new Array();
				properties.bAddAllGroupsAsExpanded = true;
			}
			if(properties.bExpandSingleGroup){
			    var nTrs = $('tbody tr', oTable);
				var sGroupData = oTable.fnGetData(nTrs[0], properties.iGroupingColumnIndex);
				
				var sGroup = sGroupData;
                if (properties.sGroupBy != "year")
                    sGroup = fnGetGroup(sGroupData);

				var sGroupCleaned = _fnGetCleanedGroup(sGroup);
				properties.asExpandedGroups = new Array();
				properties.asExpandedGroups.push(sGroupCleaned);
							
			}

            oTable.fnSetColumnVis(properties.iGroupingColumnIndex, !properties.bHideGroupingColumn);
            if (properties.bCustomColumnOrdering) {
                oTable.fnSetColumnVis(properties.iGroupingOrderByColumnIndex, !properties.bHideGroupingOrderByColumn);
            }
            if (properties.iGroupingColumnIndex2 != -1) {
                oTable.fnSetColumnVis(properties.iGroupingColumnIndex2, !properties.bHideGroupingColumn2);
            }
            if (properties.bCustomColumnOrdering2) {
                oTable.fnSetColumnVis(properties.iGroupingOrderByColumnIndex2, !properties.bHideGroupingOrderByColumn2);
            }
            oTable.fnSettings().aoDrawCallback.push({
                "fn": _fnDrawCallBackWithGrouping,
                "sName": "fnRowGrouping"
            });

            var aaSortingFixed = new Array();
            aaSortingFixed.push([properties.iGroupingOrderByColumnIndex, properties.sGroupingColumnSortDirection]);
            if (properties.iGroupingColumnIndex2 != -1) {
                aaSortingFixed.push([properties.iGroupingOrderByColumnIndex2, properties.sGroupingColumnSortDirection2]);
            } // end of if (properties.iGroupingColumnIndex2 != -1)

            oTable.fnSettings().aaSortingFixed = aaSortingFixed;
            //Old way
            //oTable.fnSettings().aaSortingFixed = [[properties.iGroupingOrderByColumnIndex, properties.sGroupingColumnSortDirection]];

            switch (properties.sGroupBy) {
                case "name":
                    break;


                case "letter":

                    /* Create an array with the values of all the input boxes in a column */
                    oTable.fnSettings().aoColumns[properties.iGroupingOrderByColumnIndex].sSortDataType = "rg-letter";
                    $.fn.dataTableExt.afnSortData['rg-letter'] = function (oSettings, iColumn) {
                        var aData = [];
                        $('td:eq(' + iColumn + ')', oSettings.oApi._fnGetTrNodes(oSettings)).each(function () {
                            aData.push(_fnGetGroupByLetter(this.innerHTML));
                        });
                        return aData;
                    }


                    break;


                case "year":
                    /* Create an array with the values of all the input boxes in a column */
                    oTable.fnSettings().aoColumns[properties.iGroupingOrderByColumnIndex].sSortDataType = "rg-date";
                    $.fn.dataTableExt.afnSortData['rg-date'] = function (oSettings, iColumn) {
                        var aData = [];
						var nTrs = oSettings.oApi._fnGetTrNodes(oSettings);
						for(i = 0; i< nTrs.length; i++)
						{
							aData.push(_fnGetYear( oTable.fnGetData( nTrs[i], iColumn) ));
						}

/*
                        $('td:eq(' + iColumn + ')', oSettings.oApi._fnGetTrNodes(oSettings)).each(function () {
                            aData.push(_fnGetYear(this.innerHTML));
                        });
*/
                        return aData;
                    }
                    break;
                default:
                    break;

            } // end of switch (properties.sGroupBy)

			if(properties.bUseFilteringForGrouping)
					$.fn.dataTableExt.afnFiltering.push(_rowGroupingRowFilter);
			
            oTable.fnDraw();
			


        });
    };
})(jQuery);

/* Setup some defaults and extensions */

// Loading Block (it wants to be here)
function loadingBlock(action) {
  action !== 'stop'
    ? document.body.insertAdjacentHTML('afterbegin', '<div id="loading-block"><div class="modal-backdrop fade in"></div><div class="loading-indicator"></div></div>')
    : document.body.removeChild(document.getElementById('loading-block'));
}

!function ($) {
  $(function(){

    /* Constrain System Error block to width of H1 title
      Give <html> and <body> special treatment on System Error Pages, to create height for vertical centering */
    $('.system-error-page,.system-error-inline').css({'width': $('h1.system-error-type').width() + 1}); // `+1` for IE9 (magic number)
    $('.system-error-page').parents('html').css('height','100%');
    $('.system-error-page').parents('body').css({'height':'100%','left':'0','right':'0','margin':'0','padding':'0'});


    /* Vertically center an element with CSS class `vertical-center` */
    function verticalCenter(elemV) {
      var elemH = elemV.height();
      var dParH = elemV.parent().height();
      var place = (dParH - elemH) / 2;
      elemV.css({'top' : place});
    } verticalCenter($('.vertical-center'));

    /* Vertically center an element with CSS class `vertical-update` if Window is resized */
    $(window).resize(function() {
      verticalCenter($('.vertical-update'))
    });


    /* Popovers
      Enables en masse all Popovers on <i>icon and <a>link elements set up like so:
      data-toggle="popover"
      data-placement="top"
      data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
      data-original-title="Popover on top" */
    $('i[data-toggle=popover],a[data-toggle=popover]').popover({trigger: 'hover',container: 'body'});

    /* Placeholder activated on these elements */
    $('input, textarea').placeholder();

    /* Disable most "#" links en masse
      Be careful with this one */
    $('section [href^=#]').click(function(event) {
      event.preventDefault();
    })

    /* Focus Outlines: ugly (in IE), but needed. This can be adapted to switch off specific elements in certain cases 
      Disable most focus outlines en masse
    $('a,button,input').each(function() {
      $(this).attr('hideFocus', 'true').css('outline', 'none')
    })

    Disable most focus outlines, but not checkboxes and radios
    $('a,button,input').not('input[type=checkbox','input[type=radio').each(function() {
      $(this).attr('hideFocus', 'true').css('outline', 'none')
    }) */   
     
    
    /**
     * Toolbar 
     * Class name .navbar-toolbar
     *
     * Helper class to control borders
     *
     */
     
     
    $('.navbar-toolbar').each(function (i) {
      
      if ($(this).data('toolbar')) {

        var toolData  = $(this).data('toolbar');
        var borderSet;

        if (typeof toolData.border.all !== 'undefined' && toolData.border.all === false) {
          borderSet = '0';
        } else {
          var borderTop    = typeof toolData.border.top !== 'undefined' && toolData.border.top === false
                              ? '0' : '1px';

          var borderRight  = typeof toolData.border.right !== 'undefined' && toolData.border.right === false
                              ? '0' : '1px';

          var borderBottom = typeof toolData.border.bottom !== 'undefined' && toolData.border.bottom === false
                              ? '0' : '1px';

          var borderLeft   = typeof toolData.border.left !== 'undefined' && toolData.border.left === false
                              ? '0' : '1px';

          borderSet = borderTop + " " + borderRight + " " + borderBottom + " " + borderLeft;
        }

        $(this).children('.navbar-inner').css('border-width',borderSet);
      }

     });  
     
    
  });
}(window.jQuery);