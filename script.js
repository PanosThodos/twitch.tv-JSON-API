//Run JQuerry...
$(document).ready(function(){
  //var channels=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var following=[];
  var a;
   //Free Code Camp Stream Info and Status API Call...
  $.ajax({
    url:"https://api.twitch.tv/kraken/streams/freecodecamp",
    headers:{
      'Client-ID':'0illlp3n78cmpo3uocp3hy91nwhram'
    },
    success: function(data1){
      if(data1.stream === null){
        //FCC is offline
        $("#fccStatus").html("Free Code Camp stream is curently OFFLINE!");
      }
      else{
        //FCC is live
        $("#fccStatus").html("Free Code Camp stream is LIVE!");
      }
    }
  });
  $.ajax({
    url:"https://api.twitch.tv/kraken/users/freecodecamp/follows/channels/",
    headers:{
      'Client-ID':'0illlp3n78cmpo3uocp3hy91nwhram'
    },
    success: function(data2){
      for(i=0;i<data2.follows.length;i++){
        var displayName = data2.follows[i].channel.display_name;
        a = displayName;
        following.push(a);
        var logo = data2.follows[i].channel.logo;
        var status = data2.follows[i].channel.status;
        if(status === null){status = "No status"}
        if(logo === null){ logo = "http://web.vmc3.com/projects/bufs/branch/marines/logos/NoLogo.jpg";}
        $("#followerInfo").prepend("<div class='row' id='"+displayName+"check'>" + "<div class='col-md-4'>" +
             "<a href='https://www.twitch.tv/"+displayName+"'><img src='" + logo + "'></a>" + "</div>" + "<div class='col-md-4'>" + displayName + "                   </div>" +
              "<div class='col-md-4'>" + status + "</div></div>");
      }
  //CHECK offline
      for(i=0;i<following.length;i++){
        $.ajax({
      url:"https://api.twitch.tv/kraken/streams/"+following[i],
      headers:{
        'Client-ID':'0illlp3n78cmpo3uocp3hy91nwhram'
      },
      success: function(data4){
        if(data4.stream === null){
          //FCC is offline
          $("#"+data4._links.channel.substring(38, 100)+"check").addClass("offline");
        }
        else
          {$("#"+data4._links.channel.substring(38, 100)+"check").addClass("online");}
      }
    });
      }

    }
  });
  var deletedFollowers= ['brunofin','comster404'];
  for(var i = 0; i<deletedFollowers.length;i++){
    $.ajax({
    url:"https://api.twitch.tv/kraken/streams/"+deletedFollowers[i],
    headers:{
      'Client-ID':'0illlp3n78cmpo3uocp3hy91nwhram'
    },
    success: function(data3){
      var logo = "http://evergreen.edu/sites/all/themes/wwwevergreen/images/icons/no.svg";
      var displayName = data3._links.channel.substring(38, 100);
      var status = data3.stream;
      if(status === null){status = "Not Found!";}
      $("#followerInfo").prepend("<div class='row deleted'>" + "<div class='col-md-4'>" +
             "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + displayName + "</div>" +
              "<div class='col-md-4'>" + status + "</div></div>");
    }
  });
    
  }
});