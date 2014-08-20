/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('load', this.onLoad, false);

        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Andriod|Blackberry|IEMobile)/)){
            document.addEventListener("deviceready", this.onDeviceReady, false);
        } else {
            this.onDeviceReady();
        }
    },

    // bindEvents: function() {
    //     document.addEventListener('deviceready', this.onDeviceReady, false);
    // },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {



        
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');

        // console.log('Received Event: ' + id);
    }
};

// var to;
// var from;

$('.homepage_link').click(function(){
    pageSource = $(this).closest('.page')
        MovePageRight('#pageHome', pageSource);
});
 
$('.about_link').click(function(){
    pageSource = $(this).closest('.page')
    // var pageTo = '#pageAbout';
    // var pageFrom = '#pageHome';
    // to = [pageTo];
    // from = [pageFrom];
    // return(to);
    // return(from);
    MovePageLeft('#pageAbout', pageSource);
});

$('.contact_link').click(function(){
    pageSource = $(this).closest('.page')
    MovePageLeft('#pageContact', pageSource);
});

$('.gallery_link').click(function(){
    pageSource = $(this).closest('.page')
    MovePageLeft('#pageGallery', pageSource);
});

$('.video_link').click(function(){
    pageSource = $(this).closest('.page')
    MovePageLeft('#pageVideo', pageSource);
});

function MovePageLeft(to,from){
    var time = 500;
    $('body').scrollTop(0);
    $(to).show();
    $('body').css('overflow', 'hidden');
    $(to).addClass('activePage');
    $(to).transition({x: '100%'}, 0);
    $(from).transition({x: '-100%'}, time, 'linear');
    $(to).transition({x: '0'}, time, 'linear');
    setTimeout(function(){
        $(from).removeClass('activePage');
        $('body').css('overflow', '');
    }, time);
}

function MovePageRight(to,from){
    var time = 300;
    $(to).show();
    $('body').scrollTop(0);
    $('body').css('overflow', 'hidden');
    $('.page').removeClass('activePage');
    $(to).addClass('activePage');
    $(to).transition({x: '-100%'}, 0);
    $(from).transition({x: '100%'}, time, 'linear');
    $(to).transition({x: '0'}, time, 'linear');
    setTimeout(function(){
        $(from).removeClass('activePage');
        $(from).hide();
        $('body').css('overflow', '');
    }, time);
}

$('#chick_signup_button').click(function(){ 
        Signup();
    }); 

$('.chick_contact_form').children().keypress(function(e){ 
    if (e.keyCode==13){
        Signup();
        }
}); 


function Signup(){
    var firstClient = $('input:text[name=chick_first_name]').val();
    var lastClient = $('input:text[name=chick_last_name]').val();
    var emailClient = $('input:text[name=chick_e-mail]').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var passwordClient = $('input:text[name=chick_password]').val();

    if ((firstClient==null || typeof(firstClient)=="undefined" || firstClient<1) ||
        (lastClient==null || typeof(lastClient)=="undefined" || lastClient<1) ||
        (passwordClient==null || typeof(passwordClient)=="undefined" || passwordClient<1))
        {$('.chicken_output').text("Tell us more about you.");
        return false;   
    }
    if ( !emailReg.test(emailClient))
            {$('.chicken_output').append("We need your e-mail for our spam files.");
            return false;
    }

    if (emailClient==null || typeof(emailClient)=="undefined" || emailClient<1)
        {$('.chicken_output').append("We need your e-mail for our spam files.");
        return false;
    }

    $.ajax({
        url: 'http://localhost:3000/api/signUp',
        data: { firstSignUp: firstClient, lastSignUp: lastClient, emailSignUp: emailClient, passwordSignUp: passwordClient},
        type: 'POST',
        crossDomain: true,
        dataType: 'json'
        // beforeSend: function (xhr) {
        //     xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //     xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        //     xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        //     xhr.setRequestHeader("Content-Type", "text/plain");
        //     xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
        // }
    }).done(function(data){
        console.log(data);
        // $(location).attr('href',"/main/member");   
    });
};


