// Returns JSON Map for generating navigation

function navMap() {
    return {
        getMap: function() {
            return [
              {
                'name':'overview',
                'contentBool': true,
                'pages':
                [
                  {
                    'name':'overview1'
                  },
                  {
                    'name':'overview2'
                  }
                ]
              },
              {
                'name':'sync',
                'contentBool': true,
                'pages':
                [
                  {
                    'name':'sync1'
                  },
                ]
              },
              {
                'name':'thrift',
                'contentBool': true,
                'pages':
                [
                  {
                    'name':'thrift1'
                  },
                ]
              },
              {
                'name':'resources',
                'contentBool': true,
                'pages':
                [
                  {
                    'name':'resource1'
                  },
                  {
                    'name':'resource2'
                  }
                ]
              },
              {
                'name':'status',
                'contentBool': false,
                'pages':
                [
                  {

                  }
                ]
              },
              {
                'name':'sandbox',
                'contentBool': false,
                'pages':
                [
                  {

                  }
                ]
              }
            ];
        }
    };
}

angular.module('app').factory('navMap', navMap);
