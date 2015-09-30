angular.module('qiku').service('shareVariables', function () {

    var hashtable = {};

    return {
        set: function (key, value) {
            hashtable[key] = value;
        },
        get: function (key) {
            return hashtable[key];
        }
    }
})
.directive('dynamichtml', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamichtml, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
})
.directive('threadPanelColor',function(){
  return{
    restrict:'A',
    link:function(scope,element,scope){
      $(element).on('click',function(){
        $('.panel-color-toggle').css({'background-color':'#eb5b5f','color':'#ffffff'});
        $(element).css({'background-color':'#ffffff','color':'#eb5b5f'});
      })
    }
  }
})