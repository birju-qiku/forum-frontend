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
.service('fbAuth',['$rootScope','$state','$http','$q','apiUrl',function($rootScope,$state,$http,$q,apiUrl){
  return {
    getUserInfo : function() {
      console.log('retriving user info');
      var _self = this;
      FB.api('/me?fields=id,name,picture,email', function(res) {
        var promise = $q(function(resolve,reject){
            $http.get(apiUrl+'/exists/'+res.email).then(function(){
                resolve();
            },function(){
              reject('email');
            })
        });
        promise.then(function(){
            //register check if username exists, if yes ask him to create a new one
            var data = {
              email:res.email,
              username:res.email.split('@')[0],
              image:res.picture.data.url,
              src:'fb',
              fbid:res.id,
              verified:1,
              name:res.name
            }
            $http.post(apiUrl+'/socialregister',data).then(function(data){
                localStorage.setItem('passed',true);
                localStorage.setItem('hash',data.data.token);
                $rootScope.$emit('loggedIn',{username:res.name,image:res.picture.data.url});
                $state.go('home');
                toastr.success("Welcome to Qiku India Forum", "Qiku India", {"iconClass": 'customer-info'});
            },function(err){
                console.log('new user entry not done:facebook')
            })
        },function(err){
            if(err == 'email'){
                //update user as it exists, token most probably.
                var data = {
                    token:localStorage.getItem('hash'),
                    image:res.picture.data.url,
                    fbid:res.id,
                    verified:1,
                    name:res.name
                }
                console.log(data);
                $http.put(apiUrl+'/updateuser/'+res.email,data).then(function(data){
                    localStorage.setItem('passed',true);
                    localStorage.setItem('hash',data.data.message.token);
                    $http.defaults.headers.common['hash'] = data.data.message.token;
                    $rootScope.$emit('loggedIn',{username:res.name,image:res.picture.data.url});
                    $state.go('home');
                    toastr.success("Welcome to Qiku India Forum", "Qiku India", {"iconClass": 'customer-info'});
                    })
            }else{
              console.log('not right');
            }
        })
      });

    },
    logout : function() {

      var _self = this;

      FB.logout(function(response) {

        $rootScope.$apply(function() { 

          $rootScope.user = _self.user = {}; 

        }); 

      });

    }
  }
}])
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
        $('.panel-color-toggle').css({'background-color':'#eb5b5f','color':'#ffffff','border-right':'1px solid #db3224'});
        $(element).css({'background-color':'#ffffff','color':'#eb5b5f','border-right':'none'});
      })
    }
  }
})
.factory('httpErrorInterceptor',['createToken','$q',function(createToken,$q){
  return{
    'responseError':function(rejection){
      //console.log(rejection);
      if(rejection.status == 403){
        //localStorage.setItem('hash','');
        createToken().then(function(data){
            localStorage.setItem('hash',data.data.token);
            toastr.success("Something went wrong. Please reload.", "Qiku India", {"iconClass": 'customer-info'});
        });
      }else if(rejection.status == 401){
        toastr.success("You need to login to perform that action.", "Qiku India", {"iconClass": 'customer-info'});
        //$state.go('login')
      }else if(rejection.status == 423){
        toastr.success("Authentication failed. Make sure you you have verified your email.", "Qiku India", {"iconClass": 'customer-info'});
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
/*.factory('commonFunctions',['$httpProvider',function($httpProvider){

    var injectToken = function(){
        $httpProvider.interceptors.push(function ($q) {
        var hash = localStorage.getItem('hash');
           return {
               'request': function (config) {
                console.log(config.url);
                if(config.url.indexOf('localhost:8080') !== -1){
                  if(config.url.indexOf('&') !== -1){
                    config.url = config.url + '&hash='+hash;
                  }else{
                    config.url = config.url + '?hash='+hash;
                  }
                  //config.url = config.url + '&hash='+hash;  
                }/*else if(config.url.indexOf('&') !== -1){
                  config.url = config.url + '&hash='+hash;
                }else{
                  config.url = config.url + '?hash='+hash;
                }

                   return config;
               }

           }
       });  
    }
    var commonFunctions = {
      injectToken:injectToken
    }
    return commonFunctions;
}])*/
.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
        attrs.$observe('ngSrc', function(value) {
          if (!value && attrs.errSrc) {
            attrs.$set('src', attrs.errSrc);
          }
        });
    }
  }
})
.directive('likeBtn', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        $(this).attr('disabled',true);
      });
    }
  }
})
.directive('trimText', function() { 
    return {
        priority: 10, 
        link: function(scope,element,attrs) {
            scope.$watch(attrs.ngBind , function(newvalue) {
              //console.log($(element).html());
            });           
        }
    };      
 });
