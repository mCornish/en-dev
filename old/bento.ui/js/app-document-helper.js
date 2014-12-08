/**
* Documentation-only
* Demo Helper Tools
* This should not be inplemented in the real products
*/
var sourceHTML = sourceJS = sourceCSS = 'N/A';
$(function() {
  $('body').append('<!-- Documentation-only: Do NOT implement this into products. --> <style type="text/css">.btn-show-source{position: fixed;right:0;bottom: 0;z-index: 100;}</style><a href="#sourceModal" role="button" class="btn btn-primary btn-show-source" data-toggle="modal">Show Source</a><div id="sourceModal" class="modal hide fade source-viewer" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-header"><a href="#" class="close" data-dismiss="modal" aria-hidden="true">&times;</a><h3 id="myModalLabel">Source Code for this Template</h3></div><div class="modal-body"><div id="source-viewer-html"><h4>HTML</h4><pre class="prettyprint linenums"></pre></div><div id="source-viewer-js"><h4>JavaScript</h4><pre class="prettyprint linenums"></pre></div><div id="source-viewer-css"><h4>CSS</h4><pre class="prettyprint linenums"></pre></div></div><div class="modal-footer"><button class="btn btn-primary" data-dismiss="modal" aria-hidden="true">Close</button><!-- (all templates are included in the Bento.UI Seed Project download) --></div></div>');
    
  
  if ($('.source-html').length > 0) {
    sourceHTML = $.trim($('.source-html').html());
  }
  
  if ($('.source-css').length > 0) {
    sourceCSS = $.trim($('.source-css').html());
  }
  
  if ($('.source-js').length > 0) {
    sourceJS = $.trim($('.source-js').html());
  }
  
  $('#source-viewer-js pre').text(sourceJS);
  $('#source-viewer-css pre').text(sourceCSS);
  $('#source-viewer-html pre').text(sourceHTML);
  
  prettyPrint();
});