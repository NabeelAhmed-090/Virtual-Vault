import bcrypt from 'bcryptjs';
const users = [
  {
    firstName: 'admin',
    lastName: 'user',
    userName: 'admin_user',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    city: 'lahore'
  },
  {
    firstName: 'nabeel',
    lastName: 'ahmed',
    userName: 'ahmednabeel',
    email: 'nabeel@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    city: 'lahore'
  },
  {
    firstName: 'laiba',
    lastName: 'arshad',
    userName: 'laiba_la',
    email: 'laiba@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    city: 'sahiwal'
  },
  {
    firstName: 'Tammy',
    lastName: 'Herche',
    userName: 'therche0',
    email: 'therche0@phoca.cz',
    password: 'qXO3JG6riPz',
    city: 'Kiambu'
  },
  {
    firstName: 'Elle',
    lastName: 'Jell',
    userName: 'ejell1',
    email: 'ejell1@jiathis.com',
    password: 'Tc6g8yc6w',
    city: 'Al Qurayshīyah'
  },
  {
    firstName: 'Sadye',
    lastName: 'Trebilcock',
    userName: 'strebilcock2',
    email: 'strebilcock2@howstuffworks.com',
    password: 'YHFEoowS',
    city: 'Tazemmourt'
  },
  {
    firstName: 'Vevay',
    lastName: 'Beumant',
    userName: 'vbeumant3',
    email: 'vbeumant3@nhs.uk',
    password: 'JX38fdhm4',
    city: 'Vessada'
  },
  {
    firstName: 'Arne',
    lastName: 'Knappitt',
    userName: 'aknappitt4',
    email: 'aknappitt4@forbes.com',
    password: 'DbefUGdijfP',
    city: 'Baloc'
  },
  {
    firstName: 'Casi',
    lastName: 'Baudins',
    userName: 'cbaudins5',
    email: 'cbaudins5@spiegel.de',
    password: 'Errf1ZiWuX0',
    city: 'Tualeu'
  },
  {
    firstName: 'Xylina',
    lastName: 'Tremayle',
    userName: 'xtremayle6',
    email: 'xtremayle6@deviantart.com',
    password: 'uBQf5d9Ryeq',
    city: 'Jiumen'
  },
  {
    firstName: 'Hadlee',
    lastName: 'Yurchishin',
    userName: 'hyurchishin7',
    email: 'hyurchishin7@purevolume.com',
    password: 'oSNYe7sq',
    city: 'Boshof'
  },
  {
    firstName: 'Stillman',
    lastName: 'Quinane',
    userName: 'squinane8',
    email: 'squinane8@gnu.org',
    password: 'h7oDO5V',
    city: 'Courtaboeuf'
  },
  {
    firstName: 'Timmie',
    lastName: 'Paireman',
    userName: 'tpaireman9',
    email: 'tpaireman9@ucsd.edu',
    password: 'xKAVq7n',
    city: 'Kunheda Woerzu Manzu'
  },
  {
    firstName: 'Donella',
    lastName: 'Siddall',
    userName: 'dsiddalla',
    email: 'dsiddalla@etsy.com',
    password: 'KSGmDE',
    city: 'Sambong'
  },
  {
    firstName: 'Kristyn',
    lastName: 'Every',
    userName: 'keveryb',
    email: 'keveryb@patch.com',
    password: 'tn4JXQE',
    city: 'Kunduz'
  },
  {
    firstName: 'Carmina',
    lastName: 'Mordue',
    userName: 'cmorduec',
    email: 'cmorduec@plala.or.jp',
    password: 'K1mG9vYTwjy',
    city: 'Peñarrubia'
  },
  {
    firstName: 'Thomasa',
    lastName: 'Wybron',
    userName: 'twybrond',
    email: 'twybrond@hud.gov',
    password: 'AeJ8s5IjD',
    city: 'Rîşcani'
  },
  {
    firstName: 'Stu',
    lastName: 'Kinnaird',
    userName: 'skinnairde',
    email: 'skinnairde@so-net.ne.jp',
    password: 'gNySWz5',
    city: 'Vostochnyy'
  },
  {
    firstName: 'Elly',
    lastName: 'Helwig',
    userName: 'ehelwigf',
    email: 'ehelwigf@digg.com',
    password: 'D4olO1h',
    city: 'Malamig'
  },
  {
    firstName: 'Kayne',
    lastName: 'Wolfe',
    userName: 'kwolfeg',
    email: 'kwolfeg@elpais.com',
    password: 'JB9pKhylG',
    city: 'Butajīra'
  },
  {
    firstName: 'Fred',
    lastName: 'De Launde',
    userName: 'fdelaundeh',
    email: 'fdelaundeh@mlb.com',
    password: 'bti1gs6L',
    city: 'Lasi Dua'
  },
  {
    firstName: 'Sheri',
    lastName: 'Dobrowlski',
    userName: 'sdobrowlskii',
    email: 'sdobrowlskii@taobao.com',
    password: 'Te6gRGyd8',
    city: 'Fonte de Angeão'
  },
  {
    firstName: 'Farica',
    lastName: 'Hunting',
    userName: 'fhuntingj',
    email: 'fhuntingj@blog.com',
    password: '2Mv2P1',
    city: 'Olenyok'
  },
  {
    firstName: 'Urbano',
    lastName: 'Albery',
    userName: 'ualberyk',
    email: 'ualberyk@indiegogo.com',
    password: 'qd56rHX',
    city: 'Zhayang'
  },
  {
    firstName: 'Rodi',
    lastName: 'Wigfall',
    userName: 'rwigfalll',
    email: 'rwigfalll@blog.com',
    password: 'XE2NpZs',
    city: 'El Carmen'
  },
  {
    firstName: 'Elvera',
    lastName: 'Losel',
    userName: 'eloselm',
    email: 'eloselm@noaa.gov',
    password: 'E9Cq4Kxkvvz',
    city: 'Maduao'
  },
  {
    firstName: 'Thibaut',
    lastName: 'McCusker',
    userName: 'tmccuskern',
    email: 'tmccuskern@indiatimes.com',
    password: 'mkvIB4EflRMe',
    city: 'La Unión'
  },
  {
    firstName: 'Daffy',
    lastName: 'Bennis',
    userName: 'dbenniso',
    email: 'dbenniso@issuu.com',
    password: 'F2ypH03aS6B5',
    city: 'Nepalgunj'
  },
  {
    firstName: 'Brion',
    lastName: 'Northam',
    userName: 'bnorthamp',
    email: 'bnorthamp@liveinternet.ru',
    password: 'Bw3jrB1MB',
    city: 'Starokucherganovka'
  },
  {
    firstName: 'Allyn',
    lastName: 'Heselwood',
    userName: 'aheselwoodq',
    email: 'aheselwoodq@parallels.com',
    password: '5RPXbhAa',
    city: 'Kuty'
  },
  {
    firstName: 'Micky',
    lastName: 'Echallie',
    userName: 'mechallier',
    email: 'mechallier@mapquest.com',
    password: 'cfksowDL',
    city: 'Abelheira'
  },
  {
    firstName: 'Cortney',
    lastName: 'Ainsbury',
    userName: 'cainsburys',
    email: 'cainsburys@accuweather.com',
    password: 'Cfn9brTSeM',
    city: 'Ořechov'
  },
  {
    firstName: 'Trace',
    lastName: 'Duckerin',
    userName: 'tduckerint',
    email: 'tduckerint@flickr.com',
    password: 'S3Cfaj',
    city: 'Pringsewu'
  },
  {
    firstName: 'West',
    lastName: 'Skakunas',
    userName: 'wskakunasu',
    email: 'wskakunasu@flickr.com',
    password: 'I9CL4IHEwW1',
    city: 'Koungheul'
  },
  {
    firstName: 'Aleda',
    lastName: 'Renvoise',
    userName: 'arenvoisev',
    email: 'arenvoisev@ustream.tv',
    password: 'vuNa5e',
    city: "Bene 'Ayish"
  },
  {
    firstName: 'Shayne',
    lastName: 'McCarty',
    userName: 'smccartyw',
    email: 'smccartyw@harvard.edu',
    password: 't6HlCmpcgBa',
    city: 'Lerrnanist'
  },
  {
    firstName: 'Kayle',
    lastName: 'Beecroft',
    userName: 'kbeecroftx',
    email: 'kbeecroftx@netlog.com',
    password: 'LGrxn3RXb',
    city: 'Mawlaik'
  },
  {
    firstName: 'Florance',
    lastName: 'Maving',
    userName: 'fmavingy',
    email: 'fmavingy@unicef.org',
    password: 'iUEoGqXl',
    city: 'Patnongon'
  },
  {
    firstName: 'Tallie',
    lastName: 'Clipston',
    userName: 'tclipstonz',
    email: 'tclipstonz@state.tx.us',
    password: 'poJEKkldXp',
    city: 'Cunday'
  },
  {
    firstName: 'Sandye',
    lastName: 'Avrahamov',
    userName: 'savrahamov10',
    email: 'savrahamov10@fema.gov',
    password: '8YrRC4',
    city: 'Sanzao'
  },
  {
    firstName: 'Nikola',
    lastName: 'Gluyas',
    userName: 'ngluyas11',
    email: 'ngluyas11@wunderground.com',
    password: 'OcUJM3',
    city: 'Paluan'
  },
  {
    firstName: 'Shara',
    lastName: 'Sercombe',
    userName: 'ssercombe12',
    email: 'ssercombe12@netlog.com',
    password: 'U0WCZz7RSnto',
    city: 'Marseille'
  },
  {
    firstName: 'Cherilyn',
    lastName: 'Larmouth',
    userName: 'clarmouth13',
    email: 'clarmouth13@infoseek.co.jp',
    password: 'xRozay7DL',
    city: 'Kubangwaru'
  },
  {
    firstName: 'Susana',
    lastName: 'Welldrake',
    userName: 'swelldrake14',
    email: 'swelldrake14@infoseek.co.jp',
    password: 'BUdIo76v5SrW',
    city: 'Zarzal'
  },
  {
    firstName: 'Emlynn',
    lastName: 'Rubenchik',
    userName: 'erubenchik15',
    email: 'erubenchik15@google.de',
    password: 'DASdGZfeOI',
    city: 'Triesenberg'
  },
  {
    firstName: 'Noni',
    lastName: 'La Wille',
    userName: 'nlawille16',
    email: 'nlawille16@printfriendly.com',
    password: 'lIZiT1EgMWh6',
    city: 'Valdemārpils'
  },
  {
    firstName: 'Brooke',
    lastName: 'Renol',
    userName: 'brenol17',
    email: 'brenol17@flavors.me',
    password: 'G7NbgY',
    city: 'Muḩambal'
  },
  {
    firstName: 'Kim',
    lastName: 'Janicek',
    userName: 'kjanicek18',
    email: 'kjanicek18@dmoz.org',
    password: 'N64xdYdua',
    city: 'Tongren'
  },
  {
    firstName: 'Anastasia',
    lastName: 'Hrishanok',
    userName: 'ahrishanok19',
    email: 'ahrishanok19@washington.edu',
    password: 'CQSQPLFldHaf',
    city: 'Cikondang'
  },
  {
    firstName: 'Nonah',
    lastName: 'Station',
    userName: 'nstation1a',
    email: 'nstation1a@mozilla.com',
    password: 'f7pFsKai',
    city: 'Winburg'
  },
  {
    firstName: 'Neel',
    lastName: 'Piell',
    userName: 'npiell1b',
    email: 'npiell1b@histats.com',
    password: '6h0KIG6ioq',
    city: 'Mosta'
  },
  {
    firstName: 'Blane',
    lastName: 'Witcombe',
    userName: 'bwitcombe1c',
    email: 'bwitcombe1c@pen.io',
    password: 'az7VAQx3gX',
    city: 'Naga'
  },
  {
    firstName: 'Cesare',
    lastName: 'Jiggins',
    userName: 'cjiggins1d',
    email: 'cjiggins1d@prweb.com',
    password: 'XiymWlEpaZMd',
    city: 'Cartagena'
  },
  {
    firstName: 'Bea',
    lastName: 'Eldershaw',
    userName: 'beldershaw1e',
    email: 'beldershaw1e@myspace.com',
    password: 'n28tH79NM',
    city: 'Río Hondo'
  },
  {
    firstName: 'Cristobal',
    lastName: 'Trounce',
    userName: 'ctrounce1f',
    email: 'ctrounce1f@ycombinator.com',
    password: 'StfzXnHN',
    city: 'Guiyang'
  },
  {
    firstName: 'Windham',
    lastName: 'Stuckes',
    userName: 'wstuckes1g',
    email: 'wstuckes1g@go.com',
    password: 'abn08LTd6',
    city: 'Krasae Sin'
  },
  {
    firstName: 'Bradford',
    lastName: 'Bartelet',
    userName: 'bbartelet1h',
    email: 'bbartelet1h@rediff.com',
    password: 'QXCp3upWFm9j',
    city: 'Västra Frölunda'
  },
  {
    firstName: 'Violante',
    lastName: 'McGavigan',
    userName: 'vmcgavigan1i',
    email: 'vmcgavigan1i@gmpg.org',
    password: 'o8YYJwe5vz',
    city: 'Simimbaan'
  },
  {
    firstName: 'Zita',
    lastName: 'Kitchinham',
    userName: 'zkitchinham1j',
    email: 'zkitchinham1j@a8.net',
    password: 'DAaGPq',
    city: 'Dunhao'
  },
  {
    firstName: 'Steffi',
    lastName: 'Lacaze',
    userName: 'slacaze1k',
    email: 'slacaze1k@photobucket.com',
    password: 'xFO2uRI4oGY',
    city: 'Keratéa'
  },
  {
    firstName: 'Reeva',
    lastName: 'Lazell',
    userName: 'rlazell1l',
    email: 'rlazell1l@umich.edu',
    password: 'E6VXOx5L',
    city: 'Rancageneng Satu'
  },
  {
    firstName: 'Giulietta',
    lastName: 'Thomkins',
    userName: 'gthomkins1m',
    email: 'gthomkins1m@webmd.com',
    password: '9VOquYct',
    city: 'Gaohong'
  },
  {
    firstName: 'Julianne',
    lastName: 'Claricoates',
    userName: 'jclaricoates1n',
    email: 'jclaricoates1n@wsj.com',
    password: 'd5Juz5M8',
    city: 'Linköping'
  },
  {
    firstName: 'Hasty',
    lastName: 'Ironside',
    userName: 'hironside1o',
    email: 'hironside1o@amazonaws.com',
    password: 'GhWjfg',
    city: 'Potiskum'
  },
  {
    firstName: 'Herman',
    lastName: 'Pinch',
    userName: 'hpinch1p',
    email: 'hpinch1p@blogs.com',
    password: 'FBg2Qex',
    city: 'Abonnema'
  },
  {
    firstName: 'Valeria',
    lastName: 'Haliday',
    userName: 'vhaliday1q',
    email: 'vhaliday1q@ox.ac.uk',
    password: 'UMzXXd3c9r',
    city: 'Podgórzyn'
  },
  {
    firstName: 'Danice',
    lastName: 'Raine',
    userName: 'draine1r',
    email: 'draine1r@fema.gov',
    password: 'JnBpm4oEApJ',
    city: 'Arevik'
  },
  {
    firstName: 'Ignacius',
    lastName: 'Gooley',
    userName: 'igooley1s',
    email: 'igooley1s@cyberchimps.com',
    password: 'pVEnKjG',
    city: 'Cergy-Pontoise'
  },
  {
    firstName: 'Murray',
    lastName: 'Brunger',
    userName: 'mbrunger1t',
    email: 'mbrunger1t@instagram.com',
    password: 'xr6SJdAFxR',
    city: 'Al Ḩawātah'
  },
  {
    firstName: 'Willabella',
    lastName: "O'Lennachain",
    userName: 'wolennachain1u',
    email: 'wolennachain1u@cam.ac.uk',
    password: 'aUVyusIe',
    city: 'Estarreja'
  },
  {
    firstName: 'Julian',
    lastName: 'Jablonski',
    userName: 'jjablonski1v',
    email: 'jjablonski1v@virginia.edu',
    password: 'iwqfMq2Gh',
    city: 'Hengshitang'
  },
  {
    firstName: 'Bennett',
    lastName: 'Balsom',
    userName: 'bbalsom1w',
    email: 'bbalsom1w@prnewswire.com',
    password: 'JdQxQKM',
    city: 'Severnyy'
  },
  {
    firstName: 'Berenice',
    lastName: 'Clougher',
    userName: 'bclougher1x',
    email: 'bclougher1x@netlog.com',
    password: '2bBxXye1UjQ',
    city: 'Ponjen'
  },
  {
    firstName: 'Michele',
    lastName: 'Gaggen',
    userName: 'mgaggen1y',
    email: 'mgaggen1y@examiner.com',
    password: 'ywz2ZeCt',
    city: 'Freetown'
  },
  {
    firstName: 'Candida',
    lastName: 'Castanie',
    userName: 'ccastanie1z',
    email: 'ccastanie1z@storify.com',
    password: 'y4iZU2Qj',
    city: 'Nice'
  },
  {
    firstName: 'Beau',
    lastName: 'Kinny',
    userName: 'bkinny20',
    email: 'bkinny20@msu.edu',
    password: 'FNsufMn0xY0',
    city: 'São Roque'
  },
  {
    firstName: 'Nicolette',
    lastName: 'Ferandez',
    userName: 'nferandez21',
    email: 'nferandez21@mtv.com',
    password: 'aJxzSqJSpaLf',
    city: 'Open Stage'
  },
  {
    firstName: 'Karlan',
    lastName: 'Yerrell',
    userName: 'kyerrell22',
    email: 'kyerrell22@mapquest.com',
    password: 'Y5jhcM',
    city: 'Břasy'
  },
  {
    firstName: 'Bryna',
    lastName: 'Fadian',
    userName: 'bfadian23',
    email: 'bfadian23@about.me',
    password: 'ZPJaEIork',
    city: 'Levallois-Perret'
  },
  {
    firstName: 'Vilhelmina',
    lastName: 'Danovich',
    userName: 'vdanovich24',
    email: 'vdanovich24@japanpost.jp',
    password: 'Z3RCnH2ALku7',
    city: 'Lenakapa'
  },
  {
    firstName: 'Callean',
    lastName: 'Dullingham',
    userName: 'cdullingham25',
    email: 'cdullingham25@sakura.ne.jp',
    password: 'N6IL9HH',
    city: 'Qibu'
  },
  {
    firstName: 'Fabian',
    lastName: 'Schott',
    userName: 'fschott26',
    email: 'fschott26@oaic.gov.au',
    password: 'RhS5Bd9Fx',
    city: 'Guangshun'
  },
  {
    firstName: 'Francyne',
    lastName: 'Matevosian',
    userName: 'fmatevosian27',
    email: 'fmatevosian27@princeton.edu',
    password: 'vemNKr3CRA3',
    city: 'Shuibatang'
  },
  {
    firstName: 'Salvador',
    lastName: 'Beeckx',
    userName: 'sbeeckx28',
    email: 'sbeeckx28@goo.gl',
    password: 'LvB7dF9WE',
    city: 'Pingxiang'
  },
  {
    firstName: 'Finley',
    lastName: 'Blanko',
    userName: 'fblanko29',
    email: 'fblanko29@census.gov',
    password: 'YmhPUbx',
    city: 'Xiacaoqiao'
  },
  {
    firstName: 'Brian',
    lastName: 'Caygill',
    userName: 'bcaygill2a',
    email: 'bcaygill2a@arstechnica.com',
    password: 'uigUI7Jf0zB',
    city: 'Sao Hai'
  },
  {
    firstName: 'Forrest',
    lastName: 'Rosengarten',
    userName: 'frosengarten2b',
    email: 'frosengarten2b@delicious.com',
    password: '4xMXv5gzI',
    city: 'Laojiangjunjie'
  },
  {
    firstName: 'Gaye',
    lastName: 'Catterill',
    userName: 'gcatterill2c',
    email: 'gcatterill2c@e-recht24.de',
    password: '6ic8y5g2Wi',
    city: 'Barra Mansa'
  },
  {
    firstName: 'Joellen',
    lastName: 'Sennett',
    userName: 'jsennett2d',
    email: 'jsennett2d@un.org',
    password: 'lf7jlRdtw',
    city: 'Datarsitu'
  },
  {
    firstName: 'Bobbe',
    lastName: 'Hairesnape',
    userName: 'bhairesnape2e',
    email: 'bhairesnape2e@seattletimes.com',
    password: 'QQm7M2a',
    city: 'Gudja'
  },
  {
    firstName: 'Lay',
    lastName: 'Berecloth',
    userName: 'lberecloth2f',
    email: 'lberecloth2f@psu.edu',
    password: 'oEwyneY8G96s',
    city: 'Mailag'
  },
  {
    firstName: 'Shepperd',
    lastName: 'Van der Kruijs',
    userName: 'svanderkruijs2g',
    email: 'svanderkruijs2g@scribd.com',
    password: 'JmByno2Qqg',
    city: 'Oropesa'
  },
  {
    firstName: 'Claire',
    lastName: 'Gallamore',
    userName: 'cgallamore2h',
    email: 'cgallamore2h@independent.co.uk',
    password: 'MV1F3fN',
    city: 'Kalimeneng'
  },
  {
    firstName: 'Dill',
    lastName: 'Durrance',
    userName: 'ddurrance2i',
    email: 'ddurrance2i@usnews.com',
    password: 'p7P9YMQTTxFe',
    city: 'Landi Kotal'
  },
  {
    firstName: 'Edythe',
    lastName: 'Guite',
    userName: 'eguite2j',
    email: 'eguite2j@ucoz.ru',
    password: 'fNTJfBgexsv9',
    city: 'Qukës-Skënderbe'
  },
  {
    firstName: 'Timmi',
    lastName: 'MacIan',
    userName: 'tmacian2k',
    email: 'tmacian2k@ehow.com',
    password: 'pyEdUA7fa',
    city: 'São Vicente'
  },
  {
    firstName: 'Roarke',
    lastName: 'Groucutt',
    userName: 'rgroucutt2l',
    email: 'rgroucutt2l@spotify.com',
    password: 'WufpMhYQvj93',
    city: 'Fernando Gutierrez Barrios'
  },
  {
    firstName: 'Francesco',
    lastName: 'Bodimeade',
    userName: 'fbodimeade2m',
    email: 'fbodimeade2m@aol.com',
    password: 'T5dNbjOABRq',
    city: 'Manzurka'
  },
  {
    firstName: 'Lazaro',
    lastName: 'Messingham',
    userName: 'lmessingham2n',
    email: 'lmessingham2n@jimdo.com',
    password: 'Kw62fCcqwLg',
    city: 'Tengah'
  },
  {
    firstName: 'Karlyn',
    lastName: 'Jorczyk',
    userName: 'kjorczyk2o',
    email: 'kjorczyk2o@bizjournals.com',
    password: '0yobC6',
    city: 'Svetlyy Yar'
  },
  {
    firstName: 'Judah',
    lastName: 'Hise',
    userName: 'jhise2p',
    email: 'jhise2p@nbcnews.com',
    password: 'bb8N9N',
    city: 'Amberd'
  },
  {
    firstName: 'Anestassia',
    lastName: 'Nowick',
    userName: 'anowick2q',
    email: 'anowick2q@washingtonpost.com',
    password: 'OGEKvX',
    city: 'Dajin'
  },
  {
    firstName: 'Arther',
    lastName: 'Adcock',
    userName: 'aadcock2r',
    email: 'aadcock2r@mayoclinic.com',
    password: 'jrDr25So',
    city: 'Panagyurishte'
  }
];

export default users;
