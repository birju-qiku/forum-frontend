(function(){
	angular.module('qiku').controller('ForumController',forumController);
	forumController.$inject = ['$scope','$http','$state','apiUrl','$stateParams','$rootScope'];
	function forumController($scope,$http,$state,apiUrl,$stateParams,$rootScope){
		var param = $state.href($state.current.name, $state.params);
		if(param == '/all'){
			$('.tab-label-2 > a').trigger('click');
		}else if(param == '/hot'){
			$('.tab-label-1 > a').trigger('click');
		}
		var fc = this;
		fc.$state = $state;
		fc.fbshare = function(link){
			FB.ui({
			  method: 'share',
			  href: 'https://forums.qiku.com/replies/'+link,
			}, function(response){});
		}
		fc.getLocation = function(val) {
		    return $http.get(apiUrl+'/thread/search/'+val).then(function(response){
		    	return response.data;
		    });
		  };
		  //fc.dummy = [{"_id":"565c611b137f2415568edf0e","title":"Difference between Qiku Q Terra 808 & Qiku Q Terra 810","desc":"<span></span>May i know the difference between&nbsp;<span>Qiku Q Terra 808 and&nbsp;<span>Qiku Q Terra 810 including prices and sensors&nbsp;<br><br></span></span><span>only knows that Qiku Q Terra 810 have 64 GB internal and 4 GB RAM</span><br><br>please post as much as you have about&nbsp;<span>Qiku Q Terra 810 including price and date of release&nbsp;</span>","posted_by":"hamza47kc","posted_by_id":"565af8aa137f2415568edd30","posted_by_image":"https://scontent.xx.fbcdn.net/hprofile-xlf1/v/t1.0-1/p50x50/12308233_1078782892154081_2507861473052729508_n.jpg?oh=28a9d8e0c7f4ef724aadf96e9e906250&oe=56D7531B","category":"qterra","link":"Difference-between-Qiku-Q-Terra---Qiku-Q-Terra-","created_at":"2015-11-30T14:45:47.562Z","replyCount":0,"viewCount":33,"__v":0,"score":1.9223484848484849},{"_id":"566cc0ac0dcdd80a493faa22","title":"q invite for qiku q terra","desc":"<span></span>my three reasons to buy qiku q terra<br>1.aesthetics<br>2.price<br>3.dual sim","posted_by":"adv.mukkida","posted_by_id":"566cbd8e0dcdd80a493faa12","posted_by_image":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p50x50/1926761_921293014582240_6298654617607316300_n.jpg?oh=5340ae39a35e04d1a7a0222b21420d04&oe=571B2C23&__gda__=1461505137_ce97162ce1ecedc020d6781d286bfa9e","category":"qterra","link":"q-invite-for-qiku-q-terra","created_at":"2015-12-13T00:49:48.994Z","replyCount":0,"viewCount":9,"__v":0,"score":1.5777777777777775},{"_id":"562c4daedd75e1572cf673f8","title":"Q Terra – A Smartphone Experience of Epic Proportions","desc":"<span></span><span>﻿</span><b style=\"text-align: center;\"><span style=\"font-size:14.0pt;mso-bidi-font-size:11.0pt;line-height:107%\"><o:p>&nbsp;</o:p></span></b>Let’s understand one thing right away – a great smartphone\nis NOT JUST a nifty gadget with cool-sounding features that give you the\npseudo-satisfaction of being ‘up-to-date’ with the world. For us, a smartphone\nis simple – <b>a pocket-sized technological\nwonder that makes your life easier</b>.<p class=\"MsoNormal\"><o:p></o:p></p>\n\n<p class=\"MsoNormal\"><o:p>&nbsp;<span wbb=\"wbbid_19\"><img src=\"http://blog.qiku.com/wp-content/uploads/2015/10/11917777_1184556344904225_9184552826312917544_n.jpg\"><span>﻿</span></span></o:p></p>\n\n<p class=\"MsoNormal\">Now we put our money where our mouth is; that’s why we have\ncreated <b>Q</b> <b>Terra</b> – a smartphone that combines superior hardware with a\ngroundbreaking OS. The amazing symbiosis may have resulted in creation of a\nsmartphone experience of, as the title suggests, epic proportions. <o:p></o:p></p>\n\n<p class=\"MsoNormal\">Need a reason why Q Terra is the smartphone experience you\ndeserve (and need right now)? We’ll give you five, read on:<o:p></o:p></p>\n\n<p class=\"MsoNormal\"><b>&nbsp;</b></p>\n\n<p class=\"MsoNormal\"><b>A built-to-last\ndesign that should’ve been categorised under ‘contemporary art’<o:p></o:p></b></p>\n\n<p class=\"MsoNormal\">Isn’t technology beautiful? No, we mean literally. Finely\ncut and polished to perfection, Terra’s lightweight body has a <b>matte finish</b> that feels effortless in\nyour hand, and looks superbly sleek to the people who’ll be staring at it in\nwondrous awe. And what good is beauty if it isn’t built to last? Q Terra is\nmade from <b>high-strength aerospace\naluminum alloy</b> that provides extra durability. It might even withstand a\nblast or something; though we don’t intend to test that. <o:p></o:p></p>\n\n<span wbb=\"wbbid_21\"><img src=\"http://blog.qiku.com/wp-content/uploads/2015/10/12014983_1192272827465910_338176836943127773_o.png\"><span>﻿</span></span><br>\n\n<p class=\"MsoNormal\"><b>Supercomputer-esque\nperformance that just isn’t fair to the competition<o:p></o:p></b></p>\n\n<p class=\"MsoNormal\">Mobile apps are demanding, very demanding. We understand\nyour love for hurling multi-coloured birds at unsuspecting pigs, updating the\nworld via professionally captured selfies, and the constant need to do a\nmillion other tasks simultaneously. Q Terra’s <b>2GHz Qualcomm Snapdragon 810 Octa-core processor</b> and <b>LPDDR4 4GB RAM</b> take care of those\nannoying hang-ups and heated moments that disrupt your experience. Multitasking\nshould be a smartphone’s top priority, and we haven’t forgotten that.<o:p></o:p></p>\n\n<p class=\"MsoNormal\"><o:p>&nbsp;</o:p></p>\n\n<span wbb=\"wbbid_23\"><img src=\"http://blog.qiku.com/wp-content/uploads/2015/10/12017439_1191233140903212_7990080939404856477_o.png\"><span>﻿</span></span><br>\n\n<p class=\"MsoNormal\"><b>2K display with more\npixels than we care to count<o:p></o:p></b></p>\n\n<p class=\"MsoNormal\">Your eyes deserve to feast on the gorgeous <b>ultra-HD 2K screen</b> that Q Terra offers.\nWhether it’s an intense gaming session or your favorite action-thriller,\nTerra’s unparalleled visuals will take you right into the moment. Protected by\nhigh-quality <b>Corning Gorilla Glass 3</b>,\nthe <b>6” screen</b> also has an\nunprecedented <b>screen-to-body ratio of\n83%</b> which makes your screen bigger while still keeping the phone\ncompact.&nbsp; <o:p></o:p></p>\n\n<p class=\"MsoNormal\"><b>&nbsp;</b></p>\n\n<p class=\"MsoNormal\"><b>If you thought we\nwould not be mentioning kickass camera(s), you have been mistaken<o:p></o:p></b></p>\n\n<p class=\"MsoNormal\">At times, just one camera isn’t enough to capture all the\nawesomeness around you. That’s why Q Terra comes equipped with <b>two (yes, two) 13MP back cameras</b> that\ncombine an IMX278 color sensor with a B/W IMX214 sensor to capture the most\nvisually stunning pictures and videos with little effort. Fancy, isn’t it? For\nour more advanced shutterbugs, a horde of enhancements will let you have the\nmost extensive photography experience that a smartphone can offer. <o:p></o:p></p>\n\n<p class=\"MsoNormal\"><o:p>&nbsp;</o:p></p>\n\n<span wbb=\"wbbid_25\"><img src=\"http://blog.qiku.com/wp-content/uploads/2015/10/12028826_1197740070252519_4975385344619722222_o.png\"><span>﻿</span></span><br>\n\n<p class=\"MsoNormal\"><b>A revolutionary OS\nthat should (and will) have an entire article dedicated to it<o:p></o:p></b></p>\n\n<p class=\"MsoNormal\">The true game-changer for Q Terra is its best-in-class, <b>proprietary Android-based OS – 360OS</b>. The\nfeature-rich OS lets you freeze unused apps, clear hidden third party software,\nand optimise the device performance based on your usage. A bunch of remarkable\nsecurity features ensure safety of your data and identity, while its battery\nsaving measures give you a long-lasting (that’s an understatement) battery\nlife. Less bloatware, less resource consumption, more awesomeness. <o:p></o:p></p>\n\n<p class=\"MsoNormal\"><o:p>&nbsp;</o:p></p>\n\n<p class=\"MsoNormal\">The smartphone of all smartphones is finally here! So for\nall the ‘flagships’ and ‘flagship killers’ out there – see you around kids!<o:p></o:p></p>\n\n<!--EndFragment--><br>","posted_by":"Qiku","posted_by_id":"562333efb79168f15ebeecdf","category":"qterra","link":"Q-Terra--A-Smartphone-Experience-of-Epic-Proportions","created_at":"2015-10-25T03:34:06.352Z","replyCount":15,"viewCount":182,"__v":0,"score":1.5738297662815126},{"_id":"565eb31bcdf03a604ffae2f9","title":"Q-Invites? Our way of saying – Welcome to the #GameChanger Club!","desc":"<span></span><span>Why Invites?<br><br>I’m sure most of you asked yourself the same question. And before deciding upon the invite system, we&nbsp;did the same thing.<br>We all know, and some of us have experienced the good, the bad and the ugly parts of the previous&nbsp;invite system of other reputed companies, not pointing fingers.<br><br>We are not trying to make it harder for you to get our product; in fact we are grateful to you for&nbsp;considering us, and reading this post. Not because, our products don’t deserve it, but being realistic we&nbsp;also understand the crowded market that we are in, and the countless choices you might have.<br><br>That being said, the purpose of our invites, are to bring you closer to us. Closer, so that we can hear you.&nbsp;We want you to become part of what we are, and together to aspire to new horizons and new&nbsp;possibilities.<br><br>We think of our users as game changers and our forum will build a community of game changers. Think of the Q-Invite as&nbsp;a&nbsp;privilege of being a part of this great club! Our way of saying Thank You&nbsp;and getting us closer.<br><br>We will be rolling out several ways in which game changers like you can be a part of our club and get&nbsp;the Q-Invite. Starting now! :)<br><br>The first 1313 people to register on our forum starting today – will be the first users in India to get Q-Invites on 5th December 2015. All users registered already on our forum (3000+) will automatically be&nbsp;getting Q-Invites on December 5th.<br><br>Cheers!<br><br>Varun Sharma<br><br><br><span wbb=\"wbbid_27\"><span wbb=\"wbbid_29\"><a href=\"http://blog.qiku.com/index.php/2015/12/02/q-invites/\">See our blog here...</a><span>﻿</span></span></span><br></span><br>","posted_by":"Varun Sharma","posted_by_id":"5624486eb79168f15ebeece4","category":"qterra","link":"QInvites-Our-way-of-saying--Welcome-to-the-GameChanger-Club","created_at":"2015-12-02T09:00:11.471Z","replyCount":163,"viewCount":1985,"type":"official","__v":0,"score":1.5558375634517767},{"_id":"56606de9ff1dafea5e926e6c","title":"Exited for Q Terra....","desc":"<span></span>Waiting for the Q Terra golden variant.....exited to own the Q Terra..<br>","posted_by":"makarand.b.more","posted_by_id":"56606b89ff1dafea5e926e59","posted_by_image":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xaf1/v/t1.0-1/p50x50/11201828_895775117174018_6263593516648612350_n.jpg?oh=0752aa65063d058621cc678c468a58ad&oe=56EDFCBD&__gda__=1458292234_5709fe1e6a46328bae99b1869c0029cf","category":"qterra","link":"Exited-for-Q-Terra","created_at":"2015-12-03T16:29:29.352Z","replyCount":0,"viewCount":4,"__v":0,"score":1.5530303030303032},{"_id":"56697da20b97fe8a29d4bb12","title":"#GameChangers Your opportunity to get a Q-Invite","desc":"<span></span><span>﻿</span>Today we start a new contest, in which you can get your hands on a Q-Invite. The contest will run for three <br>consecutive days, until Monday.<div><br></div><div><b><i>\"Give us 3 reasons why you want to buy a QiKU phone and some of you Game Changers will get Q Terra for&nbsp;</i></b></div><div><b><i>a special price of Rs 19,999.\"</i></b><br></div><div><br></div><div>You can post your answers in this thread, as this will be the only place where we will collect our winners. You&nbsp;</div><div>can also share this thread on facebook and twitter to increase your chances.</div><div><br></div><div>Remember, you are the #gamechangers, let us see this in your answers. There is no set number of Q-Invites&nbsp;</div><div>to be rolled out, so everything depends on you and your #gamechanging answer :) &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br></div><div><br></div><div>Good luck!</div><br>","posted_by":"QikuTeam","posted_by_id":"56672b469d8211d51f20cd87","category":"qterra","link":"GameChangers-Your-opportunity-to-get-a-QInvite","created_at":"2015-12-10T13:26:58.267Z","replyCount":339,"viewCount":3371,"type":"official","__v":0,"score":1.4974358974358974},{"_id":"5662c759d8a63a7d66bc958b","title":"Apologies for the short delay. Q-Invites still on for 5th December, 2015","desc":"<span></span>Dear friends &amp; #gamechangers,&nbsp;<br><br>We apologize for the short delay. As promised, the Q-Invites will land in your inboxes within today.<br><br>You can use them to purchase the Q Terra at 19,999 Rs, starting with 22 December, on our exclusive partner's platform - 360 Gadgets. The Q-Invites, sent before 22 December, will be valid until 24th December.<br><br>We call upon your patience and understanding, as we are working hard to make this process as fast and smooth as possible.<br><br>Thank you everyone, wish you all a great weekend!<br><br>","posted_by":"Magna","posted_by_id":"5624486eb79168f15ebeece4","category":"general","link":"Apologies-for-the-short-delay-QInvites-still-on-for-th-December-","created_at":"2015-12-05T11:15:37.794Z","replyCount":75,"viewCount":1046,"type":"official","__v":0,"score":1.468599033816425},{"_id":"5667e52c9d8211d51f20d536","title":"Registration began once again for Q-invites","desc":"<span>Please go to the following link and get Q-invites. Only 808 Q-invites..... so hurry up !!<br><br></span><span>https://forums.qiku.com/replies/Welcome-to-the-gamechanger-club</span><br>","posted_by":"zauq","posted_by_id":"5657feca137f2415568ed8c6","category":"general","link":"Registration-began-once-again-for-Qinvites","created_at":"2015-12-09T08:24:12.055Z","replyCount":0,"viewCount":46,"__v":0,"score":1.4326923076923077},{"_id":"565bb6f1137f2415568eddcc","title":"wanna be Gmaechanger!!. seeking Invite for Q TERRA. please","desc":"<span></span>Hi Q team. I m eagerly waiting for Q terra. can I have one invite for me please. its very fantastic flagship killer device.<br>","posted_by":"tareqshj","posted_by_id":"565bb5b1137f2415568eddc5","category":"general","link":"wanna-be-Gmaechanger-seeking-Invite-for-Q-TERRA-please","created_at":"2015-11-30T02:39:45.901Z","replyCount":3,"viewCount":28,"__v":0,"score":1.4003759398496238},{"_id":"566c610e0dcdd80a493fa7a8","title":"I WANT TO BUY THE QIKU Q TERRA BECAUSE","desc":"<span><br>QIKU Q TERRA is a <br>1. Light body beast with thin Bezels &amp;&nbsp;Super liquid cooling for heat dissipation,&nbsp;<br>2. Innovative duel Camera for capturing great shots<br>3. Last but not least, when I will have this beauty beast, the pharse “neighbours envy owners pride”will become true<br>Please send me an invite for Qiku Q Terra<br>Saravanan</span><span></span><br>","posted_by":"drbcsaravanan","posted_by_id":"566c37fb0dcdd80a493fa5e8","posted_by_image":"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=179f53b733169e2b5deb1ee5d5b61eb6&oe=56E79E2F&__gda__=1458041095_a782129bd70ae9e4b0ea440e255557cd","category":"general","link":"I-WANT-TO-BUY-THE-QIKU-Q-TERRA-BECAUSE","created_at":"2015-12-12T18:01:50.087Z","replyCount":0,"viewCount":8,"__v":0,"score":1.3772727272727274},{"_id":"566972dc0b97fe8a29d4baff","title":"Just saw this review on Q Terra","desc":"<span></span>Just saw this review on Q Terra, i don't know how i missed it before. It was uploaded November 27th.&nbsp;<span>https://www.youtube.com/watch?v=YMtt-EyIfUg</span><br><br>It made me realize how great the phone may be. And i'm not talking about the 810 version, cause that one is just....i don't know, i'm not very confident about that chipset. And i don't think you can blame me for that. I mean - Oneplus 2, LG G Flex 2, HTC One M9 etc., all of them are known for heating issues.<br><br>On the other hand we have devices like LG G4 - an awesome phone; Moto X Style - again, amazing device; the latest addition of LG, the V10 - also very stable and good device. All of them running with Snapdragon 808. And all of the above mentioned phones are way more expensive than QiKU for example. So here, heats off to QiKU.<br><br>Now, concerning the screen. Everyone is raving about 2k, 4k screens. And I don't have anything against it, but in some case it's just pointless. It consumes battery and it doesn't feel any different than a 1080p screen. In the case of Sony Xperia Z5, i would see something special i guess. That screen is 4k only when you're browsing pictures or watching videos. Besides that it renders everything in 1080p, which is a smart move since it consumes battery. <br>But this phone costs like 50K, and again Snapdragon 810. Hmm...no thanks!<br><br>Now Q Terra has 6 inch screen, and would it have had a 2k or 4k screen, the battery consumption would be tremendous. Instead it has a 1080p screen coupled with a 3700mAh battery, which is huuuge....and on top of that, QiKU claims one of the strong point of 360 OS is battery life management. That is still to be tested, but if it's true....the battery life should be just awesome.&nbsp;<br><br>When they said they are about to enter India, most of the media was writing about a price of around 25K. Now, that they announced it at 20K, it just seems to me such a good choice, and not only for the mentioned reasons; also for the sleek design considering the huge battery, the 2.5D curved glass like we find on Motorola, Apple and other premium brands, the camera of course - which is a first for this industry.<br><br>I don't know....what do you guys think?<br><br><br>","posted_by":"SpaceInvader","posted_by_id":"563497730c66296110d0000e","category":"qterra","link":"Just-saw-this-review-on-Q-Terra","created_at":"2015-12-10T12:41:00.136Z","replyCount":10,"viewCount":88,"__v":0,"score":1.3565789473684209},{"_id":"565c8b58137f2415568edf37","title":"Waiting for the Qiku Q Terra 810 aka \"The Ultimate Game Changer\"","desc":"<span></span>I'll&nbsp;be&nbsp;patiently&nbsp;waiting&nbsp;for&nbsp;the&nbsp;Qiku&nbsp;to&nbsp;launch&nbsp;Qiku Q&nbsp;Terra&nbsp;810&nbsp;aka Q Terra&nbsp;Prime&nbsp;in India.&nbsp;<br><br>","posted_by":"Abhi007","posted_by_id":"565c89d4137f2415568edf34","category":"qterra","link":"Waiting-for-the-Qiku-Q-Terra--aka-The-Ultimate-Game-Changer","created_at":"2015-11-30T17:46:00.492Z","replyCount":2,"viewCount":36,"__v":0,"score":1.3524305555555556},{"_id":"5666a3d5d8a63a7d66bc9f61","title":"Q terra","desc":"Invite me to buy a Q terra<br>","posted_by":"rdjha","posted_by_id":"5666a281d8a63a7d66bc9f5d","category":"qterra","link":"Q-terra","created_at":"2015-12-08T09:33:09.405Z","replyCount":1,"viewCount":12,"__v":0,"score":1.35},{"_id":"56657484d8a63a7d66bc9b1d","title":"Greetings Terrans! Stay tuned, more Q-Invites are coming!","desc":"<span></span><span>Greetings Terrans,<br><br>We are happy to announce that the first batch of Q-Invites reached some of our beloved citizens. <br><br>To all the Martians, Plutonians and other strangers of the galaxy, we tell you – rest assured, as we will have many other ways in which<br>you can rightfully become one of us.<br><br>As soon as we finalize on our production schedule, we will be releasing more information on how you can get your Q-Invite before 22nd December. Stay tuned on our forum,&nbsp;<span wbb=\"wbbid_24\"><span wbb=\"wbbid_29\"><a href=\"https://www.facebook.com/QikuIN/?fref=ts\">facebook</a><span>﻿</span></span><span>﻿ and&nbsp;<span wbb=\"wbbid_26\"><a href=\"https://twitter.com/QikuIndia\">twitter</a><span>﻿ accounts while trying to enjoy the journey we all embarked upon.&nbsp;</span></span></span></span><br><br>Sincerely Yours,<br>Team QiKU</span><br>","posted_by":"Magna","posted_by_id":"5624486eb79168f15ebeece4","category":"qterra","link":"Greetings-Terrans-Stay-tuned-more-QInvites-are-coming","created_at":"2015-12-07T11:59:00.494Z","replyCount":61,"viewCount":923,"type":"official","__v":0,"score":1.3355795148247978},{"_id":"5661212e00a0245a629ac86b","title":"q luna","desc":"<span></span>anyone having idea about q luna","posted_by":"jay","posted_by_id":"56593600137f2415568edb34","category":"general","link":"q-luna","created_at":"2015-12-04T05:14:22.436Z","replyCount":0,"viewCount":5,"__v":0,"score":1.3333333333333335}];
		$http.get(apiUrl+'/officialthread').success(function(data){
			//$rootScope.$emit('updateOgTags',{ogtitle:'Qiku Forum'});
			fc.threads = data;
		});
		$http.get(apiUrl+'/stats').success(function(data){
			fc.stats = data.stats;
		});
	}
})();