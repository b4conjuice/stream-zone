import { type Player } from '@/lib/types'

const espnRank = [
  [
    {
      name: 'Victor Wembanyama',
      team: 'SA',
      position: ['C'],
    },
    {
      name: 'Nikola Jokic',
      team: 'Den',
      position: ['C'],
    },
    {
      name: 'Shai Gilgeous-Alexander',
      team: 'OKC',
      position: ['PG'],
    },
    {
      name: 'Luka Doncic',
      team: 'LAL',
      position: ['PG'],
    },
    {
      name: 'James Harden',
      team: 'LAC',
      position: ['PG', 'SG'],
    },
    {
      name: 'Anthony Edwards',
      team: 'Min',
      position: ['SG', 'SF'],
    },
    {
      name: 'Trae Young',
      team: 'Atl',
      position: ['PG'],
    },
    {
      name: 'Cade Cunningham',
      team: 'Det',
      position: ['PG', 'SG'],
    },
    {
      name: 'Giannis Antetokounmpo',
      team: 'Mil',
      position: ['PF', 'C'],
    },
    {
      name: 'Stephen Curry',
      team: 'GS',
      position: ['PG'],
    },
    {
      name: 'Anthony Davis',
      team: 'Dal',
      position: ['C', 'PF'],
    },
    {
      name: 'Josh Giddey',
      team: 'Chi',
      position: ['SG', 'PG', 'SF'],
    },
    {
      name: 'Karl-Anthony Towns',
      team: 'NY',
      position: ['C', 'PF'],
    },
    {
      name: 'Amen Thompson',
      team: 'Hou',
      position: ['SF', 'SG', 'PF'],
    },
    {
      name: 'Tyrese Maxey',
      team: 'Phi',
      position: ['PG', 'SG'],
    },
    {
      name: 'LaMelo Ball',
      team: 'Cha',
      position: ['PG'],
    },
    {
      name: 'Devin Booker',
      team: 'Phx',
      position: ['PG', 'SG'],
    },
    {
      name: 'Derrick White',
      team: 'Bos',
      position: ['SG', 'PG'],
    },
    {
      name: 'LeBron James',
      team: 'LAL',
      position: ['SF', 'PF'],
    },
    {
      name: 'Domantas Sabonis',
      team: 'Sac',
      position: ['C', 'PF'],
    },
    {
      name: 'Myles Turner',
      team: 'Mil',
      position: ['C'],
    },
    {
      name: 'Donovan Mitchell',
      team: 'Cle',
      position: ['SG', 'PG'],
    },
    {
      name: 'Jalen Williams',
      team: 'OKC',
      position: ['PF', 'SF', 'C'],
    },
    {
      name: 'Chet Holmgren',
      team: 'OKC',
      position: ['C', 'PF'],
    },
    {
      name: 'Jaylen Brown',
      team: 'Bos',
      position: ['SF', 'SG'],
    },
    {
      name: 'Pascal Siakam',
      team: 'Ind',
      position: ['PF'],
    },
    {
      name: 'Dyson Daniels',
      team: 'Atl',
      position: ['SG', 'PG'],
    },
    {
      name: 'Bam Adebayo',
      team: 'Mia',
      position: ['C', 'PF'],
    },
    {
      name: 'Scottie Barnes',
      team: 'Tor',
      position: ['SF', 'SG', 'PF'],
    },
    {
      name: 'Nikola Vucevic',
      team: 'Chi',
      position: ['C'],
    },
    {
      name: 'Kevin Durant',
      team: 'Hou',
      position: ['PF'],
    },
    {
      name: 'Desmond Bane',
      team: 'Orl',
      position: ['SG', 'SF'],
    },
    {
      name: "De'Aaron Fox",
      team: 'SA',
      position: ['PG'],
    },
    {
      name: 'Evan Mobley',
      team: 'Cle',
      position: ['PF', 'C'],
    },
    {
      name: 'Cooper Flagg',
      team: 'Dal',
      position: ['SF', 'PF'],
    },
    {
      name: 'Jamal Murray',
      team: 'Den',
      position: ['PG'],
    },
    {
      name: 'Jalen Green',
      team: 'Phx',
      position: ['SG'],
    },
    {
      name: 'Jordan Poole',
      team: 'NO',
      position: ['SG', 'PG'],
    },
    {
      name: 'Alperen Sengun',
      team: 'Hou',
      position: ['C'],
    },
    {
      name: 'Josh Hart',
      team: 'NY',
      position: ['SF', 'SG'],
    },
    {
      name: 'Jalen Johnson',
      team: 'Atl',
      position: ['PF'],
    },
    {
      name: 'Joel Embiid',
      team: 'Phi',
      position: ['C'],
    },
    {
      name: 'Alex Sarr',
      team: 'Wsh',
      position: ['C'],
    },
    {
      name: 'Ja Morant',
      team: 'Mem',
      position: ['PG'],
    },
    {
      name: 'Paolo Banchero',
      team: 'Orl',
      position: ['PF', 'SF'],
    },
    {
      name: 'Jalen Brunson',
      team: 'NY',
      position: ['PG'],
    },
    {
      name: 'Trey Murphy III',
      team: 'NO',
      position: ['SF', 'SG'],
    },
    {
      name: 'Franz Wagner',
      team: 'Orl',
      position: ['SF', 'PF'],
    },
    {
      name: 'Austin Reaves',
      team: 'LAL',
      position: ['SG', 'PG', 'SF'],
    },
    {
      name: 'Miles Bridges',
      team: 'Cha',
      position: ['SF', 'PF'],
    },
  ],
  [
    {
      name: 'Deni Avdija',
      team: 'Por',
      position: ['SF', 'PF'],
    },
    {
      name: 'Walker Kessler',
      team: 'Utah',
      position: ['C'],
    },
    {
      name: 'Michael Porter Jr.',
      team: 'Bkn',
      position: ['SF', 'PF'],
    },
    {
      name: 'Coby White',
      team: 'Chi',
      position: ['PG', 'SG'],
    },
    {
      name: 'Kevin Porter Jr.',
      team: 'Mil',
      position: ['SG', 'PG'],
    },
    {
      name: 'Jaren Jackson Jr.',
      team: 'Mem',
      position: ['C', 'PF'],
    },
    {
      name: 'OG Anunoby',
      team: 'NY',
      position: ['SF', 'PF'],
    },
    {
      name: 'Mikal Bridges',
      team: 'NY',
      position: ['SF', 'SG'],
    },
    {
      name: 'Andrew Wiggins',
      team: 'Mia',
      position: ['SF', 'PF'],
    },
    {
      name: 'Tyler Herro',
      team: 'Mia',
      position: ['SG', 'PG'],
    },
    {
      name: 'Reed Sheppard',
      team: 'Hou',
      position: ['SG'],
    },
    {
      name: 'Zach LaVine',
      team: 'Sac',
      position: ['SG', 'SF'],
    },
    {
      name: 'Kristaps Porzingis',
      team: 'Atl',
      position: ['C', 'PF'],
    },
    {
      name: 'Draymond Green',
      team: 'GS',
      position: ['PF', 'C'],
    },
    {
      name: 'DeMar DeRozan',
      team: 'Sac',
      position: ['SF', 'PF'],
    },
    {
      name: 'Naz Reid',
      team: 'Min',
      position: ['C', 'PF'],
    },
    {
      name: 'Jakob Poeltl',
      team: 'Tor',
      position: ['C'],
    },
    {
      name: 'Darius Garland',
      team: 'Cle',
      position: ['PG'],
    },
    {
      name: 'Russell Westbrook',
      team: 'Sac',
      position: ['PG'],
    },
    {
      name: 'Jalen Suggs',
      team: 'Orl',
      position: ['PG', 'SG'],
    },
    {
      name: 'Anfernee Simons',
      team: 'Bos',
      position: ['SG', 'PG'],
    },
    {
      name: 'Brandon Miller',
      team: 'Cha',
      position: ['SF', 'SG'],
    },
    {
      name: 'Paul George',
      team: 'Phi',
      position: ['SF', 'PF'],
    },
    {
      name: 'Jarrett Allen',
      team: 'Cle',
      position: ['C'],
    },
    {
      name: 'Jalen Duren',
      team: 'Det',
      position: ['C'],
    },
    {
      name: 'Zion Williamson',
      team: 'NO',
      position: ['PF'],
    },
    {
      name: 'Payton Pritchard',
      team: 'Bos',
      position: ['PG'],
    },
    {
      name: 'Lauri Markkanen',
      team: 'Utah',
      position: ['PF', 'SF'],
    },
    {
      name: 'Jaden McDaniels',
      team: 'Min',
      position: ['SF'],
    },
    {
      name: 'CJ McCollum',
      team: 'Wsh',
      position: ['SG', 'PG'],
    },
    {
      name: 'Norman Powell',
      team: 'Mia',
      position: ['SG', 'SF'],
    },
    {
      name: 'Ivica Zubac',
      team: 'LAC',
      position: ['C'],
    },
    {
      name: 'Brandon Ingram',
      team: 'Tor',
      position: ['SF'],
    },
    {
      name: 'Kawhi Leonard',
      team: 'LAC',
      position: ['SF', 'PF'],
    },
    {
      name: 'Onyeka Okongwu',
      team: 'Atl',
      position: ['C'],
    },
    {
      name: "D'Angelo Russell",
      team: 'Dal',
      position: ['PG', 'SG'],
    },
    {
      name: 'Julius Randle',
      team: 'Min',
      position: ['PF'],
    },
    {
      name: 'Malik Monk',
      team: 'Sac',
      position: ['SG', 'PG', 'SF'],
    },
    {
      name: 'Toumani Camara',
      team: 'Por',
      position: ['PF', 'SF'],
    },
    {
      name: 'Donovan Clingan',
      team: 'Por',
      position: ['C'],
    },
    {
      name: 'Rudy Gobert',
      team: 'Min',
      position: ['C'],
    },
    {
      name: 'Christian Braun',
      team: 'Den',
      position: ['SG', 'SF'],
    },
    {
      name: 'Donte DiVincenzo',
      team: 'Min',
      position: ['SG', 'PG'],
    },
    {
      name: 'Jimmy Butler III',
      team: 'GS',
      position: ['SF', 'SG', 'PF'],
    },
    {
      name: 'Andrew Nembhard',
      team: 'Ind',
      position: ['PG', 'SG'],
    },
    {
      name: 'John Collins',
      team: 'LAC',
      position: ['PF', 'C'],
    },
    {
      name: 'Keyonte George',
      team: 'Utah',
      position: ['PG', 'SG'],
    },
    {
      name: 'Tari Eason',
      team: 'Hou',
      position: ['SF', 'PF'],
    },
    {
      name: 'Shaedon Sharpe',
      team: 'Por',
      position: ['SG', 'SF'],
    },
    {
      name: 'Tobias Harris',
      team: 'Det',
      position: ['PF', 'SF'],
    },
  ],
  [
    {
      name: 'RJ Barrett',
      team: 'Tor',
      position: ['SF', 'SG', 'PF'],
    },
    {
      name: 'Matas Buzelis',
      team: 'Chi',
      position: ['SF', 'PF'],
    },
    {
      name: 'Nic Claxton',
      team: 'Bkn',
      position: ['C'],
    },
    {
      name: 'Santi Aldama',
      team: 'Mem',
      position: ['PF', 'SF', 'C'],
    },
    {
      name: 'Buddy Hield',
      team: 'GS',
      position: ['SG', 'SF'],
    },
    {
      name: 'Chris Paul',
      team: 'LAC',
      position: ['PG'],
    },
    {
      name: 'Klay Thompson',
      team: 'Dal',
      position: ['SG', 'SF'],
    },
    {
      name: 'Isaiah Collier',
      team: 'Utah',
      position: ['PG'],
    },
    {
      name: 'Immanuel Quickley',
      team: 'Tor',
      position: ['PG', 'SG'],
    },
    {
      name: 'Ausar Thompson',
      team: 'Det',
      position: ['SF', 'PF'],
    },
    {
      name: 'Keon Ellis',
      team: 'Sac',
      position: ['SG'],
    },
    {
      name: 'Isaiah Hartenstein',
      team: 'OKC',
      position: ['C'],
    },
    {
      name: 'Bub Carrington',
      team: 'Wsh',
      position: ['PG', 'SG'],
    },
    {
      name: 'Devin Vassell',
      team: 'SA',
      position: ['SG', 'SF'],
    },
    {
      name: 'Cam Whitmore',
      team: 'Wsh',
      position: ['SF'],
    },
    {
      name: 'Mark Williams',
      team: 'Phx',
      position: ['C'],
    },
    {
      name: 'Cam Thomas',
      team: 'Bkn',
      position: ['SG', 'SF'],
    },
    {
      name: "Kel'el Ware",
      team: 'Mia',
      position: ['C'],
    },
    {
      name: 'Stephon Castle',
      team: 'SA',
      position: ['PG', 'SG'],
    },
    {
      name: 'Bennedict Mathurin',
      team: 'Ind',
      position: ['SF', 'SG'],
    },
    {
      name: "Royce O'Neale",
      team: 'Phx',
      position: ['SF'],
    },
    {
      name: 'Herbert Jones',
      team: 'NO',
      position: ['SF', 'PF'],
    },
    {
      name: 'Kyshawn George',
      team: 'Wsh',
      position: ['SG', 'SF'],
    },
    {
      name: 'Egor Demin',
      team: 'Bkn',
      position: ['PG'],
    },
    {
      name: 'Jrue Holiday',
      team: 'Por',
      position: ['PG', 'SG'],
    },
    {
      name: 'Brook Lopez',
      team: 'LAC',
      position: ['C'],
    },
    {
      name: 'Luguentz Dort',
      team: 'OKC',
      position: ['SG', 'SF'],
    },
    {
      name: 'Cameron Johnson',
      team: 'Den',
      position: ['SF', 'PF'],
    },
    {
      name: 'Deandre Ayton',
      team: 'LAL',
      position: ['C'],
    },
    {
      name: 'Ty Jerome',
      team: 'Mem',
      position: ['PG'],
    },
    {
      name: 'Jerami Grant',
      team: 'Por',
      position: ['PF'],
    },
    {
      name: 'Bilal Coulibaly',
      team: 'Wsh',
      position: ['SF', 'SG'],
    },
    {
      name: 'Kelly Oubre Jr.',
      team: 'Phi',
      position: ['SF', 'SG'],
    },
    {
      name: 'P.J. Washington',
      team: 'Dal',
      position: ['PF'],
    },
    {
      name: 'Aaron Nesmith',
      team: 'Ind',
      position: ['SF'],
    },
    {
      name: 'Sam Hauser',
      team: 'Bos',
      position: ['SF'],
    },
    {
      name: 'Daniel Gafford',
      team: 'Dal',
      position: ['C'],
    },
    {
      name: 'Bobby Portis',
      team: 'Mil',
      position: ['PF'],
    },
    {
      name: 'Dennis Schroder',
      team: 'Sac',
      position: ['PG'],
    },
    {
      name: "De'Andre Hunter",
      team: 'Cle',
      position: ['SF', 'PF'],
    },
    {
      name: 'Quentin Grimes',
      team: 'Phi',
      position: ['SG'],
    },
    {
      name: 'Obi Toppin',
      team: 'Ind',
      position: ['PF'],
    },
    {
      name: 'Tyus Jones',
      team: 'Orl',
      position: ['PG'],
    },
    {
      name: 'Keegan Murray',
      team: 'Sac',
      position: ['PF', 'SF'],
    },
    {
      name: 'Kyle Kuzma',
      team: 'Mil',
      position: ['PF', 'SF'],
    },
    {
      name: 'Aaron Wiggins',
      team: 'OKC',
      position: ['SG'],
    },
    {
      name: 'Brandin Podziemski',
      team: 'GS',
      position: ['SG', 'PG'],
    },
    {
      name: 'Jose Alvarado',
      team: 'NO',
      position: ['PG'],
    },
    {
      name: "De'Anthony Melton",
      team: 'GS',
      position: ['PG', 'SG'],
    },
    {
      name: 'Aaron Gordon',
      team: 'Den',
      position: ['PF'],
    },
  ],
  [
    {
      name: 'Zaccharie Risacher',
      team: 'Atl',
      position: ['SF'],
    },
    {
      name: 'T.J. McConnell',
      team: 'Ind',
      position: ['PG'],
    },
    {
      name: 'Nickeil Alexander-Walker',
      team: 'Atl',
      position: ['SG'],
    },
    {
      name: 'Brice Sensabaugh',
      team: 'Utah',
      position: ['SF'],
    },
    {
      name: 'Jabari Smith Jr.',
      team: 'Hou',
      position: ['PF', 'C'],
    },
    {
      name: 'Caris LeVert',
      team: 'Det',
      position: ['SG', 'SF'],
    },
    {
      name: 'Cason Wallace',
      team: 'OKC',
      position: ['SG'],
    },
    {
      name: 'Jaden Ivey',
      team: 'Det',
      position: ['SG', 'PG'],
    },
    {
      name: 'Yves Missi',
      team: 'NO',
      position: ['C'],
    },
    {
      name: 'Kentavious Caldwell-Pope',
      team: 'Mem',
      position: ['SG', 'SF'],
    },
    {
      name: 'VJ Edgecombe',
      team: 'Phi',
      position: ['SG'],
    },
    {
      name: 'Jusuf Nurkic',
      team: 'Utah',
      position: ['C'],
    },
    {
      name: 'Bradley Beal',
      team: 'LAC',
      position: ['SF', 'SG'],
    },
    {
      name: 'Neemias Queta',
      team: 'Bos',
      position: ['C'],
    },
    {
      name: 'Kyle Filipowski',
      team: 'Utah',
      position: ['PF'],
    },
    {
      name: 'Ace Bailey',
      team: 'Utah',
      position: ['SF', 'PF'],
    },
    {
      name: 'Cedric Coward',
      team: 'Mem',
      position: ['SF', 'SG'],
    },
    {
      name: 'Dylan Harper',
      team: 'SA',
      position: ['PG', 'SG'],
    },
    {
      name: 'Gary Trent Jr.',
      team: 'Mil',
      position: ['SG'],
    },
    {
      name: 'Kyrie Irving',
      team: 'Dal',
      position: ['PG', 'SG'],
    },
    {
      name: 'Alex Caruso',
      team: 'OKC',
      position: ['SG', 'PG'],
    },
    {
      name: 'Dereck Lively II',
      team: 'Dal',
      position: ['C'],
    },
    {
      name: 'Kevin Huerter',
      team: 'Chi',
      position: ['SG', 'SF'],
    },
    {
      name: 'Spencer Dinwiddie',
      team: 'FA',
      position: ['PG', 'SG'],
    },
    {
      name: 'Dillon Brooks',
      team: 'Phx',
      position: ['SF', 'SG'],
    },
    {
      name: 'Collin Sexton',
      team: 'Cha',
      position: ['SG', 'PG'],
    },
    {
      name: 'Grayson Allen',
      team: 'Phx',
      position: ['SG', 'PG'],
    },
    {
      name: 'Zach Edey',
      team: 'Mem',
      position: ['C'],
    },
    {
      name: 'Wendell Carter Jr.',
      team: 'Orl',
      position: ['C'],
    },
    {
      name: 'Ayo Dosunmu',
      team: 'Chi',
      position: ['SG'],
    },
    {
      name: 'Scoot Henderson',
      team: 'Por',
      position: ['PG'],
    },
    {
      name: 'Saddiq Bey',
      team: 'NO',
      position: ['SF', 'PF'],
    },
    {
      name: 'Chris Boucher',
      team: 'Bos',
      position: ['PF', 'C'],
    },
    {
      name: 'Tre Johnson',
      team: 'Wsh',
      position: ['SG'],
    },
    {
      name: 'Jordan Clarkson',
      team: 'NY',
      position: ['SG', 'SF'],
    },
    {
      name: 'Cole Anthony',
      team: 'Mil',
      position: ['PG'],
    },
    {
      name: 'Kon Knueppel',
      team: 'Cha',
      position: ['SG'],
    },
    {
      name: 'Collin Murray-Boyles',
      team: 'Tor',
      position: ['PF'],
    },
    {
      name: 'Harrison Barnes',
      team: 'SA',
      position: ['PF'],
    },
    {
      name: 'Jonas Valanciunas',
      team: 'Den',
      position: ['C'],
    },
    {
      name: 'Jaime Jaquez Jr.',
      team: 'Mia',
      position: ['SF', 'SG'],
    },
    {
      name: 'Naji Marshall',
      team: 'Dal',
      position: ['SF', 'PF'],
    },
    {
      name: 'Khris Middleton',
      team: 'Wsh',
      position: ['SF'],
    },
    {
      name: 'Jeremy Sochan',
      team: 'SA',
      position: ['PF'],
    },
    {
      name: 'Nique Clifford',
      team: 'Sac',
      position: ['SG'],
    },
    {
      name: 'Keldon Johnson',
      team: 'SA',
      position: ['SF', 'PF'],
    },
    {
      name: 'Jared McCain',
      team: 'Phi',
      position: ['SG'],
    },
    {
      name: 'Clint Capela',
      team: 'Hou',
      position: ['C'],
    },
    {
      name: 'Derik Queen',
      team: 'NO',
      position: ['C'],
    },
    {
      name: 'Carter Bryant',
      team: 'SA',
      position: ['SF'],
    },
  ],
  [
    {
      name: 'Jonathan Kuminga',
      team: 'GS',
      position: ['PF'],
    },
    {
      name: 'Jeremiah Fears',
      team: 'NO',
      position: ['SG', 'PG'],
    },
    {
      name: 'Tre Jones',
      team: 'Chi',
      position: ['PG'],
    },
    {
      name: 'Mike Conley',
      team: 'Min',
      position: ['PG'],
    },
    {
      name: 'Killian Hayes',
      team: 'FA',
      position: ['PG'],
    },
    {
      name: 'Al Horford',
      team: 'GS',
      position: ['C', 'PF'],
    },
    {
      name: 'Kris Dunn',
      team: 'LAC',
      position: ['PG'],
    },
    {
      name: 'Terance Mann',
      team: 'Bkn',
      position: ['SG', 'SF'],
    },
    {
      name: 'Gradey Dick',
      team: 'Tor',
      position: ['SG', 'SF'],
    },
    {
      name: 'Dejounte Murray',
      team: 'NO',
      position: ['SG', 'PG'],
    },
    {
      name: 'Cody Martin',
      team: 'FA',
      position: ['SG'],
    },
    {
      name: 'Goga Bitadze',
      team: 'Orl',
      position: ['C'],
    },
    {
      name: 'Jaylen Wells',
      team: 'Mem',
      position: ['SG'],
    },
    {
      name: 'Guerschon Yabusele',
      team: 'NY',
      position: ['PF'],
    },
    {
      name: 'Nick Richards',
      team: 'Phx',
      position: ['C'],
    },
    {
      name: 'Rui Hachimura',
      team: 'LAL',
      position: ['PF', 'SF'],
    },
    {
      name: 'Khaman Maluach',
      team: 'Phx',
      position: ['C'],
    },
    {
      name: 'Yang Hansen',
      team: 'Por',
      position: ['C'],
    },
    {
      name: 'Thomas Sorber',
      team: 'OKC',
      position: ['C'],
    },
    {
      name: 'Duncan Robinson',
      team: 'Det',
      position: ['SF'],
    },
    {
      name: 'Isaiah Stewart',
      team: 'Det',
      position: ['C', 'PF'],
    },
    {
      name: 'Joan Beringer',
      team: 'Min',
      position: ['C'],
    },
    {
      name: 'Anthony Black',
      team: 'Orl',
      position: ['PG', 'SG'],
    },
    {
      name: 'Mitchell Robinson',
      team: 'NY',
      position: ['C'],
    },
    {
      name: 'Tim Hardaway Jr.',
      team: 'Den',
      position: ['SG', 'SF'],
    },
    {
      name: 'Taurean Prince',
      team: 'Mil',
      position: ['SF'],
    },
    {
      name: 'Ochai Agbaji',
      team: 'Tor',
      position: ['SF', 'SG'],
    },
    {
      name: 'Kelly Olynyk',
      team: 'SA',
      position: ['C', 'PF'],
    },
    {
      name: 'Malcolm Brogdon',
      team: 'NY',
      position: ['PG', 'SG'],
    },
    {
      name: 'Matisse Thybulle',
      team: 'Por',
      position: ['SF', 'SG'],
    },
    {
      name: 'Julian Champagnie',
      team: 'SA',
      position: ['SF'],
    },
    {
      name: 'Bogdan Bogdanovic',
      team: 'LAC',
      position: ['SG', 'SF'],
    },
    {
      name: 'Terry Rozier',
      team: 'Mia',
      position: ['PG', 'SG'],
    },
    {
      name: 'Isaiah Joe',
      team: 'OKC',
      position: ['SG'],
    },
    {
      name: 'Nikola Jovic',
      team: 'Mia',
      position: ['PF'],
    },
    {
      name: 'Bruce Brown',
      team: 'Den',
      position: ['SG', 'SF'],
    },
    {
      name: 'Max Christie',
      team: 'Dal',
      position: ['SG'],
    },
    {
      name: 'Davion Mitchell',
      team: 'Mia',
      position: ['PG'],
    },
    {
      name: 'Isaiah Jackson',
      team: 'Ind',
      position: ['PF', 'C'],
    },
    {
      name: 'Georges Niang',
      team: 'Utah',
      position: ['PF'],
    },
    {
      name: 'Robert Williams III',
      team: 'Por',
      position: ['C'],
    },
    {
      name: 'Kyle Anderson',
      team: 'Utah',
      position: ['SF', 'PF'],
    },
    {
      name: 'Ryan Dunn',
      team: 'Phx',
      position: ['SF'],
    },
    {
      name: 'Caleb Martin',
      team: 'Dal',
      position: ['SG', 'SF'],
    },
    {
      name: 'Peyton Watson',
      team: 'Den',
      position: ['SF', 'PF'],
    },
    {
      name: 'Moritz Wagner',
      team: 'Orl',
      position: ['C'],
    },
    {
      name: 'AJ Green',
      team: 'Mil',
      position: ['SG'],
    },
    {
      name: 'Christian Wood',
      team: 'FA',
      position: ['PF'],
    },
    {
      name: 'Luke Kornet',
      team: 'SA',
      position: ['C'],
    },
    {
      name: 'Andre Drummond',
      team: 'Phi',
      position: ['C'],
    },
  ],
  [
    {
      name: 'Corey Kispert',
      team: 'Wsh',
      position: ['SF', 'SG'],
    },
    {
      name: 'Kevon Looney',
      team: 'NO',
      position: ['C'],
    },
    {
      name: 'Will Riley',
      team: 'Wsh',
      position: ['SF', 'SG'],
    },
    {
      name: 'Danny Wolf',
      team: 'Bkn',
      position: ['PF'],
    },
    {
      name: 'Drake Powell',
      team: 'Bkn',
      position: ['SG'],
    },
    {
      name: 'Asa Newell',
      team: 'Atl',
      position: ['PF'],
    },
    {
      name: 'Jaylen Clark',
      team: 'Min',
      position: ['SG'],
    },
    {
      name: 'Ziaire Williams',
      team: 'Bkn',
      position: ['SF'],
    },
    {
      name: 'Max Strus',
      team: 'Cle',
      position: ['SF', 'SG'],
    },
    {
      name: 'Brandon Clarke',
      team: 'Mem',
      position: ['PF', 'C'],
    },
    {
      name: 'Jonathan Mogbo',
      team: 'Tor',
      position: ['PF'],
    },
    {
      name: 'Ben Saraf',
      team: 'Bkn',
      position: ['SG'],
    },
    {
      name: 'Ronald Holland II',
      team: 'Det',
      position: ['SF'],
    },
    {
      name: 'Tre Mann',
      team: 'Cha',
      position: ['PG', 'SG'],
    },
    {
      name: 'Grant Williams',
      team: 'Cha',
      position: ['PF'],
    },
    {
      name: 'Marcus Smart',
      team: 'LAL',
      position: ['SG', 'PG'],
    },
    {
      name: 'Adem Bona',
      team: 'Phi',
      position: ['C'],
    },
    {
      name: 'Mason Plumlee',
      team: 'Cha',
      position: ['C'],
    },
    {
      name: 'Luke Kennard',
      team: 'Atl',
      position: ['SG'],
    },
    {
      name: 'Rob Dillingham',
      team: 'Min',
      position: ['PG'],
    },
    {
      name: 'Jalen Smith',
      team: 'Chi',
      position: ['PF', 'C'],
    },
    {
      name: 'Miles McBride',
      team: 'NY',
      position: ['PG'],
    },
    {
      name: 'Dalton Knecht',
      team: 'LAL',
      position: ['SG', 'SF'],
    },
    {
      name: 'Patrick Williams',
      team: 'Chi',
      position: ['PF'],
    },
    {
      name: 'Larry Nance Jr.',
      team: 'Cle',
      position: ['PF', 'C'],
    },
    {
      name: 'Tristan da Silva',
      team: 'Orl',
      position: ['SF'],
    },
    {
      name: 'Lonzo Ball',
      team: 'Cle',
      position: ['PG'],
    },
    {
      name: 'Trayce Jackson-Davis',
      team: 'GS',
      position: ['PF', 'C'],
    },
    {
      name: 'Moses Moody',
      team: 'GS',
      position: ['SG', 'SF'],
    },
    {
      name: 'Jarace Walker',
      team: 'Ind',
      position: ['PF'],
    },
    {
      name: 'Walter Clayton Jr.',
      team: 'Utah',
      position: ['SG', 'PG'],
    },
    {
      name: 'Jamal Shead',
      team: 'Tor',
      position: ['PG'],
    },
    {
      name: 'Jalen Wilson',
      team: 'Bkn',
      position: ['PF'],
    },
    {
      name: 'Jaylin Williams',
      team: 'OKC',
      position: ['C'],
    },
    {
      name: 'Dalano Banton',
      team: 'FA',
      position: ['PG', 'SG', 'SF'],
    },
    {
      name: 'Jordan Goodwin',
      team: 'Phx',
      position: ['PG', 'SG'],
    },
    {
      name: 'Jonathan Isaac',
      team: 'Orl',
      position: ['PF'],
    },
    {
      name: 'Jordan Hawkins',
      team: 'NO',
      position: ['SG'],
    },
    {
      name: 'Nolan Traore',
      team: 'Bkn',
      position: ['PG'],
    },
    {
      name: 'Jake LaRavia',
      team: 'LAL',
      position: ['PF'],
    },
    {
      name: 'Derrick Jones Jr.',
      team: 'LAC',
      position: ['SF'],
    },
    {
      name: 'Richaun Holmes',
      team: 'FA',
      position: ['C', 'PF'],
    },
    {
      name: 'Jaylen Nowell',
      team: 'Wsh',
      position: ['SG'],
    },
    {
      name: 'Scotty Pippen Jr.',
      team: 'Mem',
      position: ['PG', 'SG'],
    },
    {
      name: 'Mouhamed Gueye',
      team: 'Atl',
      position: ['PF'],
    },
    {
      name: 'Mo Bamba',
      team: 'FA',
      position: ['C'],
    },
    {
      name: 'Zach Collins',
      team: 'Chi',
      position: ['C', 'PF'],
    },
    {
      name: 'Tristan Vukcevic',
      team: 'Wsh',
      position: ['PF', 'C'],
    },
    {
      name: 'Precious Achiuwa',
      team: 'FA',
      position: ['PF', 'C'],
    },
    {
      name: 'Ben Simmons',
      team: 'FA',
      position: ['PG', 'PF'],
    },
  ],
].flat()

const getPosition = (name: string) =>
  espnRank.find(p => p.name === name)?.position
const getShortName = (name: string): string => {
  const nameSplit = name.split(' ')
  // const first = nameSplit[0] ?? ''
  const last = nameSplit[1] ?? ''
  // const suffix = nameSplit[2] ?? ''
  return last
}
const toString = (player: Player, options?: { short?: boolean }) =>
  options?.short
    ? getShortName(player.name)
    : `${player.name} ${player.team} ${
        typeof player.position === 'string'
          ? player.position
          : player.position.join(', ')
      }`

export default espnRank
export { getPosition, toString }
