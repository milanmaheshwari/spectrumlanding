var preloader = document.getElementById('loader');
      var homewelcome = document.getElementById('homewelcome');
      var logo = document.getElementById('logo');
      var email = document.getElementById('email');
      var video = document.getElementById('videocontainer');
      var icons = document.getElementById('icons');
      function preLoaderHandler(){
         preloader.style.opacity = '0';
         preloader.style.transition = 'opacity 0.5s ease';
         setTimeout(function(){preloader.style.display = 'none';}, 500);
         setTimeout(function(){
          homewelcome.style.opacity = "1";
          homewelcome.style.top = "0vh";
          homewelcome.style.transition = '0.5s ease';
         }, 50);
         setTimeout(function(){
          homewelcome.style.opacity = "0";
          homewelcome.style.top = "-12vh";
          homewelcome.style.transition = '0.5s ease';
          homeheader.style.opacity = "1";
          homeheader.style.top = "0vh";
          homeheader.style.transition = '0.5s ease';
          logo.style.opacity = "1";
          logo.style.top = "7vh";
          logo.style.transition = '0.5s ease';
          email.style.opacity = "1";
          email.style.top = "56vh";
          email.style.transition = '0.5s ease';
          video.style.opacity = "1";
          video.style.top = "92vh";
          video.style.transition = '0.5s ease';
          icons.style.opacity = "1";
          icons.style.top = "216vh";
          icons.style.transition = '0.5s ease';
         }, 1200);
         setTimeout(function(){homewelcome.style.display = 'none';}, 1500);

         setTimeout(loopHeader(), 1500);
      }
     
      //loopheader
      function loopHeader() {
        var loopHeader = setInterval(changeText, 1200);
      }
      var headers = ["ILLUSTRATIONS", "GRADIENTS", "USER INTERFACES", "IMAGES", "ANYTHING :)"];
      var loopItem = 0;
      function changeText() {
        loopItem++;
        if (loopItem == headers.length) {
          loopItem = 0;
        }
        document.getElementById("homeheaderappln").innerHTML = headers[loopItem];
      }