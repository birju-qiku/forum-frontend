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
.factory('httpErrorInterceptor',['createToken','$q',function(createToken,$q){
  return{
    'responseError':function(rejection){
      //console.log(rejection);
      if(rejection.status == 403){
        localStorage.setItem('hash','');
        createToken().then(function(data){
            localStorage.setItem('hash',data.token)
        });
      }else if(rejection.status == 401){
        toastr.success("You need to login to perform that action.", "Qiku India", {"iconClass": 'customer-info'});
        //$state.go('login')
      }
      return $q.reject(rejection);
    }
  }
}])
.factory('createToken',['$injector','apiUrl',function($injector,apiUrl){
    return function () {
        var $http = $injector.get('$http');
        var promise = $http.post(apiUrl+'/token').error(function(){
          alert('something went wrong');
          //localStorage.setItem('hash',data.token);
          //$http.defaults.headers.common['hash'] = data.token;
        });
        return promise;
    };
}])