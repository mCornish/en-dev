// If the link's name corresponds to the current page, add active class
function pageInfo($location, $templateCache, navMap) {

    var path, slashOne, slashTwo,
        partial, path1, path2;

    var init = function() {
        path = $location.path();
        slashOne = path.lastIndexOf('/');
        slashTwo = path.lastIndexOf('/', slashOne-1);
    };


    init();

    return {

        getPage: function() {
            init();
            return path.substring(slashOne + 1);
        },

        getSection: function() {
            init();
            return path.substring(slashTwo + 1, slashOne);
        },

        getPartial: function() {

            if(path === '/') return; // No partial from home page

            page = this.getPage();
            section = this.getSection();

            if(slashOne === slashTwo) {
                return 'app/components/' + page + '/' + page + 'Main.html';
            } else {
                return 'app/components/' + section + '/' + page + '.html';
            }
        }

    };
}

angular.module('app').factory('pageInfo', ['$location', '$templateCache', 'navMap', pageInfo]);
