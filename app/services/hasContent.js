// Filter out non-content pages
function hasContent() {
    return function(input) {
      var result = [];

      angular.forEach(input, function(section) {
        if (section.contentBool === true) {
          result.push(section);
        }
      });

      return result;
  };
}

angular.module('app').filter('hasContent', hasContent);
