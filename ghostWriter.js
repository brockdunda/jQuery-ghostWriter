;( function($, window) {
  /* *******************
   * Ghostwriter methods
   *
   * Text that is typed into specified inputs will be ghostwritten into subsequent ghostwriter
   * identified html and text areas.
   * ******************/
  var ghostwriterMethods = {
    init : function(options){
    	$(this).on('click', function(){
    	    //console.log($this.attr('data-ghost'))
    	});
      var $this = $(this),
          el = $('.ghostwriter-ref[data-ghost=' + $this.attr('data-ghost') + ']')
          defaultEmpty = typeof options != 'undefined' && typeof options.defaultEmpty != 'undefined' ? options.defaultEmpty : 'N/A';
      if($this.is('input') || $this.is('textarea')){
        // Detect if this is a checkbox and set all checkbox values to the mapped ghost element
        if($this.attr('type') == 'checkbox'){
          $this.on('input propertychange paste change blur', function(e){
            // Find closest checkbox container - relies on bootstrap form type?
            // Could be changed later to a better way to detect checkbox container?
            var $formCheckbox = $this.closest('.form-checkboxes'),
                val = '';
            $formCheckbox.find('input[type="checkbox"]').each(function(){
              var cb = $(this);
              if(cb.prop('checked')){
                val += cb.val() + ' ';
              }
            });
            // Set the ghost element to the val of the checkboxes involved.
            el.html(val);
          });
        } else {
          // On input, update html of ghostwriter reference
          $this.on('input propertychange paste change blur', function(e){
            var val = $this.val() != '' ? $this.val() : defaultEmpty;
            el.each(function(){
              var me = $(this);
              if(me.is('input')){
                me.val(val);
              } else {
                me.html(val);
              }
            });
          });
        }
      }
      if($this.is('select')){
        $this.on('input propertychange paste change blur', function(e){
          el.html($this.find('option:selected').text());
        });
      }
      return this;
    },
    manualUpdate : function(options){
      var $this = $(this),
          el = $('.ghostwriter-ref[data-ghost=' + $this.attr('data-ghost') + ']');
      if($this.is('input') || $this.is('textarea')){
        var val = $this.val() != '' ? $this.val() : '';
        el.each(function(){
          var me = $(this);
          if(me.is('input')){
            me.val(val);
          } else {
            me.html(val);
          }
        });
      }
      if($this.is('select')){
        el.each(function(){
          var me = $(this);
          if(me.is('input')){
            me.val($this.find('option:selected').text());
          } else {
            me.html($this.find('option:selected').text());
          }
        });
      }
      return this;
    }
  }

  $.fn.ghostWriter = function(methodOrOptions) {
    if ( ghostwriterMethods[methodOrOptions] ) {
        return ghostwriterMethods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
        // Default to "init"
        return ghostwriterMethods.init.apply( this, arguments );
    } else {
        $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.ghostWriter' );
    }
  }
}(jQuery, window));
